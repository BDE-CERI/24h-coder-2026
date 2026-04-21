import type { GameMeta } from "../types/game";
import { GameCard } from "./GameCard";

export function PalmaresSection({ games }: { games: GameMeta[] }) {
  const jury = games.filter((g) => g.award === "jury");
  const publicPick = games.filter((g) => g.award === "public");
  if (jury.length === 0 && publicPick.length === 0) return null;

  return (
    <section className="palmares" aria-labelledby="palmares-title">
      <header className="section-header">
        <h2 id="palmares-title" className="section-title">
          <span className="section-title-glow">Palmarès 24h</span>
        </h2>
        <p className="section-sub">Les jeux récompensés de cette édition.</p>
      </header>
      <div className="palmares-grid">
        {jury.length > 0 && (
          <div className="palmares-col palmares-col--jury">
            <h3>★ Prix du jury</h3>
            <div className="gallery-grid gallery-grid--tight">
              {jury.map((g) => <GameCard key={g.id} game={g} />)}
            </div>
          </div>
        )}
        {publicPick.length > 0 && (
          <div className="palmares-col palmares-col--public">
            <h3>♥ Coup de cœur du public</h3>
            <div className="gallery-grid gallery-grid--tight">
              {publicPick.map((g) => <GameCard key={g.id} game={g} />)}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
