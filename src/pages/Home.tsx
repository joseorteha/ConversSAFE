import React from 'react';
import { useNavigate } from 'react-router-dom';

const Home: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <h1 className="text-4xl font-bold mb-4 text-blue-700">Bienvenido a ConversSAFE</h1>
      <p className="text-lg text-gray-600 mb-6 max-w-xl text-center">
        Plataforma colaborativa con IA para equipos. Regístrate o inicia sesión para acceder a las funciones de chat, equipos y métricas inteligentes.
      </p>
      <button
        className="bg-blue-600 text-white px-6 py-2 rounded shadow hover:bg-blue-700 transition"
        onClick={() => navigate('/auth')}
      >
        Iniciar sesión / Registrarse
      </button>
    </div>
  );
};

export default Home;