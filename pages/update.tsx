import React, { useContext } from 'react';
import Layout from '../components/layout';
import Head from 'next/head';
import UpdateProfile from '../components/UpdateProfile';
import { AppContext } from '../components/useContext/authUseContext';
const Update = () => {

    const user = useContext(AppContext);
    if (!user.user) return (
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
                <UpdateProfile name={user.user?.displayName || ''} mail={user.user?.email || ''} />
            </div>
        </Layout>
    )
}

export default Update