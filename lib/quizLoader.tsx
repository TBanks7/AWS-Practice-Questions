import { promises as fs } from 'fs';
import path from 'path';
import { getQuizTitle } from './parser';
import { getSubjectMeta, SubjectMeta } from './subjects';

export interface QuizMetadata {
  id: string;
  title: string;
  questionCount: number;
  estimatedTime: string;
}

export interface SubjectSummary extends SubjectMeta {
  quizCount: number;
  questionCount: number;
}

const QUESTIONS_DIR = path.join(process.cwd(), 'public/questions');

function estimateTime(questionCount: number): string {
  const estimatedMinutes = questionCount * 1.5;
  const hours = Math.floor(estimatedMinutes / 60);
  const minutes = Math.round(estimatedMinutes % 60);
  return hours > 0 ? `${hours}h ${minutes}m` : `${minutes} minutes`;
}

export async function loadAllSubjects(): Promise<SubjectSummary[]> {
  const entries = await fs.readdir(QUESTIONS_DIR, { withFileTypes: true });
  const subjectDirs = entries.filter((entry) => entry.isDirectory());

  const subjects = await Promise.all(
    subjectDirs.map(async (dir) => {
      const subjectPath = path.join(QUESTIONS_DIR, dir.name);
      const files = (await fs.readdir(subjectPath)).filter((f) => f.endsWith('.md'));

      let questionCount = 0;
      for (const file of files) {
        const content = await fs.readFile(path.join(subjectPath, file), 'utf-8');
        questionCount += (content.match(/^\d+\./gm) || []).length;
      }

      return {
        ...getSubjectMeta(dir.name),
        quizCount: files.length,
        questionCount,
      };
    })
  );

  return subjects;
}

export async function loadQuizzesForSubject(subjectId: string): Promise<QuizMetadata[]> {
  const subjectPath = path.join(QUESTIONS_DIR, subjectId);
  const files = (await fs.readdir(subjectPath)).filter((f) => f.endsWith('.md'));

  const quizzes: QuizMetadata[] = await Promise.all(
    files.map(async (file) => {
      const content = await fs.readFile(path.join(subjectPath, file), 'utf-8');
      const id = file.replace('.md', '');
      const questionCount = (content.match(/^\d+\./gm) || []).length;

      return {
        id,
        title: getQuizTitle(content) || id,
        questionCount,
        estimatedTime: estimateTime(questionCount),
      };
    })
  );

  return quizzes.sort((a, b) => a.id.localeCompare(b.id, undefined, { numeric: true }));
}
