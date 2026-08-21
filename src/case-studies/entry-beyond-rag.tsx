import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '../index.css'
import BeyondRag from './BeyondRag.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BeyondRag />
  </StrictMode>,
)
