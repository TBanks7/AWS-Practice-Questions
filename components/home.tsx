'use client';

import React from 'react';
import { Card } from '@/components/ui/card';
import Link from 'next/link';
import { BookOpen } from 'lucide-react';
import { QuizMetadata } from '@/lib/quizLoader';

interface QuizGridProps {
  subjectId: string;
  subjectTitle: string;
  quizzes: QuizMetadata[];
}

const QuizGrid: React.FC<QuizGridProps> = ({ subjectId, subjectTitle, quizzes }) => {
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-6xl mx-auto">
        <Link href="/" className="text-sm text-blue-600 hover:text-blue-500">
          &larr; All subjects
        </Link>
        <h1 className="text-3xl font-bold text-gray-900 mt-2 mb-2">{subjectTitle}</h1>
        <p className="text-gray-600 mb-8">Select an exam to begin studying</p>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {quizzes.map((quiz) => (
            <Link
              key={quiz.id}
              href={`/quiz/${subjectId}/${quiz.id}`}
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
                    </div>
                  </div>
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
