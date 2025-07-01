import React from 'react';

interface ChatBoxProps {
  // Aquí puedes definir props en el futuro
}

const ChatBox: React.FC<ChatBoxProps> = () => {
  return (
    <div className="w-full max-w-xl mx-auto bg-white rounded shadow p-4">
      <h3 className="text-xl font-semibold mb-2">Chat Interno</h3>
      <div className="h-64 bg-gray-100 rounded mb-2 p-2 overflow-y-auto">
        {/* Aquí irán los mensajes */}
      </div>
      <input
        type="text"
        className="w-full border rounded px-3 py-2"
        placeholder="Escribe un mensaje..."
        disabled
      />
    </div>
  );
};

export default ChatBox; 