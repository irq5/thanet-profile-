/* ========================================
   Two shapes for the same question.
   This compares the general shape of the two approaches — it is not a wiring
   diagram of pi-agent's internals.
   ======================================== */

const BOX_FILL = 'rgba(255,255,255,0.05)'
const BOX_STROKE = 'rgba(255,255,255,0.20)'
const TITLE = '#e8eef4'
const SUB = '#93a9bf'
const COLD = '#93a9bf'
const WARM = '#5eead4'

function Box({
  x,
  y,
  w,
  h = 58,
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
  sub?: string
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
        rx={9}
        fill={tint ?? BOX_FILL}
        stroke={accent ?? BOX_STROKE}
        strokeWidth={1.2}
      />
      <text
        x={x + w / 2}
        y={sub ? y + h / 2 - 4 : y + h / 2 + 4}
        textAnchor="middle"
        fontSize={12.5}
        fontWeight={600}
        fill={accent ?? TITLE}
      >
        {title}
      </text>
      {sub && (
        <text x={x + w / 2} y={y + h / 2 + 15} textAnchor="middle" fontSize={10.5} fill={SUB}>
          {sub}
        </text>
      )}
    </g>
  )
}

function Right({ x1, x2, y, color }: { x1: number; x2: number; y: number; color?: string }) {
  return (
    <line
      x1={x1}
      y1={y}
      x2={x2}
      y2={y}
      stroke={color ?? BOX_STROKE}
      strokeWidth={1.4}
      markerEnd={color ? 'url(#r-head-warm)' : 'url(#r-head)'}
    />
  )
}

export default function RetrievalDiagram() {
  return (
    <svg
      viewBox="0 0 1000 452"
      role="img"
      aria-label="Two shapes compared. A conventional local RAG: question, embed, retrieve the top-k most similar passages, stuff them into a prompt, answer — the passages returned are the ones that most resemble the question. An agentic approach: question, decide what to consult, work through the material with its structure intact, reason across the parts, then answer with its reasoning."
      style={{ width: '100%', minWidth: 760, height: 'auto', fontFamily: 'Inter, sans-serif' }}
    >
      <defs>
        <marker id="r-head" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto">
          <path d="M 0 0 L 10 5 L 0 10 z" fill={BOX_STROKE} />
        </marker>
        <marker id="r-head-warm" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto">
          <path d="M 0 0 L 10 5 L 0 10 z" fill="rgba(94,234,212,0.55)" />
        </marker>
      </defs>

      {/* ---------- lane A: conventional local RAG ---------- */}
      <text x={8} y={38} fontSize={10} fontWeight={700} fill={COLD} letterSpacing={1.4}>
        CONVENTIONAL LOCAL RAG
      </text>

      <Box x={8} y={62} w={150} title="Question" />
      <Right x1={158} x2={196} y={91} />
      <Box x={198} y={62} w={160} title="Embed & search" sub="vector similarity" />
      <Right x1={358} x2={396} y={91} />
      <Box x={398} y={62} w={190} title="Top-k passages" sub="chunks, structure discarded" />
      <Right x1={588} x2={626} y={91} />
      <Box x={628} y={62} w={170} title="Stuff into prompt" />
      <Right x1={798} x2={836} y={91} />
      <Box x={838} y={62} w={154} title="Answer" />

      <text x={8} y={152} fontSize={11} fill={COLD}>
        Works when the answer sits in a passage. The retrieved passages are the ones that most
        <tspan x={8} dy={16}>
          resemble the question — and a question that needs analysis does not resemble its answer.
        </tspan>
      </text>

      <line x1={8} y1={196} x2={992} y2={196} stroke="rgba(255,255,255,0.12)" strokeWidth={1} />

      {/* ---------- lane B: the agentic shape ---------- */}
      <text x={8} y={232} fontSize={10} fontWeight={700} fill={WARM} letterSpacing={1.4}>
        pi-agent / hermes-agent
      </text>

      <Box x={8} y={256} w={150} title="Question" accent={WARM} tint="rgba(94,234,212,0.06)" />
      <Right x1={158} x2={196} y={285} color={WARM} />
      <Box
        x={198}
        y={256}
        w={182}
        title="Decide what to consult"
        sub="plans before it reads"
        accent={WARM}
        tint="rgba(94,234,212,0.06)"
      />
      <Right x1={380} x2={418} y={285} color={WARM} />
      <Box
        x={420}
        y={256}
        w={196}
        title="Work through the material"
        sub="structure kept intact"
        accent={WARM}
        tint="rgba(94,234,212,0.06)"
      />
      <Right x1={616} x2={654} y={285} color={WARM} />
      <Box
        x={656}
        y={256}
        w={160}
        title="Reason across parts"
        accent={WARM}
        tint="rgba(94,234,212,0.06)"
      />
      <Right x1={816} x2={854} y={285} color={WARM} />
      <Box
        x={856}
        y={256}
        w={136}
        title="Answer"
        sub="with its reasoning"
        accent={WARM}
        tint="rgba(94,234,212,0.06)"
      />

      {/* the configuration surface sits underneath, not in the request path */}
      <line
        x1={198}
        y1={314}
        x2={198}
        y2={356}
        stroke="rgba(94,234,212,0.35)"
        strokeWidth={1.2}
        strokeDasharray="4 4"
      />
      <line
        x1={618}
        y1={314}
        x2={618}
        y2={356}
        stroke="rgba(94,234,212,0.35)"
        strokeWidth={1.2}
        strokeDasharray="4 4"
      />
      <Box
        x={8}
        y={358}
        w={984}
        h={54}
        title="CONFIGURED, NOT CODED — the people who own the domain set it up themselves"
        sub="they are the ones who know which distinctions matter, and they change it without waiting for a release"
        accent={WARM}
        tint="rgba(94,234,212,0.07)"
      />
      <text x={8} y={438} fontSize={11} fill={SUB}>
        Both run on models hosted where the material is — nothing leaves the organisation.
      </text>
    </svg>
  )
}
