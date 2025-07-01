import React from 'react';

const NotFound: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <h1 className="text-4xl font-bold text-red-500 mb-4">404</h1>
      <p className="text-lg text-gray-600">Página no encontrada</p>
    </div>
  );
};

export default NotFound; 