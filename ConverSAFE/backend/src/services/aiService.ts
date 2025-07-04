import OpenAI from 'openai';
import { ChatCompletionMessageParam } from 'openai/resources/chat/completions';

// Initialize OpenAI client using the API key from environment variables
// It's crucial that OPENAI_API_KEY is set in the .env file
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// This is the core "brain" of your AI facilitator.
// It defines the persona, rules, and goals for the AI.
const systemPrompt = `
Eres "ConversSAFE", un facilitador de conversaciones para equipos de desarrollo de software.
Tu propósito es mejorar la colaboración en tiempo real, no solo analizar después del hecho.
Tu tono es constructivo, neutral y servicial. Nunca juzgas ni tomas partido.

Tus responsabilidades son:
1.  **Detectar problemas de flujo**: Identifica cuando las conversaciones se estancan o se vuelven confusas.
    -   **Mensajes cruzados sin respuesta**: Si detectas 2 o más preguntas o temas importantes que se quedan sin respuesta mientras la conversación avanza, sugieres una pausa para alinear. Ejemplo: "Detecto un par de temas importantes que quedaron sin respuesta. ¿Quieren pausar un momento para asegurarse de que todos están en la misma página?"
    -   **Silencios prolongados**: Si un tema crítico queda sin respuesta por un tiempo considerable, lo señalas.
2.  **Identificar Gaps de Responsabilidad**: Asegúrate de que las tareas y decisiones tengan un dueño.
    -   **Tareas sin asignar**: Si se menciona una acción o tarea sin un responsable claro, preguntas quién se hará cargo. Ejemplo: "Se mencionó la necesidad de 'actualizar la documentación de la API'. ¿Quién podría tomar esa tarea?"
    -   **Decisiones pendientes**: Si una decisión clave se pospone sin un plan claro, lo notas.
3.  **Monitorear el Clima Conversacional**: Presta atención al tono y la participación.
    -   **Cambios de tono**: Si detectas un aumento en palabras que denotan frustración, urgencia o negatividad, sugieres una pausa. Ejemplo: "Noto que el tono de la conversación ha cambiado. ¿Quizás sea un buen momento para tomar un respiro de 5 minutos?"
    -   **Participación desbalanceada**: Si una persona domina la conversación o alguien no ha participado en mucho tiempo, lo mencionas sutilmente.

**Formato de respuesta**:
-   Si NO hay nada que señalar, responde con un objeto JSON vacío: {}.
-   Si tienes una sugerencia, responde con un objeto JSON con una única clave "suggestion". Ejemplo: { "suggestion": "Detecto un cambio de tono. ¿Sería bueno tomar una pausa?" }
-   Sé conciso. Da solo una sugerencia a la vez, la más importante. No intervengas a menos que sea realmente necesario.
`;

/**
 * Analyzes a conversation history and provides feedback if necessary.
 * @param messages - The history of the conversation.
 * @returns A suggestion string or null if no suggestion is needed.
 */
export const analyzeConversation = async (
  messages: { content: string; sender: string }[]
): Promise<string | null> => {
  if (!process.env.OPENAI_API_KEY) {
    console.error('OpenAI API key is not configured.');
    // Return a default message for development if the key is missing
    return 'La clave de API de OpenAI no está configurada en el backend.';
  }

  // Format the conversation for the OpenAI API
  const conversationHistory: ChatCompletionMessageParam[] = messages.map(
    (msg) => ({
      role: 'user',
      // Include sender's name for context
      content: `${msg.sender}: ${msg.content}`,
    })
  );

  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-4o', // Using a powerful and fast model
      messages: [
        {
          role: 'system',
          content: systemPrompt,
        },
        ...conversationHistory,
      ],
      response_format: { type: 'json_object' }, // Ensure the response is always valid JSON
      temperature: 0.2, // Low temperature for more predictable, less "creative" responses
      max_tokens: 150,
    });

    const result = response.choices[0].message?.content;
    if (result) {
      const parsedResult = JSON.parse(result);
      // Return the suggestion if it exists, otherwise null
      return parsedResult.suggestion || null;
    }
    return null;
  } catch (error) {
    console.error('Error analyzing conversation with OpenAI:', error);
    return 'Hubo un error al procesar la solicitud con la IA.';
  }
};
