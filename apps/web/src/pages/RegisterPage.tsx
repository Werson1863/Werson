import { useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../state/AuthContext";

export function RegisterPage() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    try {
      await register(email, password);
      navigate("/", { replace: true });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Ismeretlen hiba történt.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex items-center justify-center p-6">
      <form onSubmit={onSubmit} className="w-full max-w-sm space-y-4 border border-slate-800 rounded-lg p-6">
        <h1 className="text-2xl font-bold">Regisztráció</h1>
        {error && (
          <p data-testid="auth-error" className="text-red-400 text-sm">
            {error}
          </p>
        )}
        <div>
          <label className="block text-sm text-slate-400 mb-1">E-mail</label>
          <input
            data-testid="email-input"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded bg-slate-900 border border-slate-700 px-3 py-2 text-slate-100"
          />
        </div>
        <div>
          <label className="block text-sm text-slate-400 mb-1">Jelszó (min. 8 karakter)</label>
          <input
            data-testid="password-input"
            type="password"
            required
            minLength={8}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded bg-slate-900 border border-slate-700 px-3 py-2 text-slate-100"
          />
        </div>
        <button
          data-testid="submit-button"
          type="submit"
          disabled={submitting}
          className="w-full bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white rounded py-2 font-medium"
        >
          {submitting ? "Regisztráció..." : "Regisztráció"}
        </button>
        <p className="text-sm text-slate-400">
          Van már fiókod?{" "}
          <Link to="/login" className="text-emerald-400 hover:text-emerald-300">
            Belépés
          </Link>
        </p>
      </form>
    </div>
  );
}
