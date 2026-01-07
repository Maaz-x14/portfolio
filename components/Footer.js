export default function Footer(){
  return (
    <footer className="mt-20 py-8 text-center text-sm text-[var(--muted)]">
      <div className="max-content px-6">
        <div>© {new Date().getFullYear()} Maaz Ahmad — NUST SE • Status: <strong>Currently Building in Islamabad</strong></div>
      </div>
    </footer>
  )
}
