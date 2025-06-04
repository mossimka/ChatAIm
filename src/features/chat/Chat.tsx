import { useState, useEffect } from 'react';

import MessageList from './MessageList';
import MessageInput from './MessageInput';
import { useUsers } from '../../shared/use-users';

interface Message {
  text: string;
  timestamp: number;
  sender: string;
}

export function Chat() {
  const { data: users, isLoading, isError } = useUsers();
  const userId = 1;
  const user = users?.find(u => u.id === userId);
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    if (user) {
      setMessages(user.messages);
    }
  }, [user]);

    const handleSend = (text: string) => {
    const newMessage: Message = {
      text,
      timestamp: Date.now(),
      sender: 'me',
    };
    setMessages(prev => [...prev, newMessage]);

    // Optional: POST to server here (not implemented yet)
  };

  console.log('Users:', users);
  console.log('User:', user);
  console.log('Loading:', isLoading, 'Error:', isError);


  if (isLoading) return <div>Loading chat...</div>;
  if (isError || !user) return <div>Error loading user chat.</div>;

  return (
    <div className="w-full max-w-3xl h-full flex flex-col p-4">
      {/* Message list */}
      <div className="flex-1 overflow-y-auto space-y-2 pr-1">
        <MessageList messages={messages} />
      </div>

      {/* Input at bottom */}
      <div className="mt-4">
        <MessageInput onSend={handleSend} />
      </div>
    </div>

  );
}
