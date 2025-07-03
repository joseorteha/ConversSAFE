import { BsPlus, BsHouse, BsPeople, BsChatDots } from 'react-icons/bs';

const Sidebar = () => {
  return (
    <div>
      <div className="fixed top-0 left-0 h-screen w-16 flex flex-col shadow-lg bg-gray-400 dark:bg-gray-950">
        <SideBarIcon icon={<BsHouse size="28" />} text="Home" />
        <Divider />
        <SideBarIcon icon={<BsChatDots size="20" />} text="Mensajes Directos" />
        <SideBarIcon icon={<BsPeople size="20" />} text="Workspace" />
        <Divider />
        <SideBarIcon icon={<BsPlus size="32" />} text="Nuevo Servidor" />
      </div>
      <UserProfile />
    </div>
  );
};

type SideBarIconProps = {
  icon: React.ReactNode;
  text?: string;
};

const SideBarIcon = ({ icon, text = 'test' }: SideBarIconProps) => (
  <div
    className="relative flex items-center justify-center h-12 w-12 mt-2 mb-2 mx-auto
    bg-gray-200 hover:bg-green-600 dark:bg-gray-800 text-green-600 hover:text-white 
    rounded-xl transition-all duration-300 ease-linear cursor-pointer shadow-lg group"
  >
    {icon}
    <span
      className="absolute w-auto p-2 m-2 min-w-max left-14 
    text-white bg-gray-900 text-xs font-bold
    rounded-md shadow-md transition-all duration-300 scale-0 origin-left group-hover:scale-100"
    >
      {text}
    </span>
  </div>
);

const UserProfile = () => (
  <div className="fixed bottom-0 left-0 w-16 h-16 flex items-center justify-center">
    <img
      src="https://randomuser.me/api/portraits/men/94.jpg"
      alt="User Avatar"
      className="w-12 h-12 rounded-lg"
    />
  </div>
);

const Divider = () => (
  <hr className="bg-gray-200 dark:bg-gray-800 border border-gray-200 dark:border-gray-800 mx-2" />
);

export default Sidebar;
