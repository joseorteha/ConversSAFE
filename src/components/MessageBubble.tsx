import React from 'react';

interface MessageBubbleProps {
  message: string;
  sender?: string;
}

const MessageBubble: React.FC<MessageBubbleProps> = ({ message, sender }) => {
  return (
    <div className="mb-2 flex flex-col">
      {sender && <span className="text-xs text-gray-500 mb-1">{sender}</span>}
      <div className="inline-block bg-blue-100 text-blue-800 px-4 py-2 rounded-lg max-w-xs">
        {message}
      </div>
    </div>
  );
};

export default MessageBubble; 