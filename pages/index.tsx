import Head from "next/head";
import Layout from '../components/layout';
import Link from "next/link";
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../lib/init-firebase";

function HomePage() {

    const [user, setUser] = useState(null);
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, setUser);
        return unsubscribe;
    }, [auth]);

    return (
        <Layout>
            <Head>
                <title>Home</title>
            </Head>
            <div>
                {user ? (
                    <>
                        <h1>登入成功！</h1>
                        <div>
                            歡迎：{user.displayName}
                        </div>
                        <div>
                            {user.email}
                        </div>
                    </>
                ) : (
                    <div>
                        <Link href="/signin">登入</Link>
                    </div>
                )}
            </div>
        </Layout>
    );
}

export default HomePage