'use client';

import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, RotateCcw, Check, X } from 'lucide-react';

interface QuestionOption {
  letter: string;
  text: string;
}

interface Question {
  id: number;
  question: string;
  options: QuestionOption[];
  answer: string;
  multipleAnswers?: boolean;
}

interface FlashcardProps {
  questions: Question[];
}

const Flashcard: React.FC<FlashcardProps> = ({ questions }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [selectedAnswers, setSelectedAnswers] = useState<string[]>([]);
  const [answeredQuestions, setAnsweredQuestions] = useState<Record<number, boolean>>({});

  const currentQuestion = questions[currentIndex];
  const isAnswered = currentQuestion.multipleAnswers ? selectedAnswers.length === 2 : selectedAnswers.length > 0;
  const isCorrect = selectedAnswers.sort().join(',') === currentQuestion.answer.split(', ').sort().join(',');

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setIsFlipped(false);
      setSelectedAnswers([]);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      setIsFlipped(false);
      setSelectedAnswers([]);
    }
  };

  const handleOptionSelect = (letter: string) => {
    if (!isAnswered) {
      if (currentQuestion.multipleAnswers) {
        setSelectedAnswers(prev => {
          const newAnswers = prev.includes(letter) ? prev.filter(ans => ans !== letter) : [...prev, letter];
          if (newAnswers.length === 2) {
            setAnsweredQuestions({
              ...answeredQuestions,
              [currentQuestion.id]: newAnswers.sort().join(',') === currentQuestion.answer.split(', ').sort().join(',')
            });
          }
          return newAnswers;
        });
      } else {
        setSelectedAnswers([letter]);
        setAnsweredQuestions({
          ...answeredQuestions,
          [currentQuestion.id]: letter === currentQuestion.answer
        });
      }
    }
  };

  const handleReset = () => {
    setSelectedAnswers([]);
    setIsFlipped(false);
  };

  const getProgressStats = () => {
    const answered = Object.keys(answeredQuestions).length;
    const correct = Object.values(answeredQuestions).filter(Boolean).length;
    return {
      answered,
      correct,
      total: questions.length,
      percentage: Math.round((correct / Math.max(answered, 1)) * 100)
    };
  };

  const stats = getProgressStats();

  return (
    <div className="min-h-screen bg-gray-100 p-4 flex flex-col items-center">
      <div className="w-full max-w-md">
        {/* Progress stats */}
        <div className="mb-6 bg-white rounded-lg p-4 shadow-sm">
          <div className="flex justify-between mb-2">
            <span className="text-sm text-gray-600">Question {currentIndex + 1} of {questions.length}</span>
            <span className="text-sm font-medium">
              Score: {stats.percentage}% ({stats.correct}/{stats.answered})
            </span>
          </div>
          <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
            <div 
              className="h-full bg-blue-500 transition-all duration-300"
              style={{ width: `${((currentIndex + 1) / questions.length) * 100}%` }}
            />
          </div>
        </div>

        {/* Question card */}
        <Card className="w-full p-6 mb-4">
          <h3 className="text-lg font-semibold mb-6">{currentQuestion.question}</h3>
          
          <div className="space-y-3">
            {currentQuestion.options.map((option) => (
              <button
                key={option.letter}
                className={`w-full p-4 text-left rounded-lg border transition-all
                  ${!isAnswered && 'hover:bg-gray-50'}
                  ${selectedAnswers.includes(option.letter) && selectedAnswers.length === 1 && 'bg-gray-100 border-gray-500'}
                  ${isAnswered && currentQuestion.answer.includes(option.letter) && 'bg-green-100 border-green-500'}
                  ${isAnswered && selectedAnswers.includes(option.letter) && !currentQuestion.answer.includes(option.letter) && 'bg-red-100 border-red-500'}
                  ${isAnswered && !selectedAnswers.includes(option.letter) && !currentQuestion.answer.includes(option.letter) && 'opacity-50'}
                `}
                onClick={() => handleOptionSelect(option.letter)}
                disabled={isAnswered && !currentQuestion.multipleAnswers}
              >
                <div className="flex items-center">
                  <span className="font-medium mr-2">{option.letter}.</span>
                  <span className="flex-1">{option.text}</span>
                  {isAnswered && currentQuestion.answer.includes(option.letter) && (
                    <Check className="w-5 h-5 text-green-600 ml-2" />
                  )}
                  {isAnswered && selectedAnswers.includes(option.letter) && !currentQuestion.answer.includes(option.letter) && (
                    <X className="w-5 h-5 text-red-600 ml-2" />
                  )}
                </div>
              </button>
            ))}
          </div>

          {isAnswered && (
            <div className="mt-6">
              <div className={`p-4 rounded-lg ${isCorrect ? 'bg-green-100' : 'bg-red-100'}`}>
                <p className={`font-medium ${isCorrect ? 'text-green-800' : 'text-red-800'}`}>
                  {isCorrect ? 'Correct!' : 'Incorrect!'} The answer is {currentQuestion.answer}.
                </p>
              </div>
            </div>
          )}
        </Card>

        {/* Navigation controls */}
        <div className="flex justify-between items-center">
          <Button
            variant="outline"
            onClick={handlePrevious}
            disabled={currentIndex === 0}
          >
            <ChevronLeft className="w-4 h-4 mr-2" />
            Previous
          </Button>
          
          <Button
            variant="outline"
            onClick={handleReset}
            disabled={!isAnswered}
          >
            <RotateCcw className="w-4 h-4 mr-2" />
            Try Again
          </Button>

          <Button
            variant="outline"
            onClick={handleNext}
            disabled={currentIndex === questions.length - 1}
          >
            Next
            <ChevronRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Flashcard;