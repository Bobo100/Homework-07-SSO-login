import { signOut } from "firebase/auth"
import Link from "next/link"
import { useRouter } from "next/router"
import { auth } from "../lib/init-firebase"
import { useEffect, useState } from "react"
import CryptoJS from 'crypto-js'
import { userDataState } from "./redux/state/stateType"
const RouterLink = () => {
    const router = useRouter()

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


    // 登出
    const handleLogout = () => {
        signOut(auth).then(() => {
            // Sign-out successful.
            console.log("Signed out successfully")
            // document.cookie = 'user=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
            // document.cookie = 'user=;expires=now;path=/';
            // router.push("/");
            window.location.href = "/";

        }).catch((error) => {
            // An error happened.
        });
    }

    return (
        <>
            <Link href="/" className={router.pathname === "/" ? "active" : ""}>回到首頁</Link>

            <div className="flex justify-end items-center flex-grow">

                {userData
                    && <>
                        {userData.displayName}
                    </>
                    && <>
                        {userData.email}
                    </>}
                {!userData &&
                    <Link href="/signin" className={router.pathname === "/signin" ? "active" : ""}>登入</Link>}
                <Link href="/signup" className={router.pathname === "/signup" ? "active" : ""}>註冊</Link>
                <button className="border border-title p-[10px] hover:bg-white" onClick={handleLogout}>登出</button>
            </div>
        </>
    )
}

export default RouterLink