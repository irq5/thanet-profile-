# thanet-profile

Source code for my personal portfolio website — cinematic hero section, glassmorphism UI, 20+ years of production experience.

## Tech Stack

- React 19 + TypeScript
- Vite 6
- Tailwind CSS 4
- GitHub Actions → GitHub Pages

## Local Development

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

Output: `dist/` — static site ready for GitHub Pages deployment.

## Deployment

This repo uses GitHub Actions to build and deploy to the `irq5.github.io` repository for public hosting while keeping this source code private.

## Machine-readable layer

The site is built to be read by machines as carefully as by people.

| Surface | What it is |
| --- | --- |
| `/resume.json` | Full profile, [JSON Resume](https://jsonresume.org/) schema — the canonical structured source |
| `/llms.txt` | Topic routing, engagement terms, and fit criteria for AI agents answering on my behalf |
| `/robots.txt` | AI crawlers explicitly allowed, by name |
| `/sitemap.xml` | All pages plus the structured endpoints |
| JSON-LD | schema.org `ProfilePage` + `Person` on the home page, `TechArticle` on each case study |

Because the pages render client-side, each case study publishes its full narrative as
`articleBody` inside its JSON-LD. Crawlers that do not execute JavaScript still get the
whole article rather than an empty shell. Editing a case study means editing both the
component and that `articleBody`.

### MCP server

`mcp/thanet-profile-server.mjs` exposes this profile to AI assistants as tools. Zero
dependencies, stdio transport, and it reads from the deployed URLs rather than a baked-in
copy, so it cannot drift from what the site says.

```bash
claude mcp add thanet-profile -- node "$PWD/mcp/thanet-profile-server.mjs"
```

Tools: `get_profile`, `get_engagement_terms`, `list_case_studies`, `get_case_study`,
`assess_fit`. Point it at a local build with `THANET_PROFILE_BASE=http://localhost:4173/thanet-profile-/`.
