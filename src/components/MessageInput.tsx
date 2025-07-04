import { useState } from 'react';
import { BsPlusCircleFill } from 'react-icons/bs';

const MessageInput = ({ onSend }: { onSend: (arg0: string) => void }) => {
  const [input, setInput] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && input.trim() !== '') {
      onSend(input.trim());
      setInput('');
    }
  };

  return (
    <div
      className="flex flex-row items-center justify-between right-8 bottom-2 shadow-lg bg-gray-200 dark:bg-gray-600
    px-2 h-16"
    >
      <BsPlusCircleFill
        size="22"
        className="text-green-500 dark:shadow-lg mx-2 dark:text-primary"
      />
      <input
        className="font-semibold w-full ml-0 mr-auto cursor-text
    bg-transparent outline-none text-gray-500  dark:text-gray-400 placeholder-gray-500"
        type="text"
        placeholder="Ingresa un mensaje..."
        value={input}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
      />
    </div>
  );
};

export default MessageInput;
