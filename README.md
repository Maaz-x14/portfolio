# Agentic Portfolio (React + TypeScript)

Dark-first portfolio with an "AI operator console" aesthetic. Built with Vite, React, Tailwind, Zustand, Framer Motion.

Features included in this scaffold:
- Dark mode by default with theme toggle (Zustand)
- Animated hero with terminal-style typing lines
- "Systems I Build" cards with tilt/glow
- Projects case-study pages (placeholders ready to populate)
- Interactive Agent Graph (SVG-based, lightweight, hover details)
- Blog / Engineering notes list
- Terminal-styled contact section (metaphor for secure link)
- TypeScript interfaces for `Project` and `AgentNode`

Quick start

1. Install dependencies

```bash
cd /home/maazahmad/Desktop/Portfolio
npm install
```

2. Dev server

```bash
npm run dev
```

3. Build

```bash
npm run build
npm run preview
```

Notes & next steps
- Replace placeholder content with your real projects, architecture diagrams, and agent node descriptions.
- If you want 3D accents, integrate `@react-three/fiber` and replace the hero placeholder with a compact scene. Keep scenes small and lazy-loaded.
- Accessibility: headings, aria-labels, and focus outlines are included; expand with semantic landmarks as you populate content.

Files of interest
- `src/types` — TypeScript interfaces
- `src/store/useConsoleStore.ts` — theme & console global state
- `src/components/AgentGraph.tsx` — interactive graph component (SVG)
- `src/components/ContactTerminal.tsx` — contact metaphor

If you want, I can now:
- add actual route-based lazy-loading for pages,
- wire up deployment config (Netlify/Vercel),
- or convert AgentGraph to a lightweight R3F scene.

Tell me which next step you'd like.
