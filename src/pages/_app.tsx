import type { AppProps } from 'next/app'
import { Header } from '../components/Header';
import { AuthProvider } from '../contexts/tracksContext';
import '../styles/global.scss'
function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
        <Header />
        <Component {...pageProps} />
    </AuthProvider>
  )
}
export default MyApp
