import React, { useEffect, useState } from 'react';
import MainLayout from '../layout/MainLayout';

const API_URL = 'http://localhost:3001';
const USER_ID = 1; // TODO: Reemplazar por el id del usuario autenticado

const estados = [
  { value: 'activo', label: 'Activo' },
  { value: 'ausente', label: 'Ausente' },
  { value: 'desconectado', label: 'Desconectado' },
];

const Profile: React.FC = () => {
  const [user, setUser] = useState<any>(null);
  const [editModal, setEditModal] = useState(false);
  const [editData, setEditData] = useState({ username: '', email: '', avatar_url: '' });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch(`${API_URL}/users/${USER_ID}`)
      .then(res => res.json())
      .then(data => {
        setUser(data);
        setEditData({ username: data.username, email: data.email, avatar_url: data.avatar_url || '' });
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const handleSave = async () => {
    setSaving(true);
    setError(null);
    try {
      const res = await fetch(`${API_URL}/users/${USER_ID}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...editData, status: user.status }),
      });
      if (!res.ok) throw new Error('Error al guardar cambios');
      const updated = await res.json();
      setUser(updated);
      setEditModal(false);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  const handleStatusChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newStatus = e.target.value;
    setUser((u: any) => ({ ...u, status: newStatus }));
    try {
      await fetch(`${API_URL}/users/${USER_ID}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...user, status: newStatus }),
      });
    } catch {}
  };

  if (loading) return <MainLayout><div className="text-center mt-10">Cargando perfil...</div></MainLayout>;
  if (!user) return <MainLayout><div className="text-center mt-10 text-red-500">No se pudo cargar el perfil.</div></MainLayout>;

  return (
    <MainLayout>
      <div className="max-w-xl mx-auto mt-10 bg-white rounded shadow p-8">
        <div className="flex items-center gap-4 mb-6">
          <img src={user.avatar_url || 'https://randomuser.me/api/portraits/men/1.jpg'} alt="avatar" className="w-20 h-20 rounded-full border" />
          <div>
            <div className="text-2xl font-bold">{user.username}</div>
            <div className="text-gray-500">{user.email}</div>
            <div className="mt-2">
              <select value={user.status} onChange={handleStatusChange} className="border rounded px-2 py-1">
                {estados.map(e => <option key={e.value} value={e.value}>{e.label}</option>)}
              </select>
              <span className="ml-2 text-sm text-gray-400">Estado</span>
            </div>
          </div>
        </div>
        <button className="px-4 py-2 bg-blue-600 text-white rounded" onClick={() => setEditModal(true)}>
          Editar perfil
        </button>
        {/* Modal de edición */}
        {editModal && (
          <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
            <div className="bg-white rounded shadow-lg p-8 w-full max-w-md relative">
              <button className="absolute top-2 right-2 text-gray-400 hover:text-gray-700" onClick={() => setEditModal(false)}>&times;</button>
              <h2 className="text-xl font-bold mb-4">Editar perfil</h2>
              {error && <div className="text-red-500 mb-2">{error}</div>}
              <div className="mb-4">
                <label className="block mb-1">Nombre de usuario</label>
                <input className="border rounded px-3 py-2 w-full" value={editData.username} onChange={e => setEditData({ ...editData, username: e.target.value })} />
              </div>
              <div className="mb-4">
                <label className="block mb-1">Email</label>
                <input className="border rounded px-3 py-2 w-full" value={editData.email} onChange={e => setEditData({ ...editData, email: e.target.value })} />
              </div>
              <div className="mb-4">
                <label className="block mb-1">Avatar URL</label>
                <input className="border rounded px-3 py-2 w-full" value={editData.avatar_url} onChange={e => setEditData({ ...editData, avatar_url: e.target.value })} />
              </div>
              <button className="px-4 py-2 bg-blue-600 text-white rounded" onClick={handleSave} disabled={saving}>
                {saving ? 'Guardando...' : 'Guardar'}
              </button>
            </div>
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default Profile; 