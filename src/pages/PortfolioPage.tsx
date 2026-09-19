import { Link } from 'react-router-dom'
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import { PortfolioLiveCharts } from '../components/PortfolioLiveCharts'
import { PageHeader } from '../components/ui/PageHeader'
import { QggPanel } from '../components/ui/QggPanel'
import { QGG_CHART } from '../chartTheme'
import {
  LAMBDA_BENCHMARK,
  OBJECTIVE_CONVERGENCE,
  PAPER_TABLE6,
  PORTFOLIO_DATA_FORMAT,
  PORTFOLIO_NAMING,
  PORTFOLIO_PARAMS,
  PORTFOLIO_REPO_LAYOUT,
  RUNTIME_BY_LAMBDA,
} from '../data/qoblibData'
import {
  HIGHLIGHTED_CURRENT_BKV,
  HISTORICAL_VS_CURRENT_NOTE,
  LAMBDA_GRID,
  OFFICIAL_BEST_KNOWN,
  OFFICIAL_MODEL_PARAMS,
  OFFICIAL_SUBMISSIONS,
  PORTFOLIO_FAMILIES,
  QOBLIB_OFFICIAL,
} from '../data/qoblibPortfolio'

const LINKS = [
  { label: 'Portfolio #06', href: QOBLIB_OFFICIAL.portfolio },
  { label: 'manifest.json', href: QOBLIB_OFFICIAL.manifestUrl },
  { label: 'Solutions / BKV', href: QOBLIB_OFFICIAL.solutionsUrl },
  { label: 'Checker', href: QOBLIB_OFFICIAL.checkerUrl },
  { label: 'Models', href: QOBLIB_OFFICIAL.modelsUrl },
]

