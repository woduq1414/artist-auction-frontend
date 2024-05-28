'use client'

import { useCategory } from '@/app/_store/useCategory';



import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import React, { useEffect, useMemo, useRef, useState } from 'react';
import CustomEditor from '@/app/_components/CustomEditor';
import { ChevronDoubleLeftIcon, ChevronDoubleRightIcon, PlusIcon, TrashIcon } from '@heroicons/react/24/solid';
// import { HSSelect, HSSelect } from 'preline';
import Cropper, { ReactCropperElement } from "react-cropper";
import "cropperjs/dist/cropper.css";
import { toast } from 'react-toastify';
import Config from '@/config/config.export';
import { Cookies } from 'react-cookie';
import { set } from 'lodash';


const NewMarketPage: React.FC = () => {
    function dataURLtoFile(dataurl: string, filename: string) {
        var arr = dataurl.split(","),
            mime = arr[0].match(/:(.*?);/)?.[1], // Add null check
            bstr = atob(arr[arr.length - 1]),
            n = bstr.length,
            u8arr = new Uint8Array(n);
        while (n--) {
            u8arr[n] = bstr.charCodeAt(n);
        }
        return new File([u8arr], filename, { type: mime });
    }
    const [step, setStep] = useState(3);

    const stepList = [
        "기본 정보 입력",
        "상세 정보 입력",
        "상품 이미지 등록"
    ];
    const { categoryList, getCategoryList } = useCategory();

    const [firstCategory, setFirstCategory] = useState<any>(null);
    const [subCategoryList, setSubCategoryList] = useState<any[]>([]);
    const [preSubCategoryList, setPreSubCategoryList] = useState<any[]>([]);
    const [secondCategory, setSecondCategory] = useState<any>(null);

    const [title, setTitle] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [price, setPrice] = useState<number>(0);

    // const [endDate, setEndDate] = useState<string>('');
    const [duration, setDuration] = useState<number>(0);

    const [mainImageList, setMainImageList] = useState<any[]>([]);
    const [tempMainImage, setTempMainImage] = useState<string>('');
    const [tempMainImageTitle, setTempMainImageTitle] = useState<string>('');
    const [exampleImageList, setExampleImageList] = useState<any[]>([
        {
            'id': 1,
            'src': "https://res.cloudinary.com/do7rz1fza/image/upload/w_1920/q_auto/f_auto/v1716811386/prod/018f8ee2-26b1-79e4-9d8b-b6a4b4f5ca97:5b6a3d95-5e00-4377-bc12-abcda3bfc2e7.png"
        }
    ]);

    const cropperRef = useRef<ReactCropperElement>(null);
    const [cropperModalInstance, setCropperModalInstance] = useState<any>(null);

    const cropperModalOpenRef = useRef<any>(null);

    let firstCategoryRef = useRef<any>(null);
    let secondCategoryRef = useRef<any>(null);

    let mainImageUploaderRef = useRef<any>(null);
    let exampleImageUploaderRef = useRef<any>(null);

    let submitButtonRef = useRef<any>(null);



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

    useEffect(() => {
        import('preline/preline').then((module) => {

            const { HSStaticMethods, HSSelect, HSOverlay } = module;
            // type HSSelect = import('preline/preline').HSSelect;

            HSStaticMethods.autoInit(['tooltip']);

        });
    }, [mainImageList, exampleImageList])

    const [editor, setEditor] = useState<any>(null);

    return (
        <main className="w-[80%]  mx-auto mt-20 md:mt-16  flex flex-col justify-center items-center">
            <div className="w-[100%] rounded-xl  h-full">
                <div className='flex flex-col h-full mx-5 my-5'>
                    {/* Stepper */}
                    <div id="stepper" className='flex flex-col h-[calc(100vh-120px)] bg-slate-50 '>
                        {/* Stepper Nav */}
                        <ul className="relative flex flex-row justify-center flex-shrink-0 h-[5rem] mx-auto gap-x-2 mt-3">
                            {
                                [1, 2, 3].map((item, index) => (
                                    <li
                                        key={index}
                                        className={`flex items-center gap-x-2 shrink  group`}

                                    >
                                        <span className="inline-flex flex-col items-center justify-center text-xs align-middle min-w-7 min-h-7 group">
                                            <span className={`flex items-center justify-center flex-shrink-0 font-medium text-gray-800 bg-gray-100 rounded-full w-7 h-7 group-focus:bg-gray-200 
                                            ${step >= item ? 'bg-primary text-white' : ' '}
                                            `}>
                                                <span className={`${step > item ? 'hidden' : ' '}`}>
                                                    {item}
                                                </span>
                                                <svg
                                                    className={`flex-shrink-0 size-2 ${step > item ? 'block' : 'hidden'}`}
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
                                        <div className={` w-[300px] max-w-[15vw] h-px bg-gray-200 group-last:hidden ${step > item ? 'bg-primary' : ' '
                                            }   
                                      
                                        `} />
                                    </li>
                                ))
                            }

                            {/* End Item */}
                        </ul>
                        {/* End Stepper Nav */}
                        {/* Stepper Content */}
                        <div className="flex-grow mt-2 overflow-y-auto">
                            {/* First Contnet */}
                            <div
                                className={`${step === 1 ? 'block' : 'hidden'}`}
                            >
                                <div className="w-[700px] max-w-[90%] mx-auto px-5 py-8 space-y-2 border-dashed rounded-xl flex flex-col gap-6">
                                    <div className='flex flex-col gap-2'>
                                        <label
                                            htmlFor="inline-input-label-with-helper-text"
                                            className="block text-lg font-semibold "
                                        >
                                            상품 제목
                                        </label>
                                        <input
                                            type="text"
                                            id="inline-input-label-with-helper-text"
                                            className="block w-full max-w-xl px-4 py-3 border border-gray-200 rounded-lg text-md focus:border-primary focus:ring-primary disabled:opacity-50 disabled:pointer-events-none "
                                            placeholder="상품 제목을 입력해주세요."
                                            aria-describedby="hs-inline-input-helper-text"
                                            onChange={(e) => setTitle(e.target.value)}
                                        />
                                        <p
                                            className="text-gray-500 text-md "
                                            id="hs-inline-input-helper-text"
                                        >
                                            ({title.length} / 20)
                                        </p>
                                    </div>
                                    <div className='flex flex-col gap-2'>
                                        <label
                                            htmlFor="inline-input-label-with-helper-text"
                                            className="block text-lg font-semibold "
                                        >
                                            한 줄 설명
                                        </label>
                                        <input
                                            type="text"
                                            id="inline-input-label-with-helper-text"
                                            className="block w-full max-w-xl px-4 py-3 border border-gray-200 rounded-lg text-md focus:border-primary focus:ring-primary disabled:opacity-50 disabled:pointer-events-none "
                                            placeholder="한 줄 설명을 입력해주세요."
                                            aria-describedby="hs-inline-input-helper-text"
                                            onChange={(e) => setDescription(e.target.value)}
                                        />
                                        <p
                                            className="text-gray-500 text-md dark:text-neutral-500"
                                            id="hs-inline-input-helper-text"
                                        >
                                            ({description.length} / 40)
                                        </p>
                                    </div>
                                    {/* <div className='h-[14rem]'></div> */}
                                    <div className='flex flex-col gap-2'>
                                        <label
                                            htmlFor="inline-input-label-with-helper-text"
                                            className="block text-lg font-semibold dark:text-white"
                                        >
                                            카테고리
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
                                    <div className='flex flex-col gap-2'>
                                        <label
                                            htmlFor="inline-input-label-with-helper-text"
                                            className="block text-lg font-semibold "
                                        >
                                            경매 시작가
                                        </label>
                                        <div className="relative max-w-xl ">
                                            <input
                                                type="text"
                                                id="hs-input-with-leading-and-trailing-icon"
                                                name="hs-input-with-leading-and-trailing-icon"
                                                className="block w-full max-w-xl px-4 py-3 border border-gray-200 rounded-lg text-md ps-9 pe-16 focus:z-10 focus:border-primary focus:ring-primary disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                                                placeholder={price.toString()}
                                                onChange={(e) => {
                                                    const value: string = e.target.value;
                                                    const removedCommaValue: number = Number(value.replaceAll(",", ""));
                                                    if (removedCommaValue < 10000) {
                                                        setPrice(removedCommaValue);
                                                    }

                                                }}
                                                value={price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                            />
                                            <div className="absolute inset-y-0 z-20 flex items-center pointer-events-none start-0 ps-4">
                                                <svg
                                                    width={18}
                                                    height={18}
                                                    viewBox="0 0 24 24"
                                                    fill="none"
                                                    xmlns="http://www.w3.org/2000/svg"

                                                >
                                                    <path
                                                        d="M6 12L8 19L10 12M6 12L4 5M6 12H3M6 12H10M14 12L16 19L18 12M14 12L12 5L10 12M14 12H10M14 12H18M18 12L20 5M18 12H21"
                                                        stroke="#444444"
                                                        strokeWidth={2}
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                    />
                                                </svg>

                                            </div>
                                            <div className="absolute inset-y-0 z-20 flex items-center pointer-events-none end-0 pe-4">
                                                <span className="text-gray-500 dark:text-neutral-500">만원</span>
                                            </div>
                                        </div>

                                        <p
                                            className="text-gray-500 text-md dark:text-neutral-500"
                                            id="hs-inline-input-helper-text"
                                        >
                                            10,000원 단위로만 입력 가능합니다.
                                        </p>
                                    </div>
                                    <div className='flex flex-col gap-2'>
                                        <label
                                            htmlFor="inline-input-label-with-helper-text"
                                            className="block text-lg font-semibold "
                                        >
                                            경매 지속 기간
                                        </label>

                                        <div className="relative max-w-xl ">
                                            <input
                                                type="text"
                                                id="inline-input-label-with-helper-text"
                                                className="block w-full max-w-xl px-4 py-3 border border-gray-200 rounded-lg text-md focus:border-primary focus:ring-primary disabled:opacity-50 disabled:pointer-events-none "
                                                // placeholder="상품 제목을 입력해주세요."
                                                aria-describedby="hs-inline-input-helper-text"
                                                onChange={(e) => {
                                                    const value: string = e.target.value;
                                                    const removedCommaValue: number = Number(value.replaceAll(",", ""));
                                                    if (removedCommaValue < 100) {
                                                        setDuration(removedCommaValue);
                                                    }
                                                }}
                                                value={duration.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                                max={14}
                                            />
                                            <div className="absolute inset-y-0 z-20 flex items-center pointer-events-none end-0 pe-4">
                                                <span className="text-gray-500 dark:text-neutral-500">일</span>
                                            </div>
                                        </div>

                                        <p
                                            className="text-gray-500 text-md dark:text-neutral-500"
                                            id="hs-inline-input-helper-text"
                                        >
                                            경매는 1 ~ 14일까지 진행 가능합니다. 검수 다음 날부터 경매가 시작됩니다.
                                        </p>
                                    </div>
                                </div>



                            </div>
                            {/* End First Contnet */}
                            {/* First Contnet */}
                            <div

                                className={`${step === 2 ? 'block' : 'hidden'}`}
                            >
                                <div className="w-[80%] max-w-[90%] mx-auto px-5 py-8 space-y-2 border-dashed rounded-xl flex flex-col gap-1">
                                    <label
                                        htmlFor="inline-input-label-with-helper-text"
                                        className="block text-lg font-semibold "
                                    >
                                        상품 상세 설명
                                    </label>
                                    <CustomEditor setEditor={
                                        setEditor

                                    } />

                                </div>
                            </div>
                            {/* End First Contnet */}
                            {/* First Contnet */}
                            <div

                                className={`${step === 3 ? 'block' : 'hidden'}`}
                            >
                                <div className="w-[80%] max-w-[90%] mx-auto px-5 py-8  border-dashed rounded-xl flex flex-col">
                                    <label
                                        htmlFor="inline-input-label-with-helper-text"
                                        className="block text-lg font-semibold "
                                    >
                                        대표 이미지 등록
                                    </label>

                                    <p
                                        className="mt-2 text-gray-500 text-md "
                                        id="hs-inline-input-helper-text"
                                    >
                                        1920x1080 사이즈의 이미지가 권장됩니다.
                                    </p>

                                    <div className='flex flex-row flex-wrap mt-2'>

                                        {
                                            mainImageList.length >= 1 && (
                                                <div className='relative flex items-center justify-center bg-white shadow-md cursor-pointer hover:bg-gray-50 rounded-xl'>
                                                    <img src={mainImageList[0].src} alt="" className='object-cover h-[130px] w-fit rounded-xl' />
                                                    <div className="absolute inset-0 z-10 flex items-center justify-center duration-300 bg-gray-500 opacity-0 bg-opacity-30 rounded-xl text-smfont-semibold hover:opacity-100"
                                                        onClick={() => {
                                                            setMainImageList([]);
                                                        }}
                                                    >
                                                        <TrashIcon className='w-5 h-5 text-white' />
                                                    </div>
                                                </div>
                                            )
                                        }
                                        <button type="button" data-hs-overlay="#cropperModal"
                                            className='hidden'
                                            ref={cropperModalOpenRef}
                                        >
                                            Open modal
                                        </button>
                                        <div className={`w-[130px] h-[130px] border-2 border-gray-400 border-dashed bg-white hover:bg-gray-50 cursor-pointer
                                        flex justify-center items-center rounded-xl ${mainImageList.length >= 1 ? 'hidden' : ' '}`} onClick={
                                                () => {
                                                    // console.log(cropperModalInstance);
                                                    // cropperModalInstance?.open();


                                                    mainImageUploaderRef.current.click();

                                                }
                                            }>
                                            <>


                                            </>

                                            <input
                                                id="mainImageUploader"
                                                type="file"
                                                style={{ display: 'none' }}
                                                ref={mainImageUploaderRef}

                                                accept="image/*"
                                                onChange={(e) => {
                                                    const fileList = (e.target as HTMLInputElement)?.files;
                                                    if (!fileList) return;

                                                    for (let i = 0; i < fileList.length; i++) {
                                                        const file = fileList[i];
                                                        if (file) {
                                                            const reader = new FileReader();
                                                            reader.onload = function (e2) {
                                                                const src = e2.target?.result;
                                                                console.log(src);

                                                                setTempMainImage(src as string);
                                                                setTempMainImageTitle(file.name);
                                                                cropperModalOpenRef.current.click();




                                                            };
                                                            reader.readAsDataURL(file);
                                                        }
                                                    }

                                                }
                                                }
                                            />
                                            <PlusIcon className='w-10 h-10 m-auto text-gray-400' />
                                        </div>
                                    </div>


                                    <label
                                        htmlFor="inline-input-label-with-helper-text"
                                        className="block mt-8 text-lg font-semibold"
                                    >
                                        작품 예시 이미지 등록
                                    </label>

                                    <p
                                        className="mt-2 text-gray-500 text-md dark:text-neutral-500"
                                        id="hs-inline-input-helper-text2"
                                    >
                                        9장까지 등록 가능합니다.
                                    </p>

                                    <div className='flex flex-row flex-wrap gap-3 mt-2'>

                                        {
                                            exampleImageList.length >= 1 && (
                                                exampleImageList.map((image, index) => (
                                                    // <div key={index} className='relative flex items-center justify-center bg-white shadow-md cursor-pointer hover:bg-gray-50 rounded-xl'>
                                                    //     <img src={exampleImageList[index].src} alt="" className='object-cover h-[130px] w-fit rounded-xl' />
                                                    //     <div className="absolute inset-0 z-10 flex items-center justify-center duration-300 bg-gray-500 opacity-0 bg-opacity-30 rounded-xl text-smfont-semibold hover:opacity-100"
                                                    //         onClick={() => {
                                                    //             setExampleImageList(exampleImageList.filter((_, i) => i !== index));
                                                    //         }}
                                                    //     >
                                                    //         <TrashIcon className='w-5 h-5 text-white' />
                                                    //     </div>
                                                    // </div>
                                                    <div key={index} className='relative items-center justify-center bg-white shadow-md cursor-pointer hover:bg-gray-50 rounded-xl hs-tooltip [--trigger:click] inline-block'>
                                                        <img src={exampleImageList[index].src} alt="" className='object-cover h-[130px] w-fit rounded-xl' />
                                                        <span className="absolute z-10 flex flex-row invisible gap-2 px-2 py-1 text-sm text-gray-600 transition-opacity bg-white border rounded-lg shadow-md opacity-0 hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400" role="tooltip">
                                                            <div className='p-2 rounded-full hover:bg-gray-200'
                                                                onClick={() => {
                                                                    // move forward item
                                                                    if (index === 0) return;
                                                                    let temp = exampleImageList[index];
                                                                    let temp2 = exampleImageList[index - 1];
                                                                    exampleImageList[index] = temp2;
                                                                    exampleImageList[index - 1] = temp;
                                                                    setExampleImageList([...exampleImageList]);


                                                                }}>
                                                                <ChevronDoubleLeftIcon className='w-4 h-4 text-gray-700' />
                                                            </div>
                                                            <div className='p-2 rounded-full hover:bg-gray-200' onClick={
                                                                () => {
                                                                    setExampleImageList(exampleImageList.filter((_, i) => i !== index));
                                                                }

                                                            }>
                                                                <TrashIcon className='w-4 h-4 text-primary-light' />
                                                            </div>
                                                            <div className='p-2 rounded-full hover:bg-gray-200'
                                                                onClick={() => {
                                                                    // move backward item

                                                                    if (index === exampleImageList.length - 1) return;
                                                                    let temp = exampleImageList[index];
                                                                    let temp2 = exampleImageList[index + 1];
                                                                    exampleImageList[index] = temp2;
                                                                    exampleImageList[index + 1] = temp;
                                                                    setExampleImageList([...exampleImageList]);
                                                                    console.log(exampleImageList)

                                                                }




                                                                }>
                                                                <ChevronDoubleRightIcon className='w-4 h-4 text-gray-700' />
                                                            </div>


                                                        </span>
                                                        <div className="absolute inset-0 z-10 flex items-center justify-center duration-300 bg-gray-500 opacity-0 bg-opacity-30 rounded-xl text-smfont-semibold hover:opacity-100"

                                                        >

                                                        </div>
                                                    </div>
                                                )
                                                )
                                            )
                                        }
                                        <button type="button" data-hs-overlay="#cropperModal"
                                            className='hidden'
                                            ref={cropperModalOpenRef}
                                        >
                                            Open modal
                                        </button>
                                        <div className={`w-[130px] h-[130px] border-2 border-gray-400 border-dashed bg-white hover:bg-gray-50 cursor-pointer
                                        flex justify-center items-center rounded-xl ${exampleImageList.length >= 9 ? 'hidden' : ' '}`} onClick={
                                                () => {
                                                    // console.log(cropperModalInstance);
                                                    // cropperModalInstance?.open();


                                                    exampleImageUploaderRef.current.click();

                                                }
                                            }>
                                            <>


                                            </>

                                            <input
                                                id="exampleImageUploader"
                                                type="file"
                                                style={{ display: 'none' }}
                                                ref={exampleImageUploaderRef}
                                                multiple
                                                accept="image/*"
                                                onChange={async (e) => {
                                                    let fileList = (e.target as HTMLInputElement)?.files;
                                                    let imageList: { src: string | ArrayBuffer | null | undefined; }[] = [];
                                                    if (!fileList) return;
                                                    let newFileList
                                                    if (fileList.length + exampleImageList.length > 9) {
                                                        newFileList = Array.from(fileList).slice(0, 9 - exampleImageList.length);
                                                    } else {
                                                        newFileList = Array.from(fileList);
                                                    }


                                                    let formData = new FormData();
                                                    for (let i = 0; i < newFileList.length; i++) {
                                                        formData.append('files', newFileList[i]);
                                                    }
                                                    submitButtonRef.current.disabled = true;

                                                    let res = await fetch(Config().baseUrl + '/image/', {
                                                        method: 'POST',
                                                        headers: {
                                                            "Authorization": "Bearer " + new Cookies().get('accessToken')
                                                        },
                                                        body: formData
                                                    })

                                                    submitButtonRef.current.disabled = false;

                                                    console.log(res);

                                                    if (res.status !== 200) return;

                                                    let data = await res.json();

                                                    setExampleImageList([...exampleImageList, ...data.data.map((image: any) => ({
                                                        src: image.media.link,
                                                        id: image.id
                                                    }))]);

                                                    // const promises = Array.from(newFileList).map((file) => {
                                                    //     return new Promise((resolve, reject) => {
                                                    //         const reader = new FileReader();
                                                    //         reader.onload = function (e2) {
                                                    //             const src = e2.target?.result;
                                                    //             console.log(src);

                                                    //             if (exampleImageList.length >= 9) return;

                                                    //             imageList.push({ src: src });
                                                    //             resolve(true);
                                                    //         };
                                                    //         reader.readAsDataURL(file);
                                                    //     });
                                                    // }
                                                    // );

                                                    // Promise.all(promises).then(() => {
                                                    //     setExampleImageList([...exampleImageList, ...imageList]);
                                                    // });


                                                    // for (let i = 0; i < fileList.length; i++) {
                                                    //     const file = fileList[i];
                                                    //     if (file) {
                                                    //         const reader = new FileReader();
                                                    //         reader.onload = function (e2) {
                                                    //             const src = e2.target?.result;
                                                    //             console.log(src);

                                                    //             if (exampleImageList.length >= 9) return;

                                                    //             imageList.push({ src: src });

                                                    //             // cropperModalOpenRef.current.click();




                                                    //         };
                                                    //         console.log(reader.readAsDataURL(file));
                                                    //     }
                                                    // }
                                                    // setTimeout(() => {

                                                    //     setExampleImageList([...exampleImageList, ...imageList]);
                                                    // }, 300);

                                                }
                                                }
                                            />
                                            <PlusIcon className='w-10 h-10 m-auto text-gray-400' />
                                        </div>
                                    </div>

                                </div>
                            </div>
                            {/* End First Contnet */}
                            {/* Final Contnet */}
                            <div

                                className={`${step === 4 ? 'block' : 'hidden'}`}
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
                                disabled={step === 1 || step === 4 ? true : false}
                                onClick={() => {
                                    setStep(step - 1);

                                }}
                            >
                                <svg
                                    className={`flex-shrink-0 size-4
                                    `}

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
                                className={`inline-flex items-center px-3 py-2 text-sm font-semibold text-white border border-transparent rounded-lg bg-primary gap-x-1 hover:bg-primary disabled:opacity-50 disabled:pointer-events-none
                                ${step === 3 || step === 4 ? 'hidden' : ''}
                                `}
                                onClick={
                                    (e) => {
                                        if (step === 1) {
                                            if (!(title.replaceAll(" ", "") === '' || description.replaceAll(" ", "") === '' || firstCategory === null || secondCategory === null || price === 0 || duration === 0)) {
                                                if (duration > 14 || duration < 1) {
                                                    toast.error('경매 기간은 1일부터 14일까지 가능합니다.', {
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
                                                }else{
                                                    setStep(step + 1);
                                                }


                                            } else {
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
                                            }
                                        } else if (step === 2) {
                                            if (false) {

                                            } else {
                                                setStep(step + 1);
                                            }

                                        }
                                    }
                                }
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
                                className={`inline-flex items-center px-3 py-2 text-sm font-semibold text-white border border-transparent rounded-lg bg-primary gap-x-1 hover:bg-primary disabled:opacity-50 disabled:pointer-events-none
                                ${step === 4 ? '' : 'hidden'}
                                `}
                                onClick={
                                    (e) => {

                                    }
                                }
                            >
                                마이 페이지로
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
                                className={`inline-flex items-center px-3 py-2 text-sm font-semibold text-white border border-transparent rounded-lg bg-primary gap-x-1 hover:bg-primary disabled:opacity-50 disabled:pointer-events-none
                                ${step === 3 ? '' : 'hidden'}
                                `}
                                ref={submitButtonRef}


                                onClick={
                                    async (e) => {


                                        // e.preventDefault();
                                        // console.log(email, password, name, nickname, birthYear, birthMonth, birthDay, gender, firstCategory, secondCategory);
                                        if (mainImageList.length < 1 || exampleImageList.length < 1) {
                                            toast.error('대표 이미지와 작품 예시 이미지를 등록해주세요.', {
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
                                        } else {

                                            submitButtonRef.current.disabled = true;
                                            console.log({
                                                title: title,
                                                description: description,
                                                category: secondCategory,
                                                price: price,
                                                duration: duration,
                                                main_image: mainImageList[0].id,
                                                example_image_list: exampleImageList.map((image) => image.id),
                                                content: editor?.getHTML()
                                            })

                                            // let endDateTime = new Date(endDate);

                                            let res = await fetch(Config().baseUrl + '/artist/goods', {
                                                method: 'POST',
                                                headers: {
                                                    'Content-Type': 'application/json',
                                                    'Accept': 'application/json',
                                                    "Authorization": "Bearer " + new Cookies().get('accessToken')
                                                },
                                                body: JSON.stringify({
                                                    title: title,
                                                    description: description,
                                                    category: secondCategory,
                                                    price: price,
                                                    duration: duration,
                                                    main_image: mainImageList[0].id,
                                                    example_image_list: exampleImageList.map((image) => image.id),
                                                    content: editor?.getHTML()
                                                })
                                            })

                                            console.log(res);

                                            submitButtonRef.current.disabled = false;

                                            if (res.status === 201) {

                                                setStep(step + 1);
                                            } else {
                                                toast.error('상품 등록에 실패하였습니다.', {
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
                                            return;






                                        }
                                    }
                                }
                            >
                                제출
                            </button>
                            <button
                                type="reset"
                                className="inline-flex items-center px-3 py-2 text-sm font-semibold text-white border border-transparent rounded-lg bg-primary gap-x-1 hover:bg-primary disabled:opacity-50 disabled:pointer-events-none"

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
                                onClick={async () => {
                                    const cropper = cropperRef.current?.cropper;
                                    if (cropper) {

                                        // setMainImageList([...mainImageList, {
                                        //     'src': cropper.getCroppedCanvas().toDataURL(),
                                        //     'file': null
                                        // }]);


                                        var blob = dataURLtoFile(cropper.getCroppedCanvas().toDataURL(), tempMainImageTitle); //Converts to blob using link above
                                        let formData = new FormData();
                                        formData.append("files", blob);

                                        submitButtonRef.current.disabled = true;

                                        let res = await fetch(Config().baseUrl + '/image/', {
                                            method: 'POST',
                                            headers: {
                                                "Authorization": "Bearer " + new Cookies().get('accessToken')
                                            },
                                            body: formData
                                        })
                                        submitButtonRef.current.disabled = false;
                                        console.log(res);

                                        if (res.status !== 200) return;

                                        let data = await res.json();

                                        console.log(data);

                                        setMainImageList([...mainImageList, {
                                            'src': data.data[0].media.path,
                                            'file': blob,
                                            'id': data.data[0].id
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

export default NewMarketPage;