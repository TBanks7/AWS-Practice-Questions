import { promises as fs } from 'fs';
import path from 'path';

export interface QuizMetadata {
  id: string;
  title: string;
  questionCount: number;
  estimatedTime: string;
  progress?: {
    completed: number;
    score: number;
  };
}

export async function loadAllQuizzes(): Promise<QuizMetadata[]> {
  const quizzesDir = path.join(process.cwd(), 'public/questions');
  const files = await fs.readdir(quizzesDir);
  const mdFiles = files.filter(file => file.endsWith('.md'));
  
  const quizzes: QuizMetadata[] = await Promise.all(
    mdFiles.map(async (file) => {
      const content = await fs.readFile(path.join(quizzesDir, file), 'utf-8');
      
      // Extract quiz number from filename (e.g., "practice-exam-1.md" -> "1")
      const quizNumber = file.match(/practice-exam-(\d+)\.md/)?.[1];
      
      // Count questions by counting digit-followed-by-period patterns
      const questionCount = (content.match(/^\d+\./gm) || []).length;
      
      // Calculate estimated time (assuming 1.5 minutes per question)
      const estimatedMinutes = questionCount * 1.5;
      const hours = Math.floor(estimatedMinutes / 60);
      const minutes = Math.round(estimatedMinutes % 60);
      const estimatedTime = hours > 0 
        ? `${hours}h ${minutes}m`
        : `${minutes} minutes`;
      
      return {
        id: quizNumber || file.replace('.md', ''),
        title: `Practice Exam ${quizNumber || file}`,
        questionCount,
        estimatedTime,
        // You can load actual progress from localStorage or a backend
        progress: {
            completed: 0, // Number of questions completed
            score: 0, // Best score in percentage
        }
      };
    })
  );
  
  // Sort by quiz number
  return quizzes.sort((a, b) => parseInt(a.id) - parseInt(b.id));
}