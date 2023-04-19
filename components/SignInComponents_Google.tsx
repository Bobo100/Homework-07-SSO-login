import React from 'react';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from '../lib/init-firebase';
import router from 'next/router';
import Image from 'next/image';
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';

const SignInComponents_Google = () => {
    const { executeRecaptcha } = useGoogleReCaptcha();

    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({ prompt: 'select_account' });
    provider.addScope('https://www.googleapis.com/auth/contacts.readonly');

    // const onLogin = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    //     e.preventDefault();
    //     signInWithPopup(auth, provider)
    //         .then((result) => {
    //             // This gives you a Google Access Token. You can use it to access the Google API.
    //             // const credential = GoogleAuthProvider.credentialFromResult(result);
    //             // if (credential) {
    //             //     // This gives you a Google Access Token. You can use it to access the Google API.
    //             //     const token = credential.accessToken;
    //             //     // The signed-in user info.
    //             //     const user = result.user;
    //             //     // IdP data available using getAdditionalUserInfo(result)
    //             //     // ...
    //             // }
    //             router.push("/")
    //             alert('登入成功！')
    //         }).catch((error) => {
    //             // Handle Errors here.
    //             const errorCode = error.code;
    //             const errorMessage = error.message;
    //             // The email of the user's account used.
    //             const email = error.customData.email;
    //             // The AuthCredential type that was used.
    //             const credential = GoogleAuthProvider.credentialFromError(error);
    //             // ...
    //         });
    //     // signInWithRedirect(auth, provider)
    // }


    const onLogin = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        e.preventDefault();
        if (!executeRecaptcha) {
            console.log("Execute recaptcha not yet available");
            return;
        }
        executeRecaptcha("login").then((gReCaptchaToken) => {
            // console.log("gReCaptchaToken", gReCaptchaToken)
            submitToCheck(gReCaptchaToken);
        });
    }

    const submitToCheck = async (gReCaptchaToken: string) => {
        fetch("/api/recaptcha", {
            method: "POST",
            headers: {
                Accept: "application/json, text/plain, */*",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                gRecaptchaToken: gReCaptchaToken,
            }),
        })
            .then((res) => res.json())
            .then((res) => {
                console.log(res, "response from backend");
                if (res?.status === "success") {
                    signInWithPopup(auth, provider)
                        .then((result) => {
                            router.push("/")
                            alert('登入成功！')
                        }).catch((error) => {
                            const errorCode = error.code;
                            const errorMessage = error.message;
                            // The email of the user's account used.
                            const email = error.customData.email;
                            // The AuthCredential type that was used.
                            const credential = GoogleAuthProvider.credentialFromError(error);
                        });
                } else {
                }
            });
    };

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