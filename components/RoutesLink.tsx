import { User, onAuthStateChanged, signOut } from "firebase/auth"
import Link from "next/link"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { auth } from "../lib/init-firebase"
import SignOutComponents from "./SignOutComponents"
const RouterLink = () => {
    const router = useRouter()
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, setUser);
        return unsubscribe;
    }, [auth]);

    return (
        <>
            <Link href="/" className={router.pathname === "/" ? "active" : ""}>回到首頁</Link>

            <div className="flex justify-end items-center flex-grow">

                {user && <> {user.displayName} {user.email} </>}
                {!user &&
                    <Link href="/signin" className={router.pathname === "/signin" ? "active" : ""}>登入</Link>}
                <Link href="/signup" className={router.pathname === "/signup" ? "active" : ""}>註冊</Link>
                <SignOutComponents />
            </div>
        </>
    )
}

export default RouterLink