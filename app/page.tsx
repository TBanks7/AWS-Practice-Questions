// import { promises as fs } from 'fs';
// import path from 'path';
// import Flashcard from '@/components/flashcard';
// import { parseQuestionsMarkdown } from '@/lib/parser';
// import QuizGrid from '@/components/home';

// export default async function Home() {
//   const markdown = await fs.readFile(
//     path.join(process.cwd(), 'public/questions/practice-exam-1.md'),
//     'utf-8'
//   );
  
//   const questions = parseQuestionsMarkdown(markdown);

//   return (
//     <main className="min-h-screen bg-gray-100">
//       {/* <Flashcard questions={questions} /> */}
//       <QuizGrid quizzes={[{ id: '1', title: 'AWS Cloud Practitioner Practice Exams', questionCount: questions.length }]} />
//     </main>
//   );
// }


import { promises as fs } from 'fs';
import path from 'path';
import QuizGrid from '@/components/home';
import { parseQuestionsMarkdown } from '@/lib/parser'
import { loadAllQuizzes } from '@/lib/quizLoader';

export default async function Home() {
  const quizzes = await loadAllQuizzes();
  // const quizzesDir = path.join(process.cwd(), 'public/questions');
  // const files = await fs.readdir(quizzesDir);
  // const markdownFiles = files.filter(file => file.endsWith('.md'));

  // const quizzes = await Promise.all(
  //   markdownFiles.slice(0, 4).map(async (file) => {
  //     const content = await fs.readFile(path.join(quizzesDir, file), 'utf-8');
  //     const questions = parseQuestionsMarkdown(content);
  //     const id = file.replace('.md', '');
      
  //     return {
  //       id,
  //       title: `Practice Exam ${id.split('-').pop()}`,
  //       questionCount: questions.length
  //     };
  //   })
  // );

  return <QuizGrid quizzes={quizzes} />;
}
