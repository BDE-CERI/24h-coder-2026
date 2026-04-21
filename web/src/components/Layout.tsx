import { Link, Outlet } from "react-router-dom";

const LOGO = `${import.meta.env.BASE_URL}logo.png`;

export function Layout() {
  return (
    <div className="layout">
      <header className="layout-header">
        <Link to="/" className="brand-lockup" aria-label="Accueil">
          <img src={LOGO} alt="" className="brand-logo" />
          <span className="brand-text">
            <span className="brand-title">24h pour coder</span>
            <span className="brand-edition">Édition 2026</span>
          </span>
        </Link>
        <nav className="layout-nav">
          <Link to="/">Arcade</Link>
          <a
            href="https://github.com/BDE-CERI/24h-coder-2026"
            target="_blank"
            rel="noreferrer"
          >
            GitHub
          </a>
        </nav>
      </header>
      <main className="layout-main">
        <Outlet />
      </main>
      <footer className="layout-footer">
        <span>INSERT COIN · </span>
        <span>Galerie auto-générée à partir des <code>game.json</code> du repo.</span>
      </footer>
    </div>
  );
}
