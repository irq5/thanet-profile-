import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '../index.css'
import GitlabMigration from './GitlabMigration.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <GitlabMigration />
  </StrictMode>,
)
