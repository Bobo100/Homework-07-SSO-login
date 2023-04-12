import Link from "next/link"
import { useRouter } from "next/router"
import { auth } from "../lib/init-firebase"
import SignOutComponents from "./SignOutComponents"
import { User, onAuthStateChanged } from "firebase/auth"
import { useState, useEffect } from "react"
const RouterLink = () => {
    const router = useRouter()
    const [user, setUser] = useState<User | null>(null);
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, setUser);
        return unsubscribe;
    }, [auth]);
    if (!user) return (
        <>
            <Link href="/" className={router.pathname === "/" ? "active" : ""}>回到首頁</Link>
            <div className="flex justify-end items-center flex-grow">
                <Link href="/signin" className={router.pathname === "/signin" ? "active" : ""}>登入</Link>
                <Link href="/signup" className={router.pathname === "/signup" ? "active" : ""}>註冊</Link>
            </div>
        </>
    )

    return (
        <>
            <Link href="/" className={router.pathname === "/" ? "active" : ""}>回到首頁</Link>
            <div className="flex justify-end items-center flex-grow">
                <Link href="/update" className={router.pathname === "/update" ? "active" : ""}>{user.displayName} {user.email}</Link>
                <Link href="/signup" className={router.pathname === "/signup" ? "active" : ""}>註冊</Link>
                <SignOutComponents />
            </div>
        </>
    )
}

export default RouterLink