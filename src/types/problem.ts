export interface AiGeneratedProblem {
  title?: string;
  description?: string;
  difficulty?: string;
  tags?: string[];
  course?: string;
  boilerplateCode?: {
    cpp?: string;
    java?: string;
    python?: string;
    typescript?: string;
  };
}
