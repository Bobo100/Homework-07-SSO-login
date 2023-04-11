import React, { useEffect, useState } from 'react';
import { onAuthStateChanged, signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../lib/init-firebase';
import Link from 'next/link';
import router from 'next/router';

const SignInComponents = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [user, setUser] = useState(null);
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, setUser);
        return unsubscribe;
    }, [auth]);

    const onLogin = (e) => {
        e.preventDefault();
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in
                const user = userCredential.user;        
                alert('登入成功！')
                router.push("/")
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorCode, errorMessage)
            });
    }

    if (user) router.push("/")

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