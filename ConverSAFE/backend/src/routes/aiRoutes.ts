import { Router, Request, Response, NextFunction } from 'express';
import OpenAI from 'openai';
import { pool } from '../db';

const router = Router();


// Inicializar OpenAI solo si hay API Key
const openaiApiKey = process.env.OPENAI_API_KEY;
const openai = openaiApiKey
  ? new OpenAI({ apiKey: openaiApiKey })
  : null;

// Mock de análisis de canal
const mockAnalysis = {
  summary: 'Conversación sobre organización de tareas y próximos pasos.',
  action_items: [
    { task: 'Enviar reporte semanal', assigned_to: 'Juan' },
    { task: 'Revisar el diseño del dashboard', assigned_to: 'Sin asignar' }
  ],
  sentiment: 'colaborativo'
};

// Ruta para analizar los mensajes de un canal
router.post('/analyze-channel', async (req: Request, res: Response, next: NextFunction) => {
  const { channelId } = req.body;

  if (!channelId) {
    return res.status(400).json({ error: 'El ID del canal es requerido.' });
  }

  try {
    // 1. Obtener todos los mensajes del canal, uniendo con la tabla de usuarios para obtener los nombres
    const { rows: messages } = await pool.query(
      `SELECT m.content, u.username
       FROM messages m
       JOIN users u ON m.user_id = u.id
       WHERE m.channel_id = $1
       ORDER BY m.created_at ASC`,
      [channelId]
    );

    if (messages.length < 2) {
      return res.json({ summary: 'No hay suficientes mensajes para realizar un análisis significativo.', action_items: [], sentiment: 'neutral' });
    }

    // 2. Formatear la conversación para la IA
    const conversationText = messages.map((msg: { username: string; content: string }) => `${msg.username}: ${msg.content}`).join('\n');

    // 3. Si no hay API Key, devolver mock
    if (!openai) {
      return res.json(mockAnalysis);
    }

    // 4. Crear el prompt para la IA
    const systemPrompt = `
      Eres "ConverSAFE AI", un asistente experto en análisis de conversaciones de equipos de trabajo.
      Tu objetivo es leer una conversación y extraer información útil de manera concisa.
      Analiza la siguiente conversación y devuelve un objeto JSON con la siguiente estructura:
      {
        "summary": "Un resumen muy breve (1-2 frases) de qué trata la conversación.",
        "action_items": [{"task": "La tarea específica a realizar.", "assigned_to": "La persona a la que se le asignó o 'Sin asignar' si no está claro."}],
        "sentiment": "Describe el sentimiento o tono general de la conversación (ej: 'colaborativo', 'urgente', 'conflicto', 'informativo')."
      }
      Si no hay tareas claras, devuelve un array vacío para action_items.
    `;

    // 5. Llamar a la API de OpenAI
    let analysis;
    try {
      const response = await openai.chat.completions.create({
        model: 'gpt-4-turbo',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: conversationText },
        ],
        response_format: { type: 'json_object' },
      });
      analysis = response.choices[0].message?.content;
    } catch (err) {
      console.error('Error con OpenAI, devolviendo mock:', err);
      return res.json(mockAnalysis);
    }

    if (!analysis) {
      return res.json(mockAnalysis);
    }

    // 6. Devolver el análisis JSON
    res.json(JSON.parse(analysis));

  } catch (error) {
    console.error('Error al analizar el canal:', error);
    // Si hay error inesperado, devolver mock
    res.json(mockAnalysis);
  }
});

export default router;
