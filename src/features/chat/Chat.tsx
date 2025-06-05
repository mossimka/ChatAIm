import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import MessageList from './MessageList';
import MessageInput from './MessageInput';
import { useUsers } from '../../shared/use-users';

interface Message {
  text: string;
  timestamp: number;
  sender: string;
}

export function Chat() {
  const { userId } = useParams<{ userId: string }>();
  const parsedUserId = Number(userId);
  const { data: users, isLoading, isError } = useUsers();
  console.log("userId:", userId);
  console.log("parsedUserId:", parsedUserId);
  console.log("users:", users);

  const user = users?.find(u => Number(u.id) === parsedUserId);
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    if (user) {
      setMessages(user.messages);
    }
  }, [user]);

  const handleSend = async (text: string) => {
    const newMessage: Message = {
      text,
      timestamp: Date.now(),
      sender: 'me',
    };

    const updatedMessages = [...messages, newMessage];
    setMessages(updatedMessages);

    try {
      const res = await fetch(`http://localhost:3000/users/${parsedUserId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ messages: updatedMessages }),
      });

      if (!res.ok) {
        throw new Error('Failed to update messages');
      }

      console.log('Message saved to db.json');
    } catch (err) {
      console.error('Error saving message:', err);
    }
  };

  if (isLoading) return <div>Loading chat...</div>;
  if (isError || !user) return <div>Error loading user chat.</div>;

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
