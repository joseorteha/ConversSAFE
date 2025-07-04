import { create } from 'zustand';

interface User {
  id: string;
  name: string;
  profilePicture?: string;
  token: string; // JWT o API token
}

interface UserState {
  user: User | null;
  login: (user: User) => void;
  logout: () => void;
}

export const useUserStore = create<UserState>((set) => ({
  user: {
    id: '123',
    name: 'John Doe',
    token: '1234567890abcdef',
    profilePicture: 'https://randomuser.me/api/portraits/men/94.jpg',
  },
  login: (user) => set({ user }),
  logout: () => set({ user: null }),
}));
