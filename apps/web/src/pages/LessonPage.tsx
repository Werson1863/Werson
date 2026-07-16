import { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import CodeMirror from "@uiw/react-codemirror";
import { sql as sqlLang } from "@codemirror/lang-sql";
import { python as pythonLang } from "@codemirror/lang-python";
import ReactMarkdown from "react-markdown";
import type { GradeResult, RunResult, Lesson } from "@codecademy-clone/shared";
import { getCourseForLesson, getInstructions, getLesson } from "../content/loader";
import { SqlRuntime } from "../runtime/sqlRuntime";
import type { PythonRuntime } from "../runtime/pythonRuntime";
import { OutputPanel } from "../components/OutputPanel";
import { TestResultsPanel } from "../components/TestResultsPanel";
import { grade } from "../grader/grade";
import { getLessonProgress, markLessonCompleted, saveLessonCode } from "../state/localProgress";

const sqlRuntime = new SqlRuntime();
let sqlRuntimeInit: Promise<void> | null = null;

function ensureSqlRuntime(): Promise<void> {
  if (!sqlRuntimeInit) {
    sqlRuntimeInit = sqlRuntime.init();
  }
  return sqlRuntimeInit;
}

// The "pyodide" module (and its ~10MB WASM runtime) is only imported the
// first time a Python lesson actually runs, so SQL-only sessions never pay
// for it.
let pythonRuntime: PythonRuntime | null = null;
let pythonRuntimeInit: Promise<void> | null = null;

function ensurePythonRuntime(): Promise<void> {
  if (!pythonRuntimeInit) {
    pythonRuntimeInit = import("../runtime/pythonRuntime").then(async ({ PythonRuntime }) => {
      pythonRuntime = new PythonRuntime();
      await pythonRuntime.init();
    });
  }
  return pythonRuntimeInit;
}

export function LessonPage({ lessonId }: { lessonId: string }) {
  const lesson: Lesson | undefined = useMemo(() => getLesson(lessonId), [lessonId]);
  const instructions = useMemo(() => getInstructions(lessonId) ?? "", [lessonId]);
  const course = useMemo(() => getCourseForLesson(lessonId), [lessonId]);

  const lessonIndex = course?.lessons.findIndex((l) => l.id === lessonId) ?? -1;
  const prevLesson = lessonIndex > 0 ? course?.lessons[lessonIndex - 1] : undefined;
  const nextLesson =
    course && lessonIndex >= 0 && lessonIndex < course.lessons.length - 1 ? course.lessons[lessonIndex + 1] : undefined;

  const [code, setCode] = useState(() => getLessonProgress(lessonId)?.lastCode ?? lesson?.starterCode ?? "");
  const [result, setResult] = useState<RunResult | null>(null);
  const [grading, setGrading] = useState<GradeResult | null>(null);
  const [running, setRunning] = useState(false);
  const [runtimeReady, setRuntimeReady] = useState(false);
  const mounted = useRef(true);

  useEffect(() => {
    setCode(getLessonProgress(lessonId)?.lastCode ?? lesson?.starterCode ?? "");
    setResult(null);
    setGrading(null);
  }, [lessonId, lesson?.starterCode]);

  useEffect(() => {
    mounted.current = true;
    setRuntimeReady(false);
    const ensure = lesson?.runtime === "sql" ? ensureSqlRuntime : lesson?.runtime === "python" ? ensurePythonRuntime : null;
    ensure?.().then(() => {
      if (mounted.current) setRuntimeReady(true);
    });
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
      let r: RunResult;
      let g: GradeResult;
      if (lesson.runtime === "sql") {
        await ensureSqlRuntime();
        r = sqlRuntime.run(lesson.setup ?? "", code);
        g = await grade(r, lesson.tests, { code });
      } else {
        await ensurePythonRuntime();
        const runtime = pythonRuntime!;
        r = await runtime.run(code);
        g = await grade(r, lesson.tests, {
          code,
          callFunction: (fn, args) => runtime.callFunction(fn, args),
        });
      }
      setResult(r);
      setGrading(g);
      if (g.passed) {
        markLessonCompleted(lessonId, code);
      } else {
        saveLessonCode(lessonId, code);
      }
    } finally {
      setRunning(false);
    }
  };

  const extensions = lesson.runtime === "sql" ? [sqlLang()] : [pythonLang()];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col md:flex-row">
      <div className="md:w-1/2 p-6 overflow-auto border-b md:border-b-0 md:border-r border-slate-800">
        {course && (
          <Link to={`/courses/${course.id}`} className="text-slate-400 text-sm hover:text-slate-200">
            ← {course.title}
          </Link>
        )}
        <h1 className="text-2xl font-bold mt-2 mb-4">{lesson.title}</h1>
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
            disabled={running || !runtimeReady}
            className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white rounded font-medium"
          >
            {running ? "Futtatás..." : "Run"}
          </button>
          {!runtimeReady && (
            <span data-testid="runtime-loading" className="text-slate-400 text-sm">
              {lesson.runtime === "python" ? "Python motor betöltése (ez eltarthat pár másodpercig)..." : "SQL motor betöltése..."}
            </span>
          )}
        </div>

        <div data-testid="output-panel" className="flex-1">
          <OutputPanel result={result} running={running} />
        </div>

        <TestResultsPanel grading={grading} />

        <div className="flex justify-between pt-2 border-t border-slate-800">
          {prevLesson ? (
            <Link
              to={`/courses/${course!.id}/${prevLesson.path}`}
              data-testid="prev-lesson"
              className="text-slate-300 hover:text-white text-sm"
            >
              ← Előző lecke
            </Link>
          ) : (
            <span />
          )}
          {nextLesson ? (
            <Link
              to={`/courses/${course!.id}/${nextLesson.path}`}
              data-testid="next-lesson"
              className="text-emerald-400 hover:text-emerald-300 text-sm"
            >
              Következő lecke →
            </Link>
          ) : (
            course && (
              <Link to={`/courses/${course.id}`} data-testid="back-to-course" className="text-emerald-400 hover:text-emerald-300 text-sm">
                Vissza a kurzushoz →
              </Link>
            )
          )}
        </div>
      </div>
    </div>
  );
}
