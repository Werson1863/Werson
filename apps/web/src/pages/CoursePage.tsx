import { Link, useParams } from "react-router-dom";
import { getCourse } from "../content/loader";
import { useProgress } from "../state/ProgressContext";
import { ProgressBar } from "../components/ProgressBar";

const statusIcon: Record<string, string> = {
  completed: "✓",
  in_progress: "●",
  not_started: "○",
};

export function CoursePage() {
  const { courseId } = useParams<{ courseId: string }>();
  const course = courseId ? getCourse(courseId) : undefined;
  const progress = useProgress().getAllProgress();

  if (!course) {
    return <div className="p-6 text-red-400">Kurzus nem található: {courseId}</div>;
  }

  const completedCount = course.lessons.filter((l) => progress[l.id]?.status === "completed").length;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-6">
      <Link to="/" className="text-slate-400 text-sm hover:text-slate-200">
        ← Kurzusok
      </Link>
      <h1 className="text-3xl font-bold mt-2 mb-1">{course.title}</h1>
      <p className="text-slate-400 mb-4">{course.description}</p>

      <div className="max-w-md mb-6">
        <ProgressBar completed={completedCount} total={course.lessons.length} />
      </div>

      <ol data-testid="lesson-list" className="max-w-md space-y-2">
        {course.lessons.map((lessonRef, i) => {
          const status = progress[lessonRef.id]?.status ?? "not_started";
          return (
            <li key={lessonRef.id}>
              <Link
                to={`/courses/${course.id}/${lessonRef.path}`}
                className="flex items-center gap-3 border border-slate-800 rounded p-3 hover:border-emerald-600 transition-colors"
              >
                <span
                  className={
                    status === "completed"
                      ? "text-emerald-400"
                      : status === "in_progress"
                        ? "text-amber-400"
                        : "text-slate-600"
                  }
                >
                  {statusIcon[status]}
                </span>
                <span className="text-slate-500 text-sm w-6">{i + 1}.</span>
                <span>{lessonRef.title}</span>
              </Link>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
