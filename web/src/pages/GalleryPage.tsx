import { GAMES } from "../data/games.generated";
import { GameGrid } from "../components/GameGrid";
import { Hero } from "../components/Hero";
import { PalmaresSection } from "../components/PalmaresSection";
import { FeaturedStrip } from "../components/FeaturedStrip";

export function GalleryPage() {
  return (
    <div className="gallery-page">
      <Hero gameCount={GAMES.length} />
      <PalmaresSection games={GAMES} />
      <FeaturedStrip games={GAMES} />
      <section id="cabinet-wall" className="cabinet-wall" aria-labelledby="wall-title">
        <header className="section-header">
          <h2 id="wall-title" className="section-title">
            <span className="section-title-glow section-title-glow--purple">Tous les jeux</span>
          </h2>
          <p className="section-sub">{GAMES.length} borne{GAMES.length > 1 ? "s" : ""} à explorer.</p>
        </header>
        <GameGrid games={GAMES} />
      </section>
    </div>
  );
}
