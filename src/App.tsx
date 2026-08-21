import { useCallback, useEffect, useRef, useState } from 'react'

/* ========================================
   Color Palette for Cards
   ======================================== */
const cardColors = [
  { card: 'card-rose', tag: 'tag-rose' },
  { card: 'card-amber', tag: 'tag-amber' },
  { card: 'card-emerald', tag: 'tag-emerald' },
  { card: 'card-sky', tag: 'tag-sky' },
  { card: 'card-violet', tag: 'tag-violet' },
  { card: 'card-pink', tag: 'tag-pink' },
  { card: 'card-cyan', tag: 'tag-cyan' },
  { card: 'card-orange', tag: 'tag-orange' },
  { card: 'card-indigo', tag: 'tag-indigo' },
  { card: 'card-teal', tag: 'tag-teal' },
  { card: 'card-fuchsia', tag: 'tag-fuchsia' },
]

/* ========================================
   Navigation Bar
   ======================================== */
const navLinks: [string, string][] = [
  ['#hero', 'Home'],
  ['#about', 'About'],
  ['#projects', 'Projects'],
  ['#case-studies', 'Case Studies'],
  ['#ai', 'AI'],
  ['#experience', 'Experience'],
  ['#stack', 'Stack'],
  ['#contact', 'Contact'],
]

function Navbar() {
  return (
    <nav className="relative z-10 flex flex-row justify-between items-center px-8 py-6 max-w-7xl mx-auto">
      <a
        href="#"
        className="text-3xl tracking-tight text-white"
        style={{ fontFamily: 'var(--font-display)' }}
      >
        Thanet<sup className="text-xs">®</sup>
      </a>

      <div className="hidden md:flex gap-5 lg:gap-8 items-center">
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

      <a
        href="#contact"
        className="liquid-glass rounded-full px-6 py-2.5 text-sm text-white hover:scale-[1.03] transition-transform"
      >
        Hire Me
      </a>
    </nav>
  )
}

/* ========================================
   Hero Section
   ======================================== */
function Hero() {
  return (
    <section id="hero" className="relative z-10 flex flex-col items-center text-center px-6 pt-32 pb-40 py-[90px]">
      <p className="text-xs sm:text-sm uppercase tracking-[0.25em] text-white/60 mb-6 animate-fade-rise">
        Senior Software Engineer &amp; System Architect
      </p>
      <h1
        className="text-5xl sm:text-7xl md:text-8xl leading-[0.95] tracking-[-2.46px] max-w-7xl font-normal animate-fade-rise text-white"
        style={{ fontFamily: 'var(--font-display)' }}
      >
        Where{' '}
        <em className="not-italic text-white/40">dreams</em>{' '}
        rise{' '}
        <em className="not-italic text-white/40">through the silence.</em>
      </h1>

      <p className="text-white/50 text-base sm:text-lg max-w-2xl mt-8 leading-relaxed animate-fade-rise-delay">
        20+ years of production experience building systems for millions of users.
        From telecom giants to national auctions, from AI platforms to developer tools.
        <br /><br />
        <span className="text-white">
          Available for consulting through Wisdom Vast Co., Ltd.
        </span>
      </p>

      <a
        href="#projects"
        className="liquid-glass rounded-full px-14 py-5 text-base text-white mt-12 hover:scale-[1.03] transition-transform cursor-pointer animate-fade-rise-delay-2"
      >
        View My Work
      </a>
    </section>
  )
}

/* ========================================
   About Section
   ======================================== */
const LINKEDIN_URL = 'https://www.linkedin.com/in/thanet-arnont/'
const RESUME_JSON_URL = `${import.meta.env.BASE_URL}resume.json`
const RESUME_PDF_URL = `${import.meta.env.BASE_URL}Thanet-Arnont-Resume.pdf`
const CASE_STUDY_GITLAB = `${import.meta.env.BASE_URL}case-studies/gitlab-migration.html`
const CASE_STUDY_HAUCTION = `${import.meta.env.BASE_URL}case-studies/hauction.html`
const CASE_STUDY_BEYOND_RAG = `${import.meta.env.BASE_URL}case-studies/beyond-rag.html`
const LLMS_TXT_URL = `${import.meta.env.BASE_URL}llms.txt`

