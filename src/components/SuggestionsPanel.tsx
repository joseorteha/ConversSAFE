import React from 'react';
import { BsPlus, BsX } from 'react-icons/bs';

const suggestions = [
    { text: 'Podrías mejorar la eficiencia promoviendo resúmenes cada 30 minutos.', type: 'improvement' },
    { text: 'Podría ser útil usar hilos o separar los temas en canales distintos', type: 'improvement' },
    { text: '@Martina no está participando nada. ¿Por qué?', type: 'alert' },
    { text: 'Solo 2 personas han participado en esta discusión. ¿Quieren abrir la ronda a más voces?', type: 'alert' },
];

interface SuggestionCardProps {
    text: string;
    type: 'improvement' | 'alert';
}

const SuggestionCard: React.FC<SuggestionCardProps> = ({ text, type }) => {
    const icon =
        type === 'improvement' ? (
            <div className="bg-accent/20 p-2 rounded-lg">
                <BsPlus size={20} className="text-accent" />
            </div>
        ) : (
            <div className="bg-red-500/20 p-2 rounded-lg">
                <BsX size={20} className="text-red-400" />
            </div>
        );

    return (
        <div className="bg-secondary p-3 rounded-lg flex items-start space-x-4">
            <div className="flex-shrink-0 mt-1">{icon}</div>
            <p className="text-text-dark text-sm">{text}</p>
        </div>
    );
};

const SuggestionsPanel: React.FC = () => {
  return (
    <div className="bg-primary p-6 rounded-lg h-full">
      <h3 className="text-lg font-semibold text-text-light mb-4">Sugerencias</h3>
      <div className="space-y-4">
        {suggestions.map((suggestion, index) => (
          <SuggestionCard key={index} text={suggestion.text} type={suggestion.type as 'improvement' | 'alert'} />
        ))}
      </div>
    </div>
  );
};

export default SuggestionsPanel;
