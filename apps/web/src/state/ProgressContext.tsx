import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import type { Progress, ProgressStatus } from "@codecademy-clone/shared";
import { useAuth } from "./AuthContext";
import { authFetch } from "../lib/authFetch";
import * as local from "./localProgress";

interface ProgressEntry {
  status: ProgressStatus;
  lastCode?: string;
}

interface ProgressContextValue {
  getLessonProgress: (lessonId: string) => ProgressEntry | undefined;
  getAllProgress: () => Record<string, ProgressEntry>;
  saveCode: (lessonId: string, code: string) => void;
  markCompleted: (lessonId: string, code: string) => void;
}

const ProgressContext = createContext<ProgressContextValue | null>(null);

export function ProgressProvider({ children }: { children: ReactNode }) {
  const { user, accessToken } = useAuth();
  const [map, setMap] = useState<Record<string, ProgressEntry>>({});

  useEffect(() => {
    if (!user || !accessToken) {
      setMap(local.getAllProgress());
      return;
    }
    authFetch("/api/progress", accessToken).then(async (res) => {
      if (!res.ok) return;
      const rows: Progress[] = await res.json();
      const next: Record<string, ProgressEntry> = {};
      for (const row of rows) {
        next[row.lessonId] = { status: row.status, lastCode: row.lastCode ?? undefined };
      }
      setMap(next);
    });
  }, [user, accessToken]);

  const persist = useCallback(
    (lessonId: string, entry: ProgressEntry) => {
      setMap((prev) => ({ ...prev, [lessonId]: entry }));
      if (user && accessToken) {
        authFetch(`/api/progress/${encodeURIComponent(lessonId)}`, accessToken, {
          method: "PUT",
          body: JSON.stringify(entry),
        }).catch(() => {});
      } else if (entry.status === "completed") {
        local.markLessonCompleted(lessonId, entry.lastCode ?? "");
      } else {
        local.saveLessonCode(lessonId, entry.lastCode ?? "");
      }
    },
    [user, accessToken],
  );

  const saveCode = useCallback(
    (lessonId: string, code: string) => persist(lessonId, { status: "in_progress", lastCode: code }),
    [persist],
  );

  const markCompleted = useCallback(
    (lessonId: string, code: string) => persist(lessonId, { status: "completed", lastCode: code }),
    [persist],
  );

  const getLessonProgress = useCallback((lessonId: string) => map[lessonId], [map]);
  const getAllProgress = useCallback(() => map, [map]);

  const value = useMemo(
    () => ({ getLessonProgress, getAllProgress, saveCode, markCompleted }),
    [getLessonProgress, getAllProgress, saveCode, markCompleted],
  );

  return <ProgressContext.Provider value={value}>{children}</ProgressContext.Provider>;
}

export function useProgress(): ProgressContextValue {
  const ctx = useContext(ProgressContext);
  if (!ctx) throw new Error("useProgress must be used within ProgressProvider");
  return ctx;
}
