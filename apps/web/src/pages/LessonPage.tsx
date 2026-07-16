import { useEffect, useMemo, useRef, useState } from "react";
import CodeMirror from "@uiw/react-codemirror";
import { sql as sqlLang } from "@codemirror/lang-sql";
import { python as pythonLang } from "@codemirror/lang-python";
import ReactMarkdown from "react-markdown";
import type { GradeResult, RunResult, Lesson } from "@codecademy-clone/shared";
import { getInstructions, getLesson } from "../content/loader";
import { SqlRuntime } from "../runtime/sqlRuntime";
import { OutputPanel } from "../components/OutputPanel";
import { TestResultsPanel } from "../components/TestResultsPanel";
import { grade } from "../grader/grade";

const sqlRuntime = new SqlRuntime();
let sqlRuntimeInit: Promise<void> | null = null;

function ensureSqlRuntime(): Promise<void> {
  if (!sqlRuntimeInit) {
    sqlRuntimeInit = sqlRuntime.init();
  }
  return sqlRuntimeInit;
}

export function LessonPage({ lessonId }: { lessonId: string }) {
  const lesson: Lesson | undefined = useMemo(() => getLesson(lessonId), [lessonId]);
  const instructions = useMemo(() => getInstructions(lessonId) ?? "", [lessonId]);

  const [code, setCode] = useState(lesson?.starterCode ?? "");
  const [result, setResult] = useState<RunResult | null>(null);
  const [grading, setGrading] = useState<GradeResult | null>(null);
  const [running, setRunning] = useState(false);
  const [runtimeReady, setRuntimeReady] = useState(false);
  const mounted = useRef(true);

  useEffect(() => {
    setCode(lesson?.starterCode ?? "");
    setResult(null);
    setGrading(null);
  }, [lessonId, lesson?.starterCode]);

  useEffect(() => {
    mounted.current = true;
    if (lesson?.runtime === "sql") {
      ensureSqlRuntime().then(() => {
        if (mounted.current) setRuntimeReady(true);
      });
    }
    return () => {
      mounted.current = false;
    };
  }, [lesson?.runtime]);

  if (!lesson) {
    return <div className="p-6 text-red-400">Lecke nem található: {lessonId}</div>;
  }

  const onRun = async () => {
    setRunning(true);
    setGrading(null);
    try {
      if (lesson.runtime === "sql") {
        await ensureSqlRuntime();
        const r = sqlRuntime.run(lesson.setup ?? "", code);
        setResult(r);
        const g = await grade(r, lesson.tests, { code });
        setGrading(g);
      }
    } finally {
      setRunning(false);
    }
  };

  const extensions = lesson.runtime === "sql" ? [sqlLang()] : [pythonLang()];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col md:flex-row">
      <div className="md:w-1/2 p-6 overflow-auto border-b md:border-b-0 md:border-r border-slate-800">
        <h1 className="text-2xl font-bold mb-4">{lesson.title}</h1>
        <div className="prose prose-invert max-w-none">
          <ReactMarkdown>{instructions}</ReactMarkdown>
        </div>
      </div>

      <div className="md:w-1/2 p-6 flex flex-col gap-3">
        <div className="border border-slate-800 rounded overflow-hidden">
          <CodeMirror
            value={code}
            height="300px"
            theme="dark"
            extensions={extensions}
            onChange={(value) => setCode(value)}
          />
        </div>

        <div className="flex items-center gap-3">
          <button
            data-testid="run-button"
            onClick={onRun}
            disabled={running || (lesson.runtime === "sql" && !runtimeReady)}
            className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white rounded font-medium"
          >
            {running ? "Futtatás..." : "Run"}
          </button>
          {lesson.runtime === "sql" && !runtimeReady && (
            <span className="text-slate-400 text-sm">SQL motor betöltése...</span>
          )}
        </div>

        <div data-testid="output-panel" className="flex-1">
          <OutputPanel result={result} running={running} />
        </div>

        <TestResultsPanel grading={grading} />
      </div>
    </div>
  );
}
