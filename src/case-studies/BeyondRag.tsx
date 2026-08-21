import CaseStudyShell, { Figure, Section, type Fact } from './CaseStudyShell.tsx'
import RetrievalDiagram from './RetrievalDiagram.tsx'

const facts: Fact[] = [
  { label: 'Role', value: 'Architecture & hands-on delivery' },
  { label: 'Systems', value: 'pi-agent · hermes-agent' },
  { label: 'Built for', value: 'Organisations with specialised material' },
  { label: 'Context', value: 'Wisdom Vast Co., Ltd. · 2026' },
]

export default function BeyondRag() {
  return (
    <CaseStudyShell
      eyebrow="Case study · Applied AI"
      title={
        <>
          Why these agents{' '}
          <em className="not-italic text-white/40">are not a local RAG</em>
        </>
      }
      dek="Retrieval answers a different question than the one being asked. pi-agent and hermes-agent are built around that, and configured by the people who own the domain rather than coded."
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
          The default answer in 2026 is a local RAG: embed the documents, retrieve the passages that
          match the question, hand them to a model. For lookups it works well and it is the right
          tool.
        </p>
        <p>
          For this it does not, and the reason is structural rather than a tuning problem. Retrieval
          returns the passages that most <em>resemble</em> the question — and a question that
          requires analysis does not resemble the passages that answer it. Chunking compounds it by
          discarding the structure the answer depends on: which section governs which, what
          supersedes what, which exception was added later.
        </p>
      </Section>

      <Section title="The approach">
        <p>
          pi-agent and hermes-agent are built the other way round. Rather than retrieving passages
          and hoping the model can assemble an argument from them, the agent decides what to
          consult, works through the material with its structure intact, and reasons across the
          parts before answering.
        </p>
        <p>
          The second half matters as much as the first: these are{' '}
          <strong className="font-semibold text-white">configured, not coded</strong>. The people
          who own the domain set the system up themselves, because they are the ones who know which
          distinctions matter — and they can change it when the material changes, without waiting
          for a release.
        </p>
      </Section>

      <Figure
        caption={
          <>
            The two shapes side by side. This compares the approaches, not the internals of either
            system. Both run against models hosted where the material already is, so nothing has to
            leave the organisation to get an answer — which is usually the constraint that rules out
            a hosted API in the first place.
          </>
        }
      >
        <RetrievalDiagram />
      </Figure>

      <Section title="The result">
        <p>
          A question that requires analysis comes back with an answer and the reasoning behind it,
          instead of a list of excerpts for the reader to synthesise. In use at organisations working
          with material of exactly this kind.
        </p>
      </Section>

      <Section title="The decision that mattered">
        <p>
          RAG was the default, and defaults are safe. Choosing against one means owning more of the
          design and having to defend it. What made that worth accepting was noticing that retrieval
          quality had never been the bottleneck. Better embeddings, better chunking, better
          reranking — all of it improves how well the system finds passages that look like the
          question. None of it changes the fact that looking like the question and answering it are
          two different things.
        </p>
      </Section>
    </CaseStudyShell>
  )
}
