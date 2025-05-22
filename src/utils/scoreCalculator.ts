import type { Answer, DomainScore, FacetScore, Question, AllDomainsInfo, ResultInterpretation } from '../types';
import { questions } from '../data/questions';
import { domainDetails } from '../data/domains';

const MAX_SCORE_PER_QUESTION = 4; // Assuming scores range from 0-4 (from choices.ts)

// Define domain-specific raw score thresholds
const domainThresholds: { [key in Question['domain']]: { low: number; high: number } } = {
  N: { low: 70, high: 70 }, // <70 low, =70 neutral, >70 high
  E: { low: 79, high: 79 }, // <79 low, =79 neutral, >79 high
  O: { low: 70, high: 70 }, // <70 low, =70 neutral, >70 high
  C: { low: 75, high: 75 }, // <75 low, =75 neutral, >75 high
  A: { low: 65, high: 65 }, // <65 low, =65 neutral, >65 high
};

// Updated function to use domain-specific raw score thresholds
const determineResultInterpretation = (domainKey: Question['domain'], score: number): ResultInterpretation => {
  const thresholds = domainThresholds[domainKey];

  if (!thresholds) {
    // Fallback or error handling if domain key is not found
    console.warn(`Thresholds not defined for domain: ${domainKey}. Defaulting to neutral.`);
    return 'neutral';
  }

  if (score < thresholds.low) {
    return 'low';
  } else if (score > thresholds.high) {
    return 'high';
  } else {
    return 'neutral'; // Score is exactly at the threshold
  }
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
      maxScore: 0, // Max score will be calculated based on answered questions
      facetScoresMap: {},
    };

    for (const facetKey in domainInfo.facets) {
      const facetInfo = domainInfo.facets[facetKey as unknown as number];
      domainScores[domainKey].facetScoresMap[facetKey as unknown as number] = {
        facet: parseInt(facetKey),
        name: facetInfo.name,
        description: facetInfo.description,
        score: 0,
        maxScore: 0, // Max score will be calculated based on answered questions
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
      // Max score for the domain is the sum of max possible scores for answered questions
      domain.maxScore! += MAX_SCORE_PER_QUESTION;
    }

    if (facet) {
      facet.score! += answer.score;
      // Max score for the facet is the sum of max possible scores for answered questions in that facet
      facet.maxScore! += MAX_SCORE_PER_QUESTION;
      facet.questionCount! += 1;
    }
  });

  // Finalize facetScores and convert map to array, calculate result interpretation
  return Object.values(domainScores).map(ds => {
    const facetScoresArray: FacetScore[] = Object.values(ds.facetScoresMap!)
      .filter(fs => fs.questionCount && fs.questionCount > 0) // Only include facets with answered questions
      .map(fs => ({
        facet: fs.facet!,
        name: fs.name!,
        score: fs.score!,
        maxScore: fs.maxScore!,
        description: fs.description!,
      }));

    // Calculate interpretation using the updated function, passing the domain key
    const resultInterpretation = determineResultInterpretation(ds.domain!, ds.score!);

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
