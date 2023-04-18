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
      // reCaptchaKey={process.env.NEXT_PUBLIC_reCATPCHA as string}
      reCaptchaKey='6LevwZclAAAAADEGTGon6r5l8JbJI0NgexdEKQZQ'
      scriptProps={{
        async: false,
        defer: false,
        appendTo: "head",
        nonce: undefined,
      }
      }
    >
      <AppProvider>
        <Component {...pageProps} />
      </AppProvider>
    </GoogleReCaptchaProvider >
  )
}

export default App