import React, { useEffect, useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../lib/init-firebase';
import Link from 'next/link';
import router from 'next/router';
import CryptoJS from 'crypto-js';
import { userDataState } from './redux/state/stateType';

const SignInComponents = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');


    const [userData, setUserData] = useState<userDataState>(null);
    useEffect(() => {
        const cookie = document.cookie.split(';').find(row => row.startsWith('user='))
        if (!cookie) {
            setUserData(null);
            return;
        }
        const cookieValue = cookie.split('=')[1];
        if (!cookieValue) {
            setUserData(null);
            return;
        }
        const bytes = CryptoJS.AES.decrypt(cookieValue, process.env.messagingSenderId);

        const userData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
        setUserData(userData);
    }, [])

    const onLogin = (e) => {
        e.preventDefault();
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in
                // const user = userCredential.user;
                // console.log(user)
                // const displayName = user.displayName;
                // const email = user.email;                

                // const userData = {
                //     displayName,
                //     email
                // }
                // const ciphertext = CryptoJS.AES.encrypt(JSON.stringify(userData), process.env.messagingSenderId).toString();
                // document.cookie = `user=${ciphertext}`;
                router.push("/")
                console.log("sign in success");
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorCode, errorMessage)
            });
    }

    if (userData) router.push("/")

    return (
        <main >
            <section>
                <div>
                    <h1 className='text-3xl'> 登入登入 </h1>

                    <form>
                        <div>
                            <label htmlFor="email-address">
                                Email address：
                            </label>
                            <input
                                id="email-address"
                                name="email"
                                type="email"
                                required
                                placeholder="Email address"
                                onChange={(e) => setEmail(e.target.value)}
                                className='border border-black m-1 p-1'
                            />
                        </div>

                        <div>
                            <label htmlFor="password">
                                Password：
                            </label>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                required
                                placeholder="Password"
                                onChange={(e) => setPassword(e.target.value)}
                                className='border border-black m-1 p-1'
                            />
                        </div>

                        <div>
                            <button
                                onClick={onLogin}
                                className='border border-black rounded p-1'
                            >
                                Login
                            </button>
                        </div>
                    </form>

                    <p>
                        No account yet? {' '}
                        <Link href="/signup">
                            Sign up
                        </Link>
                    </p>

                </div>
            </section>
        </main>
    )
}

export default SignInComponents

function userSelector(arg0: (state: any) => any) {
    throw new Error('Function not implemented.');
}
