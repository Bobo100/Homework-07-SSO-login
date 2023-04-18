import React, { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../lib/init-firebase';
import Link from 'next/link';
import router from 'next/router';
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';

const SignInComponents_Password = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    // const onLogin = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    //     e.preventDefault();
    //     signInWithEmailAndPassword(auth, email, password)
    //         .then((userCredential) => {
    //             // Signed in                
    //             const user = userCredential.user;
    //             alert('登入成功！')
    //             router.push("/")
    //         })
    //         .catch((error) => {
    //             const errorCode = error.code;
    //             const errorMessage = error.message;
    //             alert('登入失敗！')
    //             console.log(errorCode, errorMessage)
    //         });
    // }

    const onLogin = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
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
                alert('登入失敗！')
                console.log(errorCode, errorMessage)
            });

    }

    return (
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
                        autoComplete='on'
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
    )
}

export default SignInComponents_Password