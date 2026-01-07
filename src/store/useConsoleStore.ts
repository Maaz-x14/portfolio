import create from 'zustand'

type Theme = 'dark' | 'light'

interface ConsoleState {
  theme: Theme
  setTheme: (t: Theme) => void
  toggleTheme: () => void
  consoleOpen: boolean
  setConsoleOpen: (v: boolean) => void
}

export const useConsoleStore = create<ConsoleState>((set) => ({
  theme: (localStorage.getItem('theme') as Theme) || 'dark',
  setTheme: (t) => {
    localStorage.setItem('theme', t)
    set({ theme: t })
  },
  toggleTheme: () => set((s) => {
    const next = s.theme === 'dark' ? 'light' : 'dark'
    localStorage.setItem('theme', next)
    return { theme: next }
  }),
  consoleOpen: true,
  setConsoleOpen: (v) => set({ consoleOpen: v })
}))
