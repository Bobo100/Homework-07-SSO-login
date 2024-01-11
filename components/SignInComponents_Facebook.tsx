import React from 'react';
import { FacebookAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from '../lib/init-firebase';
import router from 'next/router';
import Image from 'next/image';
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';

const SignInComponents_Facebook = () => {
    const { executeRecaptcha } = useGoogleReCaptcha();

    //     // 
    const provider = new FacebookAuthProvider();
    // provider.setCustomParameters({ prompt: 'select_account' });
    provider.addScope('email');
    // provider.addScope('https://www.googleapis.com/auth/contacts.readonly');

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
                const credential = FacebookAuthProvider.credentialFromError(error);
            });
        // if (!executeRecaptcha) {
        //     console.log("Execute recaptcha not yet available");
        //     return;
        // }
        // executeRecaptcha("login").then((gReCaptchaToken) => {
        //     // console.log("gReCaptchaToken", gReCaptchaToken)
        //     submitToCheck(gReCaptchaToken);
        // });
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
                            const credential = FacebookAuthProvider.credentialFromError(error);
                        });
                } else {
                }
            });
    };

    return (
        <div className='bg-[#3F7EE8] flex text-white items-center mt-1'
            onClick={onLogin}
        >
            <Image src="/images/Facebook.jpg" alt="Facebook" width={40} height={40} className='bg-white border border-[#3F7EE8]' loading='lazy' />
            <div className='w-full p-1'>Sign up with Facebook</div>
        </div>
    )
}

export default SignInComponents_Facebook