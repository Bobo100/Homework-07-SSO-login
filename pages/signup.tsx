import React from 'react';
import Layout from '../components/layout';
import Head from 'next/head';
import SignUpComponents from '../components/SignUpComponents';

const Signup = () => {
    return (
        <Layout>
            <Head>
                <title>註冊</title>
            </Head>
            <div className='m-5'>
                <SignUpComponents />
            </div>
        </Layout>
    )
}

export default Signup