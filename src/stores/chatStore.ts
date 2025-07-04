import { create } from 'zustand';

const initialMembers: User[] = [
  { id: '1', name: 'Tú' },
  { id: '2', name: 'María' },
  { id: '3', name: 'Juan' },
  { id: '4', name: 'Ana' },
];

const initialMessages: Message[] = [
  {
    id: '1',
    sender: 'user',
    timestamp: new Date(new Date().getTime() - 6 * 60 * 1000),
    user: initialMembers[0],
    content: '¡Hola! ¿Cómo estás?',
    profilePicture: 'https://randomuser.me/api/portraits/men/94.jpg',
  },
  {
    id: '2',
    sender: 'user',
    timestamp: new Date(new Date().getTime() - 5 * 60 * 1000),
    user: initialMembers[1],
    content: '¡Hola! Estoy bien, gracias. ¿Y vos?',
    profilePicture: 'https://randomuser.me/api/portraits/women/2.jpg',
  },
  {
    id: '3',
    sender: 'user',
    timestamp: new Date(new Date().getTime() - 3 * 60 * 1000),
    user: initialMembers[0],
    content: 'Todo bien, gracias. ¿Qué tal tu día?',
    profilePicture: 'https://randomuser.me/api/portraits/men/94.jpg',
  },
  {
    id: '4',
    sender: 'user',
    timestamp: new Date(new Date().getTime() - 1 * 60 * 1000),
    user: initialMembers[1],
    content: 'Muy bien, he estado trabajando en un proyecto interesante.',
    profilePicture: 'https://randomuser.me/api/portraits/women/2.jpg',
  },
];

const workspace: Workspace = {
  id: '1',
  name: 'Workspace',
  channels: [
    {
      id: '1',
      name: 'Team Prisma Bs. As.',
      messages: initialMessages,
    },
    {
      id: '2',
      name: 'Help Desk Team',
      messages: initialMessages,
    },
  ],
  members: initialMembers,
};

const initialDMThreads: DMThread[] = [
  {
    userId: '2',
    messages: [
      {
        id: '1',
        sender: 'user',
        timestamp: new Date(new Date().getTime() - 10 * 60 * 1000),
        user: initialMembers[0],
        content: '¡Hola María! ¿Cómo estás?',
        profilePicture: 'https://randomuser.me/api/portraits/women/2.jpg',
      },
      {
        id: '2',
        sender: 'user',
        timestamp: new Date(new Date().getTime() - 9 * 60 * 1000),
        user: initialMembers[1],
        content: '¡Hola! Estoy bien, gracias. ¿Y vos?',
        profilePicture: 'https://randomuser.me/api/portraits/men/94.jpg',
      },
      {
        id: '3',
        sender: 'user',
        timestamp: new Date(new Date().getTime() - 8 * 60 * 1000),
        user: initialMembers[0],
        content: 'Todo bien, gracias. ¿Qué tal tu día?',
        profilePicture: 'https://randomuser.me/api/portraits/women/2.jpg',
      },
      {
        id: '4',
        sender: 'user',
        timestamp: new Date(new Date().getTime() - 7 * 60 * 1000),
        user: initialMembers[1],
        content: 'Muy bien, he estado trabajando en un proyecto interesante.',
        profilePicture: 'https://randomuser.me/api/portraits/women/2.jpg',
      },
    ],
  },
  {
    userId: '3',
    messages: [
      {
        id: '1',
        sender: 'user',
        timestamp: new Date(new Date().getTime() - 15 * 60 * 1000),
        user: initialMembers[0],
        content: '¡Hola Juan! ¿Cómo va todo?',
        profilePicture: 'https://randomuser.me/api/portraits/men/94.jpg',
      },
      {
        id: '2',
        sender: 'user',
        timestamp: new Date(new Date().getTime() - 14 * 60 * 1000),
        user: initialMembers[2],
        content: '¡Hola! Todo bien, gracias. ¿Y vos?',
        profilePicture: 'https://randomuser.me/api/portraits/men/4.jpg',
      },
      {
        id: '3',
        sender: 'user',
        timestamp: new Date(new Date().getTime() - 13 * 60 * 1000),
        user: initialMembers[0],
        content: 'Todo tranquilo, solo trabajando en algunos proyectos.',
        profilePicture: 'https://randomuser.me/api/portraits/men/94.jpg',
      },
      {
        id: '4',
        sender: 'user',
        timestamp: new Date(new Date().getTime() - 12 * 60 * 1000),
        user: initialMembers[2],
        content: 'Genial, yo también. ¿Qué estás haciendo?',
        profilePicture: 'https://randomuser.me/api/portraits/men/4.jpg',
      },
    ],
  },
];

export interface Message {
  id: string;
  sender: 'user' | 'ai';
  timestamp: Date;
  user: User;
  profilePicture?: string;
  content: string;
}

export interface Channel {
  id: string;
  name: string;
  messages: Message[];
}

export interface DMThread {
  userId: string; // La otra persona
  messages: Message[];
}

export interface Workspace {
  id: string;
  name: string;
  channels: Channel[];
  members: User[];
}

export interface User {
  id: string;
  name: string;
}

interface ChatState {
  workspace: Workspace;
  currentChannelId: string | null;

  dmThreads: DMThread[];
  currentDMUserId: string | null;

  // Actions
  setCurrentChannel: (channelId: string) => void;

  setCurrentDMUser: (userId: string) => void;

  sendMessageToChannel: (channelId: string, message: Message) => void;
  sendMessageToDM: (userId: string, message: Message) => void;
}

export const useChatStore = create<ChatState>((set) => ({
  workspace: workspace, // TODO: Load from API
  currentServerId: null,
  currentChannelId: null,

  dmThreads: initialDMThreads, // TODO: Load from API
  currentDMUserId: null,

  setCurrentChannel: (channelId) =>
    set(() => ({ currentChannelId: channelId, currentDMUserId: null })),

  setCurrentDMUser: (userId) =>
    set(() => ({ currentDMUserId: userId, currentChannelId: null })),

  sendMessageToChannel: (channelId, message) =>
    set((state) => ({
      workspace: {
        ...state.workspace,
        channels: state.workspace.channels.map((ch) =>
          ch.id === channelId
            ? { ...ch, messages: [...ch.messages, message] }
            : ch
        ),
      },
    })),

  sendMessageToDM: (userId, message) =>
    set((state) => {
      const existingThread = state.dmThreads.find((dm) => dm.userId === userId);
      if (existingThread) {
        return {
          dmThreads: state.dmThreads.map((dm) =>
            dm.userId === userId
              ? { ...dm, messages: [...dm.messages, message] }
              : dm
          ),
        };
      } else {
        return {
          dmThreads: [...state.dmThreads, { userId, messages: [message] }],
        };
      }
    }),
}));
