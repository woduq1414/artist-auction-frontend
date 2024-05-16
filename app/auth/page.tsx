// Register page

'use client'

import { useCategory } from '@/app/_store/useCategory';


import dynamic from 'next/dynamic';



import StarterKit from '@tiptap/starter-kit'
import React, { useEffect, useMemo, useRef, useState } from 'react';
import CustomEditor from '@/app/_components/CustomEditor';
import { CheckCircleIcon, PlusIcon, TrashIcon } from '@heroicons/react/24/solid';
import Link from 'next/link';
// import { HSSelect, HSSelect } from 'preline';


const AuthPage: React.FC = () => {


    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');



    useEffect(() => {



    }, [])

    const socialLoginList = [
        {
            title: '카카오로 시작하기',
            icon: '/images/social/kakao.png',
            color: 'bg-[#FAE100]',
            border: ''
        },
        {
            title: 'Google로 시작하기',
            icon: '/images/social/google.webp',
            color: 'bg-white',
            border: 'border border-gray-200'
        }
    ]






    // ...

    useEffect(() => {
        import('preline/preline').then((module) => {

            const { HSStaticMethods, HSSelect, HSOverlay } = module;
            // type HSSelect = import('preline/preline').HSSelect;



        });

    }, [])


    return (
        <main className="w-[100%]  mx-auto   flex flex-col justify-center items-center h-[calc(100vh-80px)]">
            <div className='h-[80px] flex flex-col justify-center items-center  '>
                <img src="/images/logo.png" alt="logo" className="h-[35px]" />
            </div>
            <div className="flex flex-col items-center justify-center  min-w-[500px] bg-slate-50 rounded-2xl px-4 pt-8 pb-3">
                <div className="flex flex-col items-center justify-center w-full ">
                    <h1 className="text-2xl font-bold">로그인 / 회원가입</h1>
                    <p className="text-sm text-gray-400">로그인하여 더 많은 기능을 이용하세요.</p>
                </div>
                <div className='flex flex-col w-full mt-8'>
                    <input
                        type="text"
                        id="inline-input-label-with-helper-text"
                        className="block w-full max-w-lg px-4 py-3 mb-1 border border-gray-200 rounded-lg text-md focus:border-primary focus:ring-primary disabled:opacity-50 disabled:pointer-events-none "
                        placeholder="이메일을 입력해주세요."
                        aria-describedby="hs-inline-input-helper-text"
                        onChange={(e) => setEmail(e.target.value)}
                    />

                    <input
                        type="text"
                        id="inline-input-label-with-helper-text"
                        className="block w-full max-w-lg px-4 py-3 mb-3 border border-gray-200 rouded-lg text-md focus:border-primary focus:ring-primary disabled:opacity-50 disabled:pointer-events-none "
                        placeholder="비밀번호를 입력해주세요."
                        aria-describedby="hs-inline-input-helper-text"
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    <button
                        type="button"
                        className="w-full max-w-lg px-4 py-3 mb-3 font-semibold text-white rounded-lg bg-primary text-md"
                    >
                        로그인
                    </button>

                    <div className='flex flex-col justify-between'>

                        <span className='text-center text-gray-700 underline cursor-pointer'>
                            계정 찾기
                        </span>
                    </div>
                </div>

                <hr className="w-full my-3 border border-gray-200" />

                <div className='flex flex-col w-full'>
                    {
                        socialLoginList.map((item, index) => {
                            return (
                                <button
                                    key={index}
                                    type="button"
                                    className={`w-full max-w-lg px-6 py-3 mb-2 font-semibold  rounded-lg  text-md flex flex-row
                                    justify-between items-center
                                    ${item.color} ${item.border}
                                    `}
                                >
                                    <img src={item.icon} alt="icon" className="w-5 h-5" />
                                    <span className='text-black'>{item.title}</span>
                                    <span className='w-5'></span>
                                </button>
                            )
                        })


                    }
                    <span className='mt-1 text-center text-gray-700 underline cursor-pointer'>
                        <Link href="/auth/new">
                            이메일로 회원 가입하기
                        </Link>
                    </span>
                </div>

            </div>
        </main>
    );
};

export default AuthPage;