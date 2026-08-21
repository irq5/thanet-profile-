import CaseStudyShell, { Figure, Section, type Fact } from './CaseStudyShell.tsx'
import PipelineDiagram from './PipelineDiagram.tsx'

const facts: Fact[] = [
  { label: 'Role', value: 'Architecture & hands-on delivery' },
  { label: 'Scope', value: '1,000+ projects, self-hosted GitLab' },
  { label: 'Stack', value: 'Python · GitLab REST API · CSV' },
  { label: 'Context', value: 'Wisdom Vast Co., Ltd. · 2026' },
]

export default function GitlabMigration() {
  return (
    <CaseStudyShell
      eyebrow="Case study · Internal tooling"
      title={
        <>
          Migrating 1,000+ GitLab projects{' '}
          <em className="not-italic text-white/40">without a manual checklist</em>
        </>
      }
      dek="Discovery, planning, and execution as three separate passes over one file a human can actually read."
      facts={facts}
      ctaTitle="Got a migration nobody wants to start?"
    >
      <Section title="The problem">
        <p>
          Self-hosted GitLab estates grow faster than anyone reorganises them. This one had passed
          a thousand projects, sitting in a group structure that no longer matched how the teams
          actually worked. Moving them by hand was not realistic: every project carries members,
          branches, and settings that fail quietly when a step is skipped, and a run measured in
          hours has to survive being interrupted rather than start over.
        </p>
      </Section>

      <Section title="The approach">
        <p>
          Separate discovery from execution, and put a contract between them that a person can
          review.
        </p>
        <p>
          An inventory pass reads the source instance through the GitLab REST API and writes one
          row per project into a structured CSV — current path, intended path, and the attributes
          that have to survive the move. Mapping is expressed as rules rather than typed out
          project by project, so a naming convention is written once and applied across a thousand
          rows. Nothing moves until that file has been read.
        </p>
        <p>
          Execution then consumes the same file. Operations run in bulk but idempotently, each
          result is validated against the plan, and a batch that fails validation is rolled back
          instead of left half-applied.
        </p>
      </Section>

      <Figure
        caption={
          <>
            The plan file is the boundary. Everything above it only reads, everything below it
            writes to the target instance, and the review gate sits exactly where the risk
            changes. Reconciliation compares the plan against what the target actually reports —
            so a failed batch rolls back rather than leaving the estate in a state nobody can
            describe.
          </>
        }
      >
        <PipelineDiagram />
      </Figure>

      <Section title="The result">
        <p>
          1,000+ projects migrated with their structure and data integrity preserved, and a
          complete record — the plan file itself — of what was supposed to move where, diffable
          against what actually did.
        </p>
      </Section>

      <Section title="The decision that mattered">
        <p>
          The temptation was to make the tool clever enough to decide for itself. Choosing a plain
          CSV instead turned an irreversible bulk operation into something a team lead could open
          in a spreadsheet, question, correct, and re-run. On a migration this size, reviewability
          was worth more than automation.
        </p>
      </Section>
    </CaseStudyShell>
  )
}
