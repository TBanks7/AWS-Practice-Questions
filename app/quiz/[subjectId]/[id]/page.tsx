import { promises as fs } from 'fs';
import path from 'path';
import { notFound } from 'next/navigation';
import Flashcard from '@/components/flashcard';
import { parseQuestionsMarkdown } from '@/lib/parser';

type QuizPageProps = Promise<{ subjectId: string; id: string }>;

export default async function QuizPage(props: { params: QuizPageProps }) {
  const { subjectId, id } = await props.params;

  try {
    const markdown = await fs.readFile(
      path.join(process.cwd(), 'public/questions', subjectId, `${id}.md`),
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
