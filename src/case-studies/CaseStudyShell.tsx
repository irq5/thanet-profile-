/* ========================================
   Shared chrome for every case study page:
   nav, header, fact strip, and closing CTA.
   ======================================== */

const PORTFOLIO_URL = import.meta.env.BASE_URL
const CONTACT_URL = `${import.meta.env.BASE_URL}#contact`

export type Fact = { label: string; value: string }

export function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mb-12">
      <h2
        className="text-2xl sm:text-3xl text-white mb-4"
        style={{ fontFamily: 'var(--font-display)' }}
      >
        {title}
      </h2>
      <div className="text-white/70 leading-relaxed space-y-4">{children}</div>
    </section>
  )
}

export function Figure({
  children,
  caption,
}: {
  children: React.ReactNode
  caption: React.ReactNode
}) {
  return (
    <figure className="mb-14">
      {/* the negative margin buys the diagram back the width the article padding
          takes, so its min-width floor does not trip a scrollbar on desktop */}
      <div className="rounded-3xl border border-white/10 bg-black/30 p-5 sm:p-7 overflow-x-auto sm:-mx-6">
        {children}
      </div>
      <figcaption className="text-sm text-white/50 leading-relaxed mt-4">{caption}</figcaption>
    </figure>
  )
}

export default function CaseStudyShell({
  eyebrow,
  title,
  dek,
  facts,
  ctaTitle,
  children,
}: {
  eyebrow: string
  title: React.ReactNode
  dek: string
  facts: Fact[]
  ctaTitle: string
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen">
      <nav className="flex flex-row justify-between items-center px-6 sm:px-8 py-6 max-w-4xl mx-auto">
        <a
          href={PORTFOLIO_URL}
          className="text-2xl tracking-tight text-white"
          style={{ fontFamily: 'var(--font-display)' }}
        >
          Thanet<sup className="text-[0.5rem]">®</sup>
        </a>
        <a href={PORTFOLIO_URL} className="text-sm text-white/60 hover:text-white transition-colors">
          ← Back to portfolio
        </a>
      </nav>

      <article className="px-6 sm:px-8 max-w-4xl mx-auto pb-28">
        <header className="pt-10 pb-12 animate-fade-rise">
          <p className="text-xs uppercase tracking-[0.25em] text-white/60 mb-5">{eyebrow}</p>
          <h1
            className="text-4xl sm:text-5xl md:text-6xl leading-[1.05] tracking-[-1.5px] text-white"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            {title}
          </h1>
          <p className="text-white/60 text-lg mt-6 max-w-2xl leading-relaxed">{dek}</p>
        </header>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
          {facts.map((f) => (
            <div
              key={f.label}
              className="rounded-2xl border border-white/10 bg-gradient-to-br from-white/5 to-white/[0.02] p-5"
            >
              <div className="text-[10px] uppercase tracking-widest text-white/50 mb-2">
                {f.label}
              </div>
              <div className="text-sm text-white">{f.value}</div>
            </div>
          ))}
        </div>

        {children}

        <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-white/5 to-white/[0.02] p-8 sm:p-10 text-center">
          <h2
            className="text-2xl sm:text-3xl text-white mb-3"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            {ctaTitle}
          </h2>
          <p className="text-white/60 max-w-lg mx-auto mb-7">
            Architecture reviews, system design, and hands-on delivery through Wisdom Vast Co., Ltd.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <a
              href={CONTACT_URL}
              className="liquid-glass rounded-full px-8 py-3 text-sm text-white hover:scale-[1.03] transition-transform"
            >
              Get in touch →
            </a>
            <a
              href={PORTFOLIO_URL}
              className="liquid-glass rounded-full px-8 py-3 text-sm text-white hover:scale-[1.03] transition-transform"
            >
              See other work →
            </a>
          </div>
        </div>
      </article>
    </div>
  )
}
