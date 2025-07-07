import React, { useState } from 'react';
import GameGrid from '../components/GameGrid';
import QuestionPanel from '../components/QuestionPanel';
import { gameData } from '../data/gameData';

export interface Question {
  id: number;
  theme: number;
  level: number;
  question: string;
  answers: string[];
  correctAnswer: number;
}

const Index = () => {
  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);
  const [answeredQuestions, setAnsweredQuestions] = useState<Set<number>>(new Set());
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  const handleQuestionSelect = (themeIndex: number, levelIndex: number) => {
    const question = gameData.find(q => q.theme === themeIndex && q.level === levelIndex);
    if (question && !answeredQuestions.has(question.id)) {
      setCurrentQuestion(question);
      setShowResult(false);
    }
  };

  const handleAnswer = (selectedAnswer: number) => {
    if (!currentQuestion) return;
    
    const correct = selectedAnswer === currentQuestion.correctAnswer;
    setIsCorrect(correct);
    setShowResult(true);
    
    // Marquer la question comme répondue après un délai
    setTimeout(() => {
      setAnsweredQuestions(prev => new Set([...prev, currentQuestion.id]));
      setCurrentQuestion(null);
      setShowResult(false);
    }, 3000);
  };

  const handleBackToGrid = () => {
    setCurrentQuestion(null);
    setShowResult(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900">
      {!currentQuestion ? (
        <GameGrid 
          onQuestionSelect={handleQuestionSelect}
          answeredQuestions={answeredQuestions}
        />
      ) : (
        <QuestionPanel
          question={currentQuestion}
          onAnswerSelect={handleAnswer}
          onBackToGrid={handleBackToGrid}
          showResult={showResult}
          isCorrect={isCorrect}
        />
      )}
    </div>
  );
};

export default Index;
