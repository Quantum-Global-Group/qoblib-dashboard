import { Link } from 'react-router-dom'
import { QggTerminal } from '../components/ui/QggTerminal'
import { PAPER } from '../data/qoblibData'

const QUICK = [
  { label: 'RUN', sub: 'Connect IBM and solve', to: '/lab' },
  { label: 'PORTFOLIO', sub: 'Official #06 numbers', to: '/portfolio' },
  { label: 'LEARN', sub: 'Plain-language brief', to: '/learn' },
  { label: 'GUIDE', sub: 'How to use this lab', to: '/guide' },
] as const

const GRID_SECTIONS = [
  {
    num: '01',
    title: 'RUN',
    dark: true,
    to: '/lab',
    body: 'Connect an IBM token, run a small quantum job, then solve an official QOBLIB portfolio QUBO.',
    cta: 'OPEN RUN ↗',
    terminal: true,
  },
  {
    num: '02',
    title: 'PORTFOLIO',
    dark: false,
    to: '/portfolio',
    body: PAPER.title,
    items: ['Official manifest families (3–400 assets)', 'Current BKV + historical Table 6', 'Checker-first verification'],
    cta: 'OPEN PORTFOLIO ↗',
  },
  {
    num: '03',
    title: 'LEARN',
    dark: false,
    to: '/learn',
    body: 'Plain-language brief of the QOBLIB paper and the portfolio problem — for people who are not solver experts.',
    items: ['Paper story', 'Beginner terms', 'What λ means'],
    cta: 'OPEN LEARN ↗',
  },
  {
    num: '04',
    title: 'GUIDE',
    dark: false,
    to: '/guide',
    body: 'How to walk someone through the lab: teaching path, cohort outline, and one-page handout.',
    items: ['Teaching path', 'Cohort outline', 'Handout PDF'],
    cta: 'OPEN GUIDE ↗',
  },
  {
    num: '05',
    title: 'PRESENT',
    dark: false,
    to: '/present',
    body: 'Fullscreen slides with speaker notes for a partner or classroom demo.',
    cta: 'OPEN PRESENT ↗',
  },
] as const

export function OverviewPage() {
  return (
    <div>
      {/* Hero */}
      <section className="border-b border-qgg bg-qgg-paper px-4 py-10 lg:px-6 lg:py-16">
        <div className="mx-auto grid max-w-[1400px] gap-8 lg:grid-cols-[1fr_220px]">
          <div>
            <h1 className="qgg-display text-4xl uppercase leading-[1.05] tracking-tight lg:text-6xl">
              Building quantum systems for the post-classical era.
            </h1>
            <p className="mt-6 max-w-2xl text-sm leading-relaxed text-qgg-muted lg:text-base">
              QOBLIB lab by Quantum Global Group — official portfolio problem #06. Connect IBM Quantum,
              solve a file, and compare against published QOBLIB results.
            </p>
            <div className="mt-8 flex flex-wrap gap-6">
              {QUICK.map(({ label, sub, to }) => (
                <Link key={label} to={to} className="group font-mono text-xs uppercase tracking-wider">
                  <span className="font-bold underline decoration-qgg-accent decoration-2 underline-offset-4 group-hover:bg-qgg-accent">
                    {label}
                  </span>{' '}
                  <span className="text-qgg-muted">{sub}</span>
                  <span className="ml-1">↗</span>
                </Link>
              ))}
            </div>
          </div>
          <nav className="hidden border border-qgg bg-qgg-paper p-4 lg:block">
            <ul className="space-y-2 font-mono text-[11px] uppercase tracking-wider">
              {GRID_SECTIONS.map((s) => (
                <li key={s.num}>
                  <Link to={s.to} className="flex justify-between border-b border-qgg py-2 hover:bg-qgg-accent">
                    <span>
                      {s.num} {s.title.split(' ')[0]}
                    </span>
                    <span>→</span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </section>

      {/* Stats strip */}
      <section className="grid grid-cols-2 border-b border-qgg lg:grid-cols-4">
        {[
          { label: 'Problem classes', value: '10' },
          { label: 'Variables', value: '100–100k' },
          { label: 'Library', value: 'QOBLIB' },
          { label: 'Focus', value: '#06' },
        ].map((s) => (
          <div key={s.label} className="border-r border-qgg px-4 py-5 last:border-r-0">
            <p className="font-mono text-[10px] uppercase text-qgg-muted">{s.label}</p>
            <p className="qgg-stat-value mt-1">{s.value}</p>
          </div>
        ))}
      </section>

      {/* Main grid — matches QGG site layout */}
      <section className="mx-auto max-w-[1400px] border-x border-qgg">
        <div className="qgg-grid-home">
          {GRID_SECTIONS.map((section) => (
            <article
              key={section.num}
              className={`flex min-h-[280px] flex-col p-6 lg:p-8 ${section.dark ? 'bg-qgg-terminal text-qgg-fg' : 'bg-qgg-paper'}`}
            >
              <p className="font-mono text-xs text-qgg-muted">
                {section.num} / <span className={section.dark ? 'text-[#888]' : ''}>{section.title}</span>
              </p>
              <p className={`mt-4 flex-1 text-sm leading-relaxed ${section.dark ? 'text-[#ccc]' : 'text-qgg-muted'}`}>
                {section.body}
              </p>
              {'items' in section && section.items ? (
                <ul className="mt-4 space-y-1 font-mono text-[11px]">
                  {section.items.map((item) => (
                    <li key={item} className="flex justify-between border-b border-current/20 py-1">
                      <span>{item}</span>
                      <span>↗</span>
                    </li>
                  ))}
                </ul>
              ) : null}
              {'terminal' in section && section.terminal ? (
                <div className="mt-4">
                  <QggTerminal />
                  <p className="mt-3 flex gap-3 font-mono text-[10px] uppercase text-[#888]">
                    <span>IBM</span>
                    <span>Rigetti</span>
                    <span>IonQ</span>
                    <span>AWS</span>
                  </p>
                </div>
              ) : null}
              <Link
                to={section.to}
                className="qgg-btn qgg-btn-accent mt-6 w-fit"
              >
                {section.cta}
              </Link>
            </article>
          ))}
        </div>
      </section>

      <section className="border-t border-qgg bg-qgg-accent px-4 py-3 text-center font-mono text-[10px] uppercase tracking-widest lg:text-xs">
        Question everything. Compute beyond. · Sources: IBM Quantum / Qiskit · QOBLIB · {PAPER.arxiv}
      </section>
    </div>
  )
}
