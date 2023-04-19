import Link from "next/link"
import { useRouter } from "next/router"
import SignOutComponents from "./SignOutComponents"
import { useContext } from "react"
import { AppContext } from "../components/useContext/authUseContext"
const RouterLink = () => {
    const router = useRouter()

    const user = useContext(AppContext);

    if (!user.user) return (
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
                <Link href="/update" className={router.pathname === "/update" ? "active" : ""}>{user.user?.displayName} {user.user?.email}</Link>
                <Link href="/upload" className={router.pathname === "/upload" ? "active" : ""}>上傳</Link>
                <Link href="/signup" className={router.pathname === "/signup" ? "active" : ""}>註冊</Link>
                <SignOutComponents />
            </div>
        </>
    )
}

export default RouterLink