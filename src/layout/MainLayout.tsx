import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar';

const MainLayout: React.FC = () => {
  return (
    <div className="flex h-screen bg-primary text-text-light">
      <Sidebar />
      <div className="ml-20 w-full">
        <Outlet />
      </div>
    </div>
  );
};

export default MainLayout;