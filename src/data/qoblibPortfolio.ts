/**
 * Single normalized layer for official QOBLIB Portfolio #06.
 * Official current facts come from generated snapshots (npm run sync:qoblib).
 * Historical paper tables stay in qoblibData.ts and must not be mixed here.
 */
import officialBestKnown from './generated/qoblibPortfolioBestKnown.json'
import officialManifest from './generated/qoblibPortfolioManifest.json'
import officialMeta from './generated/qoblibPortfolioMeta.json'

export type BenchmarkSource =
  | 'Official QOBLIB Repository — Current'
  | 'QOBLIB Paper — Historical Benchmark'
  | 'QGG Educational Experiment'
  | 'User Run'

export type BestKnownStatus = 'optimal' | 'best known'

export type BestKnownValue = {
  instance: string
  bestKnown: number
  status: string
  source: string
  date: string
}

export type PortfolioBaseInstance = {
  id: string
  assets: number
  periods: number
  seed: string
  budget: number
  priceId: string
  family: string
  scale: 'learning' | 'small' | 'research'
  inOriginalPaperFamilies: boolean
}

export const QOBLIB_OFFICIAL = officialMeta

export const OFFICIAL_MANIFEST = officialManifest

export const LAMBDA_GRID = officialManifest.lambda_grid as string[]

export const BUDGET_BY_ASSETS = officialManifest.budget_by_assets as Record<string, number>

export const OFFICIAL_BASES = officialManifest.bases as string[]

/** Official model constants from 06-portfolio/check/README.md (parameter_u3_c10.zpl defaults). */
export const OFFICIAL_MODEL_PARAMS = {
  cash: 1_000_000,
  unit: 100_000,
  capitalC: 10,
  ub: 3,
  directions: 2,
  capitalSlackBits: 4,
  positionSlackBits: 7,
  delta: 0.001,
  nu: 0.0001,
  rho: 0.000025,
} as const

/**
 * x[asset × copy × direction × period] + 4 capital slacks + 7 position slacks per period.
 * Formula from official checker: (6 × assets + 11) × periods.
 * These are binary decision variables, not physical qubits.
 */
export function officialBinaryVariableCount(assets: number, periods: number): number {
  return (6 * assets + 11) * periods
}

export function budgetForAssets(assets: number): number | undefined {
  return BUDGET_BY_ASSETS[String(assets)]
}

function parseBase(id: string): PortfolioBaseInstance {
  const m = id.match(/^a(\d+)_t(\d+)_(orig|s\d+)$/)
  if (!m) {
    throw new Error(`Unexpected official base id: ${id}`)
  }
  const assets = Number(m[1])
  const periods = Number(m[2])
  const seed = m[3]
  const budget = budgetForAssets(assets)
  if (budget == null) {
    throw new Error(`No official budget mapping for ${assets} assets`)
  }
  const scale: PortfolioBaseInstance['scale'] =
    assets <= 5 ? 'learning' : assets <= 10 ? 'small' : 'research'
  return {
    id,
    assets,
    periods,
    seed,
    budget,
    priceId: `po_${id}`,
    family: `a${String(assets).padStart(3, '0')}_t${String(periods).padStart(2, '0')}`,
    scale,
    inOriginalPaperFamilies: assets >= 10,
  }
}

export const PORTFOLIO_BASES: PortfolioBaseInstance[] = OFFICIAL_BASES.map(parseBase)

export const PORTFOLIO_FAMILIES = [...new Set(PORTFOLIO_BASES.map((b) => b.family))].map((family) => {
  const sample = PORTFOLIO_BASES.find((b) => b.family === family)!
  return {
    family,
    assets: sample.assets,
    periods: sample.periods,
    budget: sample.budget,
    binaryVariables: officialBinaryVariableCount(sample.assets, sample.periods),
    scale: sample.scale,
    inOriginalPaperFamilies: sample.inOriginalPaperFamilies,
    seeds: PORTFOLIO_BASES.filter((b) => b.family === family).map((b) => b.seed),
  }
})

export const OFFICIAL_BEST_KNOWN = officialBestKnown as BestKnownValue[]

export function currentBkvFor(instance: string): BestKnownValue | undefined {
  return OFFICIAL_BEST_KNOWN.find((row) => row.instance === instance)
}

export const HIGHLIGHTED_CURRENT_BKV = [
  'a003_t02_orig',
  'a010_t10_orig_b004_l1e-04',
  'a050_t15_s00_b020_l0',
  'a050_t15_s00_b020_l1e-03',
  'a050_t15_s00_b020_l1e-02',
].map((id) => currentBkvFor(id)).filter((row): row is BestKnownValue => Boolean(row))

export const OFFICIAL_SUBMISSIONS = [
  { id: '20250819_MIP_Schicker', note: 'Official submissions/ directory name only. Results not copied here.' },
  { id: '20250822_Abs2_Schicker', note: 'Official submissions/ directory name only. Results not copied here.' },
  { id: '20260308_Arvak_Hinderink', note: 'Compressed/PCE encoding — do not equate qubit count with full QUBO variables.' },
  { id: '20260805_ISQR_García', note: 'Official submissions/ directory name only. Results not copied here.' },
] as const

export const LOCAL_PRICE_FAMILIES = [
  'a010_t10',
  'a010_t15',
  'a050_t10',
  'a050_t15',
  'a200_t10',
  'a200_t15',
  'a400_t10',
  'a400_t15',
] as const

/**
 * Historical paper Gurobi objective for a050_t15_s00 λ=0.01 is -437920.
 * Current official BKV for a050_t15_s00_b020_l1e-02 is -43792.
 * Other λ rows on this instance match between paper Table 6 and current BKV.
 * Do not compare the mismatched pair without establishing model/version equivalence.
 */
export const HISTORICAL_VS_CURRENT_NOTE =
  'Historical paper value differs from current official repository BKV. Do not compare directly without establishing model/version equivalence.'
