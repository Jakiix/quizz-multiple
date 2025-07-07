import React, { useState, useEffect } from 'react';
import { Phone, Users, Zap } from 'lucide-react';
import { Question } from '../pages/Index';

interface QuestionPanelProps {
  question: Question;
  onAnswerSelect: (answer: number) => void;
  onBackToGrid: () => void;
  showResult: boolean;
  isCorrect: boolean;
}

const QuestionPanel: React.FC<QuestionPanelProps> = ({
  question,
  onAnswerSelect,
  onBackToGrid,
  showResult,
  isCorrect
}) => {
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [usedJokers, setUsedJokers] = useState({
    fiftyFifty: false,
    phone: false,
    audience: false
  });
  const [hiddenAnswers, setHiddenAnswers] = useState<Set<number>>(new Set());

  // Réinitialiser les jokers à chaque nouvelle question
  useEffect(() => {
    setUsedJokers({ fiftyFifty: false, phone: false, audience: false });
    setHiddenAnswers(new Set());
    setSelectedAnswer(null);
  }, [question]);

  const handleFiftyFifty = () => {
    if (usedJokers.fiftyFifty) return;
    
    setUsedJokers(prev => ({ ...prev, fiftyFifty: true }));
    
    // Enlever 2 mauvaises réponses aléatoirement
    const wrongAnswers = question.answers
      .map((_, index) => index)
      .filter(index => index !== question.correctAnswer);
    
    const shuffled = wrongAnswers.sort(() => 0.5 - Math.random());
    const toHide = shuffled.slice(0, 2);
    
    setHiddenAnswers(new Set(toHide));
  };

  const handleJokerClick = (joker: 'phone' | 'audience') => {
    setUsedJokers(prev => ({ ...prev, [joker]: true }));
  };

  const handleValidate = () => {
    if (selectedAnswer !== null) {
      onAnswerSelect(selectedAnswer);
    }
  };

  const getAnswerClass = (index: number) => {
    if (!showResult) {
      return selectedAnswer === index 
        ? 'bg-orange-600 border-white-400' 
        : 'bg-gray-700 hover:bg-gray-600 border-gray-600';
    }
    
    if (index === question.correctAnswer) {
      return 'bg-green-600 border-green-400';
    }
    
    if (selectedAnswer === index && index !== question.correctAnswer) {
      return 'bg-red-600 border-red-400';
    }
    
    return 'bg-gray-700 border-gray-600';
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-4xl bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl shadow-2xl p-8 animate-scale-in">
        
        {/* Jokers */}
        <div className="flex justify-end gap-4 mb-6">
          <button
            onClick={handleFiftyFifty}
            disabled={usedJokers.fiftyFifty}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
              usedJokers.fiftyFifty 
                ? 'bg-gray-600 text-gray-400 cursor-not-allowed' 
                : 'bg-yellow-600 hover:bg-yellow-700 text-white'
            }`}
          >
            <Zap size={20} />
            50/50
          </button>
          
          <button
            onClick={() => handleJokerClick('phone')}
            disabled={usedJokers.phone}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
              usedJokers.phone 
                ? 'bg-gray-600 text-gray-400 cursor-not-allowed' 
                : 'bg-green-600 hover:bg-green-700 text-white'
            }`}
          >
            <Phone size={20} />
            Appel
          </button>
          
          <button
            onClick={() => handleJokerClick('audience')}
            disabled={usedJokers.audience}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
              usedJokers.audience 
                ? 'bg-gray-600 text-gray-400 cursor-not-allowed' 
                : 'bg-purple-600 hover:bg-purple-700 text-white'
            }`}
          >
            <Users size={20} />
            Public
          </button>
        </div>

        {/* Question */}
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-white mb-6 animate-fade-in">
            {question.question}
          </h2>
        </div>

        {/* Réponses */}
        <div className="grid grid-cols-2 gap-4 mb-8">
          {question.answers.map((answer, index) => {
            if (hiddenAnswers.has(index)) {
              return (
                <div key={index} className="p-4 bg-gray-800 border-2 border-gray-700 rounded-lg opacity-30">
                  <span className="text-gray-500">Réponse supprimée</span>
                </div>
              );
            }

            return (
              <button
                key={index}
                onClick={() => !showResult && setSelectedAnswer(index)}
                disabled={showResult}
                className={`p-4 border-2 rounded-lg text-white transition-all duration-300 transform hover:scale-102 ${getAnswerClass(index)}`}
              >
                <span className="font-semibold">{String.fromCharCode(65 + index)}.</span> {answer}
              </button>
            );
          })}
        </div>

        {/* Boutons d'action */}
        <div className="flex justify-center gap-4">
          {!showResult ? (
            <>
              <button
                onClick={onBackToGrid}
                className="px-6 py-3 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition-all"
              >
                Retour
              </button>
              <button
                onClick={handleValidate}
                disabled={selectedAnswer === null}
                className={`px-6 py-3 rounded-lg transition-all ${
                  selectedAnswer !== null
                    ? 'bg-blue-600 hover:bg-blue-700 text-white'
                    : 'bg-gray-600 text-gray-400 cursor-not-allowed'
                }`}
              >
                Valider
              </button>
            </>
          ) : (
            <div className="text-center">
              <p className={`text-2xl font-bold mb-4 ${isCorrect ? 'text-green-400' : 'text-red-400'}`}>
                {isCorrect ? 'Bonne réponse !' : 'Mauvaise réponse !'}
              </p>
              <p className="text-white">Retour à la grille dans quelques secondes...</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default QuestionPanel;
