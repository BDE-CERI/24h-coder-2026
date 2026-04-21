# Design Spec: Retro Arcade Rebuild (Web Gallery 24h pour coder)

Date: 2026-04-21  
Scope: Full thematic rebuild of the web frontend (`web/`) while keeping the existing game discovery/build pipeline unchanged.

## 1) Objectif produit

Refondre l'interface du site vitrine des jeux participants des 24h pour coder avec une identité **retro arcade immersive**, centrée sur le logo fourni, en conservant:

- la stack technique actuelle (Vite + React + TS)
- le routing actuel (`/`, `/games/:id`)
- la source de donnees actuelle (`game.json` -> `games.generated.ts`)
- le pipeline de build TIC-80/CI existant

Priorite fonctionnelle: support natif du **Palmares** (Gagnant + Coup de coeur du public) via le champ `award` des `game.json`.

## 2) Architecture experience

### Home (`/`)

La page d'accueil devient une experience "arcade hall" composee de 4 blocs:

1. **Hero immersif**  
   Logo principal, framing evenement, CTA principal "Entrer dans l'arcade" / "Voir les jeux".
2. **Zone Palmares 24h**  
   Affiche les jeux distingues `award: "jury"` et `award: "public"`.
   Masquee automatiquement si aucun award n'est present.
3. **Featured cabinets strip**  
   Selection visuelle distincte du classement officiel.
   Pour cette iteration: sous-ensemble derive automatiquement de `GAMES`
   (pas de nouveau champ metadata ni backoffice).
4. **Main cabinet wall**  
   Grille principale de tous les jeux participants.

### Page jeu (`/games/:id`)

Page "cabinet detail" avec priorite visuelle au player:

- viewport de jeu au-dessus de la ligne de flottaison
- metadonnees style etiquette de borne (genre, equipe, controles)
- badge laureat si `award` present
- chemin de retour clair vers la galerie

### Shell global

- top bar thematique avec logo lockup
- navigation minimale
- footer avec liens event/repo dans le langage visuel arcade

## 3) Donnees et etats

Source de verite des distinctions: `award` dans chaque `game.json`.

- valeurs supportees: `"jury"` | `"public"` (deja presentes dans `GameMeta`)
- aucun fichier central additionnel pour les lauriers
- le rendu du Palmares et des badges derive uniquement de `GAMES`

Regles:

- si aucun `award`: pas de section Palmares
- si un ou plusieurs `award`: afficher la section Palmares et les badges associes
- featured strip independant du palmares pour eviter toute ambiguite "selection vs recompense"
- featured strip determine de maniere stable: premiers jeux tries par `title`, limites a un nombre fixe

## 4) Direction visuelle

Theme: **Retro Arcade Nostalgia**.

- **Identite**: logo utilisateur comme ancre principale (header + hero + element de marque)
- **Couleurs**: fond sombre bleute, accents neons chauds, contraste eleve lisible
- **Typo**: fonte expressive arcade/pixel pour headings, fonte lisible pour le texte courant
- **Surfaces**: panels "cabinet bezel", bordures franches, textures/scanlines subtiles
- **Cartes**: presentation de jeux comme mini-bornes
- **Motion**: animations d'entree legeres, hover/focus nets, sans bruit excessif
- **Responsive**:
  - desktop: version immersive complete
  - mobile: version simplifiee, effets reduits, lisibilite et performance prioritaires

## 5) Plan technique frontend

### Fichiers cibles

- `web/src/styles/global.css`
- `web/src/components/Layout.tsx`
- `web/src/pages/GalleryPage.tsx`
- `web/src/components/GameGrid.tsx`
- `web/src/components/GameCard.tsx`
- `web/src/pages/GamePage.tsx`
- `web/src/components/PlayerFrame.tsx`

### Changements attendus

1. **Systeme de design arcade**
   - tokens CSS (couleurs, espacements, rayons, ombres, glow)
   - typographie themed
   - motifs/backgrounds non plats
2. **Home restructuree**
   - hero, palmares conditionnel, featured strip, cabinet wall
3. **Game card et grid refondues**
   - visuel mini-borne
   - badge laureat thematique
4. **Game page refondue**
   - player prioritaire
   - panneaux metadata thematiques
5. **Shell global refait**
   - top bar + footer dans le nouveau langage visuel
6. **Logo**
   - ajout local dans `web/public/` puis integration header/hero
   - l'URL distante sert de source d'import, pas de hotlink runtime

### Contraintes non-fonctionnelles

- ne pas modifier scripts build/discovery/CI
- ne pas changer schema `game.json` pour cette iteration
- conserver comportement de routing existant
- pas de librairie animation lourde additionnelle

## 6) Accessibilite et performance

Accessibilite:

- contraste AA pour texte principal
- focus clavier visible sur tous les elements interactifs
- support `prefers-reduced-motion`

Performance:

- animations CSS seulement
- images cover en lazy-loading (deja en place)
- pas d'effet visuel bloquant sur mobile

## 7) Tests et criteres d'acceptation

Fonctionnel:

- `/` affiche hero + featured + wall
- section Palmares visible seulement s'il y a au moins un `award`
- `/games/:id` garde player prioritaire et badge laureat conditionnel
- retour vers galerie explicite

Donnees:

- modifier `award` dans un `game.json` est reflechi automatiquement apres regeneration habituelle

Responsive:

- affichage desktop/mobile sans chevauchement ni perte de lisibilite

Accessibilite:

- navigation clavier operationnelle
- focus visible
- animations reduites quand `prefers-reduced-motion` est active

Non-regression:

- routing et pages existantes restent fonctionnels
- pipeline `npm run build:tic` inchange

## 8) Hors scope (iteration actuelle)

- changement du modele de donnees des jeux
- refonte CI/build TIC-80
- nouvelles features produit (recherche, filtres avances, comptes, vote en ligne)

## 9) Risques et mitigations

1. **Risque**: surcharge visuelle qui degrade lisibilite  
   **Mitigation**: hierarchy stricte, contraste teste, version mobile epuree
2. **Risque**: confusion featured vs palmares  
   **Mitigation**: libelles explicites et zones separees
3. **Risque**: regressions CSS globales  
   **Mitigation**: migration par blocs + verif desktop/mobile apres chaque bloc

## 10) Definition of Done (design -> implementation ready)

- spec validee utilisateur
- direction visuelle, IA et comportement palmares verrouilles
- perimetre fichiers et contraintes techniques confirmes
- transition vers un plan d'implementation detaille (skill `writing-plans`)
