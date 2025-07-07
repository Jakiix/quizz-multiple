import React from 'react';

interface GameGridProps {
  onQuestionSelect: (theme: number, level: number) => void;
  answeredQuestions: Set<number>;
}

const themes = [
  'Pays du monde', 'Cuisine', 'Pixar', 'Bande dessinée', 'Science', 'Vériété française', 'La Réunion'
];

const values = [1, 2, 3];

const GameGrid: React.FC<GameGridProps> = ({ onQuestionSelect, answeredQuestions }) => {
  const getQuestionId = (theme: number, level: number) => theme * 10 + level;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center text-white mb-8 animate-fade-in">
        Qui veut gagner des bonbons
      </h1>
      
      <div className="grid grid-cols-7 gap-4 max-w-6xl mx-auto">
        {/* En-têtes des thèmes */}
        {themes.map((theme, index) => (
          <div
            key={`theme-${index}`}
            className="bg-gradient-to-r from-yellow-400 to-yellow-600 p-4 rounded-lg text-center font-bold text-black shadow-lg animate-scale-in"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <h3 className="text-sm font-semibold">{theme}</h3>
          </div>
        ))}
        
        {/* Grille des questions */}
        {values.map((value, levelIndex) => (
          themes.map((_, themeIndex) => {
            const questionId = getQuestionId(themeIndex, levelIndex);
            const isAnswered = answeredQuestions.has(questionId);
            
            return (
              <button
                key={`${themeIndex}-${levelIndex}`}
                onClick={() => !isAnswered && onQuestionSelect(themeIndex, levelIndex)}
                disabled={isAnswered}
                className={`
                  p-6 rounded-lg text-2xl font-bold transition-all duration-300 transform hover:scale-105
                  ${isAnswered 
                    ? 'bg-gray-600 text-gray-400 cursor-not-allowed opacity-50' 
                    : 'bg-gradient-to-r from-blue-500 to-blue-700 text-white hover:from-blue-600 hover:to-blue-800 shadow-lg hover:shadow-xl cursor-pointer'
                  }
                  animate-fade-in
                `}
                style={{ animationDelay: `${(levelIndex * 7 + themeIndex) * 0.05}s` }}
              >
                {value}
              </button>
            );
          })
        ))}
      </div>
    </div>
  );
};

export default GameGrid;
