import React, { useEffect, useState } from 'react';
import Layout from '../components/layout';
import Head from 'next/head';
import UpdateProfile from '../components/UpdateProfile';
import { auth } from '../lib/init-firebase';
import { User, onAuthStateChanged } from 'firebase/auth';
import { setUser } from '../components/redux/slice/userDataSlice';
const Update = () => {

    const [user, setUser] = useState<User | null>(null);
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, setUser);
        return unsubscribe;
    }, [auth]);

    if (!user) return (
        <Layout>
            <Head>
                <title>修改資料</title>
            </Head>
            <div className='m-5'>
                <h1>請先登入</h1>
            </div>
        </Layout>
    )


    return (
        <Layout>
            <Head>
                <title>修改資料</title>
            </Head>
            <div className='m-5'>
                <UpdateProfile name={user.displayName} mail={user.email || ''} />
            </div>
        </Layout>
    )
}

export default Update