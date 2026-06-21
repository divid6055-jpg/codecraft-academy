"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { MessageSquare, Users, Hash, Zap } from "lucide-react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ForumView } from "@/components/forum/forum-view";
import { ChatWidget } from "@/components/chat/chat-widget";

export function CommunityView() {
  return (
    <div className="container mx-auto px-4 lg:px-6 py-8 lg:py-12">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <div className="flex items-center gap-3 mb-2">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-brand to-accent text-brand-foreground shadow-lg">
            <MessageSquare className="h-6 w-6" />
          </div>
          <div>
            <h1 className="text-2xl lg:text-3xl font-bold">مجتمع CodeCraft</h1>
            <p className="text-muted-foreground text-sm">تواصل، تعلم، وشارك مع آلاف المطورين</p>
          </div>
        </div>
      </motion.div>

      <Tabs defaultValue="chat" className="space-y-4">
        <TabsList className="flex-wrap h-auto">
          <TabsTrigger value="chat" className="gap-1">
            <Zap className="h-3.5 w-3.5" />
            الدردشة المباشرة
          </TabsTrigger>
          <TabsTrigger value="forum" className="gap-1">
            <MessageSquare className="h-3.5 w-3.5" />
            المنتدى
          </TabsTrigger>
        </TabsList>

        <TabsContent value="chat" className="space-y-4">
          <div className="grid lg:grid-cols-3 gap-4">
            <Card className="lg:col-span-1">
              <CardContent className="p-4 space-y-3">
                <h3 className="font-semibold flex items-center gap-2">
                  <Hash className="h-4 w-4 text-brand" />
                  غرف الدردشة
                </h3>
                <p className="text-sm text-muted-foreground">
                  انضم لآلاف المطورين في نقاشات حية حول مواضيع البرمجة المختلفة. اطرح
                  أسئلتك، شارك مشاريعك، وتعلم من تجارب الآخرين.
                </p>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <Users className="h-4 w-4 text-emerald-500" />
                    <span>متصل الآن</span>
                    <Badge variant="secondary" className="lnum">12,840</Badge>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <MessageSquare className="h-4 w-4 text-amber-500" />
                    <span>رسائل اليوم</span>
                    <Badge variant="secondary" className="lnum">2,341</Badge>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Hash className="h-4 w-4 text-violet-500" />
                    <span>غرف نشطة</span>
                    <Badge variant="secondary" className="lnum">5</Badge>
                  </div>
                </div>
                <div className="pt-3 border-t border-border/50 space-y-1 text-xs text-muted-foreground">
                  <p className="font-medium text-foreground">قواعد المجتمع:</p>
                  <p>• كن محترماً ومهذباً مع الجميع</p>
                  <p>• لا تنشر إعلانات أو سبام</p>
                  <p>• اطرح أسئلة واضحة ومحددة</p>
                  <p>• ساعد الآخرين عند قدرتك</p>
                </div>
              </CardContent>
            </Card>
            <div className="lg:col-span-2">
              <ChatWidget />
            </div>
          </div>
        </TabsContent>

        <TabsContent value="forum">
          <ForumView />
        </TabsContent>
      </Tabs>
    </div>
  );
}
