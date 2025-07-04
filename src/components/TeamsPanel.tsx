import React from 'react';
import { Team, Channel } from '../types';
import { Hash, PlusCircle, Users, Loader } from 'lucide-react';

interface TeamsPanelProps {
  teams: Team[];
  channels: Channel[];
  selectedTeam: Team | null;
  selectedChannel: Channel | null;
  onSelectTeam: (team: Team) => void;
  onSelectChannel: (channel: Channel) => void;
  onAddTeam: () => void;
  onAddChannel: () => void;
  loading: {
    teams: boolean;
    channels: boolean;
  };
}

const TeamsPanel: React.FC<TeamsPanelProps> = ({ 
  teams, 
  channels, 
  selectedTeam, 
  selectedChannel, 
  onSelectTeam, 
  onSelectChannel,
  onAddTeam,
  onAddChannel,
  loading 
}) => {
  return (
    <aside className="w-64 bg-secondary flex flex-col">
      <div className="p-4 border-b border-gray-700">
        <h1 className="text-xl font-bold text-text-light">ConverSAFE</h1>
      </div>

      {/* Teams List */}
      <div className="flex-1 overflow-y-auto p-4">
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-lg font-semibold text-text-light">Equipos</h2>
          <button onClick={onAddTeam} className="text-gray-400 hover:text-white">
            <PlusCircle size={20} />
          </button>
        </div>
        {loading.teams ? (
          <div className="flex justify-center items-center p-4"><Loader className="animate-spin"/></div>
        ) : (
          <ul>
            {teams.map(team => (
              <li key={team.id} 
                  onClick={() => onSelectTeam(team)} 
                  className={`flex items-center gap-2 p-2 rounded-md cursor-pointer ${selectedTeam?.id === team.id ? 'bg-accent text-white' : 'hover:bg-primary'}`}>
                <Users size={18} />
                <span>{team.name}</span>
              </li>
            ))}
          </ul>
        )}

        {/* Channels List */}
        {selectedTeam && (
          <div className="mt-6">
            <div className="flex justify-between items-center mb-2">
              <h2 className="text-lg font-semibold text-text-light">Canales</h2>
              <button onClick={onAddChannel} className="text-gray-400 hover:text-white">
                <PlusCircle size={20} />
              </button>
            </div>
            {loading.channels ? (
              <div className="flex justify-center items-center p-4"><Loader className="animate-spin"/></div>
            ) : (
              <ul>
                {channels.map(channel => (
                  <li key={channel.id} 
                      onClick={() => onSelectChannel(channel)} 
                      className={`flex items-center gap-2 p-2 rounded-md cursor-pointer ${selectedChannel?.id === channel.id ? 'bg-accent text-white' : 'hover:bg-primary'}`}>
                    <Hash size={18} />
                    <span>{channel.name}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}
      </div>
    </aside>
  );
};

export default TeamsPanel;

