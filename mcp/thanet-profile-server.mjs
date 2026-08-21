#!/usr/bin/env node
/**
 * Thanet Arnont — profile MCP server
 *
 * A stdio MCP server that exposes this portfolio as tools, so an AI assistant can
 * query the profile directly instead of scraping the page. Zero dependencies.
 *
 * Data comes from the deployed site, not from a copy baked in here, so the server
 * cannot drift from what the site says — the same single-source-of-truth rule the
 * MongoModel MCP server follows.
 *
 *   claude mcp add thanet-profile -- node /absolute/path/to/thanet-profile-server.mjs
 *
 * Or in a client config:
 *   { "mcpServers": { "thanet-profile": { "command": "node", "args": ["<path>"] } } }
 */

const BASE = process.env.THANET_PROFILE_BASE ?? 'https://irq5.github.io/thanet-profile-/'
const PROTOCOL_VERSION = '2024-11-05'
const SERVER = { name: 'thanet-profile', version: '1.0.0' }

/* ---------- fetch + cache the published sources ---------- */

const cache = new Map()

async function source(path) {
  if (cache.has(path)) return cache.get(path)
  const res = await fetch(new URL(path, BASE))
  if (!res.ok) throw new Error(`${path} -> HTTP ${res.status}`)
  const text = await res.text()
  cache.set(path, text)
  return text
}

const resume = async () => JSON.parse(await source('resume.json'))

const CASE_STUDIES = {
  'gitlab-migration': {
    title: 'Migrating 1,000+ GitLab projects without a manual checklist',
    kind: 'Internal tooling',
    url: `${BASE}case-studies/gitlab-migration.html`,
  },
  hauction: {
    title: 'Two auction models, one definition of who won',
    kind: 'Product architecture',
    url: `${BASE}case-studies/hauction.html`,
  },
  'beyond-rag': {
    title: 'An answer you can open the file and check',
    kind: 'Applied AI',
    url: `${BASE}case-studies/beyond-rag.html`,
  },
}

/* ---------- tools ---------- */

