export interface Ebook {
  id: string;
  title: string;
  description: string;
  tags: string[];
  githubUrl: string;
  pagesUrl: string | null;
  hasPages: boolean;
  language: string | null;
  year: number;
  stars?: number;
  forks?: number;
  lastUpdated?: string;
  category?: 'Backend' | 'Frontend' | 'DevOps' | 'Mobile' | 'Data' | 'Other';
  level?: 'Básico' | 'Intermedio' | 'Avanzado' | 'Beginner' | 'Intermediate' | 'Advanced';
}
