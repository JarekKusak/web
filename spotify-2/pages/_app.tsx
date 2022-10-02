import '../styles/globals.css'
import { SessionProvider } from "next-auth/react";
import type { AppProps } from 'next/app'
import { RecoilRoot } from 'recoil';

// kompletní inicializace a načítání stránek (komponent) celého projektu 
function MyApp({ Component, pageProps: {session, ...pageProps} }: AppProps) {
  return (
  // SP = Higher Order Component, komponenta umožňující uchování stavu přihlášení (případně odhlášení) po celou dobu procházení stránky
  // bez SP by nefungovala funkce useSession()
  <SessionProvider session={session}>
    <RecoilRoot>
      <Component {...pageProps} />
    </RecoilRoot>      
  </SessionProvider>
  )
}

export default MyApp
