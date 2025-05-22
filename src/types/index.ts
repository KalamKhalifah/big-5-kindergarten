export interface ChoiceOption {
  text: string;
  score: number;
  color: number;
}

export interface Choices {
  plus: ChoiceOption[];
  minus: ChoiceOption[];
}

export interface Question {
  id: string;
  text: string;
  keyed: 'plus' | 'minus';
  domain: 'N' | 'E' | 'O' | 'A' | 'C';
  facet: number;
}

export interface Answer {
  questionId: string;
  score: number;
  domain: Question['domain'];
  facet: Question['facet'];
}

export interface FacetInfo {
  name: string;
  description: string;
}

export interface DomainInfo {
  name: string;
  description: string; // "What it means"
  observationGuide: { // "Observation Guide for Teachers"
    low: string;
    neutral: string; // Keeping neutral text in guide for context, but interpretation is only low/high
    high: string;
  };
  facets: { [key: number]: FacetInfo }; // "Things to Look For (Facets)"
}

export interface AllDomainsInfo {
  N: DomainInfo;
  E: DomainInfo;
  O: DomainInfo;
  A: DomainInfo;
  C: DomainInfo;
}

export interface FacetScore {
  facet: number;
  name: string;
  score: number;
  maxScore: number;
  description: string;
}

// Updated type to include 'neutral'
export type ResultInterpretation = 'low' | 'neutral' | 'high';

export interface DomainScore {
  domain: Question['domain'];
  name: string;
  score: number;
  maxScore: number;
  description: string; // "What it means"
  observationGuide: { // "Observation Guide for Teachers"
    low: string;
    neutral: string; // Keeping neutral text in guide for context, but interpretation is only low/high
    high: string;
  };
  facetScores: FacetScore[];
  resultInterpretation: ResultInterpretation; // Updated field type
}
