export default function MessageList({ messages }: { messages: { text: string, timestamp: number, sender: string }[] }) {
  return (
    <ul className="space-y-2">
      {messages.map((msg, i) => {
        const time = new Date(msg.timestamp).toLocaleString('en-US', {
          hour: 'numeric',
          minute: 'numeric',
          hour12: true,
          day: 'numeric',
          month: 'short',
          year: 'numeric',
        });

        const isMe = msg.sender === 'me';

        return (
          <li
            key={i}
            className={`border rounded p-2 ${isMe ? 'bg-blue-50 text-right ml-auto' : 'bg-gray-100 text-left mr-auto'} max-w-[75%]`}
          >
            <div className={`${isMe ? 'text-blue-500' : 'text-gray-700'} font-semibold`}>
              {isMe ? 'You' : msg.sender}:
            </div>
            <div>{msg.text}</div>
            <div className="text-xs text-gray-500">{time}</div>
          </li>
        );
      })}
    </ul>
  );
}
