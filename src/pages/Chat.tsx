import AIInsights from '../components/AIInsights';
import Channelbar from '../components/ChannelBar';
import Messages from '../components/Messages';
import Sidebar from '../components/Sidebar';
import { useChatStore } from '../stores/chatStore';

const Chat = () => {
  const { workspace } = useChatStore();
  const serverName = workspace.name;
  const channelsName = workspace.channels.map((channel) => channel.name);

  return (
    <div className="flex h-screen w-screen">
      <Sidebar />
      <Channelbar topics={channelsName} server={serverName} />
      <Messages
        channel={workspace.channels[0]}
        messages={workspace.channels[0].messages}
      />
      <AIInsights />
    </div>
  );
};

export default Chat;
