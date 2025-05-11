import React from 'react';
import type { DomainScore, ResultInterpretation } from '../types';

interface DomainResultCardProps {
  domainScore: DomainScore;
}

const ScoreBar: React.FC<{ score: number; maxScore: number; }> = ({ score, maxScore }) => {
  const percentage = maxScore > 0 ? (score / maxScore) * 100 : 0;
  let barColor = 'bg-sky-500'; // Default color
  if (percentage < 35) barColor = 'bg-red-500'; // Adjusted to match interpretation thresholds
  else if (percentage <= 85) barColor = 'bg-yellow-500'; // Adjusted
  else barColor = 'bg-green-500'; // Adjusted

  return (
    <div className="w-full bg-slate-200 rounded-full h-3 my-1">
      <div
        className={`h-3 rounded-full ${barColor}`}
        style={{ width: `${percentage}%` }}
      ></div>
    </div>
  );
};

const DomainResultCard: React.FC<DomainResultCardProps> = ({ domainScore }) => {
  const domainBaseName = domainScore.name.includes('(') ? domainScore.name.substring(0, domainScore.name.indexOf('(')).trim() : domainScore.name;

  const interpretationTextStyles: { [key in ResultInterpretation]: { text: string; color: string; borderColor: string; ringColor: string; bgColor: string; } } = {
    low: { text: "Low", color: "text-red-700", borderColor: "border-red-400", ringColor: "ring-red-300", bgColor: "bg-red-50" },
    neutral: { text: "Average / Neutral", color: "text-yellow-700", borderColor: "border-yellow-400", ringColor: "ring-yellow-300", bgColor: "bg-yellow-50" },
    high: { text: "High", color: "text-green-700", borderColor: "border-green-400", ringColor: "ring-green-300", bgColor: "bg-green-50" },
  };

  const currentInterpretationStyle = interpretationTextStyles[domainScore.resultInterpretation];

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg mb-6">
      <h3 className="text-2xl font-bold text-slate-800 mb-1">{domainScore.name}</h3>
      <p className={`text-xl font-semibold ${currentInterpretationStyle.color} mb-1`}>
        Overall Level: {currentInterpretationStyle.text}
      </p>
      <p className="text-sm text-slate-600 mb-1">Overall Score: {domainScore.score} / {domainScore.maxScore}</p>
      <ScoreBar score={domainScore.score} maxScore={domainScore.maxScore} />
      
      <h4 className="text-lg font-semibold text-slate-700 mt-4 mb-2">What it means:</h4>
      <p className="text-slate-700 mt-2 mb-4 text-sm whitespace-pre-line">{domainScore.description}</p>
      
      {domainScore.observationGuide && (
        <>
          <h4 className="text-lg font-semibold text-slate-700 mt-6 mb-3">Observation Guide for Teachers:</h4>
          <div className="space-y-3 text-sm">
            <div 
              className={`p-3 rounded-md border ${domainScore.resultInterpretation === 'low' ? `${interpretationTextStyles.low.bgColor} ${interpretationTextStyles.low.borderColor} ring-2 ${interpretationTextStyles.low.ringColor}` : 'bg-red-50 border-red-200'}`}
            >
              <p className={`font-medium ${interpretationTextStyles.low.color}`}>Low {domainBaseName}:</p>
              <p className="text-slate-600 whitespace-pre-line">{domainScore.observationGuide.low}</p>
            </div>
            <div 
              className={`p-3 rounded-md border ${domainScore.resultInterpretation === 'neutral' ? `${interpretationTextStyles.neutral.bgColor} ${interpretationTextStyles.neutral.borderColor} ring-2 ${interpretationTextStyles.neutral.ringColor}` : 'bg-yellow-50 border-yellow-200'}`}
            >
              <p className={`font-medium ${interpretationTextStyles.neutral.color}`}>Neutral {domainBaseName}:</p>
              <p className="text-slate-600 whitespace-pre-line">{domainScore.observationGuide.neutral}</p>
            </div>
            <div 
              className={`p-3 rounded-md border ${domainScore.resultInterpretation === 'high' ? `${interpretationTextStyles.high.bgColor} ${interpretationTextStyles.high.borderColor} ring-2 ${interpretationTextStyles.high.ringColor}` : 'bg-green-50 border-green-200'}`}
            >
              <p className={`font-medium ${interpretationTextStyles.high.color}`}>High {domainBaseName}:</p>
              <p className="text-slate-600 whitespace-pre-line">{domainScore.observationGuide.high}</p>
            </div>
          </div>
        </>
      )}

      <h4 className="text-lg font-semibold text-slate-700 mt-6 mb-3">Things to Look For (Facets):</h4>
      <div className="space-y-3">
        {domainScore.facetScores.map((facet) => (
          <div key={facet.facet} className="p-3 bg-slate-50 rounded-md border border-slate-200">
            <p className="font-medium text-slate-700">{facet.name}</p>
            <p className="text-xs text-slate-500 mb-1">Score: {facet.score} / {facet.maxScore}</p>
            <ScoreBar score={facet.score} maxScore={facet.maxScore} />
            <p className="text-xs text-slate-600 mt-1 whitespace-pre-line">{facet.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DomainResultCard;
