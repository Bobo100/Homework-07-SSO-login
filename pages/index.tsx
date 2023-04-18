import Head from "next/head";
import Layout from '../components/layout';
import Link from "next/link";
import { useContext } from "react";
import { AppContext } from "../components/useContext/authUseContext";

function HomePage() {
    const user = useContext(AppContext);
    
    if (!user.user) return (
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
                    歡迎：{user.user?.displayName}
                </div>
                <div>
                    {user.user?.email}
                </div>
            </div>
        </Layout>
    );
}

export default HomePage