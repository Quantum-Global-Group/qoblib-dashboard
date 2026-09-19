/**
 * Refresh checked-in official QOBLIB Portfolio #06 snapshots.
 * Does not invent values. Parses official README/manifest text only.
 *
 *   npm run sync:qoblib
 */
import { mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const outDir = join(root, "src/data/generated");
const RAW = "https://raw.githubusercontent.com/ZIB-AOPT/QOBLIB/main/06-portfolio";

async function fetchText(path) {
  const res = await fetch(`${RAW}/${path}`);
  if (!res.ok) throw new Error(`HTTP ${res.status} for ${path}`);
  return res.text();
}

function parseBkvTable(markdown) {
  const rows = [];
  for (const line of markdown.split(/\r?\n/)) {
    const m = line.match(
      /^\|\s*([A-Za-z0-9_.-]+)\s*\|\s*([-\d.]+)\s*\|\s*([^|]+)\|\s*([^|]+)\|\s*([^|]+)\|/,
    );
    if (!m || m[1] === "Instance") continue;
    rows.push({
      instance: m[1].trim(),
      bestKnown: Number(m[2]),
      status: m[3].trim(),
      source: m[4].trim(),
      date: m[5].trim(),
    });
  }
  return rows;
}

const [manifestText, solutionsText, api] = await Promise.all([
  fetchText("instances/manifest.json"),
  fetchText("solutions/README.md"),
  fetch("https://api.github.com/repos/ZIB-AOPT/QOBLIB/commits/main").then((r) =>
    r.ok ? r.json() : { sha: "unknown" },
  ),
]);

const manifest = JSON.parse(manifestText);
const bestKnown = parseBkvTable(solutionsText);
if (!bestKnown.length) throw new Error("BKV table parse produced 0 rows");

await mkdir(outDir, { recursive: true });
await writeFile(join(outDir, "qoblibPortfolioManifest.json"), `${JSON.stringify(manifest, null, 2)}\n`);
await writeFile(join(outDir, "qoblibPortfolioBestKnown.json"), `${JSON.stringify(bestKnown, null, 2)}\n`);
await writeFile(
  join(outDir, "qoblibPortfolioMeta.json"),
  `${JSON.stringify(
    {
      category: "Official QOBLIB Repository — Current",
      repository: "https://github.com/ZIB-AOPT/QOBLIB",
      portfolio: "https://github.com/ZIB-AOPT/QOBLIB/tree/main/06-portfolio",
      manifestUrl: "https://github.com/ZIB-AOPT/QOBLIB/blob/main/06-portfolio/instances/manifest.json",
      solutionsUrl: "https://github.com/ZIB-AOPT/QOBLIB/blob/main/06-portfolio/solutions/README.md",
      checkerUrl: "https://github.com/ZIB-AOPT/QOBLIB/tree/main/06-portfolio/check",
      modelsUrl: "https://github.com/ZIB-AOPT/QOBLIB/tree/main/06-portfolio/models",
      sourceCommit: typeof api.sha === "string" ? api.sha : "unknown",
      syncedAt: new Date().toISOString(),
      bestKnownRowCount: bestKnown.length,
    },
    null,
    2,
  )}\n`,
);

console.log(`Wrote ${bestKnown.length} BKV rows; commit ${api.sha}`);
// keep a local copy for offline re-parse if needed
const audit = join(root, "tmp-qoblib-audit");
try {
  await writeFile(join(audit, "instances_manifest.json"), `${JSON.stringify(manifest, null, 2)}\n`);
} catch {
  /* optional */
}