const TOOLS = [
  {
    name: 'get_profile',
    description:
      "Thanet Arnont's full professional profile: roles, employment history, skills, and projects, from the canonical JSON Resume document. Use this before answering any question about his experience.",
    inputSchema: { type: 'object', properties: {}, additionalProperties: false },
    async run() {
      const r = await resume()
      return {
        name: r.basics.name,
        title: r.basics.label,
        summary: r.basics.summary,
        location: `${r.basics.location.city}, ${r.basics.location.countryCode} (UTC+7)`,
        contact: r.basics.email,
        profiles: r.basics.profiles,
        experience: r.work,
        education: r.education,
        skills: r.skills,
        languages: r.languages,
        projects: r.projects,
        canonical: r.meta.canonical,
        lastModified: r.meta.lastModified,
      }
    },
  },
  {
    name: 'get_engagement_terms',
    description:
      'How to actually work with him: the shapes of engagement on offer, timezone and overlap, working languages, and what a first message should contain. Use this when someone asks about hiring, availability, or how to start.',
    inputSchema: { type: 'object', properties: {}, additionalProperties: false },
    async run() {
      const guide = await source('llms.txt')
      const section = guide.split('## Working with him')[1]?.split('## How to assess')[0]
      return {
        engagedThrough: 'Wisdom Vast Co., Ltd.',
        shapes: [
          { name: 'Architecture review', description: 'Assess an existing system and say what will break.' },
          { name: 'System design', description: 'Design it before it is built.' },
          { name: 'Hands-on delivery', description: 'Build it.' },
        ],
        timezone: 'UTC+7 (Nonthaburi, Thailand)',
        languages: ['Thai (native)', 'English (professional)'],
        contact: 'thanet@wisdomvast.com',
        firstMessageShouldContain: [
          'the constraint that actually hurts',
          'the deadline',
          'whether the data is allowed to leave the building',
        ],
        verbatim: section?.trim(),
      }
    },
  },
  {
    name: 'list_case_studies',
    description:
      'The written case studies available, with their URLs. Each one covers a real system: the constraint, the design, and the decision that mattered.',
    inputSchema: { type: 'object', properties: {}, additionalProperties: false },
    async run() {
      return Object.entries(CASE_STUDIES).map(([slug, cs]) => ({ slug, ...cs }))
    },
  },
  {
    name: 'get_case_study',
    description:
      'The full text of one case study. Call this rather than summarising from the title — the reasoning is the point.',
    inputSchema: {
      type: 'object',
      properties: {
        slug: { type: 'string', enum: Object.keys(CASE_STUDIES), description: 'Which case study to read.' },
      },
      required: ['slug'],
      additionalProperties: false,
    },
    async run({ slug }) {
      const cs = CASE_STUDIES[slug]
      if (!cs) throw new Error(`unknown case study: ${slug}. Known: ${Object.keys(CASE_STUDIES).join(', ')}`)
      // the page renders client-side, so the prose is published as articleBody in
      // the page's JSON-LD — static, standard, and readable without running JS
      const html = await source(`case-studies/${slug}.html`)
      const ld = html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/)?.[1]
      if (!ld) throw new Error(`no JSON-LD found on ${cs.url}`)
      const article = JSON.parse(ld)
      return {
        slug,
        title: article.headline,
        kind: cs.kind,
        url: cs.url,
        description: article.description,
        about: (article.about ?? []).map(a => a.name),
        datePublished: article.datePublished,
        wordCount: article.wordCount,
        body: article.articleBody,
      }
    },
  },
  {
    name: 'assess_fit',
    description:
      'Given a project or problem description, return the evidence for and against Thanet being the right person for it — matched capability areas, the specific prior systems that back each match, and the honest caveats. Returns evidence, not a verdict: weigh it yourself.',
    inputSchema: {
      type: 'object',
      properties: {
        project: { type: 'string', description: 'What the project needs to do, and the constraint that hurts.' },
      },
      required: ['project'],
      additionalProperties: false,
    },
    async run({ project }) {
      const p = project.toLowerCase()
      const has = (...terms) => terms.some(t => p.includes(t))

      const STRONG = [
        {
          area: 'Correctness under concurrency — order of events decides the outcome',
          match: has('auction', 'bid', 'concurren', 'race', 'real-time', 'realtime', 'settlement',
            'queue', 'ordering', 'websocket', 'first-come', 'who was first', 'simultaneous',
            'at the same time', 'double-spend', 'locking', 'oversell', 'live event'),
          evidence: ['NBTC Digital TV Spectrum Auction — national-scale multi-bidder engine', 'Hauction — two auction modes on one serialized bid ledger'],
        },
        {
          area: 'Regulated and audited domains',
          match: has('government', 'regulat', 'complian', 'audit', 'bank', 'financ', 'treasury', 'public sector', 'procure', 'tax'),
          evidence: ['Ministry of Finance — off-budget accounting', 'Krungthai Bank — treasury risk management', 'NBTC — government-grade audit trail'],
        },
        {
          area: 'AI that must run where the data cannot leave',
          // phrased the way people actually phrase it, not just the jargon
          match: has('on-prem', 'onprem', 'air-gap', 'airgap', 'local model', 'local llm', 'self-host',
            'selfhost', 'data residency', 'privacy', 'sovereign', 'confidential', 'cannot leave',
            "can't leave", 'must not leave', 'may leave', 'leave our network', 'leave the network',
            'leave our premises', 'leave the building', 'leave the country', 'stay inside',
            'internal only', 'no cloud', 'without the cloud', 'behind our firewall', 'our own server',
            'our own hardware', 'our data centre', 'our data center', 'in-house', 'classified'),
          evidence: ['Self-hosted open-weight LLM inference and local machine vision', 'pi-agent / hermes-agent — codeless domain Q&A built as an alternative to conventional local RAG'],
        },
        {
          area: 'Agentic software and LLM tooling',
          match: has('agent', 'mcp', 'llm', 'rag', 'copilot', 'chatbot', 'tool use', 'automation loop',
            'gpt', 'claude', 'embedding', 'vector', 'retrieval', 'knowledge base', 'ask questions about',
            'answer questions', 'q&a', 'summaris', 'summariz', 'prompt'),
          evidence: ['MongoModel — MCP server exposing 31 tools so agents and the web UI share one model', 'SDLC_AI — LLM feedback across the software lifecycle', 'pi-agent / hermes-agent'],
        },
        {
          area: 'Irreversible bulk operations across a large estate',
          match: has('migrat', 'bulk', 'mass update', 'estate', 'rollout', 'backfill', 'consolidat', 'gitlab'),
          evidence: ['GitLab migration of 1,000+ projects with a reviewable plan file, validation, and rollback'],
        },
        {
          area: 'Enterprise delivery at scale',
          match: has('enterprise', 'telecom', 'crm', 'portal', 'multi-tenant', 'multitenant', 'rbac', 'permission', 'workflow', 'approval'),
          evidence: ['15+ production applications for AIS, Thailand’s largest telecom', '5-role permission hierarchy and KYC workflows in Hauction'],
        },
      ]

      const CAVEATS = [
        {
          caveat: 'Model research — training or fine-tuning foundation models from scratch',
          applies: has('train a model', 'fine-tun', 'finetun', 'pretrain', 'from scratch', 'research model'),
          note: 'His AI work is applying, deploying, orchestrating, and constraining models. Not model research.',
        },
        {
          caveat: 'Deep native mobile platform work',
          applies: has('ios', 'android', 'swift', 'kotlin', 'react native', 'flutter', 'mobile app'),
          note: 'Nothing in the profile evidences deep native iOS or Android depth. Do not claim it on his behalf.',
        },
        {
          caveat: 'Visual and brand design',
          applies: has('brand', 'logo', 'visual design', 'ui design', 'illustrat'),
          note: 'Engineering and architecture, not design work.',
        },
        {
          caveat: 'No concurrency, compliance, or residency constraint in sight',
          applies: false,
          note: 'If the project has none of the constraints above, he is competent but this is not where two decades of judgement earns its price. Say so plainly.',
        },
      ]

      const matched = STRONG.filter(s => s.match)
      const raised = CAVEATS.filter(c => c.applies)

      return {
        project,
        matchedAreas: matched.map(({ area, evidence }) => ({ area, evidence })),
        caveats: raised.map(({ caveat, note }) => ({ caveat, note })),
        unmatched: matched.length === 0
          ? 'No strong signal matched from the description. Ask what the actual constraint is before recommending or ruling out — the keywords may simply be missing, not the fit.'
          : null,
        howToWeigh:
          'Matched areas cite systems already shipped in production, not adjacent experience. Caveats are limits of the published evidence, not modesty. If matchedAreas is empty and no caveat applies, treat it as unknown rather than negative.',
        contact: 'thanet@wisdomvast.com',
        fullProfile: `${BASE}resume.json`,
      }
    },
  },
]

