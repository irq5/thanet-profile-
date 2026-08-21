import CaseStudyShell, { Figure, Section, type Fact } from './CaseStudyShell.tsx'
import AuctionDiagram from './AuctionDiagram.tsx'

const facts: Fact[] = [
  { label: 'Role', value: 'Architecture & hands-on delivery' },
  { label: 'Scope', value: 'Two auction modes, multi-shop' },
  { label: 'Stack', value: 'Next.js · WebSockets · better-sqlite3' },
  { label: 'Context', value: 'Wisdom Vast Co., Ltd. · 2026' },
]

export default function Hauction() {
  return (
    <CaseStudyShell
      eyebrow="Case study · Product architecture"
      title={
        <>
          Two auction models,{' '}
          <em className="not-italic text-white/40">one definition of who won</em>
        </>
      }
      dek="A live event auction and a months-long marketplace listing look like the same product and behave nothing alike. Hauction runs both without forking the engine."
      facts={facts}
      ctaTitle="Designing something with two modes and one truth?"
    >
      <Section title="The problem">
        <p>
          A live event auction is synchronous. Everyone watches one clock, bids land seconds apart,
          and the order they land in <em>is</em> the outcome. A long-term marketplace listing is
          the opposite: it runs for days, bidders arrive and leave, and most of the time nobody is
          watching at all.
        </p>
        <p>
          Most platforms pick one of those and bolt the other on later. Hauction had to run both at
          once, for multiple independent shops, in a single product — which means two behaviours
          that must never disagree about who won or what was paid.
        </p>
      </Section>

      <Section title="The approach">
        <p>
          Share everything that is genuinely the same, and separate only the thing that actually
          differs: what triggers evaluation.
        </p>
        <p>
          An item, a bid, a bidder's identity, the money, and the rule that picks a winner are
          identical in both modes, so they live in one model with one bid ledger. The live path
          holds an open WebSocket channel and settles against a server-authoritative clock — never
          the client's. The marketplace path evaluates on its deadline instead of holding a socket
          open per listing, because a listing that runs for a week does not need a live connection
          for six and a half days of it.
        </p>
        <p>
          Underneath both, an auction is a serialization problem: <em>who bid first</em> has to
          have exactly one answer. Keeping writes on a single synchronous writer makes that
          ordering a property of the store rather than something to coordinate between processes.
        </p>
        <p>
          Multi-shop is what forces the permission model. Once shops are independent, "admin" stops
          being one thing — a shop owner is not a platform administrator, and a platform
          administrator is not a seller. That is five distinct roles, with KYC approval gating who
          may sell and who may bid at scale.
        </p>
      </Section>

      <Figure
        caption={
          <>
            Above the gate, the two modes differ. Below it, they share everything — the same access
            rules, the same serialized ledger, the same winner rule. The split sits at the one
            place where the modes genuinely diverge, so neither mode can quietly grow its own
            answer to "who won".
          </>
        }
      >
        <AuctionDiagram />
      </Figure>

      <Section title="The result">
        <p>
          One platform serving live and long-term auctions across multiple shops, with a five-role
          permission hierarchy and KYC workflows in front of it — and prices, rounding, and copy in
          Thai Baht throughout, rather than a locale layer added after the fact.
        </p>
      </Section>

      <Section title="The decision that mattered">
        <p>
          Not writing a second engine. Two engines would have shipped faster and then spent years
          disagreeing: two winner rules, two rounding behaviours, two places to fix every bug about
          money. Keeping one ledger cost more up front and bought a system where a bug about money
          can only be in one place.
        </p>
      </Section>
    </CaseStudyShell>
  )
}
