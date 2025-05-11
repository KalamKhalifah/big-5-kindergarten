import React, { useState } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import IntroScreen from './components/IntroScreen';
import Quiz from './components/Quiz';
import Results from './components/Results';
import type { Answer } from './types';

type AppState = 'intro' | 'quiz' | 'results';

function App() {
  const [appState, setAppState] = useState<AppState>('intro');
  const [quizAnswers, setQuizAnswers] = useState<Answer[]>([]);

  const handleStartQuiz = () => {
    setQuizAnswers([]); // Reset answers if restarting
    setAppState('quiz');
  };

  const handleQuizComplete = (answers: Answer[]) => {
    setQuizAnswers(answers);
    setAppState('results');
  };

  const handleRetakeQuiz = () => {
    setAppState('intro'); // Or 'quiz' to skip intro
  };

  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      <Header />
      <main className="flex-grow container mx-auto">
        {appState === 'intro' && <IntroScreen onStart={handleStartQuiz} />}
        {appState === 'quiz' && <Quiz onComplete={handleQuizComplete} />}
        {appState === 'results' && <Results answers={quizAnswers} onRetake={handleRetakeQuiz} />}
      </main>
      <Footer />
    </div>
  );
}

export default App;
