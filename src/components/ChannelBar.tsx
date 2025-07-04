import { BsPeople } from 'react-icons/bs';

type ChannelBarProps = {
  server: string;
  topics?: string[];
};

function ChannelBar({ server, topics }: ChannelBarProps) {
  return (
    <div className="w-80 h-auto m-0 ml-16 bg-gray-200 dark:bg-gray-800 overflow-hidden shadow-lg">
      <ChannelBlock serverName={server} />
      <div className="flex flex-col justify-start p-1 m-0">
        <div>
          {topics && topics.map((topic) => <Topic topic={topic} key={topic} />)}
        </div>
      </div>
    </div>
  );
}

const ChannelBlock = ({ serverName }: { serverName: string }) => (
  <div className="flex items-center justify-center h-16 m-0 p-0">
    <h5
      className="text-lg tracking-wider font-bold
    text-gray-600 dark:text-gray-400
    mr-auto my-auto ml-4 align-middle"
    >
      {serverName}
    </h5>
  </div>
);

const Topic = ({ topic }: { topic: string }) => (
  <div
    className="flex flex-row gap-4 justify-between mt-1 w-full ml-2 transition duration-300 ease-in-out
    cursor-pointer"
  >
    <BsPeople size="24" className="text-gray-400" />
    <h5
      className="text-gray-500 font-semibold tracking-wide
    mr-auto transition duration-300 ease-in-out
  hover:text-pink-500 dark:hover:text-gray-500 cursor-pointer"
    >
      {topic}
    </h5>
  </div>
);

export default ChannelBar;
