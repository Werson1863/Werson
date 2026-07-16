import type { Course, Lesson } from "@codecademy-clone/shared";

const lessonModules = import.meta.glob<Lesson>("../../../../content/**/lesson.json", {
  eager: true,
  import: "default",
});

const instructionModules = import.meta.glob<string>("../../../../content/**/instructions.md", {
  eager: true,
  query: "?raw",
  import: "default",
});

const courseModules = import.meta.glob<Course>("../../../../content/*/course.json", {
  eager: true,
  import: "default",
});

function dirOf(path: string): string {
  return path.slice(0, path.lastIndexOf("/"));
}

const lessonsByDir = new Map<string, Lesson>();
for (const [path, lesson] of Object.entries(lessonModules)) {
  lessonsByDir.set(dirOf(path), lesson);
}

const instructionsByDir = new Map<string, string>();
for (const [path, md] of Object.entries(instructionModules)) {
  instructionsByDir.set(dirOf(path), md);
}

const lessonsById = new Map<string, Lesson>();
const instructionsById = new Map<string, string>();
for (const [dir, lesson] of lessonsByDir) {
  lessonsById.set(lesson.id, lesson);
  const md = instructionsByDir.get(dir);
  if (md) instructionsById.set(lesson.id, md);
}

const coursesById = new Map<string, Course>();
for (const course of Object.values(courseModules)) {
  coursesById.set(course.id, course);
}

export function getCourse(courseId: string): Course | undefined {
  return coursesById.get(courseId);
}

export function getAllCourses(): Course[] {
  return Array.from(coursesById.values());
}

export function getLesson(lessonId: string): Lesson | undefined {
  return lessonsById.get(lessonId);
}

export function getInstructions(lessonId: string): string | undefined {
  return instructionsById.get(lessonId);
}

/** Finds the course a lesson belongs to, by matching lessonId against each course's lesson list. */
export function getCourseForLesson(lessonId: string): Course | undefined {
  return getAllCourses().find((course) => course.lessons.some((l) => l.id === lessonId));
}
