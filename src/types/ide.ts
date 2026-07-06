export type Language = 'javascript' | 'python' | 'cpp' | 'java' | 'typescript';

export interface BoilerplateCode {
  java?: string;
  python?: string;
  cpp?: string;
  typescript?: string;
  javascript?: string;
}

export interface CardContent {
  question_text: string;
  description: string;
}

export interface IdeData {
  boilerplate_code: BoilerplateCode;
}

export interface PublicTestCase {
  input: string;
  expected_output: string;
  order: number;
}

export interface CardDetail {
  id: string;
  title: string;
  group: string;
  tags: string[];
  content: CardContent;
  ide_data: IdeData;
  difficulty_level: 'Easy' | 'Medium' | 'Hard';
  public_test_cases: PublicTestCase[];
}

// Run Code result
export interface TestCaseResult {
  order: number;
  input: string;
  expected_output: string;
  actual_output: string | null;
  passed: boolean;
  status: string;
  execution_time: string | null;
  error: string | null;
}

export interface RunCodeResult {
  success: boolean;
  all_passed: boolean;
  results: TestCaseResult[];
}

// Submit result
export interface SubmitResult {
  submission_id: string;
  passed: boolean;
  status: string;
  total_tests: number;
  passed_tests: number;
  execution_time: number | null;
  memory_used: number | null;
  error_details: string | null;
  results: TestCaseResult[];
}

// Submission history
export interface SubmissionHistory {
  id: string;
  status: string;
  language: string;
  execution_time: number | null;
  memory_used: number | null;
  submitted_at: string;
  submitted_code: string;
  passed: boolean;
  note?: string;
}
