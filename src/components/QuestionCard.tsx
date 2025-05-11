import React from 'react';
import type { Question, ChoiceOption } from '../types';
import { choices as choiceData } from '../data/choices';

interface QuestionCardProps {
  question: Question;
  questionNumber: number;
  totalQuestions: number;
  onAnswer: (score: number, domain: Question['domain'], facet: Question['facet']) => void;
  currentAnswerScore?: number;
}

const QuestionCard: React.FC<QuestionCardProps> = ({
  question,
  questionNumber,
  totalQuestions,
  onAnswer,
  currentAnswerScore,
}) => {
  const availableChoices = choiceData[question.keyed];

  const handleSelectOption = (option: ChoiceOption) => {
    onAnswer(option.score, question.domain, question.facet);
  };

  const getChoiceColorClass = (colorValue: number, isSelected: boolean): string => {
    if (isSelected) return `bg-sky-500 text-white ring-2 ring-sky-600`;
    
    // Tailwind CSS classes for choice colors are defined in tailwind.config.js
    // e.g., choice-1, choice-2, etc.
    // We construct the class name dynamically.
    // For hover, we can use Tailwind's hover modifiers.
    // Example: hover:bg-sky-100
    const colorMapping: { [key: number]: string } = {
        1: 'bg-choice-1 hover:bg-red-300',
        2: 'bg-choice-2 hover:bg-orange-300',
        3: 'bg-choice-3 hover:bg-yellow-300',
        4: 'bg-choice-4 hover:bg-lime-300',
        5: 'bg-choice-5 hover:bg-green-300',
    };
    return `${colorMapping[colorValue] || 'bg-slate-200 hover:bg-slate-300'} text-slate-700`;
  };


  return (
    <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-2xl">
      <p className="text-sm text-slate-500 mb-2">
        Question {questionNumber} of {totalQuestions}
      </p>
      <h2 className="text-xl font-semibold text-slate-800 mb-6">{question.text}</h2>
      <div className="space-y-3">
        {availableChoices.map((option) => (
          <button
            key={option.score}
            onClick={() => handleSelectOption(option)}
            className={`
              w-full text-left p-4 rounded-md transition-all duration-150 ease-in-out
              focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500
              ${getChoiceColorClass(option.color, currentAnswerScore === option.score)}
            `}
          >
            {option.text}
          </button>
        ))}
      </div>
    </div>
  );
};

export default QuestionCard;
