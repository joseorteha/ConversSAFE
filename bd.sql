-- WARNING: This schema is for context only and is not meant to be run.
-- Table order and constraints may not be valid for execution.

CREATE TABLE public.ai_feedback (
  id integer NOT NULL DEFAULT nextval('ai_feedback_id_seq'::regclass),
  message_id integer,
  direct_message_id integer,
  feedback_type character varying,
  feedback_text text,
  created_at timestamp without time zone DEFAULT now(),
  CONSTRAINT ai_feedback_pkey PRIMARY KEY (id),
  CONSTRAINT ai_feedback_direct_message_id_fkey FOREIGN KEY (direct_message_id) REFERENCES public.direct_messages(id),
  CONSTRAINT ai_feedback_message_id_fkey FOREIGN KEY (message_id) REFERENCES public.messages(id)
);
CREATE TABLE public.channel_members (
  id integer NOT NULL DEFAULT nextval('channel_members_id_seq'::regclass),
  channel_id integer,
  user_id integer,
  joined_at timestamp without time zone DEFAULT now(),
  CONSTRAINT channel_members_pkey PRIMARY KEY (id),
  CONSTRAINT channel_members_channel_id_fkey FOREIGN KEY (channel_id) REFERENCES public.channels(id),
  CONSTRAINT channel_members_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id)
);
CREATE TABLE public.channels (
  id integer NOT NULL DEFAULT nextval('channels_id_seq'::regclass),
  team_id integer,
  name character varying NOT NULL,
  description text,
  is_private boolean DEFAULT false,
  created_at timestamp without time zone DEFAULT now(),
  CONSTRAINT channels_pkey PRIMARY KEY (id),
  CONSTRAINT channels_team_id_fkey FOREIGN KEY (team_id) REFERENCES public.teams(id)
);
CREATE TABLE public.direct_messages (
  id integer NOT NULL DEFAULT nextval('direct_messages_id_seq'::regclass),
  sender_id integer,
  receiver_id integer,
  content text NOT NULL,
  created_at timestamp without time zone DEFAULT now(),
  CONSTRAINT direct_messages_pkey PRIMARY KEY (id),
  CONSTRAINT direct_messages_receiver_id_fkey FOREIGN KEY (receiver_id) REFERENCES public.users(id),
  CONSTRAINT direct_messages_sender_id_fkey FOREIGN KEY (sender_id) REFERENCES public.users(id)
);
CREATE TABLE public.messages (
  id integer NOT NULL DEFAULT nextval('messages_id_seq'::regclass),
  channel_id integer,
  user_id integer,
  content text NOT NULL,
  created_at timestamp without time zone DEFAULT now(),
  CONSTRAINT messages_pkey PRIMARY KEY (id),
  CONSTRAINT messages_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id),
  CONSTRAINT messages_channel_id_fkey FOREIGN KEY (channel_id) REFERENCES public.channels(id)
);
CREATE TABLE public.team_members (
  id integer NOT NULL DEFAULT nextval('team_members_id_seq'::regclass),
  team_id integer,
  user_id integer,
  role character varying DEFAULT 'member'::character varying,
  joined_at timestamp without time zone DEFAULT now(),
  CONSTRAINT team_members_pkey PRIMARY KEY (id),
  CONSTRAINT team_members_team_id_fkey FOREIGN KEY (team_id) REFERENCES public.teams(id),
  CONSTRAINT team_members_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id)
);
CREATE TABLE public.teams (
  id integer NOT NULL DEFAULT nextval('teams_id_seq'::regclass),
  name character varying NOT NULL UNIQUE,
  description text,
  created_at timestamp without time zone DEFAULT now(),
  CONSTRAINT teams_pkey PRIMARY KEY (id)
);
CREATE TABLE public.users (
  id integer NOT NULL DEFAULT nextval('users_id_seq'::regclass),
  username character varying NOT NULL UNIQUE,
  email character varying NOT NULL UNIQUE,
  password_hash character varying NOT NULL,
  avatar_url text,
  created_at timestamp without time zone DEFAULT now(),
  CONSTRAINT users_pkey PRIMARY KEY (id)
);