export interface SubjectMeta {
  id: string;
  title: string;
  description: string;
}

export const SUBJECTS: SubjectMeta[] = [
  {
    id: 'aws',
    title: 'AWS Cloud Practitioner',
    description: 'Practice exams for the AWS Certified Cloud Practitioner exam',
  },
  {
    id: 'ifc',
    title: 'Investment Funds in Canada (IFC)',
    description: 'Chapter-by-chapter practice questions for the CSI IFC licensing course',
  },
];

export function getSubjectMeta(id: string): SubjectMeta {
  return (
    SUBJECTS.find((s) => s.id === id) || {
      id,
      title: id,
      description: '',
    }
  );
}
