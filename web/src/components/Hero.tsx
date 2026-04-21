const LOGO = `${import.meta.env.BASE_URL}logo.png`;

export function Hero({ gameCount }: { gameCount: number }) {
  return (
    <section className="hero">
      <div className="hero-inner">
        <img src={LOGO} alt="" className="hero-logo" />
        <div className="hero-copy">
          <p className="hero-kicker">★ PRESS START ★</p>
          <h1 className="hero-title">Entrez dans l'arcade</h1>
          <p className="hero-sub">
            {gameCount} jeu{gameCount > 1 ? "x" : ""} créé{gameCount > 1 ? "s" : ""} en 24 heures.
            Tous jouables dans le navigateur.
          </p>
          <a href="#cabinet-wall" className="hero-cta">▶ Voir les jeux</a>
        </div>
      </div>
    </section>
  );
}
