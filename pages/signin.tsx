import React, { useContext } from 'react';
import Layout from '../components/layout';
import Head from 'next/head';
import SignInComponents_Password from '../components/SignInComponents_Password';
import SignInComponents_Google from '../components/SignInComponents_Google';
import SignInComponents_Facebook from '../components/SignInComponents_Facebook';
import router from 'next/router';
import { AppContext } from '../components/useContext/authUseContext';
const SignIn = () => {
    const user = useContext(AppContext);

    if (user.user) {
        router.push("/")
    }

    return (
        <Layout>
            <Head>
                <title>登入</title>
            </Head>
            <div className='m-5'>
                <SignInComponents_Google />
                {/* <SignInComponents_Facebook /> */}
                <div>------------------或使用mail登入------------------</div>
                <SignInComponents_Password />
            </div>
        </Layout>
    )
}

export default SignIn