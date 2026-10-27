import { useCallback, useEffect, useRef, useState } from 'react'

/* ========================================
   Navigation Bar
   ======================================== */
const navLinks: [string, string][] = [
  ['#about', 'About'],
  ['#projects', 'Work'],
  ['#case-studies', 'Case Studies'],
  ['#experience', 'Experience'],
  ['#ai', 'AI'],
  ['#stack', 'Stack'],
]

function Navbar() {
  return (
    <nav className="relative z-10 flex flex-row justify-between items-center gap-6 px-6 py-6 max-w-6xl mx-auto">
      <a
        href="#"
        className="text-2xl tracking-tight text-white"
        style={{ fontFamily: 'var(--font-display)' }}
      >
        Thanet Arnont
      </a>

      <div className="hidden md:flex gap-6 items-center">
        {navLinks.map(([href, label]) => (
          <a
            key={href}
            href={href}
            className="text-sm text-white/60 hover:text-white transition-colors whitespace-nowrap"
          >
            {label}
          </a>
        ))}
      </div>

      <a href="#contact" className="btn text-sm">
        Contact
      </a>
    </nav>
  )
}

/* ========================================
   Hero Section
   ======================================== */
function Hero() {
  return (
    <section id="hero" className="relative z-10 px-6 pt-16 pb-24 sm:pt-24 sm:pb-32 max-w-6xl mx-auto">
      <p className="text-sm text-white/60 mb-6">
        Senior Software Engineer &amp; System Architect · Bangkok
      </p>
      <h1
        className="text-5xl sm:text-7xl leading-[1.02] tracking-tight max-w-4xl font-normal text-white"
        style={{ fontFamily: 'var(--font-display)' }}
      >
        Building systems that aren't allowed to fail — for 20+ years.
      </h1>

      <p className="text-white/70 text-base sm:text-lg max-w-2xl mt-8 leading-relaxed">
        Production systems for Thai telecom, banking, and government since 2004 — now with agents
        and models that run on hardware you control. Available for consulting through
        Wisdom Vast Co., Ltd.
      </p>

      <div className="flex flex-wrap items-center gap-6 mt-10">
        <a href="#projects" className="btn btn-primary">
          See the work
        </a>
        <a href="mailto:thanet@wisdomvast.com" className="link">
          thanet@wisdomvast.com
        </a>
      </div>
    </section>
  )
}

/* ========================================
   Section heading — one shared treatment
   ======================================== */
function SectionHeading({ title, intro }: { title: string; intro?: string }) {
  return (
    <header className="mb-10 max-w-2xl">
      <h2
        className="text-4xl sm:text-5xl tracking-tight text-white"
        style={{ fontFamily: 'var(--font-display)' }}
      >
        {title}
      </h2>
      {intro && <p className="text-white/60 mt-4 leading-relaxed">{intro}</p>}
    </header>
  )
}

/* ========================================
   About Section
   ======================================== */
const LINKEDIN_URL = 'https://www.linkedin.com/in/thanet-arnont/'
const RESUME_JSON_URL = `${import.meta.env.BASE_URL}resume.json`
const CASE_STUDY_GITLAB = `${import.meta.env.BASE_URL}case-studies/gitlab-migration.html`
const CASE_STUDY_HAUCTION = `${import.meta.env.BASE_URL}case-studies/hauction.html`
const CASE_STUDY_BEYOND_RAG = `${import.meta.env.BASE_URL}case-studies/beyond-rag.html`
const LLMS_TXT_URL = `${import.meta.env.BASE_URL}llms.txt`

