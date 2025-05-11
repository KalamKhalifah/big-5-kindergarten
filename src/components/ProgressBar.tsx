import React from 'react';

interface ProgressBarProps {
  current: number;
  total: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ current, total }) => {
  const percentage = total > 0 ? (current / total) * 100 : 0;

  return (
    <div className="w-full bg-slate-200 rounded-full h-4 mb-6 shadow">
      <div
        className="bg-sky-500 h-4 rounded-full transition-all duration-300 ease-out"
        style={{ width: `${percentage}%` }}
      ></div>
       <p className="text-xs text-center text-slate-600 mt-1">{Math.round(percentage)}% completed ({current}/{total})</p>
    </div>
  );
};

export default ProgressBar;