export function PortfolioPage() {
  return (
    <div>
      <PageHeader
        num="02"
        title="Portfolio"
        subtitle="Official QOBLIB problem #06 — current numbers from the library, plus historical paper tables labeled as historical."
      />

      <div className="qgg-page-inner space-y-6">
        <QggPanel title="Portfolio Optimization #06">
          <p className="text-sm leading-relaxed text-qgg-muted">
            Official current configuration is sourced from{' '}
            <code className="font-mono text-xs">06-portfolio/instances/manifest.json</code>, which QOBLIB
            calls the single source of truth for instance configuration. Snapshot commit{' '}
            <code className="font-mono text-xs">{QOBLIB_OFFICIAL.sourceCommit.slice(0, 12)}</code> · synced{' '}
            {QOBLIB_OFFICIAL.syncedAt.slice(0, 10)}.
          </p>
          <div className="mt-4 flex flex-wrap gap-3 text-sm">
            {LINKS.map((link) => (
              <a key={link.href} href={link.href} target="_blank" rel="noreferrer" className="underline">
                {link.label}
              </a>
            ))}
          </div>
          <p className="mt-4 text-xs text-qgg-muted">
            Data category: {QOBLIB_OFFICIAL.category}. Historical paper tables are labeled separately below.
          </p>
        </QggPanel>

        <QggPanel title="What problem are we solving?">
          <p className="text-sm leading-relaxed text-qgg-muted">
            Allocate a fixed cash pool across a subset of S&P 500 names over several periods, paying
            transaction, short-borrowing, and liquidation costs, while a risk weight λ trades return
            against covariance. The purpose of the benchmark is comparison and evidence gathering, not
            assuming a quantum advantage in advance.
          </p>
        </QggPanel>

        <QggPanel title="Start Small">
          <p className="text-sm leading-relaxed text-qgg-muted">
            QOBLIB now includes small portfolio instances that make it easier to inspect the full
            optimization problem before scaling to research-size benchmarks. That is our teaching use of
            them — the repository does not say they were created specifically for education.
          </p>
          <ol className="mt-4 grid gap-3 md:grid-cols-3">
            {PORTFOLIO_FAMILIES.filter((f) => f.scale === 'learning').map((f) => (
              <li key={f.family} className="border border-qgg bg-qgg-paper p-4">
                <p className="font-mono text-xs text-qgg-muted">{f.family}</p>
                <p className="mt-1 text-lg font-semibold">
                  {f.assets} assets × {f.periods} periods
                </p>
                <p className="mt-2 text-sm text-qgg-muted">
                  B = {f.budget} · {f.binaryVariables.toLocaleString()} binary variables
                </p>
                <p className="mt-2 text-xs text-qgg-muted">Newer repository family · not in the original paper table of 10/50/200/400-asset instances.</p>
              </li>
            ))}
          </ol>
          <p className="mt-4 text-sm text-qgg-muted">
            Suggested path: 3 assets → understand variables → 4–5 assets → risk and constraints → 10
            assets → small benchmark experiments → 50+ → scaling.
          </p>
        </QggPanel>

        <QggPanel title="How the model makes decisions">
          <p className="text-sm leading-relaxed text-qgg-muted">
            The official reference model is not one yes/no per stock per day. For each asset, unit copy{' '}
            <code className="font-mono text-xs">m ∈ {'{1,2,3}'}</code>, direction τ ∈ {'{+1,−1}'}, and
            period t there is a binary variable x. One unit is the number of shares worth{' '}
            {OFFICIAL_MODEL_PARAMS.unit.toLocaleString()} cash at t = 0.
          </p>
          <ol className="mt-4 list-decimal space-y-2 pl-5 text-sm text-qgg-muted">
            <li>which assets are held</li>
            <li>how many investment units are allocated</li>
            <li>whether those units are long or short</li>
            <li>how much capital remains unused</li>
            <li>whether the portfolio respects the position budget</li>
          </ol>
          <details className="mt-4 border border-qgg p-4 text-sm">
            <summary className="cursor-pointer font-semibold">Show the mathematical model</summary>
            <p className="mt-3 text-qgg-muted">
              Official problem README still writes a compact x<sub>it</sub> form. The checker documents
              the generated model as x<sub>i,m,τ,t</sub> plus slack registers y (4 bits/period) and s (7
              bits/period). Binary-variable count used on this page is (6 × assets + 11) × periods. That
              is a decision-variable count, not a physical-qubit requirement.
            </p>
            <p className="mt-3 font-mono text-xs">Σ τ x + Σ 2ᶜ y_c = C &nbsp; and &nbsp; Σ x + Σ 2ᵇ s_b = B</p>
          </details>
        </QggPanel>

        <QggPanel title="Objective and constraints">
          <div className="grid gap-3 md:grid-cols-2 text-sm text-qgg-muted">
            <p>Covariance risk (λ-weighted)</p>
            <p>Expected return / profit</p>
            <p>Transaction cost δ = {PORTFOLIO_PARAMS.delta}</p>
            <p>Cash interest ν = {PORTFOLIO_PARAMS.nu}</p>
            <p>Short-selling cost ρ = {PORTFOLIO_PARAMS.rho}</p>
            <p>Final liquidation cost</p>
            <p>Capital C = cash/unit = {PORTFOLIO_PARAMS.capitalC}</p>
            <p>Position budget B from the official asset map</p>
          </div>
          <div className="mt-4 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
            <Stat label="Cash (official)" value={PORTFOLIO_PARAMS.cash} />
            <Stat label="Unit (official)" value={PORTFOLIO_PARAMS.unit} />
            <Stat label="δ / ν / ρ" value={`${PORTFOLIO_PARAMS.delta} / ${PORTFOLIO_PARAMS.nu} / ${PORTFOLIO_PARAMS.rho}`} />
            <Stat label="ub / slack bits" value={`${PORTFOLIO_PARAMS.ub} / ${PORTFOLIO_PARAMS.capitalSlackBits}+${PORTFOLIO_PARAMS.positionSlackBits}`} />
          </div>
          <p className="mt-3 text-xs text-qgg-muted">
            Derived teaching labels only: transaction {PORTFOLIO_PARAMS.transactionCost.derivedDailyPct}, cash
            interest {PORTFOLIO_PARAMS.cashInterest.derivedDailyPct}, short cost{' '}
            {PORTFOLIO_PARAMS.shortCost.derivedDailyPct}.
          </p>
        </QggPanel>

        <QggPanel title="Official instance families">
          <p className="text-xs text-qgg-muted">
            Each family has orig + s00 + s01 + s02. Logical instances = bases × λ grid. Local price JSON
            in this dashboard currently covers a010–a400 only.
          </p>
          <div className="mt-4 overflow-x-auto">
            <table className="qgg-table min-w-[720px]">
              <thead>
                <tr>
                  <th>Family</th>
                  <th>Assets</th>
                  <th>Periods</th>
                  <th>B</th>
                  <th>Binary vars</th>
                  <th>Scale</th>
                  <th>Local prices</th>
                </tr>
              </thead>
              <tbody>
                {PORTFOLIO_FAMILIES.map((row) => (
                  <tr key={row.family}>
                    <td className="font-mono text-xs">{row.family}</td>
                    <td>{row.assets}</td>
                    <td>{row.periods}</td>
                    <td>{row.budget}</td>
                    <td className="font-mono">{row.binaryVariables.toLocaleString()}</td>
                    <td>{row.scale}</td>
                    <td>{row.inOriginalPaperFamilies ? 'Downloaded' : 'Official instance available · local file not downloaded'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-3 font-mono text-xs text-qgg-muted">
            Price: {PORTFOLIO_NAMING.priceInstance} · QUBO: {PORTFOLIO_NAMING.quboProblem}
          </p>
        </QggPanel>

        <QggPanel title="Risk parameter λ">
          <p className="text-sm text-qgg-muted">
            Official λ grid from the manifest (do not treat other values as official):
          </p>
          <p className="mt-2 font-mono text-xs">{LAMBDA_GRID.join(' · ')}</p>
        </QggPanel>

        <QggPanel title="BQP → QUBO">
          <p className="text-sm leading-relaxed text-qgg-muted">
            <strong className="text-qgg-fg">QUBO</strong> is a problem formulation.{' '}
            <strong className="text-qgg-fg">QAOA</strong> is a variational gate-based algorithm that may
            search an optimization landscape. Quantum annealing is a different approach. Classical
            solvers can also solve BQP/QUBO. QUBO is not a quantum algorithm, and QAOA does not
            guarantee the optimum.
          </p>
        </QggPanel>

        <QggPanel title="Current QOBLIB best-known results">
          <p className="text-xs text-qgg-muted">
            {QOBLIB_OFFICIAL.category} · {OFFICIAL_BEST_KNOWN.length} auto-generated rows from{' '}
            solutions/README.md · never treat “best known” as “optimal”.
          </p>
          <div className="mt-4 overflow-x-auto">
            <table className="qgg-table min-w-[640px] text-xs">
              <thead>
                <tr>
                  <th>Instance</th>
                  <th>Best known</th>
                  <th>Status</th>
                  <th>Source</th>
                </tr>
              </thead>
              <tbody>
                {HIGHLIGHTED_CURRENT_BKV.map((row) => (
                  <tr key={row.instance}>
                    <td className="font-mono">{row.instance}</td>
                    <td className="font-mono">{row.bestKnown}</td>
                    <td>{row.status}</td>
                    <td>{row.source}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <details className="mt-4 text-sm">
            <summary className="cursor-pointer font-semibold">Show full official BKV table ({OFFICIAL_BEST_KNOWN.length} rows)</summary>
            <div className="mt-3 max-h-80 overflow-auto">
              <table className="qgg-table text-xs">
                <thead>
                  <tr>
                    <th>Instance</th>
                    <th>Best known</th>
                    <th>Status</th>
                    <th>Source</th>
                    <th>Date</th>
                  </tr>
                </thead>
                <tbody>
                  {OFFICIAL_BEST_KNOWN.map((row) => (
                    <tr key={row.instance}>
                      <td className="font-mono">{row.instance}</td>
                      <td className="font-mono">{row.bestKnown}</td>
                      <td>{row.status}</td>
                      <td>{row.source}</td>
                      <td>{row.date}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </details>
        </QggPanel>

        <QggPanel title="Historical QOBLIB paper comparison">
          <p className="text-sm text-qgg-muted">
            Original paper benchmark snapshot (Table 6 / Figure 11–12 era). Not the current leaderboard.
          </p>
          <p className="mt-2 text-xs text-qgg-muted">
            {HISTORICAL_VS_CURRENT_NOTE} Specifically, paper Gurobi on a050_t15_s00 at λ=0.01 is −437,920;
            current official BKV for a050_t15_s00_b020_l1e-02 is −43,792. Other λ rows on that instance
            match.
          </p>
          <div className="mt-4 overflow-x-auto">
            <table className="qgg-table text-xs">
              <thead>
                <tr>
                  <th>λ</th>
                  <th>Gurobi obj</th>
                  <th>Gurobi gap %</th>
                  <th>ABS2 obj</th>
                  <th>ABS2 gap %</th>
                </tr>
              </thead>
              <tbody>
                {PAPER_TABLE6.map((row) => (
                  <tr key={row.lambda}>
                    <td className="font-mono">{row.lambda}</td>
                    <td className="font-mono">{row.gurobiObjective}</td>
                    <td>{row.gurobiGapPct}</td>
                    <td className="font-mono">{row.abs2Objective}</td>
                    <td>{row.abs2GapPct}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-4 overflow-x-auto">
            <table className="qgg-table text-xs">
              <thead>
                <tr>
                  <th>λ</th>
                  <th>Gurobi gap % (paper)</th>
                  <th>Gurobi time</th>
                  <th>ABS2 gap %</th>
                  <th>ABS2 time</th>
                </tr>
              </thead>
              <tbody>
                {LAMBDA_BENCHMARK.map((row) => (
                  <tr key={row.lambda}>
                    <td className="font-mono">{row.lambda}</td>
                    <td>{row.gurobiGap}</td>
                    <td>{row.gurobiTime}</td>
                    <td>{row.abs2Gap}</td>
                    <td>{row.abs2Time}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </QggPanel>

        <QggPanel title="How QOBLIB represents a portfolio solution">
          <p className="text-sm text-qgg-muted">
            Canonical format stores counts, not every copy-slot bit. Paraphrased from the official
            checker docs — see the checker README for the full specification.
          </p>
          <pre className="mt-3 overflow-x-auto border border-qgg bg-qgg-paper p-3 font-mono text-xs">
{`instance po_a010_t10_orig
budget 4
lambda 0.0001
objective -69482

0 AAPL  0 1
0 GOOGL 3 0
1 META  1 0
1 TSLA  0 3`}
          </pre>
          <p className="mt-3 text-sm text-qgg-muted">Each position line is period, symbol, long units, short units.</p>
        </QggPanel>

        <QggPanel title="Benchmarking requires verification">
          <p className="text-sm text-qgg-muted">
            A low objective is not enough. The official checker parses the instance, checks capital and
            position constraints, recomputes the objective in exact arithmetic, and validates any claimed
            value. Vocabulary: valid, infeasible, invalid solution, best known, optimal. Feasible means
            constraints hold. Best known is the recorded record. Optimal is proven optimal according to
            the source.
          </p>
        </QggPanel>

        <QggPanel title="Solver submissions">
          <p className="text-sm text-qgg-muted">
            Directory names currently present under official <code className="font-mono text-xs">06-portfolio/submissions/</code>.
            Results are not copied here. Compressed encodings are not the same as the full binary model.
          </p>
          <ul className="mt-3 space-y-2 text-sm text-qgg-muted">
            {OFFICIAL_SUBMISSIONS.map((s) => (
              <li key={s.id}>
                <code className="font-mono text-xs">{s.id}</code> — {s.note}
              </li>
            ))}
          </ul>
        </QggPanel>

        <QggPanel title="From finance to QUBO">
          <p className="font-mono text-xs leading-7 text-qgg-muted">
            Portfolio decision → binary variables → objective + constraints → BQP → penalty transform →
            QUBO / UQO → solver → candidate → canonical conversion → official checker → benchmark result
          </p>
        </QggPanel>

        <QggPanel title="What makes a fair benchmark?">
          <p className="text-sm text-qgg-muted">
            Same problem definition, instance, objective, constraints, and parameter values; a valid
            solution; clear runtime methodology; hardware/software context; a repeatable experiment; and
            a transparent source/version. Solver encodings can compress a problem, so qubit count cannot
            always be compared with the original binary-variable count.
          </p>
        </QggPanel>

        <PortfolioLiveCharts />

        <QggPanel title="Scaling (historical paper figures)">
          <p className="text-xs text-qgg-muted">QOBLIB Paper — Historical Benchmark. Approximate Figure 11 / 12 visualizations from the original dashboard, not current BKV.</p>
          <div className="qgg-chart mt-6 h-72">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={RUNTIME_BY_LAMBDA}>
                <CartesianGrid strokeDasharray="3 3" stroke={QGG_CHART.grid} />
                <XAxis dataKey="lambda" tick={{ fill: QGG_CHART.tick, fontSize: 11 }} />
                <YAxis scale="log" domain={[0.1, 5000]} tick={{ fill: QGG_CHART.tick, fontSize: 11 }} />
                <Tooltip contentStyle={QGG_CHART.tooltip} />
                <Legend />
                <Line type="monotone" dataKey="a10t10" name="10 assets, 10 days" stroke={QGG_CHART.line[0]} dot={false} strokeWidth={2} />
                <Line type="monotone" dataKey="a10t15" name="10 assets, 15 days" stroke={QGG_CHART.line[1]} dot={false} strokeWidth={2} />
                <Line type="monotone" dataKey="a50t10" name="50 assets, 10 days" stroke={QGG_CHART.line[2]} dot={false} strokeWidth={2} />
                <Line type="monotone" dataKey="a50t15" name="50 assets, 15 days" stroke={QGG_CHART.line[3]} dot={false} strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div className="qgg-chart mt-6 h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={OBJECTIVE_CONVERGENCE}>
                <CartesianGrid strokeDasharray="3 3" stroke={QGG_CHART.grid} />
                <XAxis dataKey="time" tick={{ fill: QGG_CHART.tick, fontSize: 11 }} />
                <YAxis tick={{ fill: QGG_CHART.tick, fontSize: 11 }} tickFormatter={(v) => `${(v / 1e5).toFixed(1)}×10⁵`} />
                <Tooltip contentStyle={QGG_CHART.tooltip} formatter={(v) => Number(v).toLocaleString()} />
                <Legend />
                <Line type="monotone" dataKey="abs2" name="ABS2 (QUBO)" stroke={QGG_CHART.line[1]} dot={false} strokeWidth={2} />
                <Line type="monotone" dataKey="gurobi" name="Gurobi (MIP/BQP)" stroke={QGG_CHART.line[0]} dot={false} strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </QggPanel>

        <QggPanel title="Try it in the Lab">
          <p className="text-sm text-qgg-muted">
            <Link to="/lab" className="underline">Open /lab</Link> to run locally downloaded QUBO files. Small 3/4/5-asset
            families are official but not bundled as local solver files in this checkout.
          </p>
        </QggPanel>

        <QggPanel title="Sources">
          <ul className="space-y-1 text-sm text-qgg-muted">
            {PORTFOLIO_REPO_LAYOUT.map((row) => (
              <li key={row.dir}>
                <code className="font-mono text-xs">{row.dir}</code> — {row.desc}
              </li>
            ))}
          </ul>
          <p className="mt-3 text-xs text-qgg-muted">{PORTFOLIO_DATA_FORMAT.prices}</p>
        </QggPanel>
      </div>
    </div>
  )
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="border border-qgg bg-qgg-paper p-4">
      <p className="font-mono text-xs uppercase text-qgg-muted">{label}</p>
      <p className="qgg-stat-value mt-1 text-sm">{value}</p>
    </div>
  )
}
