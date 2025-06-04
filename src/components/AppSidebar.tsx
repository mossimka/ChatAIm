import { LoaderPinwheel, CircleUser } from "lucide-react";

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
import { useUsers } from '@/shared/use-users';

export function AppSidebar() {
  const { data: users, isLoading, isError } = useUsers();

  if (isLoading) return <Sidebar><div>Loading chats...</div></Sidebar>;
  if (isError || !users) return <Sidebar><div>Error loading chats</div></Sidebar>;

  return (
    <Sidebar>
      <SidebarHeader />
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Chats</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {users.map(user => (
                <SidebarMenuItem key={user.id}>
                  <SidebarMenuButton asChild>
                    <a href={`/chat/${user.id}`}>
                      <CircleUser />
                      <span>{user.name}</span>
                    </a>
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