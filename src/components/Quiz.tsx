import React, { useState, useEffect } from 'react';
import { questions } from '../data/questions';
import type { Answer, Question as QuestionType } from '../types';
import QuestionCard from './QuestionCard';
import ProgressBar from './ProgressBar';
import { ChevronLeft, ChevronRight, CheckCircle } from 'lucide-react';

interface QuizProps {
  onComplete: (answers: Answer[]) => void;
}

const Quiz: React.FC<QuizProps> = ({ onComplete }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Answer[]>([]);

  useEffect(() => {
    // Pre-fill answers array with nulls or default structure if needed,
    // or load from localStorage if implementing persistence.
    // For now, it's an empty array, and we add/update as user answers.
  }, []);

  const handleAnswer = (score: number, domain: QuestionType['domain'], facet: QuestionType['facet']) => {
    const newAnswers = [...answers];
    const existingAnswerIndex = newAnswers.findIndex(
      (ans) => ans.questionId === questions[currentQuestionIndex].id
    );

    const answerPayload: Answer = {
      questionId: questions[currentQuestionIndex].id,
      score,
      domain,
      facet,
    };

    if (existingAnswerIndex > -1) {
      newAnswers[existingAnswerIndex] = answerPayload;
    } else {
      newAnswers.push(answerPayload);
    }
    setAnswers(newAnswers);

    // Automatically move to next question if not the last one
    if (currentQuestionIndex < questions.length - 1) {
       // Add a small delay to show selection
      setTimeout(() => {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
      }, 300);
    }
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleSubmit = () => {
    // Optional: Check if all questions are answered
    if (answers.length === questions.length) {
      onComplete(answers);
    } else {
      // Handle case where not all questions are answered, e.g., show a confirmation
      // For now, allow submission even if not all answered.
      // Or, alert the user:
      alert(`Please answer all ${questions.length} questions. You have answered ${answers.length}.`);
      // Find first unanswered question and navigate to it
      for (let i = 0; i < questions.length; i++) {
        if (!answers.find(ans => ans.questionId === questions[i].id)) {
          setCurrentQuestionIndex(i);
          break;
        }
      }
    }
  };

  const currentQuestion = questions[currentQuestionIndex];
  const currentAnswer = answers.find(ans => ans.questionId === currentQuestion.id);

  return (
    <div className="flex flex-col items-center p-4 md:p-8 w-full">
      <div className="w-full max-w-2xl">
        <ProgressBar current={answers.length} total={questions.length} />
        <QuestionCard
          question={currentQuestion}
          questionNumber={currentQuestionIndex + 1}
          totalQuestions={questions.length}
          onAnswer={handleAnswer}
          currentAnswerScore={currentAnswer?.score}
        />
        <div className="mt-8 flex justify-between items-center w-full">
          <button
            onClick={handlePrevious}
            disabled={currentQuestionIndex === 0}
            className="px-6 py-3 bg-slate-500 text-white rounded-lg shadow hover:bg-slate-600 disabled:bg-slate-300 disabled:cursor-not-allowed flex items-center transition-colors"
          >
            <ChevronLeft size={20} className="mr-2" /> Previous
          </button>
          {currentQuestionIndex === questions.length - 1 ? (
            <button
              onClick={handleSubmit}
              disabled={answers.length !== questions.length}
              className="px-6 py-3 bg-green-500 text-white rounded-lg shadow hover:bg-green-600 disabled:bg-green-300 disabled:cursor-not-allowed flex items-center transition-colors"
            >
              <CheckCircle size={20} className="mr-2" /> Submit
            </button>
          ) : (
            <button
              onClick={handleNext}
              // Only disable next if current question isn't answered yet.
              // Or allow navigation freely. For now, allow free navigation.
              // disabled={!currentAnswer} 
              className="px-6 py-3 bg-sky-500 text-white rounded-lg shadow hover:bg-sky-600 disabled:bg-sky-300 disabled:cursor-not-allowed flex items-center transition-colors"
            >
              Next <ChevronRight size={20} className="ml-2" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Quiz;
