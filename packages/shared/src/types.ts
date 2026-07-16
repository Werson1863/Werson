export type RuntimeKind = "sql" | "python";

export interface OutputMatchTest {
  type: "output_match";
  description: string;
  expected: string;
}

export interface OutputContainsTest {
  type: "output_contains";
  description: string;
  expected: string[];
}

export interface ExpectedRowCountTest {
  type: "expected_row_count";
  description: string;
  count: number;
}

export interface ColumnNamesTest {
  type: "column_names";
  description: string;
  columns: string[];
}

export interface FunctionReturnsTest {
  type: "function_returns";
  description: string;
  fn: string;
  args: unknown[];
  expected: unknown;
}

export interface RegexMatchTest {
  type: "regex_match";
  description: string;
  pattern: string;
  target?: "code" | "output";
}

export type TestCase =
  | OutputMatchTest
  | OutputContainsTest
  | ExpectedRowCountTest
  | ColumnNamesTest
  | FunctionReturnsTest
  | RegexMatchTest;

export interface Lesson {
  id: string;
  title: string;
  runtime: RuntimeKind;
  setup?: string;
  starterCode: string;
  solution: string;
  tests: TestCase[];
  hints?: string[];
}

export interface CourseLessonRef {
  id: string;
  title: string;
  path: string;
}

export interface Course {
  id: string;
  title: string;
  description: string;
  runtime: RuntimeKind;
  lessons: CourseLessonRef[];
}

export type ProgressStatus = "not_started" | "in_progress" | "completed";

export interface Progress {
  id: string;
  userId: string;
  lessonId: string;
  status: ProgressStatus;
  lastCode?: string | null;
  completedAt?: string | null;
  updatedAt: string;
}

export interface RunResult {
  columns?: string[];
  rows?: unknown[][];
  stdout?: string;
  error?: string | null;
}

export interface TestResult {
  description: string;
  passed: boolean;
  message: string;
}

export interface GradeResult {
  passed: boolean;
  results: TestResult[];
}

export interface AuthTokens {
  accessToken: string;
}

export interface PublicUser {
  id: string;
  email: string;
  createdAt: string;
}
