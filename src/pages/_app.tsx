import type { AppProps } from 'next/app'
import { Header } from '../components/Header';
import { AuthProvider } from '../contexts/tracksContext';
function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
        <Header />
        <Component {...pageProps} />
    </AuthProvider>
  )
}
export default MyApp
