import SubjectGrid from '@/components/subject-grid';
import { loadAllSubjects } from '@/lib/quizLoader';

export default async function Home() {
  const subjects = await loadAllSubjects();

  return <SubjectGrid subjects={subjects} />;
}
