import '../styles/global.scss'
import 'tailwindcss/tailwind.css'
import { AppProvider } from '../components/useContext/authUseContext';
import { useEffect } from 'react';
import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3';

interface AppProps {
  Component: React.ComponentType;
  pageProps: any;
}


function App({ Component, pageProps }: AppProps) {
  return (
    <GoogleReCaptchaProvider reCaptchaKey={process.env.reCATPCHA as string}>
      <AppProvider>
        <Component {...pageProps} />
      </AppProvider>
    </GoogleReCaptchaProvider>
  )
}

export default App