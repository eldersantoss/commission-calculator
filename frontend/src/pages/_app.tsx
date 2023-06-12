import { AppProvider } from '@/contexts/AppContext'
import { SalesDataProvider } from '@/contexts/SalesDataContext'
import '@/styles/globals.css'
import type { AppProps } from 'next/app'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AppProvider>
      <SalesDataProvider>
        <Component {...pageProps} />
      </SalesDataProvider>
    </AppProvider>
  )
}
