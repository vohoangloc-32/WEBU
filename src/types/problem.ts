export interface AiGeneratedProblem {
  title?: string;
  description?: string;
  difficulty?: string;
  tags?: string[];
  group?: string;
  boilerplateCode?: {
    cpp?: string;
    java?: string;
    python?: string;
    typescript?: string;
  };
}
