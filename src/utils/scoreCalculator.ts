import type { Answer, DomainScore, FacetScore, Question, AllDomainsInfo } from '../types';
import { questions } from '../data/questions';
import { domainDetails } from '../data/domains';

const MAX_SCORE_PER_QUESTION = 4; // Assuming scores range from 1-5, so max diff is 4 (5-1)

export const calculateScores = (answers: Answer[]): DomainScore[] => {
  const domainScores: { [key: string]: Partial<DomainScore> & { facetScoresMap: { [key: number]: Partial<FacetScore> & { questionCount: number } } } } = {};

  // Initialize domainScores structure
  for (const domainKey in domainDetails) {
    const domainInfo = domainDetails[domainKey as keyof AllDomainsInfo];
    domainScores[domainKey] = {
      domain: domainKey as Question['domain'],
      name: domainInfo.name,
      description: domainInfo.description,
      observationGuide: domainInfo.observationGuide, // Add observation guide
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
      // Max score for a question is fixed (e.g. 4 if choices are 1-5)
      // Or, if using keyed scoring, it's the max possible score for that question type.
      // For simplicity, let's assume a fixed max score contribution per question.
      // This needs to align with how `choices.ts` scores are structured.
      // If choices are e.g. 0,1,2,3,4, then max score is 4.
      domain.maxScore! += MAX_SCORE_PER_QUESTION; 
    }

    if (facet) {
      facet.score! += answer.score;
      facet.maxScore! += MAX_SCORE_PER_QUESTION;
      facet.questionCount! += 1;
    }
  });
  
  // Finalize facetScores and convert map to array
  return Object.values(domainScores).map(ds => {
    const facetScoresArray: FacetScore[] = Object.values(ds.facetScoresMap!)
      .filter(fs => fs.questionCount && fs.questionCount > 0) // Only include facets that had questions
      .map(fs => ({
        facet: fs.facet!,
        name: fs.name!,
        score: fs.score!,
        maxScore: fs.maxScore!,
        description: fs.description!,
      }));

    return {
      domain: ds.domain!,
      name: ds.name!,
      score: ds.score!,
      maxScore: ds.maxScore!,
      description: ds.description!,
      observationGuide: ds.observationGuide!, // Ensure observation guide is passed
      facetScores: facetScoresArray,
    };
  });
};
