import React, { useState } from 'react';

interface CreateChannelModalProps {
  isOpen: boolean;
  onClose: () => void;
  onChannelCreated: (newChannel: any) => void;
  teamId: number | null;
}

const API_URL = import.meta.env.VITE_API_URL;

const CreateChannelModal: React.FC<CreateChannelModalProps> = ({ isOpen, onClose, onChannelCreated, teamId }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [isPrivate, setIsPrivate] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!name.trim() || !teamId) {
      setError('El nombre del canal es obligatorio y debe haber un equipo seleccionado.');
      return;
    }

    try {
      const response = await fetch(`${API_URL}/channels`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, description, team_id: teamId, is_private: isPrivate }),
      });

      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.error || 'No se pudo crear el canal.');
      }

      const newChannel = await response.json();
      onChannelCreated(newChannel);
      setName('');
      setDescription('');
      setIsPrivate(false);
      onClose();
    } catch (err: any) {
      setError(err.message);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-secondary p-6 rounded-lg shadow-xl w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4 text-text-light">Crear Nuevo Canal</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="channelName" className="block text-sm font-medium text-text-dark mb-1">Nombre del Canal</label>
            <input
              id="channelName"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-2 rounded bg-primary border border-gray-600 focus:ring-2 focus:ring-blue-500 focus:outline-none text-text-light"
              placeholder="Ej: #anuncios-importantes"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="channelDescription" className="block text-sm font-medium text-text-dark mb-1">Descripción (Opcional)</label>
            <textarea
              id="channelDescription"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full p-2 rounded bg-primary border border-gray-600 focus:ring-2 focus:ring-blue-500 focus:outline-none text-text-light"
              rows={3}
              placeholder="¿Sobre qué tratará este canal?"
            />
          </div>
          <div className="mb-6">
            <label className="flex items-center gap-2 text-text-dark">
              <input
                type="checkbox"
                checked={isPrivate}
                onChange={(e) => setIsPrivate(e.target.checked)}
                className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              Canal Privado (solo por invitación)
            </label>
          </div>
          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
          <div className="flex justify-end gap-4">
            <button type="button" onClick={onClose} className="py-2 px-4 rounded bg-gray-600 hover:bg-gray-700 transition-colors">
              Cancelar
            </button>
            <button type="submit" className="py-2 px-4 rounded bg-blue-600 hover:bg-blue-700 transition-colors font-semibold">
              Crear Canal
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateChannelModal;
