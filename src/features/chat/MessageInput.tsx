import { useState } from 'react';
import { Button } from '@/components/ui/button';

type MessageInputProps = {
  onSend: (message: string) => void;
};

export default function MessageInput({ onSend }: MessageInputProps) {
  const [value, setValue] = useState('');
  return (
    <form onSubmit={e => {
      e.preventDefault();
      console.log('Sending message:', value);
      onSend(value);
      setValue('');
    }} className="flex justify-between items-center">
      <input value={value} onChange={e => setValue(e.target.value)} name="message" className="w-full border-2" />
      <Button type="submit">Send</Button>
    </form>
  );
}