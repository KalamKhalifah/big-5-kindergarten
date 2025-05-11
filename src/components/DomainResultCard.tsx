import React from 'react';
import type { DomainScore } from '../types';

interface DomainResultCardProps {
  domainScore: DomainScore;
}

const ScoreBar: React.FC<{ score: number; maxScore: number; }> = ({ score, maxScore }) => {
  const percentage = maxScore > 0 ? (score / maxScore) * 100 : 0;
  let barColor = 'bg-sky-500'; // Default color
  if (percentage < 33) barColor = 'bg-red-500';
  else if (percentage < 66) barColor = 'bg-yellow-500';
  else barColor = 'bg-green-500';

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

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg mb-6">
      <h3 className="text-2xl font-bold text-slate-800 mb-1">{domainScore.name}</h3>
      <p className="text-sm text-slate-600 mb-1">Overall Score: {domainScore.score} / {domainScore.maxScore}</p>
      <ScoreBar score={domainScore.score} maxScore={domainScore.maxScore} />
      
      <h4 className="text-lg font-semibold text-slate-700 mt-4 mb-2">What it means:</h4>
      <p className="text-slate-700 mt-2 mb-4 text-sm whitespace-pre-line">{domainScore.description}</p>
      
      {domainScore.observationGuide && (
        <>
          <h4 className="text-lg font-semibold text-slate-700 mt-6 mb-3">Observation Guide for Teachers:</h4>
          <div className="space-y-3 text-sm">
            <div className="p-3 bg-red-50 rounded-md border border-red-200">
              <p className="font-medium text-red-700">Low {domainBaseName}:</p>
              <p className="text-slate-600 whitespace-pre-line">{domainScore.observationGuide.low}</p>
            </div>
            <div className="p-3 bg-yellow-50 rounded-md border border-yellow-200">
              <p className="font-medium text-yellow-700">Neutral {domainBaseName}:</p>
              <p className="text-slate-600 whitespace-pre-line">{domainScore.observationGuide.neutral}</p>
            </div>
            <div className="p-3 bg-green-50 rounded-md border border-green-200">
              <p className="font-medium text-green-700">High {domainBaseName}:</p>
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
