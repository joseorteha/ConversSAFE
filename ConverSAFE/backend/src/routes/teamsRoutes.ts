import { Router } from 'express';
import { pool } from '../db';

const router = Router();

// Obtener todos los equipos de un usuario
router.get('/', async (req, res, next) => {
  const { userId } = req.query;

  if (!userId) {
    return res.status(400).json({ error: 'userId es requerido' });
  }

  try {
    const { rows } = await pool.query(
      `SELECT t.id, t.name, t.description, t.created_at
       FROM teams t
       JOIN team_members tm ON t.id = tm.team_id
       WHERE tm.user_id = $1`,
      [userId]
    );
    res.json(rows);
  } catch (error) {
    console.error('Error al obtener equipos:', error);
    next(error);
  }
});

// Crear un nuevo equipo
router.post('/', async (req, res, next) => {
  const { name, description, userId } = req.body;

  if (!name || !userId) {
    return res.status(400).json({ error: 'El nombre del equipo y el ID del creador son requeridos.' });
  }

  const client = await pool.connect();

  try {
    await client.query('BEGIN');

    // 1. Insertar el nuevo equipo
    const teamResult = await client.query(
      'INSERT INTO teams (name, description) VALUES ($1, $2) RETURNING *',
      [name, description || null]
    );
    const newTeam = teamResult.rows[0];

    // 2. Añadir al usuario creador como el primer miembro con rol 'lead'
    await client.query(
      'INSERT INTO team_members (user_id, team_id, role) VALUES ($1, $2, $3)',
      [userId, newTeam.id, 'lead']
    );

    await client.query('COMMIT');
    res.status(201).json(newTeam);

  } catch (error) {
    await client.query('ROLLBACK');
    console.error('Error al crear equipo:', error);
    next(error);
  } finally {
    client.release();
  }
});

export default router;
