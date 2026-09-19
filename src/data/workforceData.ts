/** Workforce lab content — Quantum Global Group teaching interface */

export const PARTNERS = {
  ibmQuantum: {
    name: 'IBM Quantum',
    url: 'https://www.ibm.com/quantum',
    qiskitUrl: 'https://www.ibm.com/quantum/qiskit',
    learningUrl: 'https://learning.quantum.ibm.com/',
    tagline: 'Cited source for Qiskit and the IBM Quantum Platform used in the Lab',
  },
  quantumGlobalGroup: {
    name: 'Quantum Global Group',
    url: 'https://www.quantumglobalgroup.io',
    huggingFaceUrl: 'https://huggingface.co/quantumGlobalGroup',
    githubUrl: 'https://github.com/Quantum-Global-Group',
    tagline: 'Strategy, execution, and workforce capability from theory to delivery',
    mission:
      'Lead the global transformation into the quantum era through practical quantum solutions and expanded access via education and partnerships.',
  },
}

export const SOURCES = [
  {
    name: 'IBM Quantum',
    url: 'https://www.ibm.com/quantum',
    credit: 'Source for Qiskit and the IBM Quantum Platform used when the Lab runs hardware or simulator jobs.',
  },
  {
    name: 'Qiskit',
    url: 'https://www.ibm.com/quantum/qiskit',
    credit: 'Open-source SDK used by the optional local Lab API.',
  },
  {
    name: 'QOBLIB (ZIB-AOPT)',
    url: 'https://github.com/ZIB-AOPT/QOBLIB',
    credit: 'Official Intractable Decathlon library. Portfolio problem #06 is the focus of this dashboard.',
  },
  {
    name: 'arXiv:2504.03832',
    url: 'https://arxiv.org/abs/2504.03832',
    credit: 'Quantum Optimization Benchmarking Library — The Intractable Decathlon (paper). Table 6 is a historical snapshot.',
  },
]

export type PlaybookStep = {
  step: number
  title: string
  industry: string
  dashboard: string
  route: string
  visual: string
  studentAction: string
  explainIt: string
}

/** Quantum Global Group 6-step process mapped to dashboard experiences */
export const INDUSTRY_PLAYBOOK: PlaybookStep[] = [
  {
    step: 1,
    title: 'Define the outcome',
    industry: 'Align on the decision, success metrics, and what “better” means for the business workflow.',
    dashboard: 'Overview + Portfolio pages frame the QOBLIB benchmark question and portfolio #06 economics.',
    route: '/',
    visual: 'Problem statement cards · Table 5 instance sizes · λ risk parameter',
    studentAction: 'Read the one-minute QOBLIB story; pick a portfolio instance and λ to study.',
    explainIt:
      '“We are not guessing — we use the same published QOBLIB benchmark (arXiv:2504.03832).”',
  },
  {
    step: 2,
    title: 'Fit check',
    industry: 'Decide if the problem is quantum-suitable now, later, or best served classically.',
    dashboard: 'Parameter lab scale chart + qubit slider show when quantum hardware fits vs when QOBLIB needs classical solvers.',
    route: '/lab',
    visual: '2ⁿ search-space growth · 710 → 36,165 variable curve',
    studentAction: 'Run QAOA at 4 vs 12 qubits; compare to a050 QUBO variable count.',
    explainIt:
      '“Portfolio at full scale is intractable on NISQ today — our fit check mirrors how enterprises gate quantum pilots.”',
  },
  {
    step: 3,
    title: 'Pilot design',
    industry: 'Choose datasets, constraints, baselines, and acceptance criteria for a defendable pilot.',
    dashboard: 'Lab instance picker, λ selector, shots/reps — same knobs researchers use in QOBLIB submissions.',
    route: '/lab',
    visual: 'Instance ID · problem prefix · baseline panel',
    studentAction: 'Select po_a050_t15_s00, λ = 0.0005, document shots/reps/iterations before running.',
    explainIt:
      '“Every submission reports problem ID, objective, runtime, hardware — students practice that exact CSV format.”',
  },
  {
    step: 4,
    title: 'Build & benchmark',
    industry: 'Reproducible experiments compared against classical baselines.',
    dashboard: 'IBM Qiskit Runtime jobs + classical SA on official .qs.xz files vs 258 ingested QOBLIB submissions.',
    route: '/lab',
    visual: 'Gurobi vs ABS2 charts · gap % scoring · recorded run log',
    studentAction: 'Connect IBM token + CRN; run simulator then QPU; solve QUBO; compare to ABS2 reference.',
    explainIt:
      '“We duplicate the paper’s Table 6 workflow — Gurobi MIP vs ABS2 QUBO — with live scoring in the UI.”',
  },
  {
    step: 5,
    title: 'Report & roadmap',
    industry: 'Share results, tradeoffs, and next steps for scaling or pivot.',
    dashboard: 'Verification verdicts, parameter sweep charts, presentation mode with speaker notes.',
    route: '/present',
    visual: 'Bar charts · λ sweep lines · slide deck',
    studentAction: 'Export talking points from /present; present gap % and runtime tradeoffs to class.',
    explainIt:
      '“Students leave with defendable numbers and charts — not just ‘quantum is cool.’”',
  },
  {
    step: 6,
    title: 'Enable the team',
    industry: 'Workforce tracks, tooling, and knowledge transfer so the organization can repeat the process.',
    dashboard: 'Beginner guide + this workforce hub + open GitHub repo for colleges to fork and extend.',
    route: '/learn',
    visual: 'Concept glossary · playbook checklist · open GitHub repo',
    studentAction: 'Teach a peer using /learn; mentor another cohort through the same lab checklist.',
    explainIt:
      '“Capability building is the product — the dashboard is the reusable lab manual.”',
  },
]

