import React from 'react';
import { FileText, ListTodo, Smile, Frown, Meh, AlertTriangle, Loader } from 'lucide-react';

// Define the interfaces for the data we expect from the API
interface ActionItem {
  task: string;
  assigned_to: string;
}

interface Analysis {
  summary: string;
  action_items: ActionItem[];
  sentiment: string;
  error?: string;
}

// Define the props for the component
interface AIAssistantPanelProps {
  analysis: Analysis | null;
  isLoading: boolean;
}

const AIAssistantPanel: React.FC<AIAssistantPanelProps> = ({ analysis, isLoading }) => {

  // Helper function to render the correct icon based on sentiment
  const getSentimentIcon = (sentiment: string) => {
    if (!sentiment) return <Meh className="w-5 h-5 text-yellow-400" />;
    const sentimentLower = sentiment.toLowerCase();
    if (sentimentLower.includes('positivo') || sentimentLower.includes('colaborativo')) return <Smile className="w-5 h-5 text-green-400" />;
    if (sentimentLower.includes('negativo') || sentimentLower.includes('conflicto') || sentimentLower.includes('urgente')) return <Frown className="w-5 h-5 text-red-400" />;
    return <Meh className="w-5 h-5 text-yellow-400" />;
  };

  // Main render function to handle different states (loading, error, success)
  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="flex flex-col items-center justify-center h-full text-text-dark">
          <Loader className="w-8 h-8 animate-spin mb-4" />
          <p>Analizando conversación...</p>
        </div>
      );
    }

    if (!analysis || analysis.error) {
      return (
        <div className="flex flex-col items-center justify-center h-full text-text-dark text-center px-4">
          <AlertTriangle className="w-8 h-8 mb-4 text-yellow-500" />
          <p>{analysis?.error || 'Selecciona un canal para ver el análisis de la IA.'}</p>
        </div>
      );
    }

    return (
      <div className="p-4 space-y-6">
        {/* Summary Section */}
        <div>
          <h3 className="text-lg font-semibold text-text-light flex items-center gap-2 mb-2">
            <FileText className="w-5 h-5" />
            Resumen
          </h3>
          <p className="text-sm text-text-dark bg-primary p-3 rounded-md">{analysis.summary}</p>
        </div>

        {/* Action Items Section */}
        <div>
          <h3 className="text-lg font-semibold text-text-light flex items-center gap-2 mb-2">
            <ListTodo className="w-5 h-5" />
            Tareas Pendientes
          </h3>
          {analysis.action_items && analysis.action_items.length > 0 ? (
            <ul className="space-y-2">
              {analysis.action_items.map((item, index) => (
                <li key={index} className="text-sm text-text-dark bg-primary p-3 rounded-md flex justify-between items-center">
                  <span>{item.task}</span>
                  <span className="text-xs font-medium bg-blue-600 text-white px-2 py-1 rounded-full">{item.assigned_to}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-text-dark">No se detectaron tareas pendientes.</p>
          )}
        </div>

        {/* Sentiment Section */}
        <div>
          <h3 className="text-lg font-semibold text-text-light flex items-center gap-2 mb-2">
            <Smile className="w-5 h-5" />
            Sentimiento General
          </h3>
          <div className="flex items-center gap-2 text-sm text-text-dark bg-primary p-3 rounded-md">
            {getSentimentIcon(analysis.sentiment)}
            <span className="capitalize">{analysis.sentiment}</span>
          </div>
        </div>
      </div>
    );
  };

  // Component layout
  return (
    <aside className="w-80 bg-secondary border-l border-gray-700 flex flex-col">
      <div className="p-4 border-b border-gray-700">
        <h2 className="text-xl font-bold text-text-light">Asistente de IA</h2>
      </div>
      <div className="flex-1 overflow-y-auto">
        {renderContent()}
      </div>
    </aside>
  );
};

export default AIAssistantPanel;
