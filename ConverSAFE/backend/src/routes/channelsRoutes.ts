import { Router } from 'express';
import { pool } from '../db';

const router = Router();

// Obtener los canales de un equipo
router.get('/team/:teamId', async (req, res, next) => {
  const { teamId } = req.params;
  try {
    const { rows } = await pool.query(
      'SELECT id, name, description, is_private FROM channels WHERE team_id = $1 ORDER BY name ASC',
      [teamId]
    );
    res.json(rows);
  } catch (error) {
    console.error(`Error al obtener canales del equipo ${teamId}:`, error);
    next(error);
  }
});

// Obtener los mensajes de un canal
router.get('/:channelId/messages', async (req, res, next) => {
  const { channelId } = req.params;
  try {
    const { rows } = await pool.query(
      `SELECT m.id, m.content, m.created_at,
              u.id as sender_id, u.username as sender_username, u.avatar_url as sender_avatar_url
       FROM messages m
       JOIN users u ON m.user_id = u.id
       WHERE m.channel_id = $1
       ORDER BY m.created_at ASC`,
      [channelId]
    );

    const formattedMessages = rows.map(row => ({
      id: row.id,
      content: row.content,
      created_at: row.created_at,
      channel_id: parseInt(channelId, 10),
      sender: {
        id: row.sender_id,
        username: row.sender_username,
        avatar_url: row.sender_avatar_url
      }
    }));

    res.json(formattedMessages);
  } catch (error) {
    console.error(`Error al obtener mensajes del canal ${channelId}:`, error);
    next(error);
  }
});

// Enviar un mensaje a un canal
router.post('/:channelId/messages', async (req, res, next) => {
  const { channelId } = req.params;
  const { userId, content } = req.body;

  if (!userId || !content) {
    return res.status(400).json({ error: 'userId y content son requeridos' });
  }

  try {
    const { rows } = await pool.query(
      'INSERT INTO messages (channel_id, user_id, content) VALUES ($1, $2, $3) RETURNING *',
      [channelId, userId, content]
    );
    
    const senderResult = await pool.query('SELECT id, username, avatar_url FROM users WHERE id = $1', [userId]);
    const sender = senderResult.rows[0];

    const responseMessage = {
      ...rows[0],
      sender
    };

    res.status(201).json(responseMessage);
  } catch (error) {
    console.error(`Error al enviar mensaje al canal ${channelId}:`, error);
    next(error);
  }
});


// Crear un nuevo canal en un equipo
router.post('/', async (req, res, next) => {
  const { team_id, name, description, is_private } = req.body;

  if (!team_id || !name) {
    return res.status(400).json({ error: 'team_id y name son requeridos.' });
  }

  try {
    const { rows } = await pool.query(
      'INSERT INTO channels (team_id, name, description, is_private) VALUES ($1, $2, $3, $4) RETURNING *',
      [team_id, name, description || null, is_private || false]
    );
    res.status(201).json(rows[0]);
  } catch (error) {
    console.error('Error al crear canal:', error);
    next(error);
  }
});

export default router;
