-- Limpia las tablas existentes en el orden correcto para evitar problemas de claves foráneas
-- RESTART IDENTITY reinicia los contadores de ID, CASCADE elimina las dependencias.
TRUNCATE TABLE public.ai_feedback, public.direct_messages, public.messages, public.channel_members, public.team_members, public.users, public.channels, public.teams RESTART IDENTITY CASCADE;

-- Insertar nuevos usuarios
-- La contraseña para todos es 'password123'
INSERT INTO public.users (id, username, email, password_hash, avatar_url) VALUES
(1, 'Ana', 'ana@conversa.fe', '$2b$10$JdGAY.B2O5s7gL.xJ8l/..LhMOg0i.eO/D5EtJ2yF/uTj2b.z2jO', 'https://i.pravatar.cc/150?u=ana'),
(2, 'Bruno', 'bruno@conversa.fe', '$2b$10$JdGAY.B2O5s7gL.xJ8l/..LhMOg0i.eO/D5EtJ2yF/uTj2b.z2jO', 'https://i.pravatar.cc/150?u=bruno'),
(3, 'Carla', 'carla@conversa.fe', '$2b$10$JdGAY.B2O5s7gL.xJ8l/..LhMOg0i.eO/D5EtJ2yF/uTj2b.z2jO', 'https://i.pravatar.cc/150?u=carla');

-- Insertar equipos
INSERT INTO public.teams (id, name, description) VALUES
(1, 'Equipo Frontend', 'Dedicados a la interfaz y experiencia de usuario.'),
(2, 'Equipo Backend', 'Responsables de la API, base de datos y lógica del servidor.');

-- Asignar usuarios a los equipos
INSERT INTO public.team_members (user_id, team_id, role) VALUES
(1, 1, 'lead'), -- Ana es lead de Frontend
(2, 1, 'member'), -- Bruno es de Frontend
(2, 2, 'lead'), -- Bruno también es lead de Backend
(3, 2, 'member'); -- Carla es de Backend

-- Insertar canales para el Equipo Frontend
INSERT INTO public.channels (id, team_id, name, description, is_private) VALUES
(1, 1, 'general-frontend', 'Discusiones generales del equipo de frontend.', false),
(2, 1, 'bugs-frontend', 'Reporte y seguimiento de bugs visuales.', false);

-- Insertar canales para el Equipo Backend
INSERT INTO public.channels (id, team_id, name, description, is_private) VALUES
(3, 2, 'general-backend', 'Discusiones generales del equipo de backend.', false),
(4, 2, 'despliegues', 'Coordinación para los deploys a producción.', true);

-- Insertar mensajes de ejemplo en el canal 'bugs-frontend' (id=2) para simular una conversación
INSERT INTO public.messages (channel_id, user_id, content) VALUES
(2, 1, 'Hola equipo, estoy viendo un problema con el login en Safari, no redirecciona bien.'),
(2, 2, 'Yo también lo noté. Creo que es por el manejo de cookies de terceros que cambió en la última versión de Safari.'),
(2, 1, '¿Alguien tiene idea de cómo solucionarlo? Estoy un poco bloqueada con esto.'),
(2, 2, 'Podríamos intentar usar un proxy o cambiar el método de autenticación para esa plataforma. Lo investigo.'),
(2, 1, 'Genial, gracias Bruno. Pero, ¿quién se va a encargar de implementarlo? Tenemos que solucionarlo antes del viernes.'),
(2, 2, 'Uhm, no estoy seguro. Mi plato está bastante lleno con lo de la API de pagos.'),
(2, 1, 'Entiendo. Pero esto es crítico. La gente no puede entrar a la app.');

-- Mensajes en el canal 'general-frontend' (id=1)
INSERT INTO public.messages (channel_id, user_id, content) VALUES
(1, 1, 'Recuerden que mañana es la demo con el cliente. ¿Tenemos todo listo?'),
(1, 2, 'Casi... me falta pulir las animaciones del nuevo dashboard.');

-- Mensajes en el canal 'despliegues' (id=4)
INSERT INTO public.messages (channel_id, user_id, content) VALUES
(4, 2, '@Carla, ¿está lista la migración de la base de datos para el deploy de esta noche?'),
(4, 3, 'Sí, todo listo. Corrí los scripts en staging y funcionó perfecto. Podemos proceder a las 10pm.');
