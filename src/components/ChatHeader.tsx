import React from 'react';
import { BsSearch, BsPinAngle, BsFileEarmark, BsHash } from 'react-icons/bs';

interface ChatHeaderProps {
  channelName: string;
  isDirectMessage?: boolean;
}

const ChatHeader: React.FC<ChatHeaderProps> = ({ channelName, isDirectMessage }) => {
  return (
    <div className="h-16 bg-secondary border-b border-border-color px-6 flex items-center justify-between">
      {/* Channel Name */}
      <div>
        <div className="flex items-center">
          {isDirectMessage ? (
            <span className="w-3 h-3 bg-green-500 rounded-full mr-3"></span>
          ) : (
            <BsHash className="text-gray-500 mr-2" size={24} />
          )}
          <h2 className="text-lg font-bold text-text-light">{channelName}</h2>
        </div>
        <p className="text-sm text-text-dark">Team Prisma Bs. As.</p>
      </div>

      {/* Action Buttons & Search */}
      <div className="flex items-center space-x-6">
        <button className="flex items-center space-x-2 text-text-dark hover:text-text-light">
          <BsFileEarmark size={18} />
          <span>Archivos</span>
        </button>
        <button className="flex items-center space-x-2 text-text-dark hover:text-text-light">
          <BsPinAngle size={18} />
          <span>Pins</span>
        </button>
        <div className="relative">
          <input
            type="text"
            placeholder="Buscar mensaje..."
            className="bg-primary rounded-lg pl-10 pr-4 py-2 text-text-dark placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-accent"
          />
          <BsSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
        </div>
      </div>
    </div>
  );
};

export default ChatHeader;

