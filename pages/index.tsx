import Head from "next/head";
import Layout from '../components/layout';
import Link from "next/link";
import { auth } from "../lib/init-firebase";
import { useState, useEffect } from "react";
import { User, onAuthStateChanged } from "firebase/auth";

function HomePage() {
    const [user, setUser] = useState<User | null>(null);
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, setUser);
        /*
       unsubscribe 函数的主要作用是取消 Firebase Authentication 的訂閱，
       當您的應用程序不再需要監聽身份驗證狀態變化時，請務必調用它，以便及時釋放資源，避免不必要的開銷。
       */
        return unsubscribe;
    }, [auth]);

    if (!user) return (
        <Layout>
            <Head>
                <title>Home</title>
            </Head>
            <div className='m-5'>
                <div>
                    <Link href="/signin">登入</Link>
                </div>
            </div>
        </Layout>
    )

    return (
        <Layout>
            <Head>
                <title>Home</title>
            </Head>
            <div className='m-5'>
                <h1>登入成功！</h1>
                <div>
                    歡迎：{user.displayName}
                </div>
                <div>
                    {user.email}
                </div>
            </div>
        </Layout>
    );
}

export default HomePage