import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import MessageList from './MessageList';
import MessageInput from './MessageInput';
import getAIResponse from '../chatbot/chatbot';

interface Message {
  text: string;
  timestamp: number;
  sender: string;
}

type User = { 
  id: string;
  name: string;
  icon: "CircleUser" | "LoaderPinwheel";
  role: "ai" | "human";
};



export function Chat() {
  const { userId } = useParams<{ userId: string }>();
  const parsedUserId = Number(userId);

  // Load all users from localStorage
  const [users, setUsers] = useState(() => {
    const saved = localStorage.getItem("users");
    return saved ? (JSON.parse(saved) as User[]) : [];
  });


  // Find current user/chat
  const user = users.find(u => u.id === userId);
  const isAI = user?.role === "ai";

  // Load messages from localStorage or empty array
  const [messages, setMessages] = useState<Message[]>(() => {
    const saved = localStorage.getItem(`chat_messages_${parsedUserId}`);
    return saved ? (JSON.parse(saved) as Message[]) : [];
  });

  // When user or userId changes, reload messages
  useEffect(() => {
    const saved = localStorage.getItem(`chat_messages_${parsedUserId}`);
    setMessages(saved ? JSON.parse(saved) : []);
  }, [parsedUserId]);

  const saveMessagesToLocalStorage = (msgs: Message[]) => {
    localStorage.setItem(`chat_messages_${parsedUserId}`, JSON.stringify(msgs));
  };

  const handleSend = async (text: string) => {
    if (!user) return;

    const userMessage: Message = {
      text,
      timestamp: Date.now(),
      sender: 'me',
    };

    let updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    saveMessagesToLocalStorage(updatedMessages);

    if (isAI) {
      try {
        const aiText = await getAIResponse(text);

        const aiMessage: Message = {
          text: aiText ?? "Sorry, I couldn't generate a response.",
          timestamp: Date.now(),
          sender: 'ai',
        };

        updatedMessages = [...updatedMessages, aiMessage];
        setMessages(updatedMessages);
        saveMessagesToLocalStorage(updatedMessages);
      } catch (err) {
        console.error('AI response error:', err);
      }
    }
  };

  if (!user) return <div>Chat not found.</div>;

  return (
    <div className="w-full max-w-3xl h-full flex flex-col p-4">
      <div className="flex-1 overflow-y-auto space-y-2 pr-1">
        <MessageList messages={messages} />
      </div>
      <div className="mt-4">
        <MessageInput onSend={handleSend} />
      </div>
    </div>
  );
}