function About() {
  return (
    <section id="about" className="relative z-10 px-6 py-20 max-w-6xl mx-auto rule-top">
      <div className="grid grid-cols-1 md:grid-cols-[auto_1fr] gap-10 md:gap-14 items-start">
        <img
          src={`${import.meta.env.BASE_URL}thanet-portrait.jpg`}
          alt="Thanet Arnont"
          className="w-48 md:w-56 rounded-xl"
        />
        <div className="max-w-2xl">
          <h2
            className="text-4xl sm:text-5xl tracking-tight mb-6 text-white"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            About
          </h2>
          <p className="text-white/70 leading-relaxed mb-4">
            I'm Thanet Arnont — a software engineer and system architect based in Nonthaburi,
            Thailand, shipping production systems since 2004. My path runs through the country's
            most demanding environments: mobile network R&D at DTAC, treasury risk systems for
            Kasikornbank (KBank), 15+ enterprise applications for AIS, the NBTC Digital TV spectrum
            auction, and financial systems for the Ministry of Finance.
          </p>
          <p className="text-white/70 leading-relaxed mb-4">
            Today, at <span className="text-white">Wisdom Vast Co., Ltd.</span>,
            I combine two decades of architecture judgment with a modern AI-driven stack —
            Next.js, TypeScript, MCP — to design, build, and rescue systems that have to work.
          </p>
          <p className="text-white/70 leading-relaxed mb-8">
            B.Eng. Computer Engineering, King Mongkut's Institute of Technology Ladkrabang (KMITL).
            Open to consulting engagements: architecture reviews, system design, and hands-on delivery.
          </p>
          <div className="flex flex-wrap gap-6">
            <a href={LINKEDIN_URL} target="_blank" rel="noopener noreferrer" className="link">
              LinkedIn →
            </a>
            <a href={RESUME_JSON_URL} target="_blank" rel="noopener noreferrer" className="link">
              Resume (JSON) →
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ========================================
   Projects Section — Real Client Names
   ======================================== */
const projects = [
  {
    client: 'NBTC (กสทช.)',
    name: 'Digital TV Spectrum Auction',
    description: 'National-scale real-time auction platform for digital TV spectrum licensing. Multi-bidder WebSocket engine with sub-second bidding, state machine lifecycle, and government-grade audit trail.',
    tags: ['Next.js', 'TypeScript', 'WebSockets', 'RBAC', 'State Machine'],
  },
  {
    client: 'AIS (Advanced Info Service)',
    name: 'Enterprise Application Suite',
    description: "15+ production applications for Thailand's #1 telecom. Including: AIS Gamification (loyalty platform), AIS IKM (knowledge management), AIS e-Service, AIS Movie Store, AIS MY Partner, AIS Good Number, AIS FBB, and more.",
    tags: ['React', 'Node.js', 'Gamification', 'CRM', 'Microservices'],
  },
  {
    client: 'Ministry of Finance (Thailand)',
    name: 'Off-Budget Accounting System',
    description: 'Government financial management and reporting system for non-budgetary funds. Handles complex fund tracking, multi-level approval workflows, and regulatory compliance reporting.',
    tags: ['Enterprise', 'Government', 'Compliance', 'Workflow'],
  },
  {
    client: 'Self-Initiated',
    name: 'Programming Visualize (MongoModel)',
    description: 'Visual MongoDB schema designer with drag-and-drop canvas, MCP server (31 tools), 8-format code generation, 3D workflow visualization, and workspace-wide linting — built for teams who think in Thai.',
    tags: ['Next.js 16', 'React 19', 'MCP', 'TypeScript', 'AI Collaboration'],
  },
  {
    client: 'Self-Initiated',
    name: 'Hauction — Hybrid Auction Platform',
    description: 'Multi-shop auction platform supporting both Event-Based (Live) and Long-Term (Marketplace) types. Features 5-role RBAC, WebSocket bidding, Meta design system, and full Thai Baht localization.',
    tags: ['Next.js', 'better-sqlite3', 'RBAC', 'Real-time'],
    caseStudy: CASE_STUDY_HAUCTION,
  },
  {
    client: 'Kasikornbank (KBank)',
    name: 'Treasury Risk Management System',
    description: 'Financial risk analysis and reporting system for treasury operations. Handles complex risk calculations, regulatory reporting, and multi-level approval workflows.',
    tags: ['Banking', 'Finance', 'Risk Analysis', 'Enterprise'],
  },
  {
    client: 'DTAC (Total Access Communication)',
    name: 'Service Integration & R&D',
    description: 'Research and development of mobile network services. Studied global mobile technologies, integrated vendor test systems, and developed system connection interfaces.',
    tags: ['Telecom', 'R&D', 'Network Services', 'Integration'],
  },
  {
    client: 'Self-Initiated',
    name: 'SDLC_AI — AI-Driven SDLC Platform',
    description: 'Platform that guides software projects from requirements to deployment with AI-powered feedback at every stage. Multi-role GitLab OAuth integration with intelligent gap detection.',
    tags: ['AI', 'GitLab OAuth', 'Multi-Role', 'Workflow'],
  },
  {
    client: 'Self-Initiated',
    name: 'GitlabSelfhost — Migration & Inventory',
    description: 'Automated migration tool for self-hosted GitLab instances. Processed 1000+ projects with structured CSV schema, logic-based mapping, bulk operations, and data integrity preservation.',
    tags: ['GitLab REST API', 'CSV Schema', 'Bulk Migration', 'Data Validation'],
    caseStudy: CASE_STUDY_GITLAB,
  },
  {
    client: 'Self-Initiated',
    name: 'Drawing Game — Realtime Multiplayer',
    description: 'Real-time multiplayer drawing and guessing game built as POC for AI-driven SDLC methodology. Features canvas synchronization, game state management, and rapid prototyping.',
    tags: ['Canvas API', 'WebSocket', 'Realtime', 'SDLC_AI'],
  },
  {
    client: 'Better Way (Mistine)',
    name: 'Mobile Application',
    description: "Mobile application for Thailand's leading cosmetics brand. Consumer-facing app with product catalog, e-commerce features, and brand engagement.",
    tags: ['Mobile', 'E-commerce', 'Consumer App'],
  },
]

const clientProjects = projects.filter(p => p.client !== 'Self-Initiated')
const ownProjects = projects.filter(p => p.client === 'Self-Initiated')

function ProjectRow({ project }: { project: typeof projects[number] }) {
  return (
    <li className="grid grid-cols-1 md:grid-cols-[14rem_1fr] gap-2 md:gap-10 py-8 border-t border-white/10">
      <p className="text-sm text-white/50">{project.client === 'Self-Initiated' ? '' : project.client}</p>
      <div>
        <h4 className="text-xl text-white" style={{ fontFamily: 'var(--font-display)' }}>
          {project.name}
        </h4>
        <p className="text-white/70 leading-relaxed mt-2 max-w-2xl">{project.description}</p>
        <p className="text-xs text-white/50 mt-3">{project.tags.join(' · ')}</p>
        {project.caseStudy && (
          <a href={project.caseStudy} className="link text-sm inline-block mt-4">
            Read the case study →
          </a>
        )}
      </div>
    </li>
  )
}

function Projects() {
  return (
    <section id="projects" className="relative z-10 px-6 py-20 max-w-6xl mx-auto rule-top">
      <SectionHeading
        title="Selected Work"
        intro="Client systems first, then the platforms I built on my own initiative."
      />

      <h3 className="text-xs uppercase tracking-widest text-white/50 mb-2">Client work</h3>
      <ul className="mb-16">
        {clientProjects.map(p => (
          <ProjectRow key={p.name} project={p} />
        ))}
      </ul>

      <h3 className="text-xs uppercase tracking-widest text-white/50 mb-2">Self-initiated</h3>
      <ul>
        {ownProjects.map(p => (
          <ProjectRow key={p.name} project={p} />
        ))}
      </ul>
    </section>
  )
}

/* ========================================
   Case Studies — direct links.
   These exist to be clicked, so nothing hides behind an interaction.
   ======================================== */
const caseStudies = [
  {
    kind: 'Internal tooling',
    name: 'Migrating 1,000+ GitLab projects',
    dek: 'Discovery, planning, and execution as three separate passes over one file a human can actually read.',
    tags: ['Python', 'GitLab REST API', 'Bulk operations'],
    url: CASE_STUDY_GITLAB,
  },
  {
    kind: 'Product architecture',
    name: 'Two auction models, one definition of who won',
    dek: 'A live event auction and a months-long marketplace listing, running on one bid ledger without forking the engine.',
    tags: ['Next.js', 'WebSockets', 'RBAC', 'Serialization'],
    url: CASE_STUDY_HAUCTION,
  },
  {
    kind: 'Applied AI',
    name: 'An answer you can open the file and check',
    dek: 'No vector store, no chunk size, no k to guess — a markdown corpus a person laid out, so every answer traces back to a file.',
    tags: ['Full-text search', 'Answer traceability', 'Codeless', 'Local inference'],
    url: CASE_STUDY_BEYOND_RAG,
  },
]

function CaseStudies() {
  return (
    <section id="case-studies" className="relative z-10 px-6 py-20 max-w-6xl mx-auto rule-top">
      <SectionHeading
        title="Case Studies"
        intro="The reasoning behind three of these systems — the constraint, the design, and the decision that mattered."
      />

      <div className="grid gap-6 grid-cols-1 lg:grid-cols-3">
        {caseStudies.map(cs => (
          <a
            key={cs.url}
            href={cs.url}
            className="group flex h-full flex-col rounded-xl border border-white/15 p-6 transition-colors hover:border-white/40"
          >
            <span className="text-xs uppercase tracking-widest text-white/50 mb-4">{cs.kind}</span>
            <h3
              className="text-2xl text-white leading-tight mb-3"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              {cs.name}
            </h3>
            <p className="text-sm text-white/70 leading-relaxed mb-4 flex-1">{cs.dek}</p>
            <p className="text-xs text-white/50 mb-5">{cs.tags.join(' · ')}</p>
            <span className="text-sm text-white underline underline-offset-4 decoration-white/30 group-hover:decoration-white">
              Read the case study →
            </span>
          </a>
        ))}
      </div>
    </section>
  )
}

/* ========================================
   Experience Timeline
   ======================================== */
const experiences = [
  {
    period: '2008–Present',
    role: 'System Architect & Senior Developer',
    company: 'Wisdom Vast Co., Ltd.',
    highlights: [
      "15+ production applications for AIS (Thailand's #1 telecom)",
      'NBTC Digital TV Spectrum Auction — national-scale real-time system',
      'Ministry of Finance — Off-Budget Accounting System',
      'Built MCP-integrated developer tool with 31 tools',
      '5 production platforms shipped in 2026 alone',
    ],
  },
  {
    period: '2007–2008',
    role: 'System Analyst',
    company: 'Advance System Consulting',
    highlights: ['Treasury Risk Management System for Kasikornbank (KBank)'],
  },
  {
    period: '2004–2007',
    role: 'System Analyst / R&D',
    company: 'DTAC (Total Access Communication)',
    highlights: [
      'Mobile network service research & development',
      'Global mobile technology study',
      'Vendor test system integration',
    ],
  },
]

function Experience() {
  return (
    <section id="experience" className="relative z-10 px-6 py-20 max-w-6xl mx-auto rule-top">
      <SectionHeading title="Experience" />

      <ol>
        {experiences.map(exp => (
          <li
            key={exp.period}
            className="grid grid-cols-1 md:grid-cols-[14rem_1fr] gap-2 md:gap-10 py-8 border-t border-white/10"
          >
            <p className="text-sm text-white/50">{exp.period}</p>
            <div>
              <h3 className="text-xl text-white" style={{ fontFamily: 'var(--font-display)' }}>
                {exp.role}
              </h3>
              <p className="text-sm text-white/60 mt-1">{exp.company}</p>
              <ul className="mt-4 space-y-2 list-disc pl-5 marker:text-white/40">
                {exp.highlights.map(h => (
                  <li key={h} className="text-white/70">
                    {h}
                  </li>
                ))}
              </ul>
            </div>
          </li>
        ))}
      </ol>
    </section>
  )
}

/* ========================================
   Tech Stack Section
   ======================================== */
const stackCategories = [
  {
    title: 'Languages',
    items: ['TypeScript', 'JavaScript', 'Python', 'Java', 'PHP', 'Go', 'SQL'],
  },
  {
    title: 'Frontend',
    items: ['React 19', 'Next.js 16', 'Vue.js', 'HTML5', 'CSS3', 'Tailwind CSS'],
  },
  {
    title: 'Backend',
    items: ['Node.js', 'Express', 'REST APIs', 'GraphQL', 'WebSocket'],
  },
  {
    title: 'Database',
    items: ['PostgreSQL', 'MySQL', 'SQLite', 'MongoDB', 'Redis'],
  },
  {
    title: 'Architecture',
    items: ['MCP', 'Microservices', 'Monorepo', 'RBAC', 'OAuth 2.0'],
  },
  {
    title: 'DevOps',
    items: ['Git', 'Docker', 'CI/CD', 'AWS', 'Vercel', 'Linux'],
  },
]

function Stack() {
  return (
    <section id="stack" className="relative z-10 px-6 py-20 max-w-6xl mx-auto rule-top">
      <SectionHeading title="Technical Stack" />

      <dl className="grid gap-x-10 gap-y-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {stackCategories.map(cat => (
          <div key={cat.title}>
            <dt className="text-xs uppercase tracking-widest text-white/50 mb-2">{cat.title}</dt>
            <dd className="text-white/80 leading-relaxed">{cat.items.join(', ')}</dd>
          </div>
        ))}
      </dl>
    </section>
  )
}

