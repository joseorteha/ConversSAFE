import { Request, Response, NextFunction } from 'express';
import { pool } from '../db';

export const getMessages = async (req: Request, res: Response, next: NextFunction) => {
  const { channel_id } = req.query;
  try {
    if (!channel_id) {
      res.status(400).json({ error: 'channel_id es requerido' });
      return;
    }
    const result = await pool.query(
      `SELECT m.*, u.username, u.avatar_url
       FROM messages m
       JOIN users u ON m.user_id = u.id
       WHERE m.channel_id = $1
       ORDER BY m.created_at ASC`,
      [channel_id]
    );
    res.json(result.rows);
  } catch (error) {
    next(error);
  }
};

export const createMessage = async (req: Request, res: Response, next: NextFunction) => {
  const { channel_id, user_id, content } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO messages (channel_id, user_id, content) VALUES ($1, $2, $3) RETURNING *',
      [channel_id, user_id, content]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    next(error);
  }
}; 