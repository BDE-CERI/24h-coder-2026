import { Link } from "react-router-dom";
import type { GameMeta } from "../types/game";

export function GameCard({ game }: { game: GameMeta }) {
  return (
    <Link to={`/games/${game.id}`} className="game-card">
      <div className="game-card-cabinet">
        <div className="game-card-screen">
          <img
            className="pixel"
            src={`${import.meta.env.BASE_URL}covers/${game.id}.png`}
            alt={game.title}
            loading="lazy"
          />
          {game.award && (
            <span className={`game-badge game-badge--${game.award}`}>
              {game.award === "jury" ? "★ JURY" : "♥ PUBLIC"}
            </span>
          )}
          <div className="game-card-scanlines" aria-hidden="true" />
        </div>
        <div className="game-card-marquee">
          <h2><span className="marquee-text">{game.title}</span></h2>
        </div>
        <div className="game-card-body">
          <div className="game-card-meta">
            <span className="chip">{game.genre}</span>
            <span className="chip chip--dim">{game.team}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
