'use client';

import React from 'react';
import { Card } from '@/components/ui/card';
import Link from 'next/link';
import { BookOpen, Clock, Award } from 'lucide-react';

interface QuizMetadata {
  id: string;
  title: string;
  questionCount: number;
  estimatedTime: string;
  progress?: {
    completed: number;
    score: number;
  };
}

interface QuizGridProps {
  quizzes: QuizMetadata[];
}

const QuizGrid: React.FC<QuizGridProps> = ({ quizzes }) => {
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">AWS Cloud Practitioner</h1>
        <p className="text-gray-600 mb-8">Select a practice exam to begin studying</p>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {quizzes.map((quiz) => (
            <Link 
              key={quiz.id} 
              href={`/quiz/${quiz.id}`}
              className="block transform transition-transform hover:scale-105"
            >
              <Card className="h-full p-3 cursor-pointer hover:shadow-lg transition-shadow">
                <div className="flex flex-col h-full">
                  <div className="flex-1">
                    <h2 className="text-md font-semibold text-gray-900 mb-2">
                      {quiz.title}
                    </h2>
                    
                    <div className="space-y-3 mb-4">
                      <div className="flex items-center text-gray-600 text-nowrap">
                        <BookOpen className="w-5 h-5 mr-2" />
                        <span>{quiz.questionCount} Questions</span>
                      </div>
                      
                      {/* <div className="flex items-center text-gray-600">
                        <Clock className="w-5 h-5 mr-2" />
                        <span>{quiz.estimatedTime}</span>
                      </div> */}
                      
                      {quiz.progress && (
                        <div className="flex items-center text-gray-600 text-nowrap">
                          <Award className="w-5 h-5 mr-2" />
                          <span>Top Score : {quiz.progress.score}</span>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  {/* {quiz.progress && (
                    <div className="mt-4">
                      <div className="flex justify-between text-sm text-gray-600 mb-1">
                        <span>Progress</span>
                        <span>{Math.round((quiz.progress.completed / quiz.questionCount) * 100)}%</span>
                      </div>
                      <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-blue-500 transition-all duration-300"
                          style={{ 
                            width: `${(quiz.progress.completed / quiz.questionCount) * 100}%` 
                          }}
                        />
                      </div>
                    </div>
                  )} */}
                  
                  {quiz.progress && (
                    <div className="mt-4">
                      <span className="inline-block px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                        Not Started
                      </span>
                    </div>
                  )}
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default QuizGrid;