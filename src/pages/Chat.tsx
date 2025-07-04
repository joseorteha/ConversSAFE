import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { BrainCircuit } from 'lucide-react';
import UsersPanel from '../components/UsersPanel';
import ChatHeader from '../components/ChatHeader';
import MessageBubble from '../components/MessageBubble';
import type { User, DirectMessage } from '../types';

const API_URL = import.meta.env.VITE_API_URL;



const Chat: React.FC = () => {
  const navigate = useNavigate();

  // States
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [messages, setMessages] = useState<DirectMessage[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [aiSuggestion, setAiSuggestion] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [loading, setLoading] = useState({ users: true, messages: false });
  
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Effect for authenticating user
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const userData = JSON.parse(storedUser);
      setCurrentUser(userData);
    } else {
      navigate('/auth');
    }
  }, [navigate]);

  // Effect to load all users once the current user is authenticated
  useEffect(() => {
    if (!currentUser) return;

    setLoading(prev => ({ ...prev, users: true }));
    fetch(`${API_URL}/users`)
      .then(res => res.json())
      .then((data: User[]) => {
        const otherUsers = data.filter(u => u.id !== currentUser.id);
        setUsers(otherUsers);
        if (otherUsers.length > 0 && !selectedUser) {
          setSelectedUser(otherUsers[0]);
        }
      })
      .catch(err => console.error('Error al cargar usuarios:', err))
      .finally(() => setLoading(prev => ({ ...prev, users: false })));
  }, [currentUser, selectedUser]);

  // Effect to load messages when a user is selected
  useEffect(() => {
    if (!selectedUser || !currentUser) return;
    if (!currentUser.id || !selectedUser.id) {
      console.error('Uno de los IDs de usuario es inválido:', currentUser, selectedUser);
      return;
    }

    // DEBUG: Verifica los IDs antes de la petición
    console.log('Cargando mensajes directos:', {
      currentUserId: currentUser.id,
      selectedUserId: selectedUser.id,
      currentUser,
      selectedUser
    });

    const fetchDirectMessages = async () => {
      setLoading(prev => ({ ...prev, messages: true }));
      try {
        const response = await fetch(`${API_URL}/direct_messages?user1=${currentUser.id}&user2=${selectedUser.id}`);
        if (!response.ok) {
          throw new Error(`Error del servidor: ${response.status}`);
        }
        const data = await response.json();
        if (Array.isArray(data)) {
          setMessages(data);
        } else {
          console.error('La respuesta de la API no es un array:', data);
          setMessages([]);
        }
      } catch (err) {
        console.error('Error al cargar mensajes:', err);
        setMessages([]);
      } finally {
        setLoading(prev => ({ ...prev, messages: false }));
      }
    };
    
    fetchDirectMessages();
    setAiSuggestion(null);
  }, [selectedUser, currentUser]);

  // Effect to scroll to the bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Handler to send a new message
  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || !selectedUser || !currentUser) return;

    const content = newMessage.trim();
    setNewMessage('');

    try {
      const response = await fetch(`${API_URL}/direct_messages`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sender_id: currentUser.id, receiver_id: selectedUser.id, content }),
      });
      const createdMessage = await response.json();
      setMessages(prev => [...prev, createdMessage]);
    } catch (err) {
      console.error('Error al enviar mensaje:', err);
    }
  };

  // Handler to request AI analysis
  const handleAnalyzeConversation = async () => {
    if (!messages.length || !currentUser || !selectedUser) return;
    
    setIsAnalyzing(true);
    setAiSuggestion(null);

    const formattedMessages = messages.map(msg => ({
      content: msg.content,
      sender: msg.sender_id === currentUser.id ? currentUser.username : selectedUser.username,
    }));

    try {
      const response = await fetch(`${API_URL}/ai/analyze`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: formattedMessages }),
      });

      if (!response.ok) throw new Error('La respuesta de la red no fue correcta');

      const data = await response.json();
      if (data.suggestion) {
        setAiSuggestion(data.suggestion);
      }
    } catch (error) {
      console.error('Error al analizar la conversación:', error);
      setAiSuggestion('No se pudo obtener una sugerencia de la IA.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  if (!currentUser) {
    return <div className="flex h-screen items-center justify-center bg-primary text-text-light">Cargando...</div>;
  }

  return (
    <div className="flex h-screen bg-gradient-to-br from-primary to-secondary text-text-light">
      <UsersPanel users={users} selectedUser={selectedUser} onSelectUser={(user) => setSelectedUser(user)} />
      <main className="flex-1 flex flex-col bg-white/80 rounded-l-3xl shadow-lg overflow-hidden">
        {selectedUser ? (
          <>
            <ChatHeader channelName={selectedUser.username} isDirectMessage />
            <div className="flex-1 p-6 overflow-y-auto space-y-4 bg-white/60">
              {aiSuggestion && (
                <div className="bg-blue-900/50 border-l-4 border-blue-400 text-text-light p-4 mb-4 rounded-r-lg shadow-md flex items-start animate-fade-in">
                  <BrainCircuit className="h-6 w-6 mr-3 flex-shrink-0 text-blue-400" />
                  <div className="flex-grow">
                    <p className="font-bold text-blue-300">Sugerencia del Asistente</p>
                    <p>{aiSuggestion}</p>
                  </div>
                </div>
              )}
              {loading.messages && (
                <div className="text-center text-text-dark">Cargando mensajes...</div>
              )}
              {!loading.messages && Array.isArray(messages) && messages.map(msg => (
                <MessageBubble
                  key={msg.id}
                  message={{
                    id: msg.id,
                    user: msg.sender?.username ?? 'Usuario Desconocido',
                    avatar: msg.sender?.avatar_url || 'https://randomuser.me/api/portraits/lego/1.jpg',
                    text: msg.content,
                    timestamp: new Date(msg.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                  }}
                  isOwn={msg.sender_id === currentUser.id}
                />
              ))}
              <div ref={messagesEndRef} />
            </div>
            <div className="p-4 bg-white/90 border-t border-gray-200">
              <form onSubmit={handleSendMessage} className="flex items-center space-x-2">
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="Escribe un mensaje..."
                  className="flex-1 p-3 rounded-lg bg-input text-text-light focus:outline-none focus:ring-2 focus:ring-accent border border-gray-300"
                />
                <button
                  type="button"
                  onClick={handleAnalyzeConversation}
                  disabled={isAnalyzing || messages.length === 0}
                  className="bg-accent text-white p-2 rounded-lg hover:bg-purple-600 disabled:bg-purple-800 disabled:cursor-not-allowed flex items-center transition-colors"
                >
                  {isAnalyzing ? (
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  ) : (
                    <BrainCircuit className="h-5 w-5" />
                  )}
                </button>
                <button type="submit" className="bg-accent-secondary text-white p-2 rounded-lg hover:bg-blue-600 transition-colors">
                  Enviar
                </button>
              </form>
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-text-dark">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-24 w-24 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
            <p className="mt-4 text-lg">Selecciona un usuario para comenzar a chatear.</p>
          </div>
        )}
      </main>
    </div>
  );
};

export default Chat;
