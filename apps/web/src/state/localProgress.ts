import type { ProgressStatus } from "@codecademy-clone/shared";

const STORAGE_KEY = "codelearn:progress:v1";

export interface LocalProgressEntry {
  status: ProgressStatus;
  lastCode?: string;
}

type LocalProgressMap = Record<string, LocalProgressEntry>;

function readAll(): LocalProgressMap {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as LocalProgressMap) : {};
  } catch {
    return {};
  }
}

function writeAll(map: LocalProgressMap): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(map));
  } catch {
    // Storage full or unavailable (e.g. private browsing) — progress just won't persist.
  }
}

export function getLessonProgress(lessonId: string): LocalProgressEntry | undefined {
  return readAll()[lessonId];
}

export function getAllProgress(): LocalProgressMap {
  return readAll();
}

export function saveLessonCode(lessonId: string, code: string): void {
  const all = readAll();
  const existing = all[lessonId];
  if (existing?.status === "completed") {
    all[lessonId] = { ...existing, lastCode: code };
  } else {
    all[lessonId] = { status: "in_progress", lastCode: code };
  }
  writeAll(all);
}

export function markLessonCompleted(lessonId: string, code: string): void {
  const all = readAll();
  all[lessonId] = { status: "completed", lastCode: code };
  writeAll(all);
}
