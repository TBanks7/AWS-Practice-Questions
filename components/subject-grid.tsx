'use client';

import React from 'react';
import { Card } from '@/components/ui/card';
import Link from 'next/link';
import { BookOpen, FileQuestion } from 'lucide-react';
import { SubjectSummary } from '@/lib/quizLoader';

interface SubjectGridProps {
  subjects: SubjectSummary[];
}

const SubjectGrid: React.FC<SubjectGridProps> = ({ subjects }) => {
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Exam Prep Flashcards</h1>
        <p className="text-gray-600 mb-8">Choose a subject to start studying</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {subjects.map((subject) => (
            <Link
              key={subject.id}
              href={`/subject/${subject.id}`}
              className="block transform transition-transform hover:scale-105"
            >
              <Card className="h-full p-5 cursor-pointer hover:shadow-lg transition-shadow">
                <h2 className="text-xl font-semibold text-gray-900 mb-2">{subject.title}</h2>
                <p className="text-gray-600 text-sm mb-4">{subject.description}</p>
                <div className="flex items-center gap-4 text-gray-600 text-sm">
                  <div className="flex items-center">
                    <BookOpen className="w-4 h-4 mr-1.5" />
                    <span>{subject.quizCount} exams</span>
                  </div>
                  <div className="flex items-center">
                    <FileQuestion className="w-4 h-4 mr-1.5" />
                    <span>{subject.questionCount} questions</span>
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

export default SubjectGrid;
