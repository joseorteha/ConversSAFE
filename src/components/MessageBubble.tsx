import React from 'react';

interface Message {
  id: number;
  user: string;
  avatar: string;
  text: string;
  timestamp: string;
}

interface MessageBubbleProps {
  message: Message;
  isOwn: boolean;
}

const MessageBubble: React.FC<MessageBubbleProps> = ({ message, isOwn }) => {
  return (
    <div className={`flex items-start gap-4 ${isOwn ? 'justify-end' : ''}`}>
      {!isOwn && <img src={message.avatar} alt={message.user} className="w-10 h-10 rounded-full" />}
      <div className={`flex flex-col ${isOwn ? 'items-end' : 'items-start'}`}>
        <div className="flex items-center gap-2 mb-1">
          {!isOwn && <span className="font-semibold text-gray-300">{message.user}</span>}
          <span className="text-xs text-gray-500">{message.timestamp}</span>
        </div>
        <div
          className={`max-w-lg p-3 rounded-lg ${
            isOwn ? 'bg-blue-600 rounded-br-none' : 'bg-gray-700 rounded-bl-none'
          }`}>
          <p className="text-white">{message.text}</p>
        </div>
      </div>
      {isOwn && <img src={message.avatar} alt={message.user} className="w-10 h-10 rounded-full" />}
    </div>
  );
};

export default MessageBubble;