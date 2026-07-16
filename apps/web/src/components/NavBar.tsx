import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../state/AuthContext";

export function NavBar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  if (!user) return null;

  const onLogout = async () => {
    await logout();
    navigate("/login", { replace: true });
  };

  return (
    <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-1 px-4 sm:px-6 py-2 border-b border-slate-800 text-sm">
      <Link to="/" className="text-slate-300 hover:text-white font-medium shrink-0">
        CodeLearn
      </Link>
      <div className="flex items-center gap-3 text-slate-400 min-w-0">
        <span data-testid="user-email" className="truncate max-w-[45vw] sm:max-w-none">
          {user.email}
        </span>
        <button data-testid="logout-button" onClick={onLogout} className="hover:text-white shrink-0">
          Kijelentkezés
        </button>
      </div>
    </div>
  );
}
