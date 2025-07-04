import { Request, Response } from 'express';
import { pool } from '../db';

export const getTeams = async (_req: Request, res: Response) => {
  try {
    const result = await pool.query('SELECT * FROM teams ORDER BY id');
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener equipos' });
  }
}; 