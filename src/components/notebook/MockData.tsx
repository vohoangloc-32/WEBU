export interface ProblemType {
  id: string;
  dbId?: string;
  title: string;
  description: string;
  tags: string[];
  group: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  isFavorite: boolean;
  isCustom?: boolean;
  isSuggested?: boolean;
  isInteracted?: boolean;
  createdBy?: string;
}
