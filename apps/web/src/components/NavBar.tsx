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
    <div className="flex items-center justify-between px-6 py-2 border-b border-slate-800 text-sm">
      <Link to="/" className="text-slate-300 hover:text-white font-medium">
        CodeLearn
      </Link>
      <div className="flex items-center gap-3 text-slate-400">
        <span data-testid="user-email">{user.email}</span>
        <button data-testid="logout-button" onClick={onLogout} className="hover:text-white">
          Kijelentkezés
        </button>
      </div>
    </div>
  );
}
