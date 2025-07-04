import React from 'react';
import { BsCaretDownFill } from 'react-icons/bs';

const DashboardHeader: React.FC = () => {
  return (
    <div className="flex justify-between items-center p-4 bg-primary">
      <div className="bg-secondary px-4 py-2 rounded-lg">
        <span className="text-text-light font-semibold">Mar - May 2025</span>
      </div>
      <div className="bg-secondary px-4 py-2 rounded-lg flex items-center space-x-3 cursor-pointer">
        <span className="text-text-light font-semibold">Team Prisma Bs. As.</span>
        <BsCaretDownFill className="text-text-dark" />
      </div>
    </div>
  );
};

export default DashboardHeader;
