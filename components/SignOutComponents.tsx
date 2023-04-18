import { signOut } from "firebase/auth"
import { useRouter } from "next/router"
import { auth } from "../lib/init-firebase"
const SignOutComponents = () => {
    const router = useRouter()
    // 登出
    const handleLogout = () => {
        signOut(auth).then(() => {
            // Sign-out successful.
            alert("登出成功！")
            router.push("/");

        }).catch((error) => {
            // An error happened.
        });
    }

    return (
        <button className="border border-title p-[10px] hover:bg-white" onClick={handleLogout}>登出</button>
    )
}

export default SignOutComponents