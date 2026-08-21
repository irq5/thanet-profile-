/* ========================================
   Architecture diagram — three passes over one file
   Inline SVG so it stays crisp and needs no network request.
   ======================================== */

const BOX_FILL = 'rgba(255,255,255,0.05)'
const BOX_STROKE = 'rgba(255,255,255,0.20)'
const TITLE = '#e8eef4'
const SUB = '#93a9bf'
const GATE = '#fcd34d'
const ROLLBACK = '#fda4af'

function Box({
  x,
  y,
  w,
  title,
  sub,
  accent,
}: {
  x: number
  y: number
  w: number
  title: string
  sub: string
  accent?: string
}) {
  return (
    <g>
      <rect
        x={x}
        y={y}
        width={w}
        height={62}
        rx={10}
        fill={accent ? 'rgba(252,211,77,0.08)' : BOX_FILL}
        stroke={accent ?? BOX_STROKE}
        strokeWidth={1.2}
        strokeDasharray={accent ? '5 4' : undefined}
      />
      <text
        x={x + w / 2}
        y={y + 26}
        textAnchor="middle"
        fontSize={13}
        fontWeight={600}
        fill={accent ?? TITLE}
      >
        {title}
      </text>
      <text x={x + w / 2} y={y + 45} textAnchor="middle" fontSize={11} fill={SUB}>
        {sub}
      </text>
    </g>
  )
}

function Arrow({ x1, x2, y }: { x1: number; x2: number; y: number }) {
  return (
    <line
      x1={x1}
      y1={y}
      x2={x2}
      y2={y}
      stroke={BOX_STROKE}
      strokeWidth={1.4}
      markerEnd="url(#head)"
    />
  )
}

function LaneLabel({ y, text }: { y: number; text: string }) {
  return (
    <text x={12} y={y} fontSize={10} fontWeight={700} fill={SUB} letterSpacing={1.4}>
      {text}
    </text>
  )
}

export default function PipelineDiagram() {
  return (
    <svg
      viewBox="0 0 1000 492"
      role="img"
      aria-label="Pipeline diagram: a read-only inventory pass produces inventory.csv; mapping rules turn it into plan.csv, which passes a human review gate; a bulk executor then applies the plan to the target GitLab instance and reconciles the result, rolling a batch back on mismatch."
      style={{ width: '100%', minWidth: 760, height: 'auto', fontFamily: 'Inter, sans-serif' }}
    >
      <defs>
        <marker id="head" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto">
          <path d="M 0 0 L 10 5 L 0 10 z" fill={BOX_STROKE} />
        </marker>
        <marker id="head-rollback" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto">
          <path d="M 0 0 L 10 5 L 0 10 z" fill={ROLLBACK} />
        </marker>
      </defs>

      {/* sequence spine down the label column */}
      <line x1={64} y1={92} x2={64} y2={186} stroke={BOX_STROKE} strokeWidth={1.2} strokeDasharray="4 5" markerEnd="url(#head)" />
      <line x1={64} y1={252} x2={64} y2={342} stroke={BOX_STROKE} strokeWidth={1.2} strokeDasharray="4 5" markerEnd="url(#head)" />

      {/* ---- lane 1 · discover (read-only) ---- */}
      <LaneLabel y={78} text="DISCOVER" />
      <Box x={130} y={45} w={170} title="Source GitLab" sub="self-hosted instance" />
      <Arrow x1={300} x2={344} y={76} />
      <Box x={346} y={45} w={190} title="1 · Inventory pass" sub="REST read — no writes" />
      <Arrow x1={536} x2={580} y={76} />
      <Box x={582} y={45} w={170} title="inventory.csv" sub="one row per project" />

      {/* ---- lane 2 · plan ---- */}
      <LaneLabel y={218} text="PLAN" />
      <Box x={130} y={185} w={200} title="2 · Mapping rules" sub="convention → target path" />
      <Arrow x1={330} x2={374} y={216} />
      <Box x={376} y={185} w={180} title="plan.csv" sub="current → target" />
      <Arrow x1={556} x2={600} y={216} />
      <Box x={602} y={185} w={200} title="REVIEW GATE" sub="a human approves the file" accent={GATE} />

      {/* ---- lane 3 · execute ---- */}
      <LaneLabel y={373} text="EXECUTE" />
      <Box x={130} y={340} w={210} title="3 · Bulk executor" sub="idempotent · validated" />
      <Arrow x1={340} x2={384} y={371} />
      <Box x={386} y={340} w={170} title="Target GitLab" sub="writes applied" />
      <Arrow x1={556} x2={600} y={371} />
      <Box x={602} y={340} w={200} title="4 · Reconcile" sub="plan vs. actual" />

      {/* rollback loop */}
      <path
        d="M 702 402 L 702 442 L 235 442 L 235 404"
        fill="none"
        stroke={ROLLBACK}
        strokeWidth={1.4}
        strokeDasharray="5 4"
        markerEnd="url(#head-rollback)"
      />
      <text x={468} y={464} textAnchor="middle" fontSize={11} fill={ROLLBACK}>
        rollback the batch on mismatch — never leave the estate half-migrated
      </text>

      {/* boundary note */}
      <text x={988} y={126} textAnchor="end" fontSize={10} fill={SUB} letterSpacing={1}>
        EVERYTHING ABOVE THE GATE IS READ-ONLY
      </text>
      <text x={988} y={310} textAnchor="end" fontSize={10} fill={SUB} letterSpacing={1}>
        EVERYTHING BELOW IT WRITES
      </text>
      <line x1={130} y1={288} x2={988} y2={288} stroke="rgba(252,211,77,0.25)" strokeWidth={1} strokeDasharray="2 6" />
    </svg>
  )
}
