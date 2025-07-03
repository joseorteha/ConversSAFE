import { FaSearch, FaHashtag, FaRegBell, FaMoon, FaSun } from 'react-icons/fa';
import useDarkMode from '../hooks/darkMode';

function ChatHeader({ channelName }: { channelName: string }) {
  return (
    <div
      className="flex flex-row items-center justify-evenly w-full h-16 m-0
    bg-gray-300 dark:bg-gray-700 bg-opacity-90 shadow-lg"
    >
      <FaHashtag
        size="20"
        className="text-lg tracking-wider ml-2 my-auto font-semibold text-gray-500"
      />
      <h5
        className="text-xl text-gray-500 tracking-wider font-semibold text-opacity-80 
    mr-auto ml-2 my-auto transition duration-300 ease-in-out"
      >
        {channelName}
      </h5>
      <ThemeIcon />
      <Search />
      <FaRegBell
        size="24"
        className="mr-3 ml-4 text-gray-500 transition duration-300 ease-in-out hover:text-pink-400 cursor-pointer "
      />
    </div>
  );
}

const ThemeIcon = () => {
  const [darkTheme, setDarkTheme] = useDarkMode();
  const handleMode = () => setDarkTheme(!darkTheme);
  return (
    <span onClick={handleMode}>
      {darkTheme ? (
        <FaSun
          size="24"
          className="mr-3 ml-4 text-gray-500 transition duration-300 ease-in-out hover:text-pink-400 cursor-pointer"
        />
      ) : (
        <FaMoon
          size="24"
          className="mr-3 ml-4 text-gray-500 transition duration-300 ease-in-out hover:text-pink-400 cursor-pointer"
        />
      )}
    </span>
  );
};

const Search = () => (
  <div
    className="w-1/5 flex items-center justify-start 
    bg-gray-400 dark:bg-gray-600 text-gray-500 rounded-md shadow-md
    px-2 h-9 ml-0 mr-0 transition duration-300 ease-in-out"
  >
    <input
      className="w-full font-sans font-semibold bg-transparent outline-none
    text-gray-500 placeholder-gray-500 pl-1 rounded"
      type="text"
      placeholder="Buscar..."
    />
    <FaSearch size="18" className=" my-auto" />
  </div>
);

export default ChatHeader;
