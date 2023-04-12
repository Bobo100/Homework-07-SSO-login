import { Provider } from 'react-redux';
import '../styles/global.scss'
import 'tailwindcss/tailwind.css'
import { AppProvider } from '../components/useContext/authUseContext';

interface AppProps {
  Component: React.ComponentType;
  pageProps: any;
}


function App({ Component, pageProps }: AppProps) {
  return (
    <AppProvider>
      <Component {...pageProps} />
    </AppProvider>
  )
}

export default App