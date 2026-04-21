import { Link, useParams } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import { GAMES } from "../data/games.generated";
import { PlayerFrame } from "../components/PlayerFrame";

export function GamePage() {
  const { id } = useParams<{ id: string }>();
  const game = GAMES.find((g) => g.id === id);

  if (!game) {
    return (
      <div className="game-detail">
        <Link to="/" className="back-link">← Retour à l'arcade</Link>
        <p>Borne introuvable : <code>{id}</code>.</p>
      </div>
    );
  }

  return (
    <div className="game-detail">
      <Link to="/" className="back-link">← Retour à l'arcade</Link>
      <div className="game-page">
        <div className="game-page-player">
          <div className="mobile-warning">
            🎮 Clavier requis — ce jeu n'a pas de contrôles tactiles. Jouez sur desktop.
          </div>
          <PlayerFrame slug={game.id} title={game.title} />
        </div>
        <aside className="cabinet-card">
          {game.award && (
            <span className={`game-badge game-badge--${game.award}`}>
              {game.award === "jury" ? "★ PRIX DU JURY" : "♥ COUP DE CŒUR DU PUBLIC"}
            </span>
          )}
          <h1 className="cabinet-title">{game.title}</h1>
          <p className="cabinet-line">
            <span className="cabinet-label">TEAM</span> {game.team}
          </p>
          <p className="cabinet-line">
            <span className="cabinet-label">GENRE</span> {game.genre}
            <span className="cabinet-sep">·</span>
            <span className="cabinet-label">LANG</span> {game.language}
          </p>
          <p className="cabinet-desc">{game.description}</p>
          <h3 className="cabinet-subheading">Contrôles</h3>
          <table className="controls-table">
            <thead>
              <tr><th>Touche</th><th>Action</th></tr>
            </thead>
            <tbody>
              {game.controls.map((c, i) => (
                <tr key={i}><td><code>{c.key}</code></td><td>{c.action}</td></tr>
              ))}
            </tbody>
          </table>
          {game.longDescription && (
            <div className="long-desc">
              <ReactMarkdown>{game.longDescription}</ReactMarkdown>
            </div>
          )}
          <p className="cabinet-source">
            <a
              href={game.repoUrl ?? "https://github.com/BDE-CERI/24h-coder-2026"}
              target="_blank"
              rel="noreferrer"
            >
              Voir les sources sur GitHub →
            </a>
          </p>
        </aside>
      </div>
    </div>
  );
}
