export interface Game {
    slug: string; // nom du dossier racine dans le repo
    title: string; // premier # heading du README
    description: string;
    screenshot: string[];
    ticUrl: string; // URL raw.githubusercontent.com vers assets/game.tic
    teamName: string;
}
export type LoadingState = "idle" | "loading" | "success" |"error";