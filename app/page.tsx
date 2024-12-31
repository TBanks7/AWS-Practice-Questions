import { promises as fs } from 'fs';
import path from 'path';
import Flashcard from '@/components/flashcard';
import { parseQuestionsMarkdown } from '@/lib/parser';

export default async function Home() {
  const markdown = await fs.readFile(
    path.join(process.cwd(), 'public/questions/practice-exam-1.md'),
    'utf-8'
  );
  
  const questions = parseQuestionsMarkdown(markdown);

  return (
    <main className="min-h-screen bg-gray-100">
      <Flashcard questions={questions} />
    </main>
  );
}