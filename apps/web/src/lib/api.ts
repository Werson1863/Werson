export const API_BASE_URL = import.meta.env.VITE_API_URL ?? "http://localhost:3000";

export async function apiFetch(path: string, init?: RequestInit): Promise<Response> {
  return fetch(`${API_BASE_URL}${path}`, {
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      ...(init?.headers ?? {}),
    },
    ...init,
  });
}
