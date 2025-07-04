import React from 'react';
import DashboardHeader from '../components/DashboardHeader';
import StatCard from '../components/StatCard';
import ParticipationChart from '../components/ParticipationChart';
import SuggestionsPanel from '../components/SuggestionsPanel';

const Dashboard: React.FC = () => {
  return (
    <div className="h-full bg-primary p-6 overflow-y-auto">
      <DashboardHeader />
      <div className="grid grid-cols-12 gap-6 mt-6">
        {/* Main content area */}
        <div className="col-span-12 lg:col-span-8 space-y-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <StatCard value="28" label="Temas tratados" />
            <StatCard value="20%" label="Frases positivas" />
            <StatCard value="64" label="Decisiones tomadas" isHighlighted />
            <StatCard value="10" label="Alertas de comunicación ineficiente" alertCount={2} />
          </div>
          <ParticipationChart />
        </div>

        {/* Suggestions Panel */}
        <div className="col-span-12 lg:col-span-4">
          <SuggestionsPanel />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;