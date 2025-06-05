import { CircleUser, LoaderPinwheel } from "lucide-react";
import { Link } from "react-router-dom";
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
import { Search } from "./ui/search";
import { useState, useEffect } from "react";

export function AppSidebar() {
  // Load chats from localStorage or start empty
  const [users, setUsers] = useState(() => {
    const saved = localStorage.getItem("users");
    return saved ? JSON.parse(saved) : [];
  });

  const [showAI, setShowAI] = useState(true);
  const [showHuman, setShowHuman] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  // Save users to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("users", JSON.stringify(users));
  }, [users]);

  // Get last ID to assign new IDs
  const lastId = users.length ? Math.max(...users.map(u => Number(u.id))) : 0;

  // Add new human chat
  const createHumanChat = () => {
    const newChat = {
      id: String(lastId + 1),
      name: "New Chat",
      icon: "CircleUser",
      role: "human",
    };
    setUsers(prev => [...prev, newChat]);
    localStorage.setItem(`chat_messages_${newChat.id}`, JSON.stringify([]));
  };

  // Add new AI chat
  const createAIChat = () => {
    const newChat = {
      id: String(lastId + 1),
      name: "New AI Chat",
      icon: "LoaderPinwheel",
      role: "ai",
    };
    setUsers(prev => [...prev, newChat]);
    localStorage.setItem(`chat_messages_${newChat.id}`, JSON.stringify([]));
  };

  // Filter chats based on toggle and search
  const filteredUsers = users.filter(user => {
    const matchesRole = (showAI && user.role === "ai") || (showHuman && user.role === "human");
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesRole && matchesSearch;
  });

  return (
    <Sidebar>
      <SidebarHeader />
      <SidebarContent>
        <SidebarGroup>
          <Search value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />
          <div className="flex justify-around">
            <div><Switch checked={showAI} onCheckedChange={() => setShowAI(prev => !prev)} /> AI</div>
            <div><Switch checked={showHuman} onCheckedChange={() => setShowHuman(prev => !prev)} /> Human</div>
          </div>
          <SidebarGroupLabel>Chats</SidebarGroupLabel>
          <Button onClick={createHumanChat} className="m-5">Add Chat +</Button>
          <Button onClick={createAIChat} className="m-5">Add AI Chat +</Button>
          <SidebarGroupContent>
            <SidebarMenu>
              {filteredUsers.map(user => (
                <SidebarMenuItem key={user.id}>
                  <SidebarMenuButton asChild>
                    <Link to={`/chat/${user.id}`} className="flex items-center gap-2">
                      {user.icon === "CircleUser" ? <CircleUser /> : <LoaderPinwheel />}
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
