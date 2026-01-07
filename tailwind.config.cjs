module.exports = {
  content: [
    './index.html',
    './src/**/*.{ts,tsx,js,jsx}'
  ],
  theme: {
    extend: {
      colors: {
        console: '#0b0f14',
        accent: '#7ef9ff',
        glow: '#4ee1d7'
      },
      fontFamily: {
        mono: ['ui-monospace', 'SFMono-Regular', 'Menlo', 'monospace'],
        inter: ['Inter', 'ui-sans-serif', 'system-ui']
      },
      backgroundImage: {
        'grid-lines': "linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)"
      }
    }
  },
  plugins: []
}
