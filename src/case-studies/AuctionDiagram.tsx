/* ========================================
   Architecture diagram — two auction modes, one ledger
   ======================================== */

const BOX_FILL = 'rgba(255,255,255,0.05)'
const BOX_STROKE = 'rgba(255,255,255,0.20)'
const TITLE = '#e8eef4'
const SUB = '#93a9bf'
const GATE = '#fcd34d'
const LEDGER = '#5eead4'

function Box({
  x,
  y,
  w,
  h = 62,
  title,
  sub,
  accent,
  tint,
}: {
  x: number
  y: number
  w: number
  h?: number
  title: string
  sub: string
  accent?: string
  tint?: string
}) {
  return (
    <g>
      <rect
        x={x}
        y={y}
        width={w}
        height={h}
        rx={10}
        fill={tint ?? BOX_FILL}
        stroke={accent ?? BOX_STROKE}
        strokeWidth={1.2}
      />
      <text
        x={x + w / 2}
        y={y + h / 2 - 3}
        textAnchor="middle"
        fontSize={13}
        fontWeight={600}
        fill={accent ?? TITLE}
      >
        {title}
      </text>
      <text x={x + w / 2} y={y + h / 2 + 16} textAnchor="middle" fontSize={11} fill={SUB}>
        {sub}
      </text>
    </g>
  )
}

function Down({ x, y1, y2 }: { x: number; y1: number; y2: number }) {
  return (
    <line x1={x} y1={y1} x2={x} y2={y2} stroke={BOX_STROKE} strokeWidth={1.4} markerEnd="url(#a-head)" />
  )
}

export default function AuctionDiagram() {
  const L = 100
  const R = 565
  const COL = 425
  const FULL = 890

  return (
    <svg
      viewBox="0 0 1000 508"
      role="img"
      aria-label="Diagram: a live event auction and a long-term marketplace listing differ only in what triggers evaluation — an open WebSocket channel on a server clock versus deadline evaluation. Both pass the same 5-role and KYC access gate, then write through one serialized single-writer ledger, so items, bids, shops and the winner rule stay shared."
      style={{ width: '100%', minWidth: 780, height: 'auto', fontFamily: 'Inter, sans-serif' }}
    >
      <defs>
        <marker id="a-head" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto">
          <path d="M 0 0 L 10 5 L 0 10 z" fill={BOX_STROKE} />
        </marker>
      </defs>

      {/* what differs / what is shared */}
      <text x={8} y={116} fontSize={10} fontWeight={700} fill={SUB} letterSpacing={1.4}>
        DIFFERS
      </text>
      <line x1={72} y1={36} x2={72} y2={190} stroke={BOX_STROKE} strokeWidth={1} strokeDasharray="3 4" />
      <text x={8} y={370} fontSize={10} fontWeight={700} fill={LEDGER} letterSpacing={1.4}>
        SHARED
      </text>
      <line x1={72} y1={232} x2={72} y2={480} stroke="rgba(94,234,212,0.35)" strokeWidth={1} strokeDasharray="3 4" />

      {/* ---- the two modes ---- */}
      <Box x={L} y={36} w={COL} h={56} title="LIVE EVENT AUCTION" sub="synchronous — seconds decide the winner" />
      <Box x={R} y={36} w={COL} h={56} title="LONG-TERM MARKETPLACE" sub="asynchronous — runs for days, nobody watching" />

      <Down x={L + COL / 2} y1={92} y2={124} />
      <Down x={R + COL / 2} y1={92} y2={124} />

      <Box x={L} y={126} w={COL} h={64} title="Open WebSocket channel" sub="server-authoritative clock" />
      <Box x={R} y={126} w={COL} h={64} title="Evaluate on deadline" sub="no socket held per listing" />

      <Down x={L + COL / 2} y1={190} y2={230} />
      <Down x={R + COL / 2} y1={190} y2={230} />

      {/* ---- shared from here down ---- */}
      <Box
        x={L}
        y={232}
        w={FULL}
        h={56}
        title="ACCESS GATE — 5-role hierarchy · KYC approval"
        sub="a shop owner is not an administrator, and an administrator is not a seller"
        accent={GATE}
        tint="rgba(252,211,77,0.07)"
      />

      <Down x={L + FULL / 2} y1={288} y2={320} />

      <Box
        x={L}
        y={322}
        w={FULL}
        h={70}
        title="SERIALIZED WRITER — one bid ledger"
        sub="synchronous transactions on an embedded store: bid order is a property of the database, not a lock to coordinate"
        accent={LEDGER}
        tint="rgba(94,234,212,0.07)"
      />

      <Down x={L + COL / 2} y1={392} y2={424} />
      <Down x={R + COL / 2} y1={392} y2={424} />

      <Box x={L} y={426} w={COL} title="One shared model" sub="items · bids · shops · money in THB" />
      <Box x={R} y={426} w={COL} title="One winner rule" sub="the same answer in both modes" />
    </svg>
  )
}
