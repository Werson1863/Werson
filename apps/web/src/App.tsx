import { useEffect, useState } from "react";
import { apiFetch } from "./lib/api";

function App() {
  const [apiStatus, setApiStatus] = useState<"loading" | "ok" | "error">("loading");

  useEffect(() => {
    apiFetch("/api/health")
      .then((res) => res.json())
      .then((data) => setApiStatus(data.ok ? "ok" : "error"))
      .catch(() => setApiStatus("error"));
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex items-center justify-center">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold">CodeLearn</h1>
        <p className="text-slate-400">
          API status:{" "}
          <span
            className={
              apiStatus === "ok"
                ? "text-emerald-400"
                : apiStatus === "error"
                  ? "text-red-400"
                  : "text-slate-400"
            }
          >
            {apiStatus}
          </span>
        </p>
      </div>
    </div>
  );
}

export default App;
