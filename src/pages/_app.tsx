import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Navbar from "@/components/NavBar";
import { Orbitron } from 'next/font/google'

const orbitron = Orbitron({
  subsets: ['latin'],
  variable: '--foant-orbitron', // optional, but useful for Tailwind
  display: 'swap',
})
export default function App({ Component, pageProps }: AppProps) {
  return (
    <main className={`${orbitron.variable} font-sans`}>
      <Navbar />
      <Component {...pageProps} />
    </main>
  )
}