export type StudentModule = {
  id: string
  week: string
  title: string
  route: string
  deliverable: string
  skills: string[]
}

export const STUDENT_MODULES: StudentModule[] = [
  {
    id: 'm1',
    week: 'Week 1',
    title: 'Speak the benchmark language',
    route: '/learn',
    deliverable: 'One-page explainer: MIP vs QUBO, what λ means, why QOBLIB exists',
    skills: ['Optimization vocabulary', 'Benchmark literacy', 'Presentation'],
  },
  {
    id: 'm2',
    week: 'Week 2',
    title: 'Explore real market data',
    route: '/portfolio',
    deliverable: 'Screenshot walkthrough of two instances (a010 vs a050) with price & covariance charts',
    skills: ['Financial data', 'Problem sizing', 'Visual storytelling'],
  },
  {
    id: 'm3',
    week: 'Week 3',
    title: 'Connect & run on IBM Quantum',
    route: '/lab',
    deliverable: 'Job log: simulator vs hardware — qubits, shots, reps, runtime, best bitstring',
    skills: ['Qiskit Runtime', 'IBM Cloud credentials', 'Experimental design'],
  },
  {
    id: 'm4',
    week: 'Week 4',
    title: 'Benchmark like industry',
    route: '/lab',
    deliverable: 'QOBLIB verification report: your objective vs ABS2/Gurobi, gap %, λ sweep chart',
    skills: ['Reproducible research', 'Baseline comparison', 'Honest result reporting'],
  },
  {
    id: 'm5',
    week: 'Week 5',
    title: 'Present to stakeholders',
    route: '/present',
    deliverable: '5-minute briefing using built-in slides + live demo',
    skills: ['Executive communication', 'Demo discipline', 'Workforce portfolio piece'],
  },
]

export const ENTERPRISE_VS_STUDENT = [
  {
    enterprise: 'Quantum Global Group: quantum readiness & use-case screening',
    student: 'Fit-check exercise: qubit sweep vs portfolio variable scale on /lab',
  },
  {
    enterprise: 'IBM Quantum: cloud QPU access for pilot teams',
    student: 'Same stack — IBM token, CRN, backend picker, Qiskit Runtime Sampler',
  },
  {
    enterprise: 'ZIB/QOBLIB: published baselines & verification checkers',
    student: '258 submissions ingested; gap scoring against Table 6 references',
  },
  {
    enterprise: 'Hybrid quantum-classical production pilots',
    student: 'QAOA warmup on QPU + classical SA on official QUBO files — side by side',
  },
  {
    enterprise: 'Workforce enablement & knowledge transfer',
    student: 'Cohort repeats modules; peers teach peers using /learn + this playbook',
  },
]

export const HOW_TO_USE = [
  'Open Run from the top nav when you want to work. This Guide page is the map, not the workbench.',
  'IBM Quantum and Qiskit are cited sources for the optional hardware/simulator path.',
  'QOBLIB portfolio #06 is the official benchmark problem. Verify with the official checker — a low score is not enough.',
  'Presentation mode has speaker notes for you. Hide them with N when people are watching.',
  'The handout PDF is the one-page leave-behind. Save it from the print dialog.',
]
