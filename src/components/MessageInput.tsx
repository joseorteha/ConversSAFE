import React, { useState } from 'react';
import { BsPaperclip, BsFillSendFill } from 'react-icons/bs';

interface MessageInputProps {
  onSendMessage: (content: string) => void;
  disabled?: boolean;
}

const MessageInput: React.FC<MessageInputProps> = ({ onSendMessage, disabled }) => {
  const [message, setMessage] = useState('');

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      onSendMessage(message);
      setMessage('');
    }
  };

  return (
    <form onSubmit={handleSend} className="bg-gray-800 p-4 border-t border-gray-700">
      <div className="bg-gray-900 rounded-lg flex items-center px-4">
        <button type="button" className="text-gray-400 hover:text-white" disabled={disabled}>
          <BsPaperclip size={20} />
        </button>
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Escribe un mensaje..."
          disabled={disabled}
          className="flex-grow bg-transparent p-3 text-gray-200 placeholder-gray-500 focus:outline-none"
          autoComplete="off"
        />
        <button
          type="submit"
          className="text-gray-400 hover:text-white disabled:opacity-50"
          disabled={!message.trim() || disabled}
        >
          <BsFillSendFill size={20} />
        </button>
      </div>
    </form>
  );
};

export default MessageInput;
