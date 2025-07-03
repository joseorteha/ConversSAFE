import AIInsights from '../components/AIInsights';
import Channelbar from '../components/ChannelBar';
import Messages from '../components/Messages';
import Sidebar from '../components/Sidebar';

const serverName = 'Servidor 1';
const channels = ['Team Prisma Bs. As.', 'Help Desk Team'];

const Chat = () => {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <Channelbar topics={channels} server={serverName} />
      <Messages channelName={channels[0]} />
      <AIInsights />
    </div>
  );
};

export default Chat;
