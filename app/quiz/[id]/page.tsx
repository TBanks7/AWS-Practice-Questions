import { promises as fs } from 'fs';
import path from 'path';
import { notFound } from 'next/navigation';
import Flashcard from '@/components/flashcard';
import { parseQuestionsMarkdown } from '@/lib/parser';

type QuizPageProps = {
  params: {
    id: string;
  };
}

export default async function QuizPage({ params }: QuizPageProps) {
  try {
    const markdown = await fs.readFile(
      path.join(process.cwd(), 'public/questions', `practice-exam-${params.id}.md`),
      'utf-8'
    );
    
    const questions = parseQuestionsMarkdown(markdown);

    return (
      <div className="min-h-screen bg-gray-100">
        <Flashcard questions={questions} />
      </div>
    );
  } catch (error) {
    notFound();
  }
}