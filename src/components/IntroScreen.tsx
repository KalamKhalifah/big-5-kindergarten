import React from 'react';
import { PlayCircle, AlertTriangle } from 'lucide-react';

interface IntroScreenProps {
  onStart: () => void;
}

const IntroScreen: React.FC<IntroScreenProps> = ({ onStart }) => {
  return (
    <div className="flex flex-col items-center justify-center text-center p-4 md:p-8 min-h-[calc(100vh-160px)]"> {/* Adjust min-h based on header/footer */}
      <img 
        src="https://as1.ftcdn.net/v2/jpg/02/69/36/38/1000_F_269363857_20RbVCA1V3L3X3RFgV2yY2rQ3Jz2vO5a.jpg" 
        alt="kindergarten classroom background"
        className="w-full max-w-md h-64 object-cover rounded-lg shadow-xl mb-8"
      />
      <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">Welcome, Teacher!</h2>
      <p className="text-md md:text-lg text-slate-600 mb-8 max-w-xl">
        This tool is designed to help you assess the Big Five personality traits in your kindergarten students. 
        Please answer the following questions based on your observations of the child. 
        Your insights will help in understanding the child's unique characteristics.
      </p>
      <button
        onClick={onStart}
        className="px-8 py-4 bg-sky-500 text-white text-lg md:text-xl rounded-lg shadow-lg hover:bg-sky-600 transition-colors flex items-center"
      >
        <PlayCircle size={24} className="mr-3" /> Start Assessment
      </button>
      <p className="text-sm text-slate-500 mt-10 max-w-xl">
        This assessment consists of 120 questions. Please ensure you have adequate time to complete it thoughtfully for each student.
      </p>

      <div className="mt-12 p-6 bg-amber-50 border-l-4 border-amber-400 rounded-md shadow-md max-w-2xl w-full">
        <div className="flex items-center mb-3">
          <AlertTriangle size={24} className="text-amber-600 mr-3" />
          <h3 className="text-xl font-semibold text-amber-700">Important Aspects to Consider for Kindergarten</h3>
        </div>
        <ul className="list-disc list-inside text-left text-slate-700 space-y-2 text-sm md:text-base">
          <li>
            <strong className="font-medium">Emergent Personalities:</strong> Personalities in 5-6 year olds are still very much developing. What you observe are tendencies rather than fixed traits.
          </li>
          <li>
            <strong className="font-medium">Observation is Key:</strong> You won't be giving them personality tests. Your understanding will come from careful observation of their behaviors in various situations.
          </li>
          <li>
            <strong className="font-medium">Avoid Labeling:</strong> The goal is to understand and support, not to categorize the children.
          </li>
          <li>
            <strong className="font-medium">Fluidity:</strong> Children can exhibit different traits at different times or in different contexts.
          </li>
          <li>
            <strong className="font-medium">Focus on Strengths & Support:</strong> Use this framework to build on their strengths and provide support where they might struggle.
          </li>
        </ul>
      </div>
    </div>
  );
};

export default IntroScreen;
