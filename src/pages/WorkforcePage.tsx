import { Link } from 'react-router-dom'
import { PartnerCoBrand } from '../components/PartnerCoBrand'
import { WorkforceHandoutPrint } from '../components/WorkforceHandoutPrint'
import { PageHeader } from '../components/ui/PageHeader'
import { QggPanel } from '../components/ui/QggPanel'
import {
  ENTERPRISE_VS_STUDENT,
  HOW_TO_USE,
  INDUSTRY_PLAYBOOK,
  SOURCES,
  STUDENT_MODULES,
} from '../data/workforceData'

function PlaybookCard({
  step,
  title,
  industry,
  dashboard,
  route,
  visual,
  studentAction,
  explainIt,
}: (typeof INDUSTRY_PLAYBOOK)[0]) {
  return (
    <div className="relative border border-qgg bg-qgg-paper p-5">
      <div className="absolute -left-3 top-5 flex h-8 w-8 items-center justify-center border-2 border-qgg bg-qgg-accent text-sm font-bold">
        {step}
      </div>
      <div className="ml-4">
        <div className="flex flex-wrap items-start justify-between gap-2">
          <h4 className="qgg-section-title text-sm">{title}</h4>
          <Link to={route} className="font-mono text-xs uppercase hover:bg-qgg-accent">
            Open ↗
          </Link>
        </div>
        <div className="mt-4 grid gap-4 lg:grid-cols-2">
          <div>
            <p className="font-mono text-xs uppercase text-qgg-muted">Industry (QGG)</p>
            <p className="mt-1 text-sm text-qgg-muted">{industry}</p>
          </div>
          <div>
            <p className="font-mono text-xs uppercase text-qgg-muted">This dashboard</p>
            <p className="mt-1 text-sm text-qgg-muted">{dashboard}</p>
          </div>
        </div>
        <p className="mt-3 border border-qgg bg-qgg-paper px-3 py-2 text-xs text-qgg-muted">
          <span className="font-semibold text-qgg-fg">Visuals: </span>
          {visual}
        </p>
        <p className="mt-2 text-sm">
          <span className="text-qgg-muted">Student does: </span>
          {studentAction}
        </p>
        <p className="mt-2 border-l-2 border-qgg-accent pl-3 text-xs italic text-qgg-muted">
          How to explain it: {explainIt}
        </p>
      </div>
    </div>
  )
}

export function WorkforcePage() {
  function printHandout() {
    window.print()
  }

  return (
    <>
      <WorkforceHandoutPrint />
      <PageHeader
        num="04"
        title="Guide"
        subtitle="How to use this lab. Run is where you do the work. This page is the teaching path, cohort outline, and one-page handout."
      >
        <Link to="/lab" className="qgg-btn qgg-btn-accent">
          OPEN RUN ↗
        </Link>
        <Link to="/present" className="qgg-btn">
          PRESENT
        </Link>
        <button type="button" onClick={printHandout} className="qgg-btn">
          HANDOUT PDF
        </button>
      </PageHeader>

      <div className="no-print qgg-page-inner space-y-8">
        <QggPanel>
          <PartnerCoBrand />
          <p className="mt-6 text-sm leading-relaxed text-qgg-muted">
            Quantum Global Group built this lab so students and working teams can practice the same define →
            fit check → pilot → benchmark → report workflow on official QOBLIB portfolio instances. Run is
            the workspace. This page is the map.
          </p>
        </QggPanel>

        <QggPanel title="Sources and credit">
          <p className="text-sm leading-relaxed text-qgg-muted">
            This is a Quantum Global Group educational interface. IBM is cited as a source for the software
            and cloud platform used in the Lab — not as a partner on this page.
          </p>
          <ul className="mt-4 space-y-3 text-sm">
            {SOURCES.map((source) => (
              <li key={source.name} className="border-b border-qgg pb-3 last:border-0">
                <a href={source.url} target="_blank" rel="noreferrer" className="qgg-link font-semibold">
                  {source.name} ↗
                </a>
                <p className="mt-1 text-qgg-muted">{source.credit}</p>
              </li>
            ))}
          </ul>
        </QggPanel>

        <section>
          <h3 className="qgg-section-title text-lg">Industry playbook → student lab</h3>
          <p className="mt-2 max-w-3xl text-sm text-qgg-muted">
            Quantum Global Group&apos;s delivery process, implemented as clickable dashboard modules.
          </p>
          <div className="mt-6 space-y-4 pl-3">
            {INDUSTRY_PLAYBOOK.map((step) => (
              <PlaybookCard key={step.step} {...step} />
            ))}
          </div>
        </section>

        <QggPanel num="04" title="Where to click">
          <ul className="space-y-3 text-sm text-qgg-muted">
            <li>
              <Link to="/lab" className="qgg-link font-semibold">Lab</Link> — connect IBM Quantum if you have credentials, run a small QAOA warmup, then solve downloaded QOBLIB QUBOs.
            </li>
            <li>
              <Link to="/portfolio" className="qgg-link font-semibold">Portfolio</Link> — official families, current best-known values, and historical paper tables.
            </li>
            <li>
              <Link to="/present" className="qgg-link font-semibold">Present</Link> — fullscreen slides. Speaker notes are coaching for you; hide them with N when an audience is watching.
            </li>
          </ul>
        </QggPanel>

        <section>
          <h3 className="qgg-section-title text-lg">5-week cohort curriculum</h3>
          <div className="mt-4 grid gap-0 border border-qgg md:grid-cols-2 xl:grid-cols-3">
            {STUDENT_MODULES.map((mod) => (
              <Link
                key={mod.id}
                to={mod.route}
                className="group border-b border-qgg bg-qgg-paper p-5 transition hover:bg-qgg-accent md:border-r"
              >
                <p className="font-mono text-xs text-qgg-muted">{mod.week}</p>
                <h4 className="mt-1 font-semibold group-hover:underline">{mod.title}</h4>
                <p className="mt-2 text-xs text-qgg-muted">
                  <span className="font-semibold">Deliverable: </span>
                  {mod.deliverable}
                </p>
                <div className="mt-3 flex flex-wrap gap-1">
                  {mod.skills.map((s) => (
                    <span key={s} className="qgg-tag">
                      {s}
                    </span>
                  ))}
                </div>
              </Link>
            ))}
          </div>
        </section>

        <QggPanel title="Enterprise workflow vs student experience">
          <ul className="space-y-3">
            {ENTERPRISE_VS_STUDENT.map((row) => (
              <li key={row.enterprise} className="grid gap-2 border-b border-qgg pb-3 text-sm last:border-0 md:grid-cols-2">
                <span className="text-qgg-muted">{row.enterprise}</span>
                <span className="font-medium">{row.student}</span>
              </li>
            ))}
          </ul>
        </QggPanel>

        <QggPanel dark title="How to use this lab">
          <ul className="space-y-2">
            {HOW_TO_USE.map((point) => (
              <li key={point} className="flex gap-2 text-sm">
                <span className="text-qgg-accent">✓</span>
                {point}
              </li>
            ))}
          </ul>
          <p className="mt-3 text-xs text-[#888] no-print">
            Handout: click “HANDOUT PDF”, then choose Save as PDF in the print dialog.
          </p>
          <p className="mt-2 text-xs text-[#888]">
            Suggested path: Lab → Portfolio → Present. Repo:{' '}
            <a href="https://github.com/Quantum-Global-Group/qoblib-dashboard" target="_blank" rel="noreferrer" className="text-qgg-accent underline">
              Quantum-Global-Group/qoblib-dashboard
            </a>
          </p>
        </QggPanel>
      </div>
    </>
  )
}
