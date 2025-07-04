import { Request, Response, NextFunction } from 'express';
import { pool } from '../db';

export const getChannels = async (req: Request, res: Response, next: NextFunction) => {
  const { team_id } = req.query;
  try {
    if (!team_id) {
      res.status(400).json({ error: 'team_id es requerido' });
      return;
    }
    const result = await pool.query('SELECT * FROM channels WHERE team_id = $1 ORDER BY id', [team_id]);
    res.json(result.rows);
  } catch (error) {
    next(error);
  }
};

export const createChannel = async (req: Request, res: Response, next: NextFunction) => {
  const { team_id, name, description, is_private } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO channels (team_id, name, description, is_private) VALUES ($1, $2, $3, $4) RETURNING *',
      [team_id, name, description, is_private || false]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    next(error);
  }
}; 