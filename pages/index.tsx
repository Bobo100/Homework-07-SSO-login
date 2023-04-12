import Head from "next/head";
import Layout from '../components/layout';
import Link from "next/link";
import { User } from "firebase/auth";

function HomePage(props: { user: User }) {
    if (!props.user) return (
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
                    歡迎：{props.user.displayName}
                </div>
                <div>
                    {props.user.email}
                </div>
            </div>
        </Layout>
    );
}

export default HomePage