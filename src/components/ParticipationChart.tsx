import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Silvia R.', 'Total': 28, 'Participación': 22 },
  { name: 'Lucía L.', 'Total': 55, 'Participación': 45 },
  { name: 'Juan P.', 'Total': 75, 'Participación': 65 },
  { name: 'Leo F.', 'Total': 95, 'Participación': 75 },
  { name: 'Ana B.', 'Total': 78, 'Participación': 60 },
  { name: 'Juan M.', 'Total': 50, 'Participación': 40 },
  { name: 'Guillermo L.', 'Total': 65, 'Participación': 55 },
  { name: 'Alejandra A.', 'Total': 45, 'Participación': 35 },
];

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-tertiary p-3 border border-border-color rounded-lg shadow-lg">
        <p className="text-text-light font-semibold">{`• Total mensajes: ${payload[0].value}`}</p>
        <p className="text-text-light font-semibold">{`• Total mensajes: ${payload[1].value}`}</p>
      </div>
    );
  }
  return null;
};

const ParticipationChart: React.FC = () => {
  return (
    <div className="bg-secondary p-4 rounded-lg shadow-md h-full">
      <div className="flex justify-between items-center mb-4 px-4">
        <button className="text-text-dark hover:text-text-light p-2 rounded-full bg-primary">{'<'}</button>
        <h3 className="text-lg font-semibold text-text-light">Participaciones</h3>
        <button className="text-text-dark hover:text-text-light p-2 rounded-full bg-primary">{'>'}</button>
      </div>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data} margin={{ top: 5, right: 20, left: -20, bottom: 5 }} barGap={10} barCategoryGap="20%">
          <XAxis dataKey="name" stroke="#B5BAC1" fontSize={12} tickLine={false} axisLine={false} />
          <YAxis stroke="#B5BAC1" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `${value}%`} domain={[0, 100]} />
          <Tooltip content={<CustomTooltip />} cursor={{ fill: '#ffffff1a' }}/>
          <Bar dataKey="Total" fill="#556270" radius={[4, 4, 0, 0]} />
          <Bar dataKey="Participación" fill="#A0AEC0" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ParticipationChart;
