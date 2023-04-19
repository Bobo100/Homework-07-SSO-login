import React, { useState } from 'react';
import { updateEmail, updatePassword, updateProfile } from 'firebase/auth';
import { auth } from '../lib/init-firebase';
import router from 'next/router';

interface Props {
    name: string | null;
    mail: string;
}

const UpdateProfile = ({ name, mail }: Props) => {
    const [displayName, setDisplayName] = useState(name);
    const [email, setEmail] = useState(mail);
    const [password, setPassword] = useState('');

    const onDisplayNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setDisplayName(e.target.value);
    }

    const onEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
    }

    const onPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
    }

    const onUpdateProfile = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        if (auth.currentUser) {
            updateProfile(auth.currentUser, {
                displayName: displayName,
                // photoURL: "https://example.com/jane-q-user/profile.jpg"
            }).then(() => {
                // Profile updated!     
                router.push('/update');
                alert('修改成功');
            }).catch((error) => {
                // An error occurred
                // ...
            });
        }
    }

    const onUpdateEmail = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        if (auth.currentUser) {
            updateEmail(auth.currentUser, email).then(() => {
                // Email updated!
                // ...
                router.push('/signin');
                alert('修改成功，請重新登入');
            }).catch((error) => {
                // An error occurred
                // ...
            });
        }
    }

    const onUpdatePassword = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        if (auth.currentUser) {
            updatePassword(auth.currentUser, password).then(() => {
                // Password updated!
                // ...
                router.push('/signin');
                alert('修改成功');
            }).catch((error) => {
                // An error occurred
                // ...
                alert("密碼不符合規定");
            });
        }
    }

    return (
        <div>
            <h1 className='text-3xl'>修改個人資料！！！ </h1>
            <form>
                <div>
                    <label htmlFor="display-name">
                        DisplayName：
                    </label>
                    <input
                        type="text"
                        value={displayName || ''}
                        required
                        placeholder="Display Name"
                        onChange={onDisplayNameChange}
                        className='border border-black m-1 p-1'
                    />
                    <button onClick={onUpdateProfile} className='border border-black m-1 p-1'>修改</button>

                </div>

                <div>
                    <label htmlFor="email-address">
                        Email address：
                    </label>
                    <input
                        type="email"
                        value={email || ''}
                        required
                        placeholder="Email address"
                        onChange={onEmailChange}
                        className='border border-black m-1 p-1'
                    />
                    <button onClick={onUpdateEmail} className='border border-black m-1 p-1'>修改</button>

                </div>

                <div>
                    <label htmlFor="password">
                        Password：
                    </label>
                    <input
                        type="password"
                        value={password}
                        required
                        placeholder="Password"
                        onChange={onPasswordChange}
                        className='border border-black m-1 p-1'
                        autoComplete='off'
                    />
                    <button onClick={onUpdatePassword} className='border border-black m-1 p-1'>修改</button>
                </div>
            </form>



        </div>
    )
}

export default UpdateProfile