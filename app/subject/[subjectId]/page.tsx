import { notFound } from 'next/navigation';
import QuizGrid from '@/components/home';
import { loadQuizzesForSubject } from '@/lib/quizLoader';
import { getSubjectMeta } from '@/lib/subjects';

type SubjectPageProps = Promise<{ subjectId: string }>;

export default async function SubjectPage(props: { params: SubjectPageProps }) {
  const { subjectId } = await props.params;

  try {
    const quizzes = await loadQuizzesForSubject(subjectId);
    const subject = getSubjectMeta(subjectId);

    return <QuizGrid subjectId={subjectId} subjectTitle={subject.title} quizzes={quizzes} />;
  } catch (error) {
    notFound();
  }
}
