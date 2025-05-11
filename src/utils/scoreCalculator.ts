import type { Answer, DomainScore, FacetScore, Question, AllDomainsInfo, ResultInterpretation } from '../types';
import { questions } from '../data/questions';
import { domainDetails } from '../data/domains';

const MAX_SCORE_PER_QUESTION = 4; // Assuming scores range from 0-4 or 1-5 (differs by choice)

// Thresholds for low, neutral, high interpretation based on percentage of maxScore
const LOW_THRESHOLD_PERCENTAGE = 0.35; // Scores below this are "low"
const HIGH_THRESHOLD_PERCENTAGE = 0.85; // Scores above this are "high", between are "neutral"

const determineResultInterpretation = (score: number, maxScore: number): ResultInterpretation => {
  if (maxScore === 0) return 'neutral'; // Avoid division by zero, default to neutral
  const percentage = score / maxScore;
  if (percentage < LOW_THRESHOLD_PERCENTAGE) {
    return 'low';
  } else if (percentage > HIGH_THRESHOLD_PERCENTAGE) {
    return 'high';
  }
  return 'neutral';
};

export const calculateScores = (answers: Answer[]): DomainScore[] => {
  const domainScores: { [key: string]: Partial<DomainScore> & { facetScoresMap: { [key: number]: Partial<FacetScore> & { questionCount: number } } } } = {};

  // Initialize domainScores structure
  for (const domainKey in domainDetails) {
    const domainInfo = domainDetails[domainKey as keyof AllDomainsInfo];
    domainScores[domainKey] = {
      domain: domainKey as Question['domain'],
      name: domainInfo.name,
      description: domainInfo.description,
      observationGuide: domainInfo.observationGuide,
      score: 0,
      maxScore: 0,
      facetScoresMap: {},
    };

    for (const facetKey in domainInfo.facets) {
      const facetInfo = domainInfo.facets[facetKey as unknown as number];
      domainScores[domainKey].facetScoresMap[facetKey as unknown as number] = {
        facet: parseInt(facetKey),
        name: facetInfo.name,
        description: facetInfo.description,
        score: 0,
        maxScore: 0,
        questionCount: 0,
      };
    }
  }

  // Aggregate scores from answers
  answers.forEach(answer => {
    const question = questions.find(q => q.id === answer.questionId);
    if (!question) return;

    const domain = domainScores[answer.domain];
    const facet = domain.facetScoresMap[answer.facet];

    if (domain) {
      domain.score! += answer.score;
      domain.maxScore! += MAX_SCORE_PER_QUESTION; 
    }

    if (facet) {
      facet.score! += answer.score;
      facet.maxScore! += MAX_SCORE_PER_QUESTION;
      facet.questionCount! += 1;
    }
  });
  
  // Finalize facetScores and convert map to array, calculate result interpretation
  return Object.values(domainScores).map(ds => {
    const facetScoresArray: FacetScore[] = Object.values(ds.facetScoresMap!)
      .filter(fs => fs.questionCount && fs.questionCount > 0)
      .map(fs => ({
        facet: fs.facet!,
        name: fs.name!,
        score: fs.score!,
        maxScore: fs.maxScore!,
        description: fs.description!,
      }));

    const resultInterpretation = determineResultInterpretation(ds.score!, ds.maxScore!);

    return {
      domain: ds.domain!,
      name: ds.name!,
      score: ds.score!,
      maxScore: ds.maxScore!,
      description: ds.description!,
      observationGuide: ds.observationGuide!,
      facetScores: facetScoresArray,
      resultInterpretation: resultInterpretation, // Add interpretation here
    };
  });
};
