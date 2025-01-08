interface QuestionOption {
  letter: string;
  text: string;
}

interface Question {
  id: number;
  question: string;
  options: QuestionOption[];
  answer: string;
  multipleAnswers: boolean;
}

export function parseQuestionsMarkdown(markdown: string): Question[] {
  // Remove frontmatter and initial description
  const content = markdown.replace(/^---\n[\s\S]*?\n---\n/, '')
    .replace(/^#[\s\S]*?\n---\n/, '');
  
  // Split into individual questions
  const questionBlocks = content.split(/(?=^\d+\.)/m)
    .filter(block => block.trim().match(/^\d+\./));
  
  return questionBlocks.map((block, index) => {
    const lines = block.split('\n').map(line => line.trim()).filter(Boolean);
    
    // Get question number and text
    const questionMatch = lines[0].match(/^\d+\.\s*(.+)/);
    if (!questionMatch) throw new Error(`Could not parse question ${index + 1}`);
    
    const question: Question = {
      id: index + 1,
      question: questionMatch[1],
      options: [],
      answer: '',
      multipleAnswers: questionMatch[1].includes('(Choose TWO)')
    };
    
    // Parse the rest of the block
    for (let i = 1; i < lines.length; i++) {
      // Parse options
      const optionMatch = lines[i].match(/^-\s*([A-E])\.\s*(.+)\.?$/);
      if (optionMatch) {
        question.options.push({
          letter: optionMatch[1],
          text: optionMatch[2].replace(/\.$/, '') // Remove trailing period if exists
        });
        continue;
      }
      
      // Parse answer from details tag
      if (lines[i].includes('<details')) {
        // Look for the answer in the next few lines
        while (i < lines.length) {
          const answerMatch = lines[i].match(/Correct Answer:\s*([A-E](?:,\s*[A-E])*)/i);
          if (answerMatch) {
            question.answer = answerMatch[1];
            break;
          }
          i++;
        }
      }
    }
    
    // Validate question
    if (!question.answer) {
      throw new Error(`No answer found for question ${index + 1}`);
    }
    
    if (question.options.length === 0) {
      throw new Error(`No options found for question ${index + 1}`);
    }
    
    return question;
  });
}

// Example usage:
/*
import { promises as fs } from 'fs';
import path from 'path';

async function loadQuestions() {
  const markdown = await fs.readFile(
    path.join(process.cwd(), 'public/questions/practice-exam-1.md'),
    'utf-8'
  );
  
  return parseQuestionsMarkdown(markdown);
}
*/