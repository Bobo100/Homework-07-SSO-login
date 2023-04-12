import React, { useEffect, useState } from 'react';
import { GoogleAuthProvider, User, onAuthStateChanged, signInWithPopup, signInWithRedirect } from 'firebase/auth';
import { auth } from '../lib/init-firebase';
import router from 'next/router';
import Image from 'next/image';

const SignInComponents_Google = () => {
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({ prompt: 'select_account' });
    provider.addScope('https://www.googleapis.com/auth/contacts.readonly');
    const onLogin = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        e.preventDefault();
        signInWithPopup(auth, provider)
            .then((result) => {
                // This gives you a Google Access Token. You can use it to access the Google API.
                // const credential = GoogleAuthProvider.credentialFromResult(result);
                // if (credential) {
                //     // This gives you a Google Access Token. You can use it to access the Google API.
                //     const token = credential.accessToken;
                //     // The signed-in user info.
                //     const user = result.user;
                //     // IdP data available using getAdditionalUserInfo(result)
                //     // ...
                // }
                alert('登入成功！')
                router.push("/")
            }).catch((error) => {
                // Handle Errors here.
                const errorCode = error.code;
                const errorMessage = error.message;
                // The email of the user's account used.
                const email = error.customData.email;
                // The AuthCredential type that was used.
                const credential = GoogleAuthProvider.credentialFromError(error);
                // ...
            });
        // signInWithRedirect(auth, provider)
    }

    return (
        <div className='bg-[#3F7EE8] flex text-white items-center'
            onClick={onLogin}
        >
            <Image src="/images/google.png" alt="google" width={40} height={40} className='bg-white border border-[#3F7EE8]' loading='lazy' />
            <div className='w-full p-1'>Sign up with Google</div>
        </div>
    )
}

export default SignInComponents_Google