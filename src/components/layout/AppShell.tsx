import { NavLink, Outlet } from 'react-router-dom'
import { QggLogo } from '../QggLogo'

const NAV = [
  { num: '01', label: 'RUN', to: '/lab' },
  { num: '02', label: 'PORTFOLIO', to: '/portfolio' },
  { num: '03', label: 'LEARN', to: '/learn' },
  { num: '04', label: 'GUIDE', to: '/guide' },
  { num: '05', label: 'PRESENT', to: '/present' },
] as const

export function AppShell() {
  return (
    <div className="qgg-app flex min-h-full flex-col">
      <header className="qgg-header no-print sticky top-0 z-40 border-b border-qgg bg-qgg-paper/95 backdrop-blur-sm">
        <div className="mx-auto flex max-w-[1400px] items-center justify-between gap-4 px-4 py-4 lg:px-6">
          <QggLogo size="md" />
          <nav className="hidden items-center gap-1 md:flex lg:gap-2">
            {NAV.map(({ num, label, to }) => (
              <NavLink
                key={num + label}
                to={to}
                className={({ isActive }) =>
                  `qgg-nav-link px-2 py-1 text-[10px] lg:px-3 lg:text-[11px] ${isActive ? 'qgg-nav-link-active' : ''}`
                }
              >
                <span className="font-mono text-qgg-muted">{num}</span> {label}
              </NavLink>
            ))}
          </nav>
          <a
            href="https://www.quantumglobalgroup.io"
            target="_blank"
            rel="noreferrer"
            className="qgg-btn qgg-btn-accent hidden text-xs sm:inline-flex"
          >
            CONTACT ↗
          </a>
        </div>
        <nav className="flex overflow-x-auto border-t border-qgg md:hidden">
          {NAV.map(({ num, to }) => (
            <NavLink
              key={`m-${num}`}
              to={to}
              className={({ isActive }) =>
                `shrink-0 border-r border-qgg px-3 py-2 font-mono text-[10px] uppercase ${isActive ? 'bg-qgg-accent text-black' : ''}`
              }
            >
              {num}
            </NavLink>
          ))}
        </nav>
      </header>

      <main className="qgg-main flex-1">
        <Outlet />
      </main>

      <footer className="qgg-footer no-print border-t border-qgg bg-qgg-paper px-4 py-6 lg:px-6">
        <div className="mx-auto flex max-w-[1400px] flex-wrap items-end justify-between gap-4 text-xs">
          <div>
            <p className="font-semibold uppercase tracking-wide">Quantum Global Group · QOBLIB Lab</p>
            <p className="mt-1 text-qgg-muted">Sources: IBM Quantum / Qiskit · ZIB-AOPT QOBLIB · arXiv:2504.03832</p>
          </div>
          <div className="flex flex-wrap gap-4 font-mono text-[10px] uppercase">
            <a href="https://www.ibm.com/quantum" target="_blank" rel="noreferrer" className="qgg-link">
              IBM Quantum ↗
            </a>
            <a href="https://github.com/Quantum-Global-Group/qoblib-dashboard" target="_blank" rel="noreferrer" className="qgg-link">
              GitHub ↗
            </a>
            <span className="text-qgg-muted">© {new Date().getFullYear()} Quantum Global Group</span>
          </div>
        </div>
      </footer>
    </div>
  )
}
