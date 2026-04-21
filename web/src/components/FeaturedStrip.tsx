import type { GameMeta } from "../types/game";
import { GameCard } from "./GameCard";

const FEATURED_LIMIT = 4;

export function FeaturedStrip({ games }: { games: GameMeta[] }) {
  if (games.length < FEATURED_LIMIT) return null;
  const featured = [...games]
    .sort((a, b) => a.title.localeCompare(b.title, "fr"))
    .slice(0, FEATURED_LIMIT);

  return (
    <section className="featured" aria-labelledby="featured-title">
      <header className="section-header">
        <h2 id="featured-title" className="section-title">
          <span className="section-title-glow section-title-glow--cyan">À la une</span>
        </h2>
        <p className="section-sub">Sélection éditoriale — pas un classement officiel.</p>
      </header>
      <div className="gallery-grid gallery-grid--strip">
        {featured.map((g) => <GameCard key={g.id} game={g} />)}
      </div>
    </section>
  );
}
