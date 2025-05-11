import React from 'react';
import { ClipboardList } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="bg-slate-700 text-white p-4 shadow-md">
      <div className="container mx-auto flex items-center">
        <ClipboardList size={32} className="mr-3 text-slate-300" />
        <h1 className="text-2xl font-semibold">Kindergarten Personality Assessment</h1>
      </div>
    </header>
  );
};

export default Header;