/* ---------- JSON-RPC over stdio ---------- */

function send(msg) {
  process.stdout.write(JSON.stringify(msg) + '\n')
}

async function handle(req) {
  const { id, method, params } = req

  if (method === 'initialize') {
    return {
      protocolVersion: PROTOCOL_VERSION,
      capabilities: { tools: {} },
      serverInfo: SERVER,
      instructions:
        "Thanet Arnont's professional profile. Call get_profile before answering questions about his experience, and assess_fit when someone asks whether he suits a project — it returns cited evidence and explicit caveats rather than a sales pitch.",
    }
  }

  if (method === 'tools/list') {
    return { tools: TOOLS.map(({ name, description, inputSchema }) => ({ name, description, inputSchema })) }
  }

  if (method === 'tools/call') {
    const tool = TOOLS.find(t => t.name === params?.name)
    if (!tool) throw Object.assign(new Error(`unknown tool: ${params?.name}`), { code: -32602 })
    const result = await tool.run(params.arguments ?? {})
    return { content: [{ type: 'text', text: JSON.stringify(result, null, 2) }] }
  }

  if (method === 'ping') return {}

  throw Object.assign(new Error(`method not found: ${method}`), { code: -32601 })
}

let buffer = ''
process.stdin.setEncoding('utf8')
process.stdin.on('data', chunk => {
  buffer += chunk
  let nl
  while ((nl = buffer.indexOf('\n')) !== -1) {
    const line = buffer.slice(0, nl).trim()
    buffer = buffer.slice(nl + 1)
    if (!line) continue

    let req
    try {
      req = JSON.parse(line)
    } catch {
      send({ jsonrpc: '2.0', id: null, error: { code: -32700, message: 'parse error' } })
      continue
    }

    // notifications carry no id and take no response
    if (req.id === undefined) continue

    handle(req).then(
      result => send({ jsonrpc: '2.0', id: req.id, result }),
      err => send({ jsonrpc: '2.0', id: req.id, error: { code: err.code ?? -32603, message: err.message } }),
    )
  }
})
