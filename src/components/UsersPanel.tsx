import React from 'react';
import { BsPersonCircle } from 'react-icons/bs';
import { User } from '../types';



interface UsersPanelProps {
  users: User[];
  selectedUser: User | null;
  onSelectUser: (user: User) => void;
}

const UsersPanel: React.FC<UsersPanelProps> = ({ users, selectedUser, onSelectUser }) => {
  return (
    <aside className="w-80 bg-gray-800 text-gray-300 flex flex-col">
      <div className="p-4 border-b border-gray-700">
        <h2 className="text-xl font-semibold text-white">Mensajes Directos</h2>
      </div>
      <div className="flex-1 overflow-y-auto">
        <ul className="p-2">
          {users.map(user => (
            <li
              key={user.id}
              className={`flex items-center p-3 rounded-lg cursor-pointer transition-colors ${
                selectedUser?.id === user.id ? 'bg-gray-700' : 'hover:bg-gray-700/50'
              }`}
              onClick={() => onSelectUser(user)}
            >
              {user.avatar_url ? (
                <img src={user.avatar_url} alt={user.username} className="w-8 h-8 rounded-full mr-3" />
              ) : (
                <BsPersonCircle className="w-8 h-8 rounded-full mr-3" />
              )}
              <span className="font-medium">{user.username}</span>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
};

export default UsersPanel;
