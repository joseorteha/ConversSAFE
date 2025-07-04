import React, { useState } from 'react';

interface CreateTeamModalProps {
  isOpen: boolean;
  onClose: () => void;
  onTeamCreated: (newTeam: any) => void;
  userId: number;
}

const API_URL = import.meta.env.VITE_API_URL;

const CreateTeamModal: React.FC<CreateTeamModalProps> = ({ isOpen, onClose, onTeamCreated, userId }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!name.trim()) {
      setError('El nombre del equipo es obligatorio.');
      return;
    }

    try {
      const response = await fetch(`${API_URL}/teams`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, description, userId }),
      });

      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.error || 'No se pudo crear el equipo.');
      }

      const newTeam = await response.json();
      onTeamCreated(newTeam);
      setName('');
      setDescription('');
      onClose();
    } catch (err: any) {
      setError(err.message);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-secondary p-6 rounded-lg shadow-xl w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4 text-text-light">Crear Nuevo Equipo</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="teamName" className="block text-sm font-medium text-text-dark mb-1">Nombre del Equipo</label>
            <input
              id="teamName"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-2 rounded bg-primary border border-gray-600 focus:ring-2 focus:ring-blue-500 focus:outline-none text-text-light"
              placeholder="Ej: Equipo de Marketing"
            />
          </div>
          <div className="mb-6">
            <label htmlFor="teamDescription" className="block text-sm font-medium text-text-dark mb-1">Descripción (Opcional)</label>
            <textarea
              id="teamDescription"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full p-2 rounded bg-primary border border-gray-600 focus:ring-2 focus:ring-blue-500 focus:outline-none text-text-light"
              rows={3}
              placeholder="¿Cuál es el propósito de este equipo?"
            />
          </div>
          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
          <div className="flex justify-end gap-4">
            <button type="button" onClick={onClose} className="py-2 px-4 rounded bg-gray-600 hover:bg-gray-700 transition-colors">
              Cancelar
            </button>
            <button type="submit" className="py-2 px-4 rounded bg-blue-600 hover:bg-blue-700 transition-colors font-semibold">
              Crear Equipo
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateTeamModal;
