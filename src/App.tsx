import { useEffect, useRef, useState } from 'react'

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

      <div className="hidden md:flex gap-8 items-center">
        <a href="#hero" className="text-sm text-white/60 hover:text-white transition-colors">Home</a>
        <a href="#projects" className="text-sm text-white/60 hover:text-white transition-colors">Projects</a>
        <a href="#experience" className="text-sm text-white/60 hover:text-white transition-colors">Experience</a>
        <a href="#stack" className="text-sm text-white/60 hover:text-white transition-colors">Stack</a>
        <a href="#contact" className="text-sm text-white/60 hover:text-white transition-colors">Contact</a>
      </div>

      <a
        href="#contact"
        className="liquid-glass rounded-full px-6 py-2.5 text-sm text-white hover:scale-[1.03] transition-transform"
      >
        Begin Journey
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
        30+ years of production experience building systems for millions of users.
        From telecom giants to national auctions, from AI platforms to developer tools.
        <br /><br />
        <span className="text-white">
          Senior Software Engineer & System Architect
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
    github: 'https://github.com/jaturapornchai/mongomodeleditor',
  },
  {
    client: 'Self-Initiated',
    name: 'Hauction — Hybrid Auction Platform',
    description: 'Multi-shop auction platform supporting both Event-Based (Live) and Long-Term (Marketplace) types. Features 5-role RBAC, WebSocket bidding, Meta design system, and full Thai Baht localization.',
    tags: ['Next.js', 'better-sqlite3', 'RBAC', 'Real-time'],
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
        <p className="text-white/40 text-center max-w-2xl mx-auto mb-16">
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
          <span className="text-xs font-bold uppercase tracking-widest text-white/40 mb-3">
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

          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-white/70 hover:text-white inline-flex items-center gap-1"
              onClick={(e) => e.stopPropagation()}
            >
              View on GitHub →
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
    company: 'Wisdom Waste Co., Ltd. / Independent',
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
                <span className="text-xs font-bold uppercase tracking-widest text-white/40 mb-3">
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
                      <span className="text-white/40 mt-1.5">•</span>
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
                <span className="text-xs font-bold uppercase tracking-widest text-white/40 mb-3">
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
        <p className="text-white/40 max-w-xl mx-auto mb-10">
          Open to consulting, architecture reviews, and ambitious projects that need someone who's been shipping production code since 2004.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <a
            href="mailto:taned.ar@inspektion.co.th"
            className="liquid-glass rounded-full px-10 py-4 text-white hover:scale-[1.03] transition-transform"
          >
            taned.ar@inspektion.co.th
          </a>
          <a
            href="tel:+66902693428"
            className="liquid-glass rounded-full px-10 py-4 text-white hover:scale-[1.03] transition-transform"
          >
            +66 90 269 3428
          </a>
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
   Footer
   ======================================== */
function Footer() {
  return (
    <footer className="relative z-10 border-t border-white/10 py-8 px-6 text-center">
      <p className="text-xs text-white/30">
        © {new Date().getFullYear()} Thanet Arnont. Built with React, TypeScript, Vite.
      </p>
    </footer>
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
   Main App
   ======================================== */
export default function App() {
  return (
    <div className="relative min-h-screen">
      <VideoBackground />
      <Navbar />
      <Hero />
      <Projects />
      <Experience />
      <Stack />
      <Contact />
      <Footer />
    </div>
  )
}
