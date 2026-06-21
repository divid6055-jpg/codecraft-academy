// ====================================================================
// CodeCraft Academy — Chat WebSocket Service
// ====================================================================
// Real-time chat service for community discussion and live help.
// Runs on port 3003 and is proxied through Caddy.
// ====================================================================

import { createServer } from "http";
import { Server, Socket } from "socket.io";

const PORT = 3003;

interface ChatMessage {
  id: string;
  roomId: string;
  userId: string;
  userName: string;
  userAvatar?: string;
  userLevel: number;
  text: string;
  type: "message" | "system" | "announcement" | "code";
  code?: string;
  language?: string;
  createdAt: string;
}

interface Room {
  id: string;
  name: string;
  description: string;
  users: Set<string>;
  messages: ChatMessage[];
}

// --------------------------------------------------------------------
// In-memory state (single-instance only; use Redis for multi-instance)
// --------------------------------------------------------------------
const rooms: Map<string, Room> = new Map([
  [
    "general",
    {
      id: "general",
      name: "الغرفة العامة",
      description: "نقاشات عامة حول البرمجة",
      users: new Set(),
      messages: [],
    },
  ],
  [
    "html-css",
    {
      id: "html-css",
      name: "HTML & CSS",
      description: "أسئلة وأجوبة حول HTML و CSS",
      users: new Set(),
      messages: [],
    },
  ],
  [
    "javascript",
    {
      id: "javascript",
      name: "JavaScript",
      description: "نقاشات JavaScript الحية",
      users: new Set(),
      messages: [],
    },
  ],
  [
    "python",
    {
      id: "python",
      name: "Python",
      description: "بايثون — أسئلة وأجوبة",
      users: new Set(),
      messages: [],
    },
  ],
  [
    "help",
    {
      id: "help",
      name: "طلب مساعدة",
      description: "اطلب مساعدة من المجتمع",
      users: new Set(),
      messages: [],
    },
  ],
]);

const userRooms: Map<string, Set<string>> = new Map();
const userInfo: Map<string, { name: string; avatar?: string; level: number }> = new Map();

const httpServer = createServer();
const io = new Server(httpServer, {
  cors: { origin: "*", methods: ["GET", "POST"] },
  path: "/",
});

const uid = () => `m-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;

function broadcastRoomsList() {
  const list = Array.from(rooms.values()).map((r) => ({
    id: r.id,
    name: r.name,
    description: r.description,
    usersCount: r.users.size,
    messagesCount: r.messages.length,
  }));
  io.emit("rooms:list", list);
}

// --------------------------------------------------------------------
// Connection handling
// --------------------------------------------------------------------
io.on("connection", (socket: Socket) => {
  console.log(`[chat] user connected: ${socket.id}`);

  // Send current rooms list
  broadcastRoomsList();

  // ----------------------------------------------------------------
  // User identification
  // ----------------------------------------------------------------
  socket.on("user:identify", (data: { name: string; avatar?: string; level: number }) => {
    userInfo.set(socket.id, {
      name: data.name || "طالب برمجة",
      avatar: data.avatar,
      level: data.level || 1,
    });
    console.log(`[chat] user identified: ${data.name} (${socket.id})`);
  });

  // ----------------------------------------------------------------
  // Join a room
  // ----------------------------------------------------------------
  socket.on("room:join", (roomId: string) => {
    const room = rooms.get(roomId);
    if (!room) {
      socket.emit("error", { message: "الغرفة غير موجودة" });
      return;
    }

    // Leave previous rooms
    const prev = userRooms.get(socket.id) || new Set();
    prev.forEach((rId) => {
      const r = rooms.get(rId);
      if (r) {
        r.users.delete(socket.id);
        socket.leave(rId);
        const info = userInfo.get(socket.id);
        io.to(rId).emit("user:left", {
          userId: socket.id,
          userName: info?.name,
        });
      }
    });

    // Join new room
    room.users.add(socket.id);
    socket.join(roomId);
    userRooms.set(socket.id, new Set([roomId]));

    const info = userInfo.get(socket.id);
    io.to(roomId).emit("user:joined", {
      userId: socket.id,
      userName: info?.name,
      avatar: info?.avatar,
      level: info?.level,
    });

    // Send last 50 messages to the new user
    socket.emit("room:history", room.messages.slice(-50));

    // Send current online users
    const onlineUsers = Array.from(room.users)
      .map((id) => {
        const i = userInfo.get(id);
        return { userId: id, userName: i?.name, avatar: i?.avatar, level: i?.level };
      })
      .filter((u) => u.userId !== socket.id);
    socket.emit("room:users", onlineUsers);

    broadcastRoomsList();
  });

  // ----------------------------------------------------------------
  // Send a message
  // ----------------------------------------------------------------
  socket.on("message:send", (data: { roomId: string; text: string; type?: ChatMessage["type"]; code?: string; language?: string }) => {
    const room = rooms.get(data.roomId);
    if (!room) {
      socket.emit("error", { message: "الغرفة غير موجودة" });
      return;
    }

    if (!data.text || data.text.trim().length === 0) {
      return;
    }

    if (data.text.length > 2000) {
      socket.emit("error", { message: "الرسالة طويلة جداً (2000 حرف كحد أقصى)" });
      return;
    }

    const info = userInfo.get(socket.id);
    const message: ChatMessage = {
      id: uid(),
      roomId: data.roomId,
      userId: socket.id,
      userName: info?.name || "طالب برمجة",
      userAvatar: info?.avatar,
      userLevel: info?.level || 1,
      text: data.text.trim(),
      type: data.type || "message",
      code: data.code,
      language: data.language,
      createdAt: new Date().toISOString(),
    };

    room.messages.push(message);
    if (room.messages.length > 200) {
      room.messages = room.messages.slice(-200);
    }

    io.to(data.roomId).emit("message:receive", message);
  });

  // ----------------------------------------------------------------
  // Typing indicator
  // ----------------------------------------------------------------
  socket.on("typing:start", (roomId: string) => {
    const info = userInfo.get(socket.id);
    socket.to(roomId).emit("typing:start", {
      userId: socket.id,
      userName: info?.name,
    });
  });

  socket.on("typing:stop", (roomId: string) => {
    socket.to(roomId).emit("typing:stop", {
      userId: socket.id,
    });
  });

  // ----------------------------------------------------------------
  // React to a message
  // ----------------------------------------------------------------
  socket.on("message:react", (data: { roomId: string; messageId: string; emoji: string }) => {
    io.to(data.roomId).emit("message:reacted", {
      messageId: data.messageId,
      userId: socket.id,
      emoji: data.emoji,
    });
  });

  // ----------------------------------------------------------------
  // Disconnect
  // ----------------------------------------------------------------
  socket.on("disconnect", () => {
    console.log(`[chat] user disconnected: ${socket.id}`);
    const userRoomIds = userRooms.get(socket.id);
    if (userRoomIds) {
      userRoomIds.forEach((rId) => {
        const r = rooms.get(rId);
        if (r) {
          r.users.delete(socket.id);
          const info = userInfo.get(socket.id);
          io.to(rId).emit("user:left", {
            userId: socket.id,
            userName: info?.name,
          });
        }
      });
    }
    userRooms.delete(socket.id);
    userInfo.delete(socket.id);
    broadcastRoomsList();
  });
});

httpServer.listen(PORT, () => {
  console.log(`[chat-service] listening on port ${PORT}`);
});

export { io, rooms };
