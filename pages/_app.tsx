import '../styles/global.scss'
import 'tailwindcss/tailwind.css'
import { AppProvider } from '../components/useContext/authUseContext';
import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3';

interface AppProps {
  Component: React.ComponentType;
  pageProps: any;
}

function App({ Component, pageProps }: AppProps) {
  return (
    <GoogleReCaptchaProvider
      reCaptchaKey={process.env.NEXT_PUBLIC_RECAPTCHA_SITEKEY as string}
      scriptProps={{
        async: false,
        defer: false,
        appendTo: "head",
        nonce: undefined,
      }}
    >
      <AppProvider>
        <Component {...pageProps} />
      </AppProvider>
    </GoogleReCaptchaProvider >
  )
}

export default App