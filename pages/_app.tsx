import '../styles/global.scss'
import 'tailwindcss/tailwind.css'

interface AppProps {
  Component: React.ComponentType;
  pageProps: any;
}
function App({ Component, pageProps }: AppProps) {
  return (
    <Component {...pageProps} />
  )
}

export default App