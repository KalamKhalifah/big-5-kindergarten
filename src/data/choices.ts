import type { Choices } from '../types';

export const choices: Choices = {
  plus: [
    { text: 'Strongly Disagree', score: 1, color: 1 },
    { text: 'Disagree', score: 2, color: 2 },
    { text: 'Neither Agree or Disagree', score: 3, color: 3 },
    { text: 'Agree', score: 4, color: 4 },
    { text: 'Strongly Agree', score: 5, color: 5 }
  ],
  minus: [
    { text: 'Strongly Disagree', score: 5, color: 1 },
    { text: 'Disagree', score: 4, color: 2 },
    { text: 'Neither Agree or Disagree', score: 3, color: 3 },
    { text: 'Agree', score: 2, color: 4 },
    { text: 'Strongly Agree', score: 1, color: 5 }
  ]
};