/* ========================================
   AI & Agentic Systems
   ======================================== */
const aiCapabilities = [
  {
    title: 'Domain Q&A Agents',
    blurb:
      'pi-agent and hermes-agent — Q&A over an organisation\'s own material with no vector store and no k to guess. A markdown corpus in directories the domain owner lays out, re-indexed on arrival, so every answer carries the path it came from and can be checked by opening the file.',
    items: [
      'pi-agent',
      'hermes-agent',
      'Full-text search',
      'Markdown corpus',
      'Answer traceability',
      'Re-index on ingest',
      'Agent-authored skills',
      'Beyond vector RAG',
    ],
  },
  {
    title: 'AI Loop Agents',
    blurb:
      'Agents that run unattended: plan, act, observe, repeat — with the stopping conditions and budgets that keep a loop from running away.',
    items: [
      'Plan–act–observe loops',
      'Stopping conditions',
      'Self-correction',
      'Token & time budgets',
      'Scheduled runs',
      'Failure recovery',
    ],
  },
  {
    title: 'Agentic Software',
    blurb:
      'Products where an agent is a first-class component rather than a chatbot bolted on — tool surfaces, permission boundaries, and human-in-the-loop gates.',
    items: [
      'MCP tool design',
      'Tool surface design',
      'Custom agents',
      'Permission boundaries',
      'Human-in-the-loop gates',
      'Multi-agent orchestration',
      'Agent state & memory',
    ],
  },
  {
    title: 'Local AI Models',
    blurb:
      'Open-weight LLMs and vision models running on hardware you control — so regulated data never has to leave the building.',
    items: [
      'Self-hosted LLM inference',
      'Open-weight models',
      'Quantization',
      'VRAM budgeting',
      'On-prem / air-gapped',
      'Machine vision',
      'Object detection',
      'OCR',
      'Edge inference',
    ],
  },
]

