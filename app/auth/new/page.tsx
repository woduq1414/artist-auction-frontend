// Register page

'use client'

import { useCategory } from '@/app/_store/useCategory';
import JoditEditor from 'jodit-react';

import dynamic from 'next/dynamic';



import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import React, { useEffect, useMemo, useRef, useState } from 'react';
import CustomEditor from '@/app/_components/CustomEditor';
import { CheckCircleIcon, PlusIcon, TrashIcon } from '@heroicons/react/24/solid';
// import { HSSelect, HSSelect } from 'preline';
import Cropper, { ReactCropperElement } from "react-cropper";
import "cropperjs/dist/cropper.css";
import { HSOverlay, ICollectionItem } from 'preline';


const RegisterPage: React.FC = () => {

    const [step, setStep] = useState(1);

    const stepList = [
        "약관 동의",
        "사용자 유형 선택",
        "기본 정보 입력",
    ];

    const [selectedUserType, setSelectedUserType] = useState<any>(null);

    const [birthYear, setBirthYear] = useState<string>('');
    const [birthMonth, setBirthMonth] = useState<string>('');
    const [birthDay, setBirthDay] = useState<string>('');

    const [gender, setGender] = useState<string>('');

    const [name, setName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');


    const { categoryList, getCategoryList } = useCategory();

    const [firstCategory, setFirstCategory] = useState<any>(null);
    const [subCategoryList, setSubCategoryList] = useState<any[]>([]);
    const [preSubCategoryList, setPreSubCategoryList] = useState<any[]>([]);
    const [secondCategory, setSecondCategory] = useState<any>(null);

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

    let firstCategoryRef = useRef<any>(null);
    let secondCategoryRef = useRef<any>(null);

    let mainImageUploaderRef = useRef<any>(null);
    let exampleImageUploaderRef = useRef<any>(null);



    useEffect(() => {
        getCategoryList();


    }, [])

    useEffect(() => {
        firstCategoryRef.current.addEventListener('change.hs.select', (e: any) => {
            setFirstCategory(e.detail.payload);
            console.log(e.detail.payload, categoryList);
            setSubCategoryList(categoryList.find((category) => category.id.toString() === e.detail.payload)?.list);

        });
        secondCategoryRef.current.addEventListener('change.hs.select', (e: any) => {
            setSecondCategory(e.detail.payload);
        });

        // let e = document.querySelector('#stepper') as HTMLElement;
        // const stepper = new HSStepper(e);
        // stepper.setProcessedNavItem(1);
    }, [categoryList])





    // ...

    useEffect(() => {
        import('preline/preline').then((module) => {

            const { HSStaticMethods, HSSelect, HSOverlay } = module;
            // type HSSelect = import('preline/preline').HSSelect;


            if (subCategoryList.length > 0) {


                const select = HSSelect.getInstance('#secondCategorySelect');

                if (!(select instanceof HSSelect)) {
                    return;
                }


                console.log(select, subCategoryList);

                setSecondCategory(null);

                for (let i = 0; i < preSubCategoryList.length; i++) {
                    (select)?.removeOption(preSubCategoryList[i].id.toString());
                }

                for (let i = 0; i < subCategoryList.length; i++) {
                    (select)?.addOption({
                        val: subCategoryList[i].id.toString(),
                        title: subCategoryList[i].name
                    });
                }

                setPreSubCategoryList(subCategoryList);
                HSStaticMethods.autoInit(['select']);

                document.getElementById('secondCategoryButton')?.classList.remove('hidden');
                document.getElementById('secondCategoryExtra')?.classList.remove('hidden');

                select.open();

            }
        });

    }, [subCategoryList])



    return (
        <main className="w-[80%]  mx-auto   flex flex-col justify-center items-center">
            <div className='h-[80px] flex flex-col justify-center items-center  '>
            <img src="/images/logo.png" alt="logo" className="h-[35px]" />
            </div>
            <div className="w-[100%] rounded-xl  h-full">
                <div className='flex flex-col h-full mx-5 my-5'>
                    {/* Stepper */}
                    <div data-hs-stepper='{"currentIndex": 1 }' id="stepper" className='flex flex-col h-[calc(100vh-120px)] bg-slate-50 '>
                        {/* Stepper Nav */}
                        <ul className="relative flex flex-row justify-center flex-shrink-0 h-[5rem] mx-auto gap-x-2 mt-3">
                            {
                                [1, 2, 3].map((item, index) => (
                                    <li
                                        key={index}
                                        className={`flex items-center gap-x-2 shrink  group`}
                                        data-hs-stepper-nav-item={JSON.stringify({
                                            "index": index + 1
                                        })}
                                    >
                                        <span className="inline-flex flex-col items-center justify-center text-xs align-middle min-w-7 min-h-7 group">
                                            <span className="flex items-center justify-center flex-shrink-0 font-medium text-gray-800 bg-gray-100 rounded-full w-7 h-7 group-focus:bg-gray-200 hs-stepper-active:bg-primary hs-stepper-active:text-white hs-stepper-success:bg-primary hs-stepper-success:text-white hs-stepper-completed:bg-teal-500 hs-stepper-completed:group-focus:bg-teal-600 ">
                                                <span className="hs-stepper-success:hidden hs-stepper-completed:hidden">
                                                    {index + 1}
                                                </span>
                                                <svg
                                                    className="flex-shrink-0 hidden size-2 hs-stepper-success:block"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    width={12}
                                                    height={12}
                                                    viewBox="0 0 24 24"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    strokeWidth={3}
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                >
                                                    <polyline points="20 6 9 17 4 12" />
                                                </svg>
                                            </span>
                                            <span className="mt-2 text-sm font-medium text-gray-800 ">
                                                {
                                                    stepList[index]
                                                }
                                            </span>
                                        </span>
                                        <div className={` w-[300px] max-w-[15vw] h-px bg-gray-200 group-last:hidden hs-stepper-success:bg-primary hs-stepper-completed:bg-teal-600      
                                      
                                        `} />
                                    </li>
                                ))
                            }

                            {/* End Item */}
                        </ul>
                        {/* End Stepper Nav */}
                        {/* Stepper Content */}
                        <div className="flex-grow mt-2 overflow-y-auto">

                            <div
                                data-hs-stepper-content-item='{
"index": 1
    }'                          style={{ display: "none" }} className=''
                            >
                                <div className="w-[700px] max-w-[90%] mx-auto px-5 py-8 space-y-2 border-dashed rounded-xl flex flex-col gap-6">

                                    <div className='flex flex-col gap-2'>
                                        <label
                                            htmlFor="inline-input-label-with-helper-text"
                                            className="block text-lg font-semibold "
                                        >
                                            이용 약관
                                        </label>
                                        <div className='max-h-[150px] overflow-auto bg-gray-100 rounded-lg px-3 py-2 text-sm'>
                                            이용 약관 내용 입니다. 이용 약관 내용 입니다. 이용 약관 내용 입니다. 이용 약관 내용 입니다. 이용 약관 내용 입니다. 이용 약관 내용 입니다. 이용 약관 내용 입니다. 이용 약관 내용 입니다. 이용 약관 내용 입니다. 이용 약관 내용 입니다. 이용 약관 내용 입니다. 이용 약관 내용 입니다. 이용 약관 내용 입니다. 이용 약관 내용 입니다. 이용 약관 내용 입니다. 이용 약관 내용 입니다. 이용 약관 내용 입니다. 이용 약관 내용 입니다. 이용 약관 내용 입니다. 이용 약관 내용 입니다. 이용 약관 내용 입니다. 이용 약관 내용 입니다. 이용 약관 내용 입니다. 이용 약관 내용 입니다. 이용 약관 내용 입니다. 이용 약관 내용 입니다. 이용 약관 내용 입니다.
                                        </div>
                                        <div className="flex flex-row items-center">
                                            <input
                                                type="checkbox"
                                                className="border-gray-200 rounded shrink-0text-md color-primary text-primary focus:ring-primary disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-700 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800"
                                                id="hs-checked-checkbox"

                                            />
                                            <label
                                                htmlFor="hs-checked-checkbox"
                                                className="text-gray-500 text-md ms-3 dark:text-neutral-400"
                                            >
                                                위 내용에 동의합니다.
                                            </label>
                                        </div>
                                    </div>

                                    <div className='flex flex-col gap-2'>
                                        <label
                                            htmlFor="inline-input-label-with-helper-text"
                                            className="block text-lg font-semibold "
                                        >
                                            개인 정보 처리 방침
                                        </label>
                                        <div className='max-h-[150px] overflow-auto bg-gray-100 rounded-lg px-3 py-2 text-sm'>
                                            개인 정보 처리 방침 입니다.    개인 정보 처리 방침 입니다.    개인 정보 처리 방침 입니다.    개인 정보 처리 방침 입니다.    개인 정보 처리 방침 입니다.    개인 정보 처리 방침 입니다.    개인 정보 처리 방침 입니다.    개인 정보 처리 방침 입니다.    개인 정보 처리 방침 입니다.    개인 정보 처리 방침 입니다.    개인 정보 처리 방침 입니다.    개인 정보 처리 방침 입니다.    개인 정보 처리 방침 입니다.    개인 정보 처리 방침 입니다.    개인 정보 처리 방침 입니다.    개인 정보 처리 방침 입니다.    개인 정보 처리 방침 입니다.    개인 정보 처리 방침 입니다.    개인 정보 처리 방침 입니다.    개인 정보 처리 방침 입니다.    개인 정보 처리 방침 입니다.    개인 정보 처리 방침 입니다.    개인 정보 처리 방침 입니다.    개인 정보 처리 방침 입니다.    개인 정보 처리 방침 입니다.    개인 정보 처리 방침 입니다.    개인 정보 처리 방침 입니다.    개인 정보 처리 방침 입니다.    개인 정보 처리 방침 입니다.    개인 정보 처리 방침 입니다.    개인 정보 처리 방침 입니다.    개인 정보 처리 방침 입니다.
                                        </div>
                                        <div className="flex flex-row items-center">
                                            <input
                                                type="checkbox"
                                                className="border-gray-200 rounded shrink-0text-md color-primary text-primary focus:ring-primary disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-700 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800"
                                                id="hs-checked-checkbox"

                                            />
                                            <label
                                                htmlFor="hs-checked-checkbox"
                                                className="text-gray-500 text-md ms-3 dark:text-neutral-400"
                                            >
                                                위 내용에 동의합니다.
                                            </label>
                                        </div>
                                    </div>

                                </div>



                            </div>
                            {/* First Contnet */}
                            <div
                                data-hs-stepper-content-item='{
"index": 2
    }'                          style={{ display: "none" }} className=''
                            >
                                <div className="w-[700px] max-w-[90%] mx-auto px-5 py-8 space-y-2 border-dashed rounded-xl flex flex-col gap-6">
                                    <div className='flex flex-col gap-6'>
                                        <div className='flex flex-row items-center px-5 py-8 rounded-lg shadow-md cursor-pointer' onClick={
                                            () => {
                                                setSelectedUserType('artist');
                                            }
                                        }>
                                            <div className='flex flex-col flex-grow gap-2'>
                                                <div className='text-3xl font-semibold text-gray-800'>
                                                    아티스트
                                                </div>

                                                <div className='text-lg text-gray-600'>
                                                    작품을 통해 가치를 생산합니다.
                                                </div>
                                            </div>
                                            <div className='flex flex-shrink-0 pr-2'>
                                                {/* <div className='text-white rounded-full bg-primary'> */}
                                                {
                                                    selectedUserType === 'artist' ? <CheckCircleIcon className='w-10 h-10 text-primary' /> : <div className='flex items-center justify-center w-10 h-10 bg-gray-100 rounded-full'></div>
                                                }

                                                {/* </div> */}
                                            </div>

                                        </div>

                                    </div>

                                    <div className='flex flex-col gap-6'>
                                        <div className='flex flex-row items-center px-5 py-8 rounded-lg shadow-md cursor-pointer' onClick={
                                            () => {
                                                setSelectedUserType('company');
                                            }
                                        }>
                                            <div className='flex flex-col flex-grow gap-2'>
                                                <div className='text-3xl font-semibold text-gray-800'>
                                                    기업
                                                </div>

                                                <div className='text-lg text-gray-600'>
                                                    능력있는 아티스트의 작품을 활용할 수 있습니다.
                                                </div>
                                            </div>
                                            <div className='flex flex-shrink-0 pr-2'>
                                                {/* <div className='text-white rounded-full bg-primary'> */}
                                                {
                                                    selectedUserType === 'company' ? <CheckCircleIcon className='w-10 h-10 text-primary' /> : <div className='flex items-center justify-center w-10 h-10 bg-gray-100 rounded-full'></div>
                                                }

                                                {/* </div> */}
                                            </div>

                                        </div>

                                    </div>
                                </div>



                            </div>
                            {/* End First Contnet */}
                            {/* First Contnet */}
                            <div
                                data-hs-stepper-content-item='{
"index": 3
    }'
                                style={{ display: "none" }}
                            >
                                <div className="w-[700px] max-w-[90%] mx-auto px-5 py-8 space-y-2 border-dashed rounded-xl flex flex-col gap-6">
                                    <div className='flex flex-col gap-2'>
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
                                            onChange={(e) => setEmail(e.target.value)}
                                        />

                                    </div>

                                    <div className='flex flex-col gap-2'>
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
                                            onChange={(e) => setPassword(e.target.value)}
                                        />

                                    </div>

                                    <div className='flex flex-col gap-2'>
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
                                            placeholder="본인 이름을 입력해주세요."
                                            aria-describedby="hs-inline-input-helper-text"
                                            onChange={(e) => setName(e.target.value)}
                                        />

                                    </div>
                                    <div className='flex flex-col gap-2'>
                                        <label
                                            htmlFor="inline-input-label-with-helper-text"
                                            className="block text-lg font-semibold "
                                        >
                                            생년월일
                                        </label>
                                        <div className='flex flex-row gap-2'>
                                            <input
                                                type="text"

                                                className=" text-center w-[80px] block px-4 py-3 border border-gray-200 rounded-lg text-md focus:border-primary focus:ring-primary disabled:opacity-50 disabled:pointer-events-none "
                                                placeholder="연도"
                                                aria-describedby="hs-inline-input-helper-text"
                                                onChange={(e) => setBirthYear(e.target.value)}
                                            />
                                            <input
                                                type="text"

                                                className="  text-center w-[60px] block px-4 py-3 border border-gray-200 rounded-lg text-md focus:border-primary focus:ring-primary disabled:opacity-50 disabled:pointer-events-none "
                                                placeholder="월"
                                                aria-describedby="hs-inline-input-helper-text"
                                                onChange={(e) => setBirthMonth(e.target.value)}
                                            />
                                            <input
                                                type="text"

                                                className="  text-center w-[60px] block px-4 py-3 border border-gray-200 rounded-lg text-md focus:border-primary focus:ring-primary disabled:opacity-50 disabled:pointer-events-none "
                                                placeholder="일"
                                                aria-describedby="hs-inline-input-helper-text"
                                                onChange={(e) => setBirthDay(e.target.value)}
                                            />
                                        </div>

                                    </div>
                                    <div className='flex flex-col gap-2'>
                                        <label
                                            htmlFor="inline-input-label-with-helper-text"
                                            className="block text-lg font-semibold "
                                        >
                                            성별
                                        </label>
                                        <div className='flex flex-row gap-2'>
                                            <div className={`px-5 py-2 
                                            rounded-lg cursor-pointer text-md
                                            ${gender == 'male' ? 'bg-primary-light text-white' : 'bg-gray-200 text-gray-800'
                                                }`}
                                                onClick={() => setGender('male')}
                                            >
                                                남성
                                            </div>
                                            <div className={`px-5 py-2 
                                            rounded-lg cursor-pointer text-md
                                            ${gender == 'female' ? 'bg-primary-light text-white' : 'bg-gray-200 text-gray-800'
                                                }`}
                                                onClick={() => setGender('female')}
                                            >
                                                여성
                                            </div>

                                        </div>


                                    </div>
                                    {/* <div className='h-[14rem]'></div> */}
                                    <div className='flex flex-col gap-2'>
                                        <label
                                            htmlFor="inline-input-label-with-helper-text"
                                            className="block text-lg font-semibold dark:text-white"
                                        >
                                            관심 카테고리
                                        </label>
                                        <div className='max-w-xl'>
                                            <select data-hs-select='{
  "placeholder": "카테고리를 선택해주세요.",
  "toggleTag": "<button type=\"button\"></button>",
  "toggleClasses": "hs-select-disabled:pointer-events-none hs-select-disabled:opacity-50 relative py-3 px-4 pe-9 flex text-nowrap w-full cursor-pointer bg-white border border-gray-200 rounded-lg text-start text-sm focus:border-primary focus:ring-primary before:absolute before:inset-0 before:z-[1] dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400",
  "dropdownClasses": "mt-2 z-50 w-full max-h-72 p-1 space-y-0.5 bg-white border border-gray-200 rounded-lg overflow-hidden overflow-y-auto [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:bg-gray-300 dark:[&::-webkit-scrollbar-track]:bg-neutral-700 dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500 dark:bg-neutral-900 dark:border-neutral-700",
  "optionClasses": "py-2 px-4 w-full text-sm text-gray-800 cursor-pointer hover:bg-gray-100 rounded-lg focus:outline-none focus:bg-gray-100 dark:bg-neutral-900 dark:hover:bg-neutral-800 dark:text-neutral-200 dark:focus:bg-neutral-800",
  "optionTemplate": "<div class=\"flex justify-between items-center w-full\"><span data-title></span><span class=\"hidden hs-selected:block\"><svg class=\"flex-shrink-0 size-3.5 text-primary dark:text-primary\" xmlns=\"http:.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><polyline points=\"20 6 9 17 4 12\"/></svg></span></div>",
  "extraMarkup": "<div class=\"absolute top-1/2 end-3 -translate-y-1/2\"><svg class=\"flex-shrink-0 size-3.5 text-gray-500 dark:text-neutral-500\" xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"m7 15 5 5 5-5\"/><path d=\"m7 9 5-5 5 5\"/></svg></div>"
}' className="hidden" ref={firstCategoryRef} id='firstCategorySelect'
                                                onClick={(e) => { console.log(e) }}
                                            >
                                                <option value="">카테고리 선택</option>
                                                {
                                                    categoryList.map((category, index) => (
                                                        <option key={index} value={category.id}>{category.name}</option>
                                                    ))

                                                }

                                            </select>
                                            <div className='my-2'>

                                            </div>
                                            <select data-hs-select={JSON.stringify({
                                                "placeholder": "세부 카테고리를 선택해주세요.",
                                                "toggleTag": `<button id="secondCategoryButton" class="hidden" type=\"button\"></button>`,
                                                "toggleClasses": "hs-select-disabled:pointer-events-none hs-select-disabled:opacity-50 relative py-3 px-4 pe-9 flex text-nowrap w-full cursor-pointer bg-white border border-gray-200 rounded-lg text-start text-sm focus:border-primary focus:ring-primary before:absolute before:inset-0 before:z-[1] dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400",
                                                "dropdownClasses": "mt-2 z-50 w-full max-h-72 p-1 space-y-0.5 bg-white border border-gray-200 rounded-lg overflow-hidden overflow-y-auto [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:bg-gray-300 dark:[&::-webkit-scrollbar-track]:bg-neutral-700 dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500 dark:bg-neutral-900 dark:border-neutral-700",
                                                "optionClasses": "py-2 px-4 w-full text-sm text-gray-800 cursor-pointer hover:bg-gray-100 rounded-lg focus:outline-none focus:bg-gray-100 dark:bg-neutral-900 dark:hover:bg-neutral-800 dark:text-neutral-200 dark:focus:bg-neutral-800",
                                                "optionTemplate": "<div class=\"flex justify-between items-center w-full\"><span data-title></span><span class=\"hidden hs-selected:block\"><svg class=\"flex-shrink-0 size-3.5 text-primary dark:text-primary\" xmlns=\"http:.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><polyline points=\"20 6 9 17 4 12\"/></svg></span></div>",
                                                "extraMarkup": "<div id=\"secondCategoryExtra\" class=\"absolute top-1/2 end-3 -translate-y-1/2 hidden \"><svg class=\"flex-shrink-0 size-3.5 text-gray-500 dark:text-neutral-500\" xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"m7 15 5 5 5-5\"/><path d=\"m7 9 5-5 5 5\"/></svg></div>"
                                            })} className={`hidden`} ref={secondCategoryRef} id='secondCategorySelect'

                                            >
                                                <option value="">세부 카테고리 선택</option>
                                                {
                                                    subCategoryList?.map((category, index) => (
                                                        <option key={index} value={category.id}>{category.name}</option>
                                                    ))

                                                }

                                            </select>
                                            <p
                                                className="mt-2 text-gray-500 text-md dark:text-neutral-500"
                                                id="hs-inline-input-helper-text"
                                            >
                                                {
                                                    firstCategory === null ? '' : categoryList.find((category) => category.id.toString() === firstCategory)?.name

                                                }
                                                {
                                                    secondCategory === null ? '' : " > " + subCategoryList.find((category) => category.id.toString() === secondCategory)?.name

                                                }
                                            </p>
                                        </div>
                                    </div>

                                </div>
                            </div>

                            {/* End First Contnet */}
                            {/* Final Contnet */}
                            <div
                                data-hs-stepper-content-item='{
"isFinal": true
    }'
                                style={{ display: "none" }}
                            >
                                <div className="w-[80%] max-w-[90%] mx-auto px-5 py-8  border-dashed rounded-xl flex flex-col">
                                    <div className='text-2xl font-semibold'>[{title}] 상품의 접수가 완료되었습니다.</div>
                                    <div className='text-lg font-medium'>3일 이내로 접수 결과를 안내해드리겠습니다.</div>
                                </div>
                            </div>
                            {/* End Final Contnet */}
                            {/* Button Group */}

                            {/* End Button Group */}
                        </div>
                        <div className="flex items-center justify-between flex-shrink-0 h-[3rem] mt-5 gap-x-2 mx-5 my-5">
                            <button
                                type="button"
                                className="inline-flex items-center px-3 py-2 text-sm font-medium text-gray-800 bg-white border border-gray-200 rounded-lg shadow-sm gap-x-1 hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none"
                                data-hs-stepper-back-btn=""
                            >
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
                                    <path d="m15 18-6-6 6-6" />
                                </svg>
                                이전
                            </button>
                            <button
                                type="button"
                                className="inline-flex items-center px-3 py-2 text-sm font-semibold text-white border border-transparent rounded-lg bg-primary gap-x-1 hover:bg-primary disabled:opacity-50 disabled:pointer-events-none"
                                data-hs-stepper-next-btn=""
                            >
                                다음
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
                                    <path d="m9 18 6-6-6-6" />
                                </svg>
                            </button>
                            <button
                                type="button"
                                className="inline-flex items-center px-3 py-2 text-sm font-semibold text-white border border-transparent rounded-lg bg-primary gap-x-1 hover:bg-primary disabled:opacity-50 disabled:pointer-events-none"
                                data-hs-stepper-finish-btn=""
                                style={{ display: "none" }}
                            >
                                제출
                            </button>
                            <button
                                type="reset"
                                className="inline-flex items-center px-3 py-2 text-sm font-semibold text-white border border-transparent rounded-lg bg-primary gap-x-1 hover:bg-primary disabled:opacity-50 disabled:pointer-events-none"
                                data-hs-stepper-reset-btn=""
                                style={{ display: "none" }}
                                onClick={() => {

                                }}
                            >
                                Reset(임시)
                            </button>
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

export default RegisterPage;