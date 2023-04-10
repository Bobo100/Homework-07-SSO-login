import React from 'react';
import Layout from '../components/layout';
import Head from 'next/head';
import SignInComponents from '../components/SignInComponents';
const Login = () => {
    return (
        <Layout>
            <Head>
                <title>登入</title>
            </Head>
            <div>
                <SignInComponents />
            </div>
        </Layout>
    )
}

export default Login