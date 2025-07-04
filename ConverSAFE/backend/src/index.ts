// Importaciones estándar
import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import bcrypt from 'bcrypt';

// Importaciones de la aplicación
import { pool } from './db';
import teamsRoutes from './routes/teamsRoutes';
import channelsRoutes from './routes/channelsRoutes';
import messagesRoutes from './routes/messages';
import aiRoutes from './routes/aiRoutes';

// Función principal para encapsular el arranque del servidor
const startServer = async () => {
  try {
    // Probar la conexión a la base de datos al inicio
    await pool.query('SELECT NOW()');
    console.log('[SUCCESS] Conexión a la base de datos establecida.');

    const app = express();
    const PORT = process.env.PORT || 3001;

    // Configuración de Middlewares
    app.use(cors());
    app.use(express.json());

    // Rutas de la API (con prefijo /api para consistencia)
    app.use('/api/teams', teamsRoutes);
    app.use('/api/channels', channelsRoutes);
    app.use('/api/messages', messagesRoutes);
    app.use('/api/ai', aiRoutes);

    app.get('/api', (_req: Request, res: Response) => {
      res.send('Backend de ConversSAFE funcionando!');
    });

    app.get('/api/users', async (_req: Request, res: Response, _next: NextFunction) => {
      try {
        const result = await pool.query('SELECT id, username, email FROM users');
        res.json(result.rows);
      } catch (error) {
        console.error('Error al obtener usuarios:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
      }
    });

    app.get('/api/users/:id', async (req: Request<{ id: string }>, res: Response, _next: NextFunction) => {
        try {
            const { id } = req.params;
            const result = await pool.query('SELECT id, username, email, avatar_url, status FROM users WHERE id = $1', [id]);
            if (result.rows.length === 0) {
              return res.status(404).json({ error: 'Usuario no encontrado' });
            }
            res.json(result.rows[0]);
        } catch (error) {
            console.error(`Error al obtener usuario ${req.params.id}:`, error);
            res.status(500).json({ error: 'Error interno del servidor' });
        }
    });

    app.post('/api/register', async (req: Request, res: Response, _next: NextFunction) => {
        try {
            const { username, email, password } = req.body;

            // Encriptar la contraseña
            const saltRounds = 10;
            const password_hash = await bcrypt.hash(password, saltRounds);

            const result = await pool.query(
                'INSERT INTO users (username, email, password_hash) VALUES ($1, $2, $3) RETURNING *',
                [username, email, password_hash]
            );
            res.status(201).json(result.rows[0]);
        } catch (error: any) {
            console.error('Error al registrar usuario:', error);
            if (error.code === '23505') {
              res.status(409).json({ error: 'Usuario o email ya existe' });
            } else {
              res.status(500).json({ error: 'Error interno del servidor' });
            }
        }
    });

    app.post('/api/login', async (req: Request, res: Response, _next: NextFunction) => {
        try {
            const { email, password } = req.body;
            const { rows } = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
            const user = rows[0];

            if (!user) {
                return res.status(401).json({ error: 'Credenciales inválidas' });
            }

            const passwordMatch = await bcrypt.compare(password, user.password_hash);
            if (!passwordMatch) {
                return res.status(401).json({ error: 'Credenciales inválidas' });
            }

            res.json({ id: user.id, username: user.username, email: user.email });
        } catch (error) {
            console.error('Error al iniciar sesión:', error);
            res.status(500).json({ error: 'Error interno del servidor' });
        }
    });

    // Rutas para Mensajes Directos
    app.get('/api/direct_messages', async (req: Request, res: Response, next: NextFunction) => {
      try {
        const { user1, user2 } = req.query;

        const user1Id = parseInt(user1 as string, 10);
        const user2Id = parseInt(user2 as string, 10);

        if (isNaN(user1Id) || isNaN(user2Id)) {
          return res.status(400).json({ error: 'Los IDs de usuario deben ser números válidos.' });
        }

        const { rows } = await pool.query(
          `SELECT dm.id, dm.sender_id, dm.receiver_id, dm.content, dm.created_at,
                  s.id as sender_user_id, s.username as sender_username, s.avatar_url as sender_avatar_url
           FROM direct_messages dm
           JOIN users s ON dm.sender_id = s.id
           WHERE (dm.sender_id = $1 AND dm.receiver_id = $2) OR (dm.sender_id = $2 AND dm.receiver_id = $1)
           ORDER BY dm.created_at ASC`,
          [user1Id, user2Id]
        );

        const formattedRows = rows.map(row => ({
          id: row.id,
          sender_id: row.sender_id,
          receiver_id: row.receiver_id,
          content: row.content,
          created_at: row.created_at,
          sender: {
            id: row.sender_user_id,
            username: row.sender_username,
            avatar_url: row.sender_avatar_url
          }
        }));

        res.json(formattedRows);
      } catch (error) {
        console.error('Error fetching direct messages:', error);
        next(error);
      }
    });

    app.post('/api/direct_messages', async (req: Request, res: Response, _next: NextFunction) => {
        const { sender_id, receiver_id, content } = req.body;
        try {
            const { rows } = await pool.query(
                'INSERT INTO direct_messages (sender_id, receiver_id, content) VALUES ($1, $2, $3) RETURNING *',
                [sender_id, receiver_id, content]
            );
            res.status(201).json(rows[0]);
        } catch (error) {
            console.error('Error al enviar mensaje directo:', error);
            res.status(500).json({ error: 'Error interno del servidor' });
        }
    });

    app.put('/api/users/:id', async (req: Request<{ id: string }>, res: Response, _next: NextFunction) => {
        try {
            const { id } = req.params;
            const { username, email, avatar_url, status } = req.body;
            const result = await pool.query(
              'UPDATE users SET username = $1, email = $2, avatar_url = $3, status = $4 WHERE id = $5 RETURNING id, username, email, avatar_url, status',
              [username, email, avatar_url, status, id]
            );
            if (result.rows.length === 0) {
              return res.status(404).json({ error: 'Usuario no encontrado' });
            }
            res.json(result.rows[0]);
        } catch (error) {
            console.error(`Error al actualizar usuario ${req.params.id}:`, error);
            res.status(500).json({ error: 'Error interno del servidor' });
        }
    });

    // Iniciar el servidor
    app.listen(PORT, () => {
      console.log(`[SUCCESS] Servidor backend escuchando en http://localhost:${PORT}`);
    });

  } catch (error) {
    console.error('[FATAL] No se pudo iniciar el servidor:', error);
    process.exit(1); // Salir con un código de error si falla el arranque
  }
};

// Ejecutar la función de arranque
startServer();                                                                                                                                                                                                                                                                                                                                                                     