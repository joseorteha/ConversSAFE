import React, { useEffect, useState, useRef } from 'react';
import TeamsPanel from '../components/TeamsPanel';
import CreateTeamModal from '../components/CreateTeamModal';
import CreateChannelModal from '../components/CreateChannelModal';
import ChatHeader from '../components/ChatHeader';
import MessageBubble from '../components/MessageBubble';
import MessageInput from '../components/MessageInput';
import AIAssistantPanel from '../components/AIAssistantPanel';

import { Team, Channel, Message, User } from '../types';

const API_URL = import.meta.env.VITE_API_URL;

// TODO: Este usuario debe venir del contexto de autenticación
const MOCK_USER: User = {
  id: 1, 
  username: 'Usuario de Prueba',
  email: 'test@example.com',
  avatar_url: `https://i.pravatar.cc/150?u=1`,
};

const Teams: React.FC = () => {
  const [teams, setTeams] = useState<Team[]>([]);
  const [selectedTeam, setSelectedTeam] = useState<Team | null>(null);
  const [channels, setChannels] = useState<Channel[]>([]);
  const [selectedChannel, setSelectedChannel] = useState<Channel | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState({ teams: true, channels: false, messages: false, analysis: false });
  const [aiAnalysis, setAiAnalysis] = useState<any>(null);
  const [isCreateTeamModalOpen, setCreateTeamModalOpen] = useState(false);
  const [isCreateChannelModalOpen, setCreateChannelModalOpen] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // Cargar equipos al inicio
  useEffect(() => {
    const userId = MOCK_USER.id;
    if (!userId) {
      setLoading(prev => ({ ...prev, teams: false }));
      return;
    }

    setLoading(prev => ({ ...prev, teams: true }));
    fetch(`${API_URL}/teams?userId=${userId}`)
      .then(res => {
        if (!res.ok) throw new Error('Error al cargar equipos');
        return res.json();
      })
      .then((data: Team[]) => {
        setTeams(data);
        if (data.length > 0) {
          setSelectedTeam(data[0]);
        }
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(prev => ({ ...prev, teams: false })));
  }, []);

  // Cargar canales cuando cambia el equipo seleccionado
  useEffect(() => {
    if (!selectedTeam) {
      setChannels([]);
      return;
    };
    setLoading(prev => ({ ...prev, channels: true, messages: true }));
    setMessages([]);
    setSelectedChannel(null);
    fetch(`${API_URL}/channels/team/${selectedTeam.id}`)
      .then(res => {
        if (!res.ok) throw new Error('Error al cargar canales');
        return res.json();
      })
      .then((data: Channel[]) => {
        setChannels(data);
        if (data.length > 0) {
          setSelectedChannel(data[0]);
        }
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(prev => ({ ...prev, channels: false })));
  }, [selectedTeam]);

  // Cargar mensajes cuando cambia el canal seleccionado
  useEffect(() => {
    if (!selectedChannel) {
      setMessages([]);
      return;
    }
    setLoading(prev => ({ ...prev, messages: true }));
    fetch(`${API_URL}/channels/${selectedChannel.id}/messages`)
      .then(res => {
        if (!res.ok) throw new Error('Error al cargar mensajes');
        return res.json();
      })
      .then((data: Message[]) => setMessages(data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(prev => ({ ...prev, messages: false })));
  }, [selectedChannel]);

  // Scroll al final cuando llegan nuevos mensajes
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Analizar el canal con IA cuando cambia
  useEffect(() => {
    if (!selectedChannel) {
      setAiAnalysis(null);
      return;
    }

    setLoading(prev => ({ ...prev, analysis: true }));
    setAiAnalysis(null); // Limpiar análisis anterior

    fetch(`${API_URL}/ai/analyze-channel`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ channelId: selectedChannel.id }),
    })
      .then(res => {
        if (!res.ok) throw new Error('Error al obtener el análisis de IA');
        return res.json();
      })
      .then(data => setAiAnalysis(data))
      .catch(err => {
        console.error(err);
        setAiAnalysis({ error: 'No se pudo cargar el análisis.' });
      })
      .finally(() => setLoading(prev => ({ ...prev, analysis: false })));

  }, [selectedChannel]);

  const handleSendMessage = (content: string) => {
    if (!selectedChannel || !content.trim()) return;

    const messageData = {
      userId: MOCK_USER.id,
      content: content.trim(),
    };

    fetch(`${API_URL}/channels/${selectedChannel.id}/messages`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(messageData),
    })
      .then(res => {
        if (!res.ok) {
          throw new Error('Error al enviar el mensaje');
        }
        return res.json();
      })
      .then((newMessage: Message) => {
        setMessages(prevMessages => [...prevMessages, newMessage]);
      })
      .catch(err => {
        console.error('Error al enviar el mensaje:', err);
      });
  };

  return (
    <div className="flex h-screen bg-gradient-to-br from-primary to-secondary text-text-light">
      <CreateTeamModal
        isOpen={isCreateTeamModalOpen}
        onClose={() => setCreateTeamModalOpen(false)}
        userId={MOCK_USER.id}
        onTeamCreated={(newTeam) => {
          setTeams(prevTeams => [...prevTeams, newTeam]);
          setSelectedTeam(newTeam);
        }}
      />

      <CreateChannelModal
        isOpen={isCreateChannelModalOpen}
        onClose={() => setCreateChannelModalOpen(false)}
        teamId={selectedTeam?.id || null}
        onChannelCreated={(newChannel) => {
          setChannels(prevChannels => [...prevChannels, newChannel]);
          setSelectedChannel(newChannel);
        }}
      />

      <TeamsPanel
        teams={teams}
        selectedTeam={selectedTeam}
        onSelectTeam={setSelectedTeam}
        channels={channels}
        selectedChannel={selectedChannel}
        onSelectChannel={setSelectedChannel}
        onAddTeam={() => setCreateTeamModalOpen(true)}
        onAddChannel={() => setCreateChannelModalOpen(true)}
        loading={loading}
      />

      <main className="flex-1 flex flex-col bg-white/80 rounded-l-3xl shadow-lg overflow-hidden">
        <ChatHeader channelName={selectedChannel?.name || 'Selecciona un canal'} />
        <div className="flex-1 overflow-y-auto p-6 space-y-3 bg-white/60">
          {loading.messages ? (
            <div className="text-center text-text-dark">Cargando mensajes...</div>
          ) : (
            messages.map((msg) => (
              <MessageBubble
                key={msg.id}
                isOwn={msg.sender.id === MOCK_USER.id}
                message={{
                  id: msg.id,
                  user: msg.sender.username,
                  avatar: msg.sender.avatar_url || `https://i.pravatar.cc/150?u=${msg.sender.id}`,
                  text: msg.content,
                  timestamp: new Date(msg.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                }}
              />
            ))
          )}
          <div ref={messagesEndRef} />
        </div>
        <div className="p-4 bg-white/90 border-t border-gray-200">
          <MessageInput onSendMessage={handleSendMessage} disabled={!selectedChannel || loading.messages} />
        </div>
      </main>

      <div className="w-96 bg-gradient-to-b from-accent to-accent-secondary p-6 flex flex-col justify-between rounded-r-3xl shadow-xl">
        <AIAssistantPanel analysis={aiAnalysis} isLoading={loading.analysis} />
      </div>
    </div>
  );
};

export default Teams;