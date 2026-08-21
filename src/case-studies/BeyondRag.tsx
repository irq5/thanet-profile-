import CaseStudyShell, { Figure, Section, type Fact } from './CaseStudyShell.tsx'
import RetrievalDiagram from './RetrievalDiagram.tsx'

const facts: Fact[] = [
  { label: 'Role', value: 'Architecture & hands-on delivery' },
  { label: 'Systems', value: 'pi-agent · hermes-agent' },
  { label: 'Substrate', value: 'Markdown corpus · full-text search' },
  { label: 'Context', value: 'Wisdom Vast Co., Ltd. · 2026' },
]

export default function BeyondRag() {
  return (
    <CaseStudyShell
      eyebrow="Case study · Applied AI"
      title={
        <>
          An answer you can{' '}
          <em className="not-italic text-white/40">open the file and check</em>
        </>
      }
      dek="pi-agent and hermes-agent answer questions over an organisation's own material — without a vector store, a chunk size, or a k to guess."
      facts={facts}
      ctaTitle="Have material nobody can answer questions about?"
    >
      <Section title="The problem">
        <p>
          An organisation's specialised material — regulations, procedures, technical standards,
          accumulated case history — is dense and interconnected. The questions people actually ask
          about it are rarely lookups. They sound more like:{' '}
          <em>
            does this case fall under the exception, and if it does, what else changes as a result?
          </em>{' '}
          That is a question about how several parts of the material relate to each other.
        </p>
        <p>
          The default answer is a local RAG: chunk the documents, embed them, retrieve the top-k
          nearest passages, hand them to a model. For lookups that works well and it is the right
          tool. For this it leaks in three places at once, and none of them are tuning problems.
        </p>
        <p>
          The chunk boundary cuts through the structure the answer depends on — which section
          governs which, what supersedes what, which exception was added later. The size of{' '}
          <em>k</em> has to be guessed: too small and the answer is not in the window, too large and
          it is buried under near-misses that scored well and mean nothing. And when an answer does
          come back, there is nothing to open. A vector neighbourhood is not something a person can
          inspect and disagree with.
        </p>
        <p>
          That last one is the disqualifying one. In a regulated setting, an answer nobody can trace
          is not an answer — it is a suggestion with good grammar.
        </p>
      </Section>

      <Section title="The approach">
        <p>
          Change the substrate rather than the tuning. The corpus is plain markdown, and the
          directory layout belongs to the people who own the domain: they decide what sits where,
          because they are the ones who know which distinctions matter. New material triggers a
          re-index as it arrives, so freshness is not a separate job that someone forgets to run.
        </p>
        <p>
          Retrieval is full-text search across those files and the relations the structure expresses
          — closer in spirit to a graph RAG than to a vector one, except the graph is a directory
          tree and a set of documents, which is to say it is legible. There is no{' '}
          <em>k</em> to choose and no chunk boundary to tune. The agent decides what to consult,
          reads it with its structure intact, and reasons across the parts before answering.
        </p>
        <p>
          Because an answer arrives with the path it came from,{' '}
          <strong className="font-semibold text-white">verification is opening the file</strong>.
          That is the whole design. Everything else follows from wanting that property.
        </p>
        <p>
          Capability is extended the same way. Rather than writing code or wiring an n8n flow for
          each new task, you ask the agent to build a skill — so the people closest to the work add
          to the system without a release cycle standing between them and it.
        </p>
      </Section>

      <Figure
        caption={
          <>
            Above the line, the three places a vector pipeline loses something it cannot get back.
            Below it, the same job on a substrate a person can open — and the loop that matters
            most: the answer carries its source path, so checking it means reading the file rather
            than trusting the embedding. Everything runs against models hosted where the material
            already is, which is usually the constraint that rules out a hosted API to begin with.
          </>
        }
      >
        <RetrievalDiagram />
      </Figure>

      <Section title="The result">
        <p>
          Questions that require analysis come back with an answer and the reasoning behind it,
          instead of a list of excerpts for the reader to synthesise — and every answer can be walked
          back to the file it came from. Retrieval noise stops being a tuning problem and becomes a
          structure problem, which is a much better kind of problem: it is fixed by moving a file,
          not by hoping the next reranker behaves.
        </p>
      </Section>

      <Section title="The decision that mattered">
        <p>
          Choosing a substrate a human can audit, and accepting the cost of that choice. Vector
          search is genuinely better at finding text that resembles a query, and giving it up meant
          giving up something real.
        </p>
        <p>
          What made it worth it: retrieval quality was never the bottleneck. Better embeddings,
          better chunking, better reranking all improve how well the system finds passages that look
          like the question. None of them change the fact that looking like the question and
          answering it are two different things — and none of them give the person holding the answer
          anything to open.
        </p>
      </Section>
    </CaseStudyShell>
  )
}
