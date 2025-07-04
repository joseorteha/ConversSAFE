export interface User {
  id: number;
  username: string;
  email: string;
  status?: string;
  avatar_url?: string;
}

export interface Team {
  id: number;
  name: string;
  description?: string;
  created_at: string;
}

export interface Channel {
  id: number;
  team_id: number;
  name: string;
  description?: string;
  is_private: boolean;
  created_at: string;
}

export interface Message {
  id: number;
  channel_id?: number;
  sender: User;
  content: string;
  created_at: string;
}
