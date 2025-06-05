import { useQuery } from '@tanstack/react-query';

type Message = {
  text: string;
  timestamp: number;
  sender: string;
};

type User = {
  id: string;
  name: string;
  icon: string;
  messages: Message[];
  role: 'human' | 'ai'; 
};

const API_URL = 'http://localhost:3000';

/** Fetch all users */
export function useUsers() {
  return useQuery<User[]>({
    queryKey: ['users'],
    queryFn: async () => {
      const res = await fetch(`${API_URL}/users`);
      if (!res.ok) throw new Error('Failed to fetch users');
      return res.json();
    },
  });
}
