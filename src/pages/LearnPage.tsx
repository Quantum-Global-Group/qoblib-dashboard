import { BEGINNER_CONCEPTS } from '../data/qoblibData'
import { PageHeader } from '../components/ui/PageHeader'
import { QggPanel } from '../components/ui/QggPanel'

export function LearnPage() {
  return (
    <div>
      <PageHeader
        num="03"
        title="Learn"
        subtitle="Plain-language brief of the QOBLIB paper and the portfolio problem. Use this when the audience is not a solver expert."
      />

      <div className="qgg-page-inner space-y-6">
        <QggPanel num="01" title="Story arc of the paper">
          <ol className="space-y-4 text-sm leading-relaxed text-qgg-muted">
            <li>
              <span className="font-semibold text-qgg-fg">Problem:</span> Quantum computing companies claim their
              machines will revolutionize optimization, but without shared tests, nobody can verify progress or compare
              fairly against classical supercomputers.
            </li>
            <li>
              <span className="font-semibold text-qgg-fg">Solution:</span> Build QOBLIB — an open “exam” with 10 hard
              problem types, downloadable datasets, known best solutions, and scripts to check if your answer is valid.
            </li>
            <li>
              <span className="font-semibold text-qgg-fg">Method:</span> Run state-of-the-art classical solvers
              (Gurobi, CPLEX, etc.) and sample quantum/heuristic solvers on the same instances. Report solution quality,
              runtime, and hardware details in a standard format.
            </li>
            <li>
              <span className="font-semibold text-qgg-fg">Result so far:</span> Classical solvers still win on solution
              quality for most instances, but some QUBO solvers reach decent answers faster — a promising sign for
              time-sensitive use cases, not yet quantum advantage.
            </li>
          </ol>
        </QggPanel>

        <section className="grid gap-0 border border-qgg md:grid-cols-2">
          {BEGINNER_CONCEPTS.map((item) => (
            <div key={item.term} className="border-b border-qgg bg-qgg-paper p-4 md:border-r md:odd:border-r">
              <h3 className="qgg-section-title text-sm">{item.term}</h3>
              <p className="mt-2 text-sm leading-relaxed text-qgg-muted">{item.plain}</p>
            </div>
          ))}
        </section>

        <QggPanel num="02" title="Portfolio problem — explained like a story">
          <div className="space-y-4 text-sm leading-relaxed text-qgg-muted">
            <p>
              Imagine you manage <strong className="text-qgg-fg">$1 million</strong> and can choose from S&amp;P 500
              names. For each period the official model decides asset, unit copy, long/short direction, unused capital,
              and whether the position budget is respected — not a single hold-or-skip bit per stock.
            </p>
            <p>
              You want <strong className="text-qgg-fg">more profit</strong> but also want to avoid wild swings (risk).
              The dial <strong className="text-qgg-fg">λ (lambda)</strong> controls that tradeoff. Every time you
              change your holdings, you pay a <strong className="text-qgg-fg">transaction fee</strong>. Short positions
              cost borrowing fees.
            </p>
            <p>
              The computer must find the best pattern of daily decisions. With 50 stocks and 15 days, that is thousands
              of binary yes/no variables — and the math couples them through covariances (how stocks move together).
              Classical solvers like Gurobi use clever branch-and-bound search; quantum-inspired solvers reformulate the
              problem as QUBO and search differently.
            </p>
            <p>
              The paper&apos;s key portfolio finding: when λ is small (profit-focused), Gurobi solves quickly. When λ
              grows (risk-focused), runtime explodes and gaps widen — making these instances a meaningful stress test for
              any new solver.
            </p>
          </div>
        </QggPanel>

        <QggPanel num="02b" title="Start small, then scale">
          <p className="text-sm leading-relaxed text-qgg-muted">
            Official QOBLIB now includes 3×2, 4×4, and 5×4 asset/period families. Use them to see every variable
            before jumping to 710+ binary variables on 10-asset problems. Those small families are newer
            repository instances, not the original paper&apos;s 10 / 50 / 200 / 400 set.
          </p>
        </QggPanel>

        <QggPanel num="02c" title="QUBO is a formulation, QAOA is an algorithm">
          <p className="text-sm leading-relaxed text-qgg-muted">
            QUBO describes a 0/1 quadratic problem. QAOA is one variational algorithm that may search a
            landscape. Annealing is a different method. Classical MIP/BQP solvers can also attack the same
            economic problem. None of those facts implies quantum advantage.
          </p>
        </QggPanel>

        <QggPanel num="02d" title="A score is not a benchmark result">
          <p className="text-sm leading-relaxed text-qgg-muted">
            The official checker parses the instance, checks capital and position constraints, recomputes
            the objective in exact arithmetic, and validates any claimed value. Vocabulary: valid,
            infeasible, invalid, best known, optimal. Best known is a recorded record, not a proof of
            optimality. Current official BKV lives on /portfolio; paper Table 6 is a historical snapshot.
            One λ=0.01 paper Gurobi value (−437,920) does not match the current official BKV (−43,792) —
            do not compare that pair without establishing model/version equivalence.
          </p>
        </QggPanel>

        <QggPanel num="02e" title="What makes a fair comparison">
          <p className="text-sm leading-relaxed text-qgg-muted">
            Same problem definition, instance, objective, constraints, and parameters; a valid solution;
            clear runtime methodology; hardware/software context; a repeatable experiment; and a
            transparent source/version. Compressed encodings can use fewer qubits than the full binary
            model, so qubit count is not automatically the official variable count.
          </p>
        </QggPanel>

        <QggPanel num="03" title="The other 9 problems (one sentence each)">
          <dl className="space-y-3 text-sm">
            {[
              ['Market Split', 'Split products across markets so each hits an exact sales target — like a multidimensional knapsack puzzle.'],
              ['LABS', 'Find a binary sequence whose autocorrelation is as flat as possible — used in radar signal design.'],
              ['Birkhoff', 'Decompose a doubly-stochastic matrix into few permutation matrices — scheduling and assignment.'],
              ['Steiner Tree Packing', 'Pack many Steiner trees into a graph — models VLSI chip wire routing.'],
              ['Sports Scheduling', 'Schedule a tournament so every team plays fairly — a constraint satisfaction nightmare at scale.'],
              ['Maximum Independent Set', 'Pick the most vertices in a graph with no edges between them — classic graph theory.'],
              ['Network Design', 'Build a telecom network meeting capacity and redundancy rules at minimum cost.'],
              ['Vehicle Routing', 'Route delivery trucks with time windows and capacity — logistics optimization.'],
              ['Topology Design', 'Design a network graph with minimum diameter for given node degrees — “graph golf”.'],
            ].map(([name, desc]) => (
              <div key={name} className="border-b border-qgg pb-3 last:border-0">
                <dt className="font-semibold">{name}</dt>
                <dd className="mt-1 text-qgg-muted">{desc}</dd>
              </div>
            ))}
          </dl>
        </QggPanel>
      </div>
    </div>
  )
}
