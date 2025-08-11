import { Link, NavLink } from "react-router-dom";

const AppHeader = () => {
  return (
    <header className="sticky top-0 z-40 border-b bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <nav className="container mx-auto flex h-14 items-center justify-between">
        <Link to="/" className="font-semibold tracking-tight hover:opacity-90 transition-opacity">
          <span>React UI ex =))))</span>
        </Link>
        <div className="flex items-center gap-4 text-sm">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `px-3 py-1.5 rounded-md transition-colors ${isActive ? "bg-accent text-accent-foreground" : "hover:bg-muted"}`
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/guides"
            className={({ isActive }) =>
              `px-3 py-1.5 rounded-md transition-colors ${isActive ? "bg-accent text-accent-foreground" : "hover:bg-muted"}`
            }
          >
            Guides
          </NavLink>
        </div>
      </nav>
    </header>
  );
};

export default AppHeader;