function About() {
  return (
    <section id="about" className="relative z-10 px-6 py-20 max-w-6xl mx-auto">
      <RevealOnScroll>
        <div className="grid grid-cols-1 md:grid-cols-[auto_1fr] gap-10 items-center rounded-3xl border border-white/10 bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-sm p-8 sm:p-12">
          <img
            src={`${import.meta.env.BASE_URL}thanet-portrait.jpg`}
            alt="Thanet Arnont"
            className="w-56 md:w-64 rounded-3xl mx-auto shadow-2xl"
          />
          <div>
            <h2
              className="text-4xl sm:text-5xl tracking-tight mb-6 text-white"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              About
            </h2>
            <p className="text-white/60 leading-relaxed mb-4">
              I'm Thanet Arnont — a software engineer and system architect based in Nonthaburi,
              Thailand, shipping production systems since 2004. My path runs through the country's
              most demanding environments: mobile network R&D at DTAC, treasury risk systems for
              Krungthai Bank, 15+ enterprise applications for AIS, the NBTC Digital TV spectrum
              auction, and financial systems for the Ministry of Finance.
            </p>
            <p className="text-white/60 leading-relaxed mb-4">
              Today, at <span className="text-white font-semibold">Wisdom Vast Co., Ltd.</span>,
              I combine two decades of architecture judgment with a modern AI-driven stack —
              Next.js, TypeScript, MCP — to design, build, and rescue systems that have to work.
            </p>
            <p className="text-white/60 leading-relaxed mb-8">
              B.Eng. Computer Engineering, King Mongkut's Institute of Technology Ladkrabang (KMITL).
              Open to consulting engagements: architecture reviews, system design, and hands-on delivery.
            </p>
            <div className="flex flex-wrap gap-4">
              <a
                href={LINKEDIN_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="liquid-glass rounded-full px-8 py-3 text-sm text-white hover:scale-[1.03] transition-transform"
              >
                LinkedIn →
              </a>
              <a
                href={RESUME_PDF_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="liquid-glass rounded-full px-8 py-3 text-sm text-white hover:scale-[1.03] transition-transform"
              >
                Resume (PDF) →
              </a>
              <a
                href={RESUME_JSON_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="liquid-glass rounded-full px-8 py-3 text-sm text-white hover:scale-[1.03] transition-transform"
              >
                Resume API (JSON) →
              </a>
            </div>
          </div>
        </div>
      </RevealOnScroll>
    </section>
  )
}

/* ========================================
   Stats Strip
   ======================================== */
const stats = [
  { value: '20+', label: 'Years in Production' },
  { value: '15+', label: 'Apps Shipped for AIS' },
  { value: '5', label: 'Platforms Launched in 2026' },
  { value: '1000+', label: 'GitLab Projects Migrated' },
]

function Stats() {
  return (
    <section className="relative z-10 px-6 pb-4 max-w-6xl mx-auto">
      <RevealOnScroll>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((s, i) => (
            <div
              key={i}
              className="rounded-3xl border border-white/10 bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-sm p-6 text-center"
            >
              <div
                className="text-4xl sm:text-5xl text-white mb-2"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                {s.value}
              </div>
              <div className="text-xs uppercase tracking-widest text-white/50">{s.label}</div>
            </div>
          ))}
        </div>
      </RevealOnScroll>
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
    client: 'Krungthai Bank',
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

/* ========================================
   Case Studies — direct links, no flip.
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
    name: 'Why these agents are not a local RAG',
    dek: 'Retrieval returns the passages that resemble a question — which is a different thing from the ones that answer it.',
    tags: ['Agentic AI', 'Codeless', 'Local inference', 'Domain Q&A'],
    url: CASE_STUDY_BEYOND_RAG,
  },
]

function CaseStudies() {
  return (
    <section id="case-studies" className="relative z-10 px-6 py-20 max-w-6xl mx-auto">
      <RevealOnScroll>
        <h2
          className="text-4xl sm:text-5xl md:text-6xl tracking-tight text-center mb-4 text-white"
          style={{ fontFamily: 'var(--font-display)' }}
        >
          Case Studies
        </h2>
        <p className="text-white/50 text-center max-w-2xl mx-auto mb-16">
          The reasoning behind two of these systems — the constraint, the design, and the decision
          that mattered.
        </p>
      </RevealOnScroll>

      <div className="grid gap-8 grid-cols-1 md:grid-cols-2">
        {caseStudies.map((cs, i) => (
          <RevealOnScroll key={i} className="h-full">
            <a
              href={cs.url}
              className="group flex h-full flex-col rounded-3xl border border-white/10 bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-sm p-8 transition-colors hover:border-white/30"
            >
              <span className="text-xs font-bold uppercase tracking-widest text-white/50 mb-4">
                {cs.kind}
              </span>
              <h3
                className="text-2xl sm:text-3xl text-white leading-tight mb-4"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                {cs.name}
              </h3>
              <p className="text-sm text-white/70 leading-relaxed mb-6 flex-1">{cs.dek}</p>
              <div className="flex flex-wrap gap-2 mb-6">
                {cs.tags.map((tag, j) => (
                  <span
                    key={j}
                    className="text-[10px] px-2.5 py-1 rounded-full font-medium bg-white/10 text-white/70"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <span className="text-sm text-white font-semibold">
                Read the case study{' '}
                <span className="inline-block transition-transform group-hover:translate-x-1">→</span>
              </span>
            </a>
          </RevealOnScroll>
        ))}
      </div>
    </section>
  )
}

function Projects() {
  return (
    <section id="projects" className="relative z-10 px-6 py-20 max-w-7xl mx-auto">
      <RevealOnScroll>
        <h2
          className="text-4xl sm:text-5xl md:text-6xl tracking-tight text-center mb-4 text-white"
          style={{ fontFamily: 'var(--font-display)' }}
        >
          Selected Work
        </h2>
        <p className="text-white/50 text-center max-w-2xl mx-auto mb-16">
          Real systems, real clients, real impact. Each project shipped to production and used by thousands — or millions — of people.
        </p>
      </RevealOnScroll>

      {/* Grid: 1 col mobile, 2 cols tablet, 3 cols desktop */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map((project, i) => (
          <ProjectCard key={i} project={project} colorIndex={i} />
        ))}
      </div>
    </section>
  )
}

/* ========================================
   Flip Card — generic front/back, used by every section
   ======================================== */
function FlipCard({
  front,
  back,
  colorIndex,
  minHeight,
}: {
  front: React.ReactNode
  back: React.ReactNode
  colorIndex: number
  minHeight?: number
}) {
  const [flipped, setFlipped] = useState(false)
  const colors = cardColors[colorIndex % cardColors.length]

  return (
    <RevealOnScroll className="h-full">
      <div
        className={`flip-container float-card ${flipped ? 'flipped' : ''} cursor-pointer`}
        style={
          {
            animationDelay: `${-(colorIndex % 6) * 1.1}s`,
            ...(minHeight ? { '--card-h': `${minHeight}px` } : {}),
          } as React.CSSProperties
        }
        onClick={() => setFlipped(!flipped)}
      >
        <div className="flip-inner">
          <div className={`flip-face ${colors.card} flex flex-col items-center justify-center text-center p-8`}>
            {front}
          </div>
          <div className={`flip-face flip-back ${colors.card} flex flex-col p-8`}>
            {back}
          </div>
        </div>
      </div>
    </RevealOnScroll>
  )
}

function ProjectCard({ project, colorIndex }: { project: typeof projects[number]; colorIndex: number }) {
  const colors = cardColors[colorIndex % cardColors.length]

  return (
    <FlipCard
      colorIndex={colorIndex}
      minHeight={400}
      front={
        <>
          <span className="text-xs font-bold uppercase tracking-widest text-white/50 mb-3">
            Client
          </span>
          <h3
            className="text-3xl sm:text-4xl font-bold text-white leading-tight"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            {project.client}
          </h3>
          <h4 className="text-base font-semibold text-white/70 mt-5">
            {project.name}
          </h4>
        </>
      }
      back={
        <>
          <div className="mb-4">
            <h3
              className="text-xl font-bold text-white"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              {project.name}
            </h3>
            <p className="text-xs text-white/50 mt-1">{project.client}</p>
          </div>

          <p className="text-sm text-white/70 leading-relaxed mb-5 flex-1">
            {project.description}
          </p>

          <div className="flex flex-wrap gap-2 mb-4">
            {project.tags.map((tag, j) => (
              <span
                key={j}
                className={`text-[10px] px-2.5 py-1 rounded-full font-medium ${colors.tag}`}
              >
                {tag}
              </span>
            ))}
          </div>

          {project.caseStudy && (
            <a
              href={project.caseStudy}
              className="text-xs text-white hover:text-white/70 inline-flex items-center gap-1 font-semibold"
              onClick={(e) => e.stopPropagation()}
            >
              Read the case study →
            </a>
          )}

        </>
      }
    />
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
    highlights: ['Treasury Risk Management System for Krungthai Bank'],
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
    <section id="experience" className="relative z-10 px-6 py-20 max-w-5xl mx-auto">
      <RevealOnScroll>
        <h2
          className="text-4xl sm:text-5xl md:text-6xl tracking-tight text-center mb-16 text-white"
          style={{ fontFamily: 'var(--font-display)' }}
        >
          Experience
        </h2>
      </RevealOnScroll>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {experiences.map((exp, i) => (
          <FlipCard
            key={i}
            colorIndex={i + 3}
            minHeight={380}
            front={
              <>
                <span className="text-xs font-bold uppercase tracking-widest text-white/50 mb-3">
                  {exp.period}
                </span>
                <h3
                  className="text-3xl sm:text-4xl font-bold text-white leading-tight"
                  style={{ fontFamily: 'var(--font-display)' }}
                >
                  {exp.role}
                </h3>
                <p className="text-base font-semibold text-white/70 mt-5">{exp.company}</p>
              </>
            }
            back={
              <>
                <div className="mb-4">
                  <h3
                    className="text-xl font-bold text-white"
                    style={{ fontFamily: 'var(--font-display)' }}
                  >
                    {exp.role}
                  </h3>
                  <p className="text-xs text-white/50 mt-1">{exp.company} · {exp.period}</p>
                </div>
                <ul className="space-y-2">
                  {exp.highlights.map((h, j) => (
                    <li key={j} className="text-sm text-white/70 flex items-start gap-2">
                      <span className="text-white/50 mt-1.5">•</span>
                      {h}
                    </li>
                  ))}
                </ul>
              </>
            }
          />
        ))}
      </div>
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
    <section id="stack" className="relative z-10 px-6 py-20 max-w-6xl mx-auto">
      <RevealOnScroll>
        <h2
          className="text-4xl sm:text-5xl md:text-6xl tracking-tight text-center mb-16 text-white"
          style={{ fontFamily: 'var(--font-display)' }}
        >
          Technical Stack
        </h2>
      </RevealOnScroll>

      <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {stackCategories.map((cat, i) => (
          <FlipCard
            key={i}
            colorIndex={i + 7}
            minHeight={280}
            front={
              <>
                <span className="text-xs font-bold uppercase tracking-widest text-white/50 mb-3">
                  {cat.items.length} technologies
                </span>
                <h3
                  className="text-3xl sm:text-4xl font-bold text-white leading-tight"
                  style={{ fontFamily: 'var(--font-display)' }}
                >
                  {cat.title}
                </h3>
              </>
            }
            back={
              <>
                <h3
                  className="text-xl font-bold text-white mb-4"
                  style={{ fontFamily: 'var(--font-display)' }}
                >
                  {cat.title}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {cat.items.map((item, j) => (
                    <span
                      key={j}
                      className={`text-xs px-3 py-1.5 rounded-full font-medium ${cardColors[(i + 7) % cardColors.length].tag}`}
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </>
            }
          />
        ))}
      </div>
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
      'pi-agent and hermes-agent — codeless Q&A systems built for organisations whose material is dense and specialised. A local RAG retrieves passages; these reason across them, so a question that needs analysis comes back with an answer, not a list of excerpts.',
    items: [
      'pi-agent',
      'hermes-agent',
      'Codeless configuration',
      'Beyond local RAG',
      'Analytical answers',
      'Domain-specific setup',
      'Built for organisations',
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
    <section id="ai" className="relative z-10 px-6 py-20 max-w-6xl mx-auto">
      <RevealOnScroll>
        <h2
          className="text-4xl sm:text-5xl md:text-6xl tracking-tight text-center mb-4 text-white"
          style={{ fontFamily: 'var(--font-display)' }}
        >
          AI &amp; Agentic Systems
        </h2>
        <p className="text-white/50 text-center max-w-2xl mx-auto mb-16">
          Where twenty years of architecture judgement meets agents that act on their own — built
          codeless where the domain matters more than the plumbing, and run on hardware you control
          where the data cannot leave.
        </p>
      </RevealOnScroll>

      <div className="grid gap-8 grid-cols-1 md:grid-cols-2">
        {aiCapabilities.map((cap, i) => (
          <FlipCard
            key={i}
            colorIndex={i + 3}
            minHeight={340}
            front={
              <>
                <span className="text-xs font-bold uppercase tracking-widest text-white/50 mb-3">
                  {cap.items.length} capabilities
                </span>
                <h3
                  className="text-3xl sm:text-4xl font-bold text-white leading-tight"
                  style={{ fontFamily: 'var(--font-display)' }}
                >
                  {cap.title}
                </h3>
              </>
            }
            back={
              <>
                <h3
                  className="text-xl font-bold text-white mb-3"
                  style={{ fontFamily: 'var(--font-display)' }}
                >
                  {cap.title}
                </h3>
                <p className="text-sm text-white/70 leading-relaxed mb-5">{cap.blurb}</p>
                <div className="flex flex-wrap gap-2">
                  {cap.items.map((item, j) => (
                    <span
                      key={j}
                      className={`text-xs px-3 py-1.5 rounded-full font-medium ${cardColors[(i + 3) % cardColors.length].tag}`}
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </>
            }
          />
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
    <section id="contact" className="relative z-10 px-6 py-20 max-w-3xl mx-auto text-center">
      <RevealOnScroll>
        <h2
          className="text-4xl sm:text-5xl md:text-6xl tracking-tight mb-6 text-white"
          style={{ fontFamily: 'var(--font-display)' }}
        >
          Let's Build Together
        </h2>
        <p className="text-white/50 max-w-xl mx-auto mb-10">
          Open to consulting, architecture reviews, and ambitious projects that need someone
          who's been shipping production code since 2004 — through Wisdom Vast Co., Ltd.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <a
            href="mailto:thanet@wisdomvast.com"
            className="liquid-glass rounded-full px-10 py-4 text-white hover:scale-[1.03] transition-transform"
          >
            thanet@wisdomvast.com
          </a>
          <a
            href={LINKEDIN_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="liquid-glass rounded-full px-10 py-4 text-white hover:scale-[1.03] transition-transform"
          >
            LinkedIn
          </a>
        </div>

        <div className="flex flex-wrap gap-4 justify-center items-center mt-4">
          <a
            href={RESUME_PDF_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="liquid-glass rounded-full px-8 py-3 text-sm text-white hover:scale-[1.03] transition-transform"
          >
            Download Resume (PDF) →
          </a>
        </div>

        {/* Machine-readable endpoints for AI agents & bots */}
        <div className="mt-12 max-w-xl mx-auto text-left rounded-2xl border border-white/10 bg-black/40 backdrop-blur-sm p-6 font-mono text-xs sm:text-sm">
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
      </RevealOnScroll>
    </section>
  )
}

/* ========================================
   Reveal on Scroll Wrapper
   ======================================== */
function RevealOnScroll({ children, className }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('revealed')
          observer.unobserve(el)
        }
      },
      { threshold: 0.1 }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <div ref={ref} className={`reveal ${className || ''}`}>
      {children}
    </div>
  )
}

/* ========================================
   Video Background
   ======================================== */
function VideoBackground() {
  return (
    <div className="fixed inset-0 w-full h-full z-0 overflow-hidden">
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source
          src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260314_131748_f2ca2a28-fed7-44c8-b9a9-bd9acdd5ec31.mp4"
          type="video/mp4"
        />
      </video>
      <div className="absolute inset-0 bg-[hsl(var(--background)/0.7)]" />
    </div>
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
      <VideoBackground />
      <Cats />
      <Navbar />
      <Hero />
      <About />
      <Stats />
      <Projects />
      <CaseStudies />
      <Experience />
      <Stack />
      <AICapabilities />
      <Contact />
    </div>
  )
}
