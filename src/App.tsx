import React from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import Home from './pages/Home'
import ProjectsPage from './pages/ProjectsPage'
import Blog from './pages/Blog'
import { useConsoleStore } from './store/useConsoleStore'
import { Sun, Moon } from 'lucide-react'

export default function App() {
  const theme = useConsoleStore((s) => s.theme)
  const toggle = useConsoleStore((s) => s.toggleTheme)

  React.useEffect(() => {
    document.documentElement.style.background = theme === 'dark' ? 'linear-gradient(180deg,#050608,#0b0f14)' : '#f7f7f8'
    document.documentElement.style.color = theme === 'dark' ? 'white' : '#0b0f14'
  }, [theme])

  return (
    <div className="min-h-screen">
      <header className="flex items-center justify-between p-4">
        <nav className="flex gap-4 items-center">
          <Link to="/" className="mono text-sm text-slate-300">/home</Link>
          <Link to="/projects" className="mono text-sm text-slate-300">/projects</Link>
          <Link to="/blog" className="mono text-sm text-slate-300">/notes</Link>
        </nav>
        <div className="flex items-center gap-3">
          <button aria-label="toggle theme" onClick={toggle} className="p-2 panel rounded">
            {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
          </button>
        </div>
      </header>

      <main className="px-6 pb-24">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/projects/:id" element={<ProjectsPage />} />
        </Routes>
      </main>

      <footer className="fixed bottom-4 left-1/2 -translate-x-1/2 text-xs text-slate-400">
        Built with a focus on speed, clarity, and maintainability — portfolio console.
      </footer>
    </div>
  )
}
