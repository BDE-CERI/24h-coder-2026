import type { Game } from './types';

const OWNER = import.meta.env.VITE_GITHUB_OWNER as string;
const REPO  = import.meta.env.VITE_GITHUB_REPO  as string;
const TOKEN = import.meta.env.VITE_GITHUB_TOKEN as string | undefined;

const RAW_BASE = 'https://raw.githubusercontent.com';
const API_BASE = 'https://api.github.com';

// ─── Helpers ────────────────────────────────────────────────────────────────

function apiHeaders(): HeadersInit {
  return TOKEN ? { Authorization: `Bearer ${TOKEN}` } : {};
}

async function githubFetch(path: string) {
  const res = await fetch(`${API_BASE}${path}`, { headers: apiHeaders() });
  if (!res.ok) throw new Error(`GitHub ${res.status} — ${path}`);
  return res.json();
}

function rawUrl(slug: string, filePath: string) {
  return `${RAW_BASE}/${OWNER}/${REPO}/main/${slug}/${filePath}`;
}

// ─── README parser ───────────────────────────────────────────────────────────

function resolveImageSrc(src: string, slug: string): string {
  if (src.startsWith('http')) return src;
  // chemin relatif → raw.githubusercontent.com
  return rawUrl(slug, src.replace(/^\.\//, ''));
}

export function parseReadme(
  slug: string,
  content: string
): Pick<Game, 'title' | 'description' | 'screenshots'> {
  const lines = content.split('\n');

  // 1. Titre : premier heading #
  const titleLine = lines.find((l) => /^#{1,3}\s/.test(l));
  const title = titleLine ? titleLine.replace(/^#+\s+/, '').trim() : slug;

  // 2. Description : premier paragraphe (pas heading, pas image, pas vide)
  const descParts: string[] = [];
  let capturing = false;
  for (const line of lines) {
    const l = line.trim();
    if (!l) { if (capturing) break; continue; }
    if (/^#/.test(l) || /^!\[/.test(l) || /^[-*]/.test(l)) {
      if (capturing) break;
      continue;
    }
    capturing = true;
    descParts.push(l);
  }
  const description = descParts.join(' ');

  // 3. Screenshots : toutes les images du README
  const imgRegex = /!\[.*?\]\(([^)]+)\)/g;
  const screenshots: string[] = [];
  let m: RegExpExecArray | null;
  while ((m = imgRegex.exec(content)) !== null) {
    screenshots.push(resolveImageSrc(m[1], slug));
  }

  return { title, description, screenshots };
}

// ─── Fetcher principal ───────────────────────────────────────────────────────

async function isGameFolder(slug: string): Promise<boolean> {
  try {
    await githubFetch(`/repos/${OWNER}/${REPO}/contents/${slug}/assets/game.tic`);
    return true;
  } catch {
    return false;
  }
}

async function fetchGameMeta(dir: { name: string }): Promise<Game | null> {
  const slug = dir.name;

  // Filtre : le dossier doit contenir assets/game.tic
  if (!(await isGameFolder(slug))) return null;

  // README optionnel
  let title = slug;
  let description = '';
  let screenshots: string[] = [];

  try {
    const file = await githubFetch(
      `/repos/${OWNER}/${REPO}/contents/${slug}/README.md`
    );
    // GitHub renvoie le contenu en base64 (avec des sauts de ligne)
    const raw = atob(file.content.replace(/\n/g, ''));
    const parsed = parseReadme(slug, raw);
    title       = parsed.title;
    description = parsed.description;
    screenshots = parsed.screenshots;
  } catch {
    // pas de README → on garde le nom de dossier
  }

  return {
    slug,
    title,
    description,
    screenshots,
    ticUrl: rawUrl(slug, 'assets/game.tic'),
    teamName: slug,
  };
}

export async function fetchAllGames(): Promise<Game[]> {
  const root = await githubFetch(`/repos/${OWNER}/${REPO}/contents/`);

  const dirs = (root as { name: string; type: string }[]).filter(
    (e) => e.type === 'dir' && !e.name.startsWith('.')
  );

  const results = await Promise.allSettled(dirs.map(fetchGameMeta));

  return results
    .filter(
      (r): r is PromiseFulfilledResult<Game> =>
        r.status === 'fulfilled' && r.value !== null
    )
    .map((r) => r.value);
}