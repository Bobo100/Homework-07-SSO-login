import React, { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../lib/init-firebase';
import Link from 'next/link';
import router from 'next/router';

const SignUpComponents = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('');

    const onSubmit = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        await createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in
                const user = userCredential.user;
                alert('註冊成功！')
                router.push('/')
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                alert('註冊失敗！')
                console.log(errorCode, errorMessage);
            });
    }

    return (
        <div>
            <h1 className='text-3xl'> 註冊註冊！！！ </h1>
            <form>
                <div>
                    <label htmlFor="email-address">
                        Email address：
                    </label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        placeholder="Email address"
                        className='border border-black m-1 p-1'
                    />
                </div>

                <div>
                    <label htmlFor="password">
                        Password：
                    </label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        placeholder="Password"
                        className='border border-black m-1 p-1'
                        autoComplete='on'
                    />
                </div>

                <button
                    type="submit"
                    onClick={onSubmit}
                    className='border border-black rounded p-1'
                >
                    Sign up
                </button>

            </form>

            <p>
                Already have an account?{' '}
                <Link href="/signin" >
                    Sign in
                </Link>
            </p>
        </div>
    )
}

export default SignUpComponents