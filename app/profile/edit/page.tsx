// Register page

'use client'

import { useCategory } from '@/app/_store/useCategory';
import JoditEditor from 'jodit-react';

import dynamic from 'next/dynamic';



import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import CustomEditor from '@/app/_components/CustomEditor';
import { CheckCircleIcon, PlusIcon, TrashIcon } from '@heroicons/react/24/solid';
// import { HSSelect, HSSelect } from 'preline';
import Cropper, { ReactCropperElement } from "react-cropper";
import "cropperjs/dist/cropper.css";
import { HSOverlay, ICollectionItem, } from 'preline';

import { Cookies } from 'react-cookie';
import { unescape } from 'lodash';
import { toast } from 'react-toastify';
import Config from '@/config/config.export';
import _debounce from 'lodash/debounce';
import errorBuilder from '@/app/_common/errorBuilder';
// import  { HSStepper } from 'preline';


const EditProfilePage: React.FC = () => {

    const [step, setStep] = useState(3);

    const stepList = [
        "약관 동의",
        "사용자 유형 선택",
        "기본 정보 입력",
    ];



    const initialStep = 1;



    const [selectedUserType, setSelectedUserType] = useState<any>(null);


    const [name, setName] = useState<string>('');
    const [nickname, setNickname] = useState<string>('');
    const [nicknameError, setNicknameError] = useState<any>('');
    const [email, setEmail] = useState<string>('');


    const [password, setPassword] = useState<any>(null);

    const [passwordError, setPasswordError] = useState<any>('');






    const [title, setTitle] = useState<string>('');



    const [description, setDescription] = useState<string>('');
    const [price, setPrice] = useState<number>(0);

    const [endDate, setEndDate] = useState<string>('');

    const [mainImageList, setMainImageList] = useState<any[]>([]);
    const [tempMainImage, setTempMainImage] = useState<string>('');
    const [exampleImageList, setExampleImageList] = useState<any[]>([]);

    const cropperRef = useRef<ReactCropperElement>(null);
    const [cropperModalInstance, setCropperModalInstance] = useState<any>(null);

    const cropperModalOpenRef = useRef<any>(null);


    let thirdStepperContentRef = useRef<any>(null);

    const cookies = new Cookies();
    const socialLoginInfo = cookies.get('socialLoginInfo',)



    const [socialLoginType, setSocialLoginType] = useState<string>('password');
    const [socialLoginId, setSocialLoginId] = useState<string>('');

    let submitButtonRef = useRef<any>(null);











    const debounceNicknameFn = useCallback(_debounce(async (nickname) => {
        // check if valid email with reg

        if (nickname === '') {

            setNicknameError(undefined);
            return;
        }
        let byteLength = 0;

        for (let i = 0; i < nickname.length; i++) {
            if (escape(nickname.charAt(i)).length > 4) {
                byteLength += 2;
            } else {
                byteLength++;
            }
        }

        const nicknameReg = /^[a-zA-Z0-9가-힣_]+$/;


        if (byteLength > 16 || !nicknameReg.test(nickname)) {
            setNicknameError({
                type: 'error',
                message: '16바이트 이하의 한글, 영문, 숫자, 언더바(_)만 사용 가능합니다. (현재 ' + byteLength + '바이트)'
            });
            return;
        } else {
            let res = await fetch(Config().baseUrl + '/artist/check-nickname?nickname=' + nickname, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },

            })

            if (res.status === 200) {
                setNicknameError({
                    type: 'good',
                    message: '사용할 수 있는 닉네임입니다. (현재 ' + byteLength + '바이트)'
                });
            } else {
                setNicknameError({
                    type: 'error',
                    message: '이미 사용중인 닉네임입니다. 다른 닉네임을 입력해주세요.'
                });
            }
        }







    }, 1000), []);
    function handleChangeNickname(e: any) {
        setNickname(e.target.value);
        // byte check

        let byteLength = 0;
        let nickname = e.target.value;
        for (let i = 0; i < nickname.length; i++) {
            if (escape(nickname.charAt(i)).length > 4) {
                byteLength += 2;
            } else {
                byteLength++;
            }
        }


        if (byteLength > 16) {
            setNicknameError({
                type: 'error',
                message: '16바이트 이하의 한글, 영문, 숫자, 언더바(_)만 사용 가능합니다. (현재 ' + byteLength + '바이트)'
            });
            return;
        }


        debounceNicknameFn(e.target.value);
    }




    return (
        <main className="w-[80%]  mx-auto   flex flex-col justify-center items-center">
            {/* {step} */}
            <div className='h-[80px] flex flex-col justify-center items-center  '>
                <img src="/images/logo.png" alt="logo" className="h-[35px]" />
            </div>
            <div className="w-[100%] rounded-xl  h-full">
                <div className='flex flex-col h-full mx-5 my-5'>
                    {/* Stepper */}
                    <div id="stepper" className='flex flex-row h-[calc(100vh-120px)] bg-slate-50 '>
                        {/* Stepper Nav */}

                        {/* End Stepper Nav */}
                        {/* Stepper Content */}

                        <div className='bg-slate-100 w-[250px] flex-shrink-0'>

                        </div>

                        <div className="flex flex-col flex-grow mt-2 overflow-y-auto " ref={thirdStepperContentRef}>


                            {/* First Contnet */}

                            {/* End First Contnet */}
                            {/* First Contnet */}
                            <div
                                className={`${step === 3 ? 'block' : 'hidden'}`}
                            >
                                <div className=" max-w-[90%] mx-auto px-5 py-8 space-y-2 border-dashed rounded-xl flex flex-col gap-6
                                justify-center items-center
                                "


                                >

                                    <div className={`flex flex-col  max-w-xl w-full gap-2
                                    
                                        `}>
                                        <label
                                            htmlFor="inline-input-label-with-helper-text"
                                            className="block text-lg font-semibold "
                                        >
                                            이름
                                        </label>
                                        <input
                                            type="text"
                                            id="inline-input-label-with-helper-text"
                                            className="block w-full max-w-xl px-4 py-3 border border-gray-200 rounded-lg text-md focus:border-primary focus:ring-primary disabled:opacity-50 disabled:pointer-events-none "
                                            placeholder={selectedUserType == 'artist' ? '본인 이름을 입력해주세요.' : '회사명 또는 의뢰자명을 입력해주세요.'
                                            }
                                            aria-describedby="hs-inline-input-helper-text"
                                            value={name}
                                            disabled={true}
                                        />

                                    </div>


                                    <div className='flex flex-col w-full max-w-xl gap-2'>
                                        <label
                                            htmlFor="inline-input-label-with-helper-text"
                                            className="block text-lg font-semibold "
                                        >
                                            이메일
                                        </label>
                                        <input
                                            type="text"
                                            id="inline-input-label-with-helper-text"
                                            className="block w-full max-w-xl px-4 py-3 border border-gray-200 rounded-lg text-md focus:border-primary focus:ring-primary disabled:opacity-50 disabled:pointer-events-none "
                                            placeholder="이메일을 입력해주세요."
                                            aria-describedby="hs-inline-input-helper-text"
                                            value={email}
                                            disabled={true}

                                        />

                                    </div>
                                    {
                                        socialLoginType === 'password' &&
                                        <div className='flex flex-col w-full max-w-xl gap-2'>
                                            <label
                                                htmlFor="inline-input-label-with-helper-text"
                                                className="block text-lg font-semibold "
                                            >
                                                비밀번호
                                            </label>
                                            <input
                                                type="password"
                                                id="inline-input-label-with-helper-text"
                                                className="block w-full max-w-xl px-4 py-3 border border-gray-200 rounded-lg text-md focus:border-primary focus:ring-primary disabled:opacity-50 disabled:pointer-events-none "
                                                placeholder="비밀번호를 입력해주세요."
                                                aria-describedby="hs-inline-input-helper-text"
                                                value={password}
                                                onChange={(e) => {
                                                    setPassword(e.target.value);
                                                    if (e.target.value === '') {
                                                        setPasswordError(undefined);
                                                        return;
                                                    }
                                                    // check if valid password(8-20, at least one number, one alphabet, one special character)

                                                    const passwordReg = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,20}$/;

                                                    if (!passwordReg.test(e.target.value)) {
                                                        setPasswordError({
                                                            type: 'error',
                                                            message: `비밀번호는 8~20자 사이로, 영문, 숫자, 특수문자가 포함되어야 합니다. (${e.target.value.length} / 20)`
                                                        });
                                                        return;
                                                    } else {
                                                        setPasswordError({
                                                            type: 'good',
                                                            message: '사용할 수 있는 비밀번호 입니다.'

                                                        });

                                                    }

                                                }}
                                            />
                                            {
                                                errorBuilder(passwordError)
                                            }
                                        </div>
                                    }



                                    <div className='flex flex-col w-full max-w-xl gap-2'>
                                        <label
                                            htmlFor="inline-input-label-with-helper-text"
                                            className="block text-lg font-semibold "
                                        >
                                            닉네임
                                        </label>
                                        <input
                                            type="text"
                                            id="inline-input-label-with-helper-text"
                                            className="block w-full max-w-xl px-4 py-3 border border-gray-200 rounded-lg text-md focus:border-primary focus:ring-primary disabled:opacity-50 disabled:pointer-events-none "
                                            placeholder="다른 이용자들에게 보일 이름을 입력해주세요."
                                            aria-describedby="hs-inline-input-helper-text"
                                            onChange={handleChangeNickname}
                                            value={nickname}
                                        />

                                        {
                                            errorBuilder(nicknameError)
                                        }

                                    </div>




                                </div>
                            </div>

                            {/* End First Contnet */}
                            {/* Final Contnet */}

                            {/* End Final Contnet */}
                            {/* Button Group */}

                            {/* End Button Group */}
                            <div className="flex items-center justify-end flex-shrink-0 h-[3rem] mt-5 gap-x-2 mx-5 my-5">

                                <button
                                    type="button"
                                    className={`inline-flex items-center px-3 py-2 text-sm font-semibold text-white border border-transparent rounded-lg bg-primary gap-x-1 hover:bg-primary disabled:opacity-50 disabled:pointer-events-none
                              
                                `}
                                    ref={submitButtonRef}


                                    onClick={
                                        async (e) => {

                                            if (nicknameError && nicknameError.type === 'error') {
                                                toast.error('닉네임을 확인해주세요.', {
                                                    position: "top-right",
                                                    autoClose: 3000,
                                                    hideProgressBar: false,
                                                    closeOnClick: true,
                                                    pauseOnHover: true,
                                                    draggable: true,
                                                    progress: undefined,
                                                    theme: "light",

                                                });
                                                return;
                                            }

                                            if (passwordError && passwordError.type === 'error') {
                                                toast.error('비밀번호를 확인해주세요.', {
                                                    position: "top-right",
                                                    autoClose: 3000,
                                                    hideProgressBar: false,
                                                    closeOnClick: true,
                                                    pauseOnHover: true,
                                                    draggable: true,
                                                    progress: undefined,
                                                    theme: "light",

                                                });
                                                return;
                                            }

                                            // e.preventDefault();
                                            if (selectedUserType === 'artist') {
                                                if (nickname === '' || (
                                                    socialLoginType === 'password' && password === ''

                                                )) {
                                                    toast.error('입력하지 않은 정보가 있습니다.', {
                                                        position: "top-right",
                                                        autoClose: 3000,
                                                        hideProgressBar: false,
                                                        closeOnClick: true,
                                                        pauseOnHover: true,
                                                        draggable: true,
                                                        progress: undefined,
                                                        theme: "light",

                                                    });
                                                    return;
                                                }
                                            } else {
                                                if (email === '' || nickname === '' || name == '' || (
                                                    socialLoginType === 'password' && password === ''

                                                )) {
                                                    toast.error('입력하지 않은 정보가 있습니다.', {
                                                        position: "top-right",
                                                        autoClose: 3000,
                                                        hideProgressBar: false,
                                                        closeOnClick: true,
                                                        pauseOnHover: true,
                                                        draggable: true,
                                                        progress: undefined,
                                                        theme: "light",

                                                    });
                                                    return;
                                                }
                                            }


                                            submitButtonRef.current.disabled = true;

                                            let res;

                                            if (selectedUserType === 'artist') {
                                                res = await fetch(Config().baseUrl + '/auth/artist', {
                                                    method: 'PUT',
                                                    headers: {
                                                        'Content-Type': 'application/json',
                                                        'Accept': 'application/json',
                                                    },
                                                    body: JSON.stringify({

                                                        'password': password,

                                                        'nickname': nickname,

                                                    })
                                                })

                                            } else {
                                                res = await fetch(Config().baseUrl + '/auth/company', {
                                                    method: 'PUT',
                                                    headers: {
                                                        'Content-Type': 'application/json',
                                                        'Accept': 'application/json',
                                                    },
                                                    body: JSON.stringify({
                                                        'password': password,

                                                        'nickname': nickname,

                                                    })
                                                })
                                            }



                                            console.log(res);

                                            if (res.status === 201) {
                                                let data = await res.json()
                                                let accessToken = data.data.accessToken;
                                                const cookies = new Cookies();
                                                cookies.set('accessToken', accessToken, {
                                                    path: '/',
                                                    domain: Config().cookieDomain,
                                                });

                                                window.location.href = '/';

                                            } else {
                                                submitButtonRef.current.disabled = false;
                                                toast.error('회원가입에 실패했습니다.', {
                                                    position: "top-right",
                                                    autoClose: 3000,
                                                    hideProgressBar: false,
                                                    closeOnClick: true,
                                                    pauseOnHover: true,
                                                    draggable: true,
                                                    progress: undefined,
                                                    theme: "light",

                                                });

                                            }
                                        }
                                    }
                                >
                                    저장
                                </button>

                            </div>
                        </div>

                        {/* End Stepper Content */}
                    </div>
                    {/* End Stepper */}
                </div>

            </div>
            <div
                id="cropperModal"
                className="hs-overlay hidden mx-auto w-[80%] h-full fixed top-[10%] start-[10%] z-[80] overflow-x-hidden overflow-y-auto pointer-events-none"
            >
                <div className="m-3 mt-0 transition-all ease-out opacity-0 hs-overlay-open:mt-7 hs-overlay-open:opacity-100 hs-overlay-open:duration-500 lg:max-w-4xl lg:w-full lg:mx-auto">
                    <div className="flex flex-col bg-white border shadow-sm pointer-events-auto rounded-xl dark:bg-neutral-800 dark:border-neutral-700 dark:shadow-neutral-700/70">
                        <div className="flex items-center justify-between px-4 py-3 border-b dark:border-neutral-700">
                            <h3 className="font-bold text-gray-800 dark:text-white">
                                이미지 자르기
                            </h3>
                            <button
                                type="button"
                                className="flex items-center justify-center text-sm font-semibold text-gray-800 border border-transparent rounded-full size-7 hover:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:text-white dark:hover:bg-neutral-700"
                                data-hs-overlay="#cropperModal"
                            >
                                <span className="sr-only">취소</span>
                                <svg
                                    className="flex-shrink-0 size-4"
                                    xmlns="http://www.w3.org/2000/svg"
                                    width={24}
                                    height={24}
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth={2}
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                >
                                    <path d="M18 6 6 18" />
                                    <path d="m6 6 12 12" />
                                </svg>
                            </button>
                        </div>
                        <div className="p-4 overflow-y-auto">
                            <Cropper
                                src={
                                    tempMainImage
                                }
                                style={{ height: 500, width: "100%" }}
                                // Cropper.js options
                                initialAspectRatio={16 / 9}
                                aspectRatio={16 / 9}
                                autoCropArea={1}
                                viewMode={1}
                                guides={false}
                                crop={() => {
                                    // const cropper = cropperRef.current?.cropper;
                                    // if(cropper){
                                    //     console.log(cropper.getCroppedCanvas().toDataURL());
                                    // }

                                }}
                                ref={cropperRef}
                            />
                        </div>
                        <div className="flex items-center justify-end px-4 py-3 border-t gap-x-2 dark:border-neutral-700">
                            <button
                                type="button"
                                className="inline-flex items-center px-3 py-2 text-sm font-medium text-gray-800 bg-white border border-gray-200 rounded-lg shadow-sm gap-x-2 hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-800"
                                data-hs-overlay="#cropperModal"
                            >
                                취소
                            </button>
                            <button
                                type="button"
                                className="inline-flex items-center px-3 py-2 text-sm font-semibold text-white border border-transparent rounded-lg bg-primary gap-x-2 hover:bg-primary-light disabled:opacity-50 disabled:pointer-events-none"
                                data-hs-overlay="#cropperModal"
                                onClick={() => {
                                    const cropper = cropperRef.current?.cropper;
                                    if (cropper) {

                                        setMainImageList([...mainImageList, {
                                            'src': cropper.getCroppedCanvas().toDataURL(),
                                            'file': null
                                        }]);
                                    }

                                }}
                            >
                                업로드
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default EditProfilePage;