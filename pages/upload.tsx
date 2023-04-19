import React, { useContext, useRef, useState } from 'react';
import Layout from '../components/layout';
import Head from 'next/head';
import { AppContext } from '../components/useContext/authUseContext';
import { DocumentData, collection, getDocs, addDoc, doc, setDoc, updateDoc, deleteDoc } from 'firebase/firestore';
import { auth, db } from '../lib/init-firebase';
import uuid from 'react-uuid';
const Upload = () => {

    const [selectDocId, setSelectDocId] = useState('');
    const [name, setName] = useState<string>('');
    const [age, setAge] = useState<number>(0);
    const [id, setId] = useState<string>('');
    const [data, setData] = useState<DocumentData[]>([]);


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

    // 取得Collection的資料
    const getCollectionData = async () => {
        if (!auth.currentUser) return;
        const collectionRef = collection(db, "Users");

        const collectionSnapshot = await getDocs(collectionRef);

        const collections = collectionSnapshot.docs.map((doc) => ({
            data: doc.data(),
            id: doc.id,
        }))

        setData(collections);
        // console.log(collections);
    }

    const handleChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value);
    }

    const handleChangeAge = (e: React.ChangeEvent<HTMLInputElement>) => {
        setAge(Number(e.target.value));
    }

    const handleChangeId = (e: React.ChangeEvent<HTMLInputElement>) => {
        setId(e.target.value);
    }


    // 新增Document到Collection
    const uploadDocumentWithRandomId = async () => {
        if (!auth.currentUser) return;
        const collectionRef = collection(db, "Users");
        await addDoc(collectionRef, {
            name: name,
            age: age,
        });

        // 重新取得資料
        getCollectionData();
    }

    // 新增Document到Collection，並自訂ID
    const uploadDocumentWithId = async () => {
        if (!auth.currentUser) return;
        const collectionRef = collection(db, "Users");
        const docRef = doc(collectionRef, id);
        const data = {
            name: name,
            age: age,
        }

        // 如果文件不存在，則會創建文件。如果文件已存在，則會覆蓋文件。
        await setDoc(docRef, data);

        // 重新取得資料
        getCollectionData();
    }

    // 更新Document

    const selectDIV = (id: string) => {
        setSelectDocId(id);
    }
    const updateDocument = async () => {
        if (!auth.currentUser) return;
        const collectionRef = collection(db, "Users");
        const docRef = doc(collectionRef, selectDocId);
        const data = {
            name: name,
            age: age,
        }

        // 如果文件不存在，則會有錯誤
        await updateDoc(docRef, data);

        // 重新取得資料
        getCollectionData();
    }

    // 刪除Document
    const deleteDocument = async (id: string) => {
        if (!auth.currentUser) return;
        console.log(id)
        const collectionRef = collection(db, "Users");
        const docRef = doc(collectionRef, id);
        await deleteDoc(docRef)

        // 重新取得資料
        getCollectionData();
    }

    return (
        <Layout>
            <Head>
                <title>上傳與下載測試(登入者才可以用)</title>
            </Head>
            <div className='m-5'>
                <button onClick={getCollectionData} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded my-3">取得Collection的資料</button>
                {data &&
                    <div className='flex'>
                        {data.map((item, index) => {
                            const backgroundColor = item.id === selectDocId ? 'red' : '';
                            return (
                                <div key={uuid()} className="border border-blue-500 p-3 my-4" onClick={() => selectDIV(item.id)} style={{ backgroundColor }}>
                                    <p>姓名：{item.data.name}</p>
                                    <p>年齡：{item.data.age}</p>
                                    <button onClick={() => deleteDocument(item.id)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded my-3">刪除</button>
                                </div>
                            )
                        })}
                    </div>
                }

                <div className="border border-blue-500 p-3 my-4">
                    <p>姓名：
                        <input className='border border-black p-3 my-4' type="text" value={name} onChange={handleChangeName} placeholder='請輸入姓名' />
                    </p>
                    <p>年齡：
                        <input className='border border-black p-3 my-4' type="number" value={age} onChange={handleChangeAge} placeholder='請輸入年齡' />
                    </p>
                </div>
                <button onClick={updateDocument} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded my-3">更新Document</button>

                <div className="border border-blue-500 p-3 my-4">
                    <p>姓名：
                        <input className='border border-black p-3 my-4' type="text" value={name} onChange={handleChangeName} placeholder='請輸入姓名' />
                    </p>
                    <p>年齡：
                        <input className='border border-black p-3 my-4' type="number" value={age} onChange={handleChangeAge} placeholder='請輸入年齡' />
                    </p>
                </div>
                <button onClick={uploadDocumentWithRandomId} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded my-3">新增一個隨機ID的Document到Collection</button>

                <div className="border border-blue-500 p-3 my-4">
                    <p>姓名：
                        <input className='border border-black p-3 my-4' type="text" value={name} onChange={handleChangeName} placeholder='請輸入姓名' />
                    </p>
                    <p>年齡：
                        <input className='border border-black p-3 my-4' type="number" value={age} onChange={handleChangeAge} placeholder='請輸入年齡' />
                    </p>
                    <p>自訂Document ID：
                        <input className='border border-black p-3 my-4' type="text" value={id} onChange={handleChangeId} placeholder='請輸入ID' />
                    </p>
                </div>

                <button onClick={uploadDocumentWithId} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded my-3">新增一個自訂ID的Document到Collection</button>
            </div>
        </Layout>
    )
}

export default Upload