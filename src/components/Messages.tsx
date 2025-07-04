import { useChatStore, type Channel, type Message } from '../stores/chatStore';
import { useUserStore } from '../stores/userStore';
import ChatHeader from './ChatHeader';
import MessageInput from './MessageInput';

type MessagesProps = {
  channel: Channel;
  messages: Message[];
};

function Messages({ channel, messages }: MessagesProps) {
  const { sendMessageToChannel } = useChatStore();
  const { user } = useUserStore();

  const handleSendMessage = (message: string) => {
    sendMessageToChannel(channel.id, {
      id: crypto.randomUUID(),
      content: message,
      timestamp: new Date(),
      user: {
        id: user?.id || '0',
        name: user?.name || 'anónimo',
      },
      profilePicture: user?.profilePicture, // Replace with actual profile picture URL
      sender: 'user',
    });
  };

  return (
    <div
      className="flex flex-col h-full w-full m-0
    bg-gray-300 dark:bg-gray-700 overflow-hidden"
    >
      <ChatHeader channelName={channel.name} />
      <div
        className="flex flex-col w-full h-full justify-end
    ml-0 overflow-auto scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-gray-300 dark:scrollbar-thumb-gray-600 dark:scrollbar-track-gray-800"
      >
        {messages.map((msg) => (
          <Post
            key={msg.id}
            name={msg.user.name === user?.name ? 'Tú' : msg.user.name}
            timestamp={msg.timestamp.toLocaleTimeString([], {
              hour: '2-digit',
              minute: '2-digit',
            })}
            profilePicture={msg.profilePicture}
            text={msg.content}
          />
        ))}
      </div>
      <MessageInput onSend={handleSendMessage} />
    </div>
  );
}

type PostProps = {
  name: string;
  timestamp: string;
  text: string;
  profilePicture?: string;
};

const Post = ({ name, timestamp, text, profilePicture }: PostProps) => {
  return (
    <div className="w-full flex flex-row py-1 my-3 px-8 m-0 cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-500 transition-all duration-300 ease-in-out">
      <div className="flex flex-col items-center w-12 m-0">
        <img
          src={profilePicture}
          alt="avatar"
          className="flex-none w-12 h-full mt-0 mx-0 object-cover 
    bg-gray-100 rounded-full shadow-md cursor-pointer"
        />
      </div>

      <div className="w-4/5 flex flex-col justify-start ml-10">
        <p className="text-left mr-2 font-semibold text-gray-800 dark:text-white cursor-pointer">
          {name}
          <small className="text-xs text-left font-semibold text-gray-600 dark:text-gray-500 ml-2">
            {timestamp}
          </small>
        </p>
        <p className="text-lg text-left text-gray-800 dark:text-white mr-auto whitespace-normal">
          {text}
        </p>
      </div>
    </div>
  );
};

export default Messages;
