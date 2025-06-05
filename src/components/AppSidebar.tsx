import { CircleUser, LoaderPinwheel } from "lucide-react";
import { Link } from "react-router-dom";
import { useMutation, useQueryClient } from '@tanstack/react-query';

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "./ui/sidebar";
import { Switch } from "./ui/switch"
import { Button } from "./ui/button";
import { createChat } from '@/shared/create-chat';
import { useUsers } from '@/shared/use-users';
import { useState } from "react";

export function AppSidebar() {
  const queryClient = useQueryClient();
  const { data: users, isLoading, isError } = useUsers();

  const [showAI, setShowAI] = useState(true);
  const [showHuman, setShowHuman] = useState(true);

  const lastId = users?.length
    ? Math.max(...users.map(u => Number(u.id)))
    : 0;

  const { mutate: createHumanChat, isPending: isCreatingHuman } = useMutation({
    mutationFn: () => createChat(String(lastId + 1), "New Chat", "CircleUser","human"),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
    onError: (err) => {
      console.error("Failed to create human chat:", err);
    },
  });

  const { mutate: createAIChat, isPending: isCreatingAI } = useMutation({
    mutationFn: () => createChat(String(lastId + 1), "New AI Chat", "LoaderPinwheel", "ai"),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
    onError: (err) => {
      console.error("Failed to create AI chat:", err);
    },
  });


  if (isLoading) return <Sidebar><div>Loading chats...</div></Sidebar>;
  if (isError || !users) return <Sidebar><div>Error loading chats</div></Sidebar>;

  return (
    <Sidebar>
      <SidebarHeader />
      <SidebarContent>
        <SidebarGroup>
          <div className="flex justify-around">
            <div><Switch checked={showAI} onCheckedChange={() => setShowAI(prev => !prev)}/> AI</div>
            <div><Switch checked={showHuman} onCheckedChange={() => setShowHuman(prev => !prev)}/> Human</div>
          </div>
          <SidebarGroupLabel>Chats</SidebarGroupLabel>
          <Button onClick={() => createHumanChat()} disabled={isCreatingHuman} className="m-5">
            {isCreatingHuman ? "Creating..." : "Add Chat +"}
          </Button>
          <Button onClick={() => createAIChat()} disabled={isCreatingAI} className="m-5">
            {isCreatingAI ? "Creating..." : "Add AIChat +"}
          </Button>
          <SidebarGroupContent>
            <SidebarMenu>
              {users.filter(user => (showAI && user.role === "ai") || (showHuman && user.role === "human")).map(user => (
                <SidebarMenuItem key={user.id}>
                  <SidebarMenuButton asChild>
                    <Link to={`/chat/${user.id}`} className="flex items-center gap-2">
                      {user.icon == "CircleUser" ? <CircleUser /> : <LoaderPinwheel />}
                      <span>{user.name}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  );
}
