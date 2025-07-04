import React from 'react';

interface StatCardProps {
  value: string;
  label: string;
  isHighlighted?: boolean;
  alertCount?: number;
}

const StatCard: React.FC<StatCardProps> = ({ value, label, isHighlighted = false, alertCount }) => {
  const borderClass = isHighlighted ? 'border-accent' : 'border-transparent';
  return (
    <div className={`relative bg-secondary p-5 rounded-lg shadow-lg flex flex-col justify-between border-2 ${borderClass}`}>
      <div>
        <span className="text-4xl font-bold text-text-light">{value}</span>
      </div>
      <div className="mt-2">
        <span className="text-sm text-text-dark">{label}</span>
      </div>
      {alertCount && (
        <div className="absolute top-2 right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold">
          {alertCount}
        </div>
      )}
    </div>
  );
};

export default StatCard;
