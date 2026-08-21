/* ========================================
   The two substrates. Above: a vector RAG, and the three places it leaks.
   Below: a markdown corpus in a directory a person laid out, re-indexed on
   arrival and searched full-text — so an answer carries the path it came from.
   ======================================== */

const BOX_FILL = 'rgba(255,255,255,0.05)'
const BOX_STROKE = 'rgba(255,255,255,0.20)'
const TITLE = '#e8eef4'
const SUB = '#93a9bf'
const WARM = '#5eead4'
const LEAK = '#fda4af'

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

function Right({ x1, x2, y, warm }: { x1: number; x2: number; y: number; warm?: boolean }) {
  return (
    <line
      x1={x1}
      y1={y}
      x2={x2}
      y2={y}
      stroke={warm ? 'rgba(94,234,212,0.5)' : BOX_STROKE}
      strokeWidth={1.4}
      markerEnd={warm ? 'url(#s-head-warm)' : 'url(#s-head)'}
    />
  )
}

/** a leak marker: where a vector pipeline loses something it cannot get back */
function Leak({ x, y, lines }: { x: number; y: number; lines: string[] }) {
  return (
    <g>
      <line x1={x} y1={y - 14} x2={x} y2={y - 4} stroke={LEAK} strokeWidth={1.2} strokeDasharray="3 3" />
      <circle cx={x} cy={y - 18} r={3} fill={LEAK} />
      {lines.map((l, i) => (
        <text key={i} x={x} y={y + 8 + i * 13} textAnchor="middle" fontSize={10.5} fill={LEAK}>
          {l}
        </text>
      ))}
    </g>
  )
}

export default function RetrievalDiagram() {
  return (
    <svg
      viewBox="0 0 1000 556"
      role="img"
      aria-label="Two substrates compared. A vector RAG chunks and embeds documents into a vector store and returns the top-k most similar passages: the chunk boundary cuts the structure the answer depends on, k has to be guessed, and the answer arrives with no path back to check it. The alternative: new material triggers a re-index on arrival into a markdown corpus laid out in a directory the domain owner defines, searched full-text across files and their relations, so the answer carries the source path and a person can open that file and verify it. New capability is added by asking the agent to build a skill rather than by writing code or wiring an n8n flow."
      style={{ width: '100%', minWidth: 780, height: 'auto', fontFamily: 'Inter, sans-serif' }}
    >
      <defs>
        <marker id="s-head" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto">
          <path d="M 0 0 L 10 5 L 0 10 z" fill={BOX_STROKE} />
        </marker>
        <marker id="s-head-warm" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto">
          <path d="M 0 0 L 10 5 L 0 10 z" fill="rgba(94,234,212,0.55)" />
        </marker>
        <marker id="s-head-trace" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto">
          <path d="M 0 0 L 10 5 L 0 10 z" fill="rgba(94,234,212,0.7)" />
        </marker>
      </defs>

      {/* ================= lane A — a vector RAG ================= */}
      <text x={8} y={34} fontSize={10} fontWeight={700} fill={SUB} letterSpacing={1.4}>
        VECTOR RAG — AND THE THREE PLACES IT LEAKS
      </text>

      <Box x={8} y={52} w={140} title="Documents" />
      <Right x1={148} x2={182} y={81} />
      <Box x={184} y={52} w={166} title="Chunk + embed" />
      <Right x1={350} x2={384} y={81} />
      <Box x={386} y={52} w={150} title="Vector store" />
      <Right x1={536} x2={570} y={81} />
      <Box x={572} y={52} w={186} title="Top-k by similarity" />
      <Right x1={758} x2={792} y={81} />
      <Box x={794} y={52} w={198} title="Answer" sub="no path back" />

      <Leak x={267} y={132} lines={['the chunk boundary cuts', 'the structure the answer needs']} />
      <Leak x={640} y={132} lines={['how large is k? guess low', 'and you miss it, high and you', 'bury it in near-misses']} />
      <Leak x={893} y={132} lines={['nothing to open,', 'nothing to check']} />

      <line x1={8} y1={214} x2={992} y2={214} stroke="rgba(255,255,255,0.12)" strokeWidth={1} />

      {/* ================= lane B — what was built instead ================= */}
      <text x={8} y={250} fontSize={10} fontWeight={700} fill={WARM} letterSpacing={1.4}>
        pi-agent / hermes-agent — A SUBSTRATE A PERSON CAN OPEN
      </text>

      <Box
        x={8}
        y={268}
        w={158}
        title="New material"
        sub="arrives"
        accent={WARM}
        tint="rgba(94,234,212,0.06)"
      />
      <Right x1={166} x2={198} y={297} warm />
      <Box
        x={200}
        y={268}
        w={134}
        title="Re-index"
        sub="on arrival"
        accent={WARM}
        tint="rgba(94,234,212,0.06)"
      />
      <Right x1={334} x2={366} y={297} warm />
      <Box
        x={368}
        y={268}
        w={214}
        h={66}
        title="Markdown corpus"
        sub="directories the domain owner lays out"
        accent={WARM}
        tint="rgba(94,234,212,0.10)"
      />
      <Right x1={582} x2={614} y={297} warm />
      <Box
        x={616}
        y={268}
        w={196}
        h={66}
        title="Full-text search"
        sub="across files and their relations"
        accent={WARM}
        tint="rgba(94,234,212,0.06)"
      />
      <Right x1={812} x2={844} y={297} warm />
      <Box
        x={846}
        y={268}
        w={146}
        h={66}
        title="Answer"
        sub="+ source path"
        accent={WARM}
        tint="rgba(94,234,212,0.06)"
      />

      {/* the trace-back loop: the point of the whole design */}
      <path
        d="M 919 334 L 919 372 L 475 372 L 475 336"
        fill="none"
        stroke="rgba(94,234,212,0.7)"
        strokeWidth={1.4}
        markerEnd="url(#s-head-trace)"
      />
      <text x={697} y={392} textAnchor="middle" fontSize={11} fill={WARM}>
        a person opens that file and checks the answer against it
      </text>

      {/* codeless: how capability gets added */}
      <Box
        x={8}
        y={420}
        w={984}
        h={58}
        title="CODELESS — new capability by asking the agent to build a skill"
        sub="instead of writing code or wiring an n8n flow, so the people who own the domain extend it themselves"
        accent={WARM}
        tint="rgba(94,234,212,0.07)"
      />

      <text x={8} y={506} fontSize={11} fill={SUB}>
        No k to choose. No chunk boundary to tune. Retrieval noise becomes a structure problem —
        <tspan x={8} dy={16}>
          fixed by moving a file, not by hoping the next reranker behaves. Nothing leaves the organisation.
        </tspan>
      </text>
    </svg>
  )
}