function AICapabilities() {
  return (
    <section id="ai" className="relative z-10 px-6 py-20 max-w-6xl mx-auto rule-top">
      <SectionHeading
        title="AI & Agentic Systems"
        intro="Where twenty years of architecture judgement meets agents that act on their own — built codeless where the domain matters more than the plumbing, and run on hardware you control where the data cannot leave."
      />

      <div className="grid gap-x-12 gap-y-10 grid-cols-1 md:grid-cols-2">
        {aiCapabilities.map(cap => (
          <div key={cap.title}>
            <h3 className="text-2xl text-white mb-3" style={{ fontFamily: 'var(--font-display)' }}>
              {cap.title}
            </h3>
            <p className="text-white/70 leading-relaxed mb-3">{cap.blurb}</p>
            <p className="text-xs text-white/50 leading-relaxed">{cap.items.join(' · ')}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

/* ========================================
   Contact Section
   ======================================== */
function Contact() {
  return (
    <section id="contact" className="relative z-10 px-6 py-20 max-w-6xl mx-auto rule-top">
      <SectionHeading
        title="Contact"
        intro="Consulting, architecture reviews, and hands-on delivery — through Wisdom Vast Co., Ltd."
      />

      <div className="flex flex-wrap items-center gap-6">
        <a href="mailto:thanet@wisdomvast.com" className="btn btn-primary">
          thanet@wisdomvast.com
        </a>
        <a href={LINKEDIN_URL} target="_blank" rel="noopener noreferrer" className="link">
          LinkedIn →
        </a>
      </div>

      {/* Machine-readable endpoints for AI agents & bots */}
      <div className="mt-14 max-w-xl rounded-lg border border-white/10 bg-black/30 p-6 font-mono text-xs sm:text-sm">
        <p className="font-sans text-[11px] uppercase tracking-widest text-white/50 mb-4">
          For AI agents &amp; bots
        </p>
        <p className="text-emerald-300/90 break-all">
          $ curl https://irq5.github.io/thanet-profile-/resume.json
        </p>
        <p className="text-white/50 mt-1"># machine-readable resume · JSON Resume schema</p>
        <p className="text-emerald-300/90 break-all mt-4">
          $ curl https://irq5.github.io/thanet-profile-/llms.txt
        </p>
        <p className="text-white/50 mt-1"># LLM-friendly guide to this site</p>
        <div className="mt-5 flex gap-4 font-sans">
          <a href={RESUME_JSON_URL} target="_blank" rel="noopener noreferrer" className="text-xs text-white/60 hover:text-white">
            resume.json →
          </a>
          <a href={LLMS_TXT_URL} target="_blank" rel="noopener noreferrer" className="text-xs text-white/60 hover:text-white">
            llms.txt →
          </a>
        </div>
      </div>
    </section>
  )
}

/* ========================================
   Walking Cats — right-click anywhere to spawn one
   Sprite sheet: 8 color variants in 4x2 blocks; each block is
   3 walk frames x 4 direction rows (0 down, 1 left, 2 right, 3 up),
   48px cells. More than 5 cats -> one flees off-screen every 5s.
   ======================================== */
const CAT_SHEET_URL = `${import.meta.env.BASE_URL}cats.png`
const CAT_CELL = 48
const CAT_SCALE = 2
const CAT_RENDER = CAT_CELL * CAT_SCALE
const CAT_VARIANTS = 8
const CAT_WALK_FRAMES = [0, 1, 2, 1]
const CAT_LIMIT = 5

type CatSpawn = { id: number; variant: number; x: number; y: number; fleeing: boolean }

function Cat({ cat, onGone }: { cat: CatSpawn; onGone: (id: number) => void }) {
  const ref = useRef<HTMLDivElement>(null)
  const fleeingRef = useRef(cat.fleeing)
  fleeingRef.current = cat.fleeing

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const s = {
      x: cat.x,
      y: cat.y,
      dx: 0,
      dy: 0,
      dirRow: 0,
      step: 0,
      stepT: 0,
      nextThink: 0,
      fleeDx: 0,
    }
    let raf = 0
    let last = performance.now()

    const tick = (now: number) => {
      const dt = Math.min((now - last) / 1000, 0.05)
      last = now
      const vw = window.innerWidth
      const vh = window.innerHeight

      let speed = 45
      if (fleeingRef.current) {
        if (s.fleeDx === 0) {
          s.fleeDx = s.x + CAT_RENDER / 2 < vw / 2 ? -1 : 1
        }
        s.dx = s.fleeDx
        s.dy = 0
        speed = 340
      } else if (now >= s.nextThink) {
        if (Math.random() < 0.3) {
          s.dx = 0
          s.dy = 0
        } else {
          const a = Math.random() * Math.PI * 2
          s.dx = Math.cos(a)
          s.dy = Math.sin(a)
        }
        s.nextThink = now + 1500 + Math.random() * 3000
      }

      s.x += s.dx * speed * dt
      s.y += s.dy * speed * dt

      if (!fleeingRef.current) {
        if (s.x < 8) { s.x = 8; s.dx = Math.abs(s.dx) }
        if (s.x > vw - CAT_RENDER - 8) { s.x = vw - CAT_RENDER - 8; s.dx = -Math.abs(s.dx) }
        if (s.y < 8) { s.y = 8; s.dy = Math.abs(s.dy) }
        if (s.y > vh - CAT_RENDER - 8) { s.y = vh - CAT_RENDER - 8; s.dy = -Math.abs(s.dy) }
      } else if (s.x < -CAT_RENDER * 2 || s.x > vw + CAT_RENDER) {
        onGone(cat.id)
        return
      }

      const moving = s.dx !== 0 || s.dy !== 0
      if (moving) {
        s.dirRow = Math.abs(s.dx) >= Math.abs(s.dy) ? (s.dx > 0 ? 2 : 1) : (s.dy > 0 ? 0 : 3)
        s.stepT += dt
        if (s.stepT >= (fleeingRef.current ? 0.07 : 0.16)) {
          s.stepT = 0
          s.step = (s.step + 1) % CAT_WALK_FRAMES.length
        }
      }

      const frameCol = moving ? CAT_WALK_FRAMES[s.step] : 1
      const blockCol = cat.variant % 4
      const blockRow = Math.floor(cat.variant / 4)
      const bx = (blockCol * 3 + frameCol) * CAT_CELL * CAT_SCALE
      const by = (blockRow * 4 + s.dirRow) * CAT_CELL * CAT_SCALE

      el.style.transform = `translate(${s.x}px, ${s.y}px)`
      el.style.backgroundPosition = `-${bx}px -${by}px`
      raf = requestAnimationFrame(tick)
    }

    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [cat.id, cat.variant, cat.x, cat.y, onGone])

  return (
    <div
      ref={ref}
      className="fixed left-0 top-0 z-50 pointer-events-none"
      style={{
        width: CAT_RENDER,
        height: CAT_RENDER,
        backgroundImage: `url(${CAT_SHEET_URL})`,
        backgroundSize: `${12 * CAT_CELL * CAT_SCALE}px ${8 * CAT_CELL * CAT_SCALE}px`,
        imageRendering: 'pixelated',
        transform: `translate(${cat.x}px, ${cat.y}px)`,
      }}
    />
  )
}

function Cats() {
  const [cats, setCats] = useState<CatSpawn[]>([])
  const nextId = useRef(1)

  const spawn = useCallback((x: number, y: number) => {
    setCats(prev => [
      ...prev,
      {
        id: nextId.current++,
        variant: Math.floor(Math.random() * CAT_VARIANTS),
        x: Math.max(8, Math.min(x - CAT_RENDER / 2, window.innerWidth - CAT_RENDER - 8)),
        y: Math.max(8, Math.min(y - CAT_RENDER / 2, window.innerHeight - CAT_RENDER - 8)),
        fleeing: false,
      },
    ])
  }, [])

  useEffect(() => {
    const onContextMenu = (e: MouseEvent) => {
      e.preventDefault()
      spawn(e.clientX, e.clientY)
    }
    window.addEventListener('contextmenu', onContextMenu)

    // easter egg / test hook: ?cats=N pre-spawns N cats
    const n = parseInt(new URLSearchParams(window.location.search).get('cats') || '0', 10)
    for (let i = 0; i < Math.min(n, 12); i++) {
      spawn(Math.random() * window.innerWidth, Math.random() * window.innerHeight)
    }

    return () => window.removeEventListener('contextmenu', onContextMenu)
  }, [spawn])

  useEffect(() => {
    const iv = setInterval(() => {
      setCats(prev => {
        if (prev.length <= CAT_LIMIT) return prev
        const idx = prev.findIndex(c => !c.fleeing)
        if (idx === -1) return prev
        const copy = [...prev]
        copy[idx] = { ...copy[idx], fleeing: true }
        return copy
      })
    }, 5000)
    return () => clearInterval(iv)
  }, [])

  const onGone = useCallback((id: number) => {
    setCats(prev => prev.filter(c => c.id !== id))
  }, [])

  return (
    <>
      {cats.map(c => (
        <Cat key={c.id} cat={c} onGone={onGone} />
      ))}
    </>
  )
}

/* ========================================
   Main App
   ======================================== */
export default function App() {
  return (
    <div className="relative min-h-screen">
      <Cats />
      <Navbar />
      <main>
        <Hero />
        <About />
        <Projects />
        <CaseStudies />
        <Experience />
        <AICapabilities />
        <Stack />
        <Contact />
      </main>
    </div>
  )
}
