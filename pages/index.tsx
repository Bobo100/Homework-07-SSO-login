import Head from "next/head";
import Layout from '../components/layout';
import Link from "next/link";
import { useEffect, useState } from "react";
import CryptoJS from 'crypto-js';
import { userDataState } from "../components/redux/state/stateType";

function HomePage() {

    const [userData, setUserData] = useState<userDataState>(null);

    useEffect(() => {
        const cookie = document.cookie.split(';').find(row => row.startsWith('user='))
        if (!cookie) {
            console.log("none cookie")
            setUserData(null);
            return;
        }
        const cookieValue = cookie.split('=')[1];
        if (!cookieValue) {
            console.log("none cookieValue")
            setUserData(null);
            return;
        }
        const bytes = CryptoJS.AES.decrypt(cookieValue, process.env.messagingSenderId);

        const userData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
        setUserData(userData);
    }, [])

    console.log(userData)

    if (!userData) {
        return (
            <Layout>
                <Head>
                    <title>Home</title>
                </Head>
                <div>
                    <Link href="/signin">登入</Link>
                </div>
            </Layout>
        )
    }


    return (
        <Layout>
            <Head>
                <title>Home</title>
            </Head>
            <div>
                <div>
                    歡迎：{userData.displayName}
                </div>
                <div>
                    {userData.email}
                </div>
            </div>
        </Layout>
    )
}

export default HomePage