import '../styles/globals.css'
import { TechnicalProvider } from '../components/TechnicalContext'
import Navbar from '../components/Navbar'
import { useEffect, useState } from 'react'

function MyApp({ Component, pageProps }) {
  const [hasMounted, setHasMounted] = useState(false)
  useEffect(()=> setHasMounted(true), [])

  return (
    <TechnicalProvider>
      <Navbar />
      <main className="min-h-screen pt-20">
        <Component {...pageProps} />
      </main>
    </TechnicalProvider>
  )
}
export default MyApp