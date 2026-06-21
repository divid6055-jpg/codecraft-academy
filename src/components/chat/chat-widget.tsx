"use client";

import * as React from "react";
import { io, Socket } from "socket.io-client";
import {
  Send,
  Hash,
  Users,
  Circle,
  Code2,
  Smile,
  type LucideIcon,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { useUserStore } from "@/store/user-store";
import { useProgressStore } from "@/store/progress-store";
import { cn, timeAgo } from "@/lib/utils";

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
  usersCount: number;
  messagesCount: number;
}

const EMOJIS = ["👍", "❤️", "🎉", "🔥", "✨", "💯", "🚀", "💡"];

export function ChatWidget() {
  const { profile } = useUserStore();
  const { level } = useProgressStore();
  const [socket, setSocket] = React.useState<Socket | null>(null);
  const [connected, setConnected] = React.useState(false);
  const [rooms, setRooms] = React.useState<Room[]>([]);
  const [activeRoom, setActiveRoom] = React.useState<string>("general");
  const [messages, setMessages] = React.useState<ChatMessage[]>([]);
  const [onlineUsers, setOnlineUsers] = React.useState<any[]>([]);
  const [input, setInput] = React.useState("");
  const [typingUsers, setTypingUsers] = React.useState<Set<string>>(new Set());
  const [showCodeMode, setShowCodeMode] = React.useState(false);
  const [codeInput, setCodeInput] = React.useState("");
  const messagesEndRef = React.useRef<HTMLDivElement>(null);
  const typingTimeoutRef = React.useRef<ReturnType<typeof setTimeout> | null>(null);

  // Connect to socket
  React.useEffect(() => {
    const s = io("/?XTransformPort=3003", {
      transports: ["websocket"],
      reconnection: true,
      reconnectionDelay: 1000,
    });
    setSocket(s);

    s.on("connect", () => {
      setConnected(true);
      if (profile) {
        s.emit("user:identify", {
          name: profile.name,
          avatar: profile.avatar,
          level,
        });
      }
      s.emit("room:join", "general");
    });

    s.on("disconnect", () => setConnected(false));
    s.on("connect_error", () => setConnected(false));

    s.on("rooms:list", (list: Room[]) => setRooms(list));
    s.on("room:history", (history: ChatMessage[]) => setMessages(history));
    s.on("message:receive", (msg: ChatMessage) => {
      setMessages((prev) => [...prev, msg]);
    });
    s.on("room:users", (users: any[]) => setOnlineUsers(users));
    s.on("user:joined", (user: any) => {
      setOnlineUsers((prev) => [...prev.filter((u) => u.userId !== user.userId), user]);
    });
    s.on("user:left", (data: any) => {
      setOnlineUsers((prev) => prev.filter((u) => u.userId !== data.userId));
    });
    s.on("typing:start", (data: any) => {
      setTypingUsers((prev) => new Set(prev).add(data.userName || "مستخدم"));
      if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);
      typingTimeoutRef.current = setTimeout(() => setTypingUsers(new Set()), 3000);
    });
    s.on("typing:stop", () => setTypingUsers(new Set()));
    s.on("error", (err: any) => console.error("chat error:", err));

    return () => {
      s.disconnect();
    };
  }, [profile, level]);

  // Auto-scroll
  React.useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = () => {
    if (!socket || (!input.trim() && !codeInput.trim())) return;

    if (showCodeMode && codeInput.trim()) {
      socket.emit("message:send", {
        roomId: activeRoom,
        text: input.trim() || "مشاركة كود",
        type: "code",
        code: codeInput,
        language: "javascript",
      });
      setCodeInput("");
      setShowCodeMode(false);
    } else if (input.trim()) {
      socket.emit("message:send", {
        roomId: activeRoom,
        text: input.trim(),
        type: "message",
      });
    }
    setInput("");
    socket.emit("typing:stop", activeRoom);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
    if (socket && e.target.value.trim()) {
      socket.emit("typing:start", activeRoom);
    } else {
      socket?.emit("typing:stop", activeRoom);
    }
  };

  const joinRoom = (roomId: string) => {
    setActiveRoom(roomId);
    socket?.emit("room:join", roomId);
    setMessages([]);
    setOnlineUsers([]);
  };

  const activeRoomData = rooms.find((r) => r.id === activeRoom);

  return (
    <Card className="h-[700px] flex flex-col overflow-hidden">
      <CardHeader className="pb-3 border-b">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2 text-base">
            <Hash className="h-5 w-5 text-brand" />
            {activeRoomData?.name || "الغرفة العامة"}
            <Badge variant="secondary" className="text-[10px] gap-1">
              <Circle className={cn("h-1.5 w-1.5 fill-current", connected ? "text-emerald-500" : "text-muted-foreground")} />
              {connected ? "متصل" : "غير متصل"}
            </Badge>
          </CardTitle>
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <Users className="h-3.5 w-3.5" />
            <span className="lnum">{onlineUsers.length + 1}</span>
          </div>
        </div>
      </CardHeader>

      <div className="grid grid-cols-[180px_1fr_180px] flex-1 min-h-0">
        {/* Rooms sidebar */}
        <div className="border-r p-2 space-y-1 overflow-y-auto">
          <div className="text-xs font-semibold text-muted-foreground px-2 py-1">الغرف</div>
          {rooms.map((room) => (
            <button
              key={room.id}
              onClick={() => joinRoom(room.id)}
              className={cn(
                "w-full flex items-center gap-2 px-2 py-1.5 rounded-md text-right text-sm transition-colors",
                activeRoom === room.id
                  ? "bg-brand/10 text-brand"
                  : "hover:bg-muted"
              )}
            >
              <Hash className="h-3.5 w-3.5 shrink-0" />
              <div className="flex-1 min-w-0">
                <div className="text-xs font-medium truncate">{room.name}</div>
                <div className="text-[10px] text-muted-foreground lnum">
                  {room.usersCount} نشط
                </div>
              </div>
            </button>
          ))}
        </div>

        {/* Messages */}
        <div className="flex flex-col min-h-0">
          <ScrollArea className="flex-1 p-3">
            {messages.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-center text-muted-foreground text-sm">
                <Hash className="h-12 w-12 mb-2 opacity-30" />
                <p>لا توجد رسائل بعد</p>
                <p className="text-xs">كن أول من يبدأ النقاش!</p>
              </div>
            ) : (
              <div className="space-y-3">
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={cn(
                      "flex gap-2",
                      msg.userId === socket?.id && "flex-row-reverse"
                    )}
                  >
                    <Avatar className="h-8 w-8 shrink-0">
                      <AvatarFallback className="bg-gradient-to-br from-brand to-accent text-brand-foreground text-[10px]">
                        {msg.userName.slice(0, 2)}
                      </AvatarFallback>
                    </Avatar>
                    <div className={cn("flex-1 max-w-[80%]", msg.userId === socket?.id && "text-left")}>
                      <div className="flex items-center gap-2 mb-0.5">
                        <span className="text-xs font-medium">{msg.userName}</span>
                        <Badge variant="outline" className="text-[9px] h-3.5 lnum">L{msg.userLevel}</Badge>
                        <span className="text-[10px] text-muted-foreground">{timeAgo(msg.createdAt)}</span>
                      </div>
                      <div className={cn(
                        "inline-block rounded-lg px-3 py-2 text-sm",
                        msg.userId === socket?.id
                          ? "bg-brand text-brand-foreground"
                          : "bg-muted"
                      )}>
                        {msg.text}
                      </div>
                      {msg.type === "code" && msg.code && (
                        <pre className="mt-1 rounded-md bg-card border p-2 text-xs font-mono overflow-x-auto" dir="ltr">
                          <code>{msg.code}</code>
                        </pre>
                      )}
                    </div>
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>
            )}
          </ScrollArea>

          {/* Typing indicator */}
          {typingUsers.size > 0 && (
            <div className="px-3 py-1 text-xs text-muted-foreground">
              {Array.from(typingUsers).slice(0, 3).join(", ")}{" "}
              {typingUsers.size === 1 ? "يكتب..." : "يكتبون..."}
            </div>
          )}

          {/* Code input mode */}
          {showCodeMode && (
            <div className="p-2 border-t bg-muted/30">
              <textarea
                value={codeInput}
                onChange={(e) => setCodeInput(e.target.value)}
                placeholder="الصق الكود هنا..."
                dir="ltr"
                className="w-full h-24 p-2 rounded-md bg-background border text-xs font-mono resize-none"
              />
            </div>
          )}

          {/* Input */}
          <div className="border-t p-2 flex gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setShowCodeMode(!showCodeMode)}
              className={cn(showCodeMode && "bg-brand/10 text-brand")}
              aria-label="كود"
            >
              <Code2 className="h-4 w-4" />
            </Button>
            <Input
              value={input}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              placeholder={showCodeMode ? "اكتب تعليقاً للكود..." : "اكتب رسالة..."}
              className="flex-1"
              disabled={!connected}
            />
            <Button
              onClick={handleSend}
              disabled={!connected || (!input.trim() && !codeInput.trim())}
              size="icon"
              className="bg-gradient-to-r from-brand to-accent text-brand-foreground"
              aria-label="إرسال"
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Online users */}
        <div className="border-r p-2 overflow-y-auto">
          <div className="text-xs font-semibold text-muted-foreground px-2 py-1">المتواجدون</div>
          <div className="space-y-1">
            {/* Current user */}
            <div className="flex items-center gap-2 px-2 py-1 rounded-md hover:bg-muted">
              <div className="relative">
                <Avatar className="h-6 w-6">
                  <AvatarFallback className="bg-gradient-to-br from-brand to-accent text-brand-foreground text-[10px]">
                    {profile?.name.slice(0, 2)}
                  </AvatarFallback>
                </Avatar>
                <Circle className="absolute -bottom-0.5 -right-0.5 h-2 w-2 fill-emerald-500 text-emerald-500" />
              </div>
              <span className="text-xs truncate">{profile?.name} (أنت)</span>
            </div>
            {onlineUsers.map((user) => (
              <div key={user.userId} className="flex items-center gap-2 px-2 py-1 rounded-md hover:bg-muted">
                <div className="relative">
                  <Avatar className="h-6 w-6">
                    <AvatarFallback className="bg-gradient-to-br from-amber-500 to-orange-500 text-white text-[10px]">
                      {user.userName?.slice(0, 2)}
                    </AvatarFallback>
                  </Avatar>
                  <Circle className="absolute -bottom-0.5 -right-0.5 h-2 w-2 fill-emerald-500 text-emerald-500" />
                </div>
                <span className="text-xs truncate">{user.userName}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Card>
  );
}
