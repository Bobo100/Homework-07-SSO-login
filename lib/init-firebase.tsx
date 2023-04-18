// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: process.env.apiKey,
    authDomain: process.env.authDomain,
    projectId: process.env.projectId,
    storageBucket: process.env.storageBucket,
    messagingSenderId: process.env.messagingSenderId,
    appId: process.env.appId,
    measurementId: process.env.measurementId
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// 官方做法　不行　因為我們使用的是SSR
// Pass your reCAPTCHA v3 site key (public key) to activate(). Make sure this
// key is the counterpart to the secret key you set in the Firebase console.
// const appCheck = initializeAppCheck(app, {
//     provider: new ReCaptchaV3Provider(process.env.reCATPCHA as string),

//     // Optional argument. If true, the SDK automatically refreshes App Check
//     // tokens as needed.
//     isTokenAutoRefreshEnabled: true
// });

// 解法來源：https://github.com/vercel/next.js/discussions/35689 但也沒成功
// if (typeof window !== "undefined") {
// if (typeof window !== "undefined") {
//     import("firebase/app-check").then((firebaseAppCheck) => {
//         firebaseAppCheck.initializeAppCheck(app, {
//             provider: new firebaseAppCheck.ReCaptchaV3Provider(process.env.reCATPCHA as string),
//             isTokenAutoRefreshEnabled: true,
//         });
//     });
// }

export const auth = getAuth(app);
