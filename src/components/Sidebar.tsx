import React from 'react';
import { NavLink } from 'react-router-dom';
import { BsChatDots, BsPeople, BsGraphUp } from 'react-icons/bs';

const Sidebar: React.FC = () => {
  return (
    <div className="fixed top-0 left-0 h-screen w-20 flex flex-col bg-tertiary text-white shadow-lg z-30">
      <div className="flex-grow mt-4">
        <SideBarIcon to="/chat" icon={<BsChatDots size="24" />} text="Mensajes Directos" />
        <SideBarIcon to="/teams" icon={<BsPeople size="24" />} text="Equipos" />
        <SideBarIcon to="/dashboard" icon={<BsGraphUp size="24" />} text="Dashboard" />
      </div>
      <div className="mb-4">
        <UserProfile />
      </div>
    </div>
  );
};

type SideBarIconProps = {
  icon: React.ReactNode;
  text: string;
  to: string;
};

const SideBarIcon: React.FC<SideBarIconProps> = ({ icon, text, to }) => (
  <NavLink
    to={to}
    className={({ isActive }) =>
      `relative flex items-center justify-center h-12 w-12 mt-2 mb-2 mx-auto bg-secondary hover:bg-accent rounded-3xl hover:rounded-xl transition-all duration-300 ease-linear cursor-pointer group ${
        isActive ? 'bg-accent !rounded-xl' : ''
      }`
    }
  >
    {icon}
    <span className="absolute w-auto p-2 m-2 min-w-max left-16 rounded-md shadow-md text-white bg-gray-900 text-xs font-bold transition-all duration-100 scale-0 origin-left group-hover:scale-100 z-50">
      {text}
    </span>
  </NavLink>
);

const UserProfile = () => (
    <div className="relative flex items-center justify-center h-12 w-12 mx-auto group">
        <img
            src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
            alt="User Avatar"
            className="w-10 h-10 rounded-full cursor-pointer"
        />
        <span className="absolute bottom-1 right-1 block h-3 w-3 bg-green-500 border-2 border-tertiary rounded-full"></span>
    </div>
);

export default Sidebar;
