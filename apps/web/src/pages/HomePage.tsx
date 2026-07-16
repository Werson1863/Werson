import { Link } from "react-router-dom";
import { getAllCourses } from "../content/loader";

export function HomePage() {
  const courses = getAllCourses();

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-6">
      <h1 className="text-3xl font-bold mb-6">CodeLearn</h1>
      {courses.length === 0 && <p className="text-slate-400">Jelenleg nincs elérhető kurzus.</p>}
      <div className="grid gap-4 md:grid-cols-2 max-w-3xl">
        {courses.map((course) => (
          <Link
            key={course.id}
            to={`/courses/${course.id}`}
            className="block border border-slate-800 rounded-lg p-5 hover:border-emerald-600 transition-colors"
          >
            <h2 className="text-xl font-semibold mb-2">{course.title}</h2>
            <p className="text-slate-400 text-sm mb-3">{course.description}</p>
            <span className="text-xs uppercase tracking-wide text-slate-500">
              {course.lessons.length} lecke · {course.runtime === "sql" ? "SQL" : "Python"}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
