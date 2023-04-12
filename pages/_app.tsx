import { Provider } from 'react-redux';
import '../styles/global.scss'
import 'tailwindcss/tailwind.css'
import { store } from '../components/redux/store/store';
import { User, onAuthStateChanged } from 'firebase/auth';
import { useState, useEffect } from 'react';
import { auth } from '../lib/init-firebase';

interface AppProps {
  Component: React.ComponentType;
  pageProps: any;
}
function App({ Component, pageProps }: AppProps) {
  const [user, setUser] = useState<User | null>(null);
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, setUser);
    return unsubscribe;
  }, [auth]);

  return (
    <Provider store={store}>
      <Component {...pageProps} user={user} />
    </Provider>
  )
}

export default App