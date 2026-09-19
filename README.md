# QOBLIB Dashboard

Interactive presentation dashboard for the paper **Quantum Optimization Benchmarking Library — The Intractable Decathlon** ([arXiv:2504.03832](https://arxiv.org/abs/2504.03832)).

Visualizes all 10 benchmark problem classes with a deep dive on **Portfolio Optimization (#06)**. Official current facts come from [ZIB-AOPT/QOBLIB `06-portfolio`](https://github.com/ZIB-AOPT/QOBLIB/tree/main/06-portfolio). `instances/manifest.json` is the single source of truth for instance configuration. Paper tables stay labeled as historical.

**Live site:** https://quantum-global-group.github.io/qoblib-dashboard/

This is a Quantum Global Group educational interface. It does not invent best-known values, does not claim quantum advantage, and does not treat QUBO as a quantum algorithm.

## Provenance

| Category | What it is |
|----------|------------|
| Official QOBLIB Repository — Current | Checked-in snapshots in `src/data/generated/` from `npm run sync:qoblib` |
| QOBLIB Paper — Historical Benchmark | Table 6 / Figure 11–12 era numbers in `src/data/qoblibData.ts` |
| QGG Educational Experiment | Lab runs, QAOA demos, student sweeps |
| User Run | Live /lab solves |

Refresh official snapshots (does not invent numbers):

```powershell
npm run sync:qoblib
```

Do not commit `tmp-qoblib-audit/` or secrets.

## Portfolio problem (#06)

Multi-period Markowitz portfolio optimization with:

- Official decision model: asset × unit copy × long/short × period, plus 4 capital slacks and 7 position slacks per period  
- Binary-variable count `(6 × assets + 11) × periods` (decision variables, not physical qubits)  
- Transaction cost δ = 0.001, cash interest ν = 0.0001, short cost ρ = 0.000025  
- Capital C = 10 units of $100,000; official B map 3→3, 4→4, 5→4, 10→4, 50→20, 200→50, 400→100  
- Official families now include 3×2, 4×4, and 5×4 (newer repository instances) plus the original paper scales 10 / 50 / 200 / 400  
- Official λ grid: 0 … 0.01 (see manifest)

Local price JSON in this checkout currently covers a010–a400 only. 3/4/5-asset families are official but not downloaded as local solver files.

### Instance naming (QOBLIB convention)

| Pattern | Example | Meaning |
|---------|---------|---------|
| Price instance | `po_a050_t15_s00` | 50 assets, 15 periods, seed s00 |
| QUBO problem | `a050_t15_s00_b020_l0.0005` | Same instance + max 20 positions + risk λ |

- **orig** — original S&P data; **s00–s02** — perturbed seeds for robustness testing  
- **bXXX** — max assets per day (B)  
- **lX** — risk aversion λ (higher = more risk-averse, harder to solve)

### Current BKV vs historical Table 6

Current official best-known values are auto-generated in `solutions/README.md` and synced into `src/data/generated/qoblibPortfolioBestKnown.json`. “Best known” is not “optimal”.

Paper Table 6 on `po_a050_t15_s00` is a historical snapshot. Most Gurobi objectives on that instance match current BKV; the λ=0.01 paper Gurobi value (−437,920) does **not** match current official BKV `a050_t15_s00_b020_l1e-02` (−43,792). Do not compare that pair without establishing model/version equivalence. This dashboard does not guess why.

### Objective sign conventions

| Solver | Model | Reported objective |
|--------|-------|-------------------|
| Gurobi | MIP/BQP | Negative (minimize economic cost) |
| ABS2 | QUBO/UQO | Positive (`ObjectiveOffset − QUBO energy`) |

The **Quantum Lab** compares local QUBO runs against ingested ABS2 records and **historical** Table 6. Use `/portfolio` for current official BKV.

## Pages

| Route | Purpose |
|-------|---------|
| `/` | Home |
| `/lab` | Run — connect IBM, demo job, solve a portfolio file |
| `/portfolio` | Official #06 families, current BKV, historical paper tables |
| `/learn` | Plain-language brief |
| `/guide` | How to use the lab, cohort outline, handout PDF |
| `/present` | Fullscreen slides |

## Build and host (GitHub, not this machine)

The live site is built by GitHub Actions on push to `main` and deployed to GitHub Pages. Do not keep `node_modules`, `dist`, or a local QOBLIB clone on this computer unless you are actively editing.

```powershell
git push origin main
```

Workflow: `.github/workflows/deploy-pages.yml` → https://quantum-global-group.github.io/qoblib-dashboard/

## Optional local development

Only if you need to edit on this machine. Delete `node_modules` and `dist` afterward.

```powershell
npm install
npm run dev
```

### Quantum Lab (two terminals)

**Terminal 1 — API server:**
```powershell
pip install -r server/requirements.txt
npm run server
```

**Terminal 2 — Dashboard:**
```powershell
npm run dev
```

Open http://localhost:5173/lab

IBM credentials stay in session storage and hit the local API only — never GitHub Pages.

## Guide

The **`/guide`** page is the teaching map (playbook, cohort outline, handout). **`/lab`** is where you run work. IBM Quantum and Qiskit are cited as sources for the optional hardware/simulator path.

**Demo path:** `/lab` → `/portfolio` → `/present`.

### Student parameter lab

The top panel on `/lab` lets learners **change variables and compare outcomes**:

| Knob | Where | What students learn |
|------|--------|---------------------|
| **Qubits** (slider) | Section 2 | Search space grows as 2ⁿ; runtime/noise increase on hardware |
| **QAOA reps / shots** | Section 2 | Circuit depth vs solution quality |
| **Asset scale** (a010 → a050) | Section 3 | Downloaded QUBO size 710 → 4,665 variables; 3/4/5-asset official files are not bundled |
| **Risk λ** | Section 3 | Official λ grid; paper Figure 11 is historical |
| **SA iterations** | Section 3 | Classical effort vs objective gap |

**One-click sweeps:**
- **QAOA qubit sweep** — runs 4, 6, 8, 10, 12, 14 qubits on the simulator and plots runtime
- **λ sweep** — runs every downloaded λ for the selected instance and plots objective/runtime

Each manual run is **recorded automatically** in the comparison log.

## Ingest & fetch QOBLIB data

```powershell
# Official manifest + current BKV snapshots
npm run sync:qoblib

# Portfolio price/covariance JSON (local checkout: a010–a400)
npm run ingest

# Submission CSVs → baselines.json (258 records)
npm run ingest:baselines

# UQO catalog from metrics.csv (128 a010/a050 QUBO files)
npm run ingest:qubo

# Download .qs.xz QUBO files for local solving (git sparse checkout)
npm run fetch:qubo
python scripts/fetch_qubo_files.py --folder a050_t15_s00_b020
```

Clone QOBLIB (sparse checkout of 06-portfolio):

```powershell
git clone --filter=blob:none --sparse https://github.com/ZIB-AOPT/QOBLIB.git data/qoblib
cd data/qoblib
git sparse-checkout set 06-portfolio
```

## Deploy to GitHub Pages

Push to `main` — `.github/workflows/deploy-pages.yml` builds and deploys automatically.

```powershell
git push origin main
```

## Data sources

- Paper: [2504.03832](https://arxiv.org/abs/2504.03832)  
- Repository: [ZIB-AOPT/QOBLIB](https://github.com/ZIB-AOPT/QOBLIB)  
- Portfolio: [06-portfolio](https://github.com/ZIB-AOPT/QOBLIB/tree/main/06-portfolio)

## Stack

React 19, TypeScript, Vite, Tailwind CSS v4, Recharts, React Router, FastAPI, Qiskit IBM Runtime.
