// Register page

'use client'

import { useCategory } from '@/app/_store/useCategory';
import JoditEditor from 'jodit-react';

import dynamic from 'next/dynamic';



import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import CustomEditor from '@/app/_components/CustomEditor';
import { CheckCircleIcon, ChevronDoubleLeftIcon, ChevronDoubleRightIcon, PlusIcon, TrashIcon } from '@heroicons/react/24/solid';
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
import { useAuth } from '@/app/_store/useAuth';
import { useGoods } from '@/app/_store/useGoods';
import { error } from 'console';
import Skeleton from 'react-loading-skeleton';
// import  { HSStepper } from 'preline';


const GoodsDealFormPage: React.FC<{
    title?: string, description?: string,
    price?: number, exampleImageList?: any[],
    isEdit?: boolean, artistGoodsId: string, id?: string
}> = (props) => {
    const slug = props.artistGoodsId;

    const [tap, setTap] = useState(1);
    const { backgroundList, mainImage, getGoods, price, reset, title, artist, } = useGoods();

    const stepList = [
        "약관 동의",
        "사용자 유형 선택",
        "기본 정보 입력",
    ];



    const initialStep = 1;

    const {
        accountType, loginType, nickname
    } = useAuth();









    const [content, setContent] = useState<any>('');

    const [dealTitle, setDealTitle] = useState<string>(props.title || '');
    const [dealTitleError, setDealTitleError] = useState<any>('');





    const [dealDescription, setDealDescription] = useState<string>(props.description || '');
    const [dealDescriptionError, setDealDescriptionError] = useState<any>('');








    const [dealPrice, setDealPrice] = useState<number>(props.price || 0);
    const [dealPriceError, setDealPriceError] = useState<any>('');


    const [mainImageList, setMainImageList] = useState<any[]>([]);
    const [tempMainImage, setTempMainImage] = useState<string>('');
    const [exampleImageList, setExampleImageList] = useState<any[]>(props.exampleImageList || []);

    const cropperRef = useRef<ReactCropperElement>(null);
    const [cropperModalInstance, setCropperModalInstance] = useState<any>(null);

    const cropperModalOpenRef = useRef<any>(null);

    const exampleImageUploaderRef = useRef<any>(null);

    let thirdStepperContentRef = useRef<any>(null);

    const cookies = new Cookies();
    const socialLoginInfo = cookies.get('socialLoginInfo',)



    const [socialLoginType, setSocialLoginType] = useState<string>('password');
    const [socialLoginId, setSocialLoginId] = useState<string>('');

    let submitButtonRef = useRef<any>(null);


    const [isEdit, setIsEdit] = useState<boolean>(props.isEdit || false);


    useEffect(() => {
        reset();
        getGoods(slug, false);

    }, []);







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



                        <div className="flex flex-col flex-grow mt-2 overflow-y-auto " >


                            {/* First Contnet */}

                            {/* End First Contnet */}
                            {/* First Contnet */}
                            <div
                                className={
                                    tap === 1 ? '' : 'hidden'
                                }
                            >
                                <div className=" max-w-[90%] mx-auto px-5 py-8 space-y-2 border-dashed rounded-xl flex flex-col gap-6
                                justify-center items-center
                                "


                                >

                                    {
                                        title === undefined ? <div className="w-full max-w-xl">
                                            <Skeleton

                                                height={115} />
                                        </div> : (
                                            <div className='flex flex-row w-full max-w-xl px-2 py-3 text-xl font-semibold text-center bg-slate-100'>

                                                <div className='flex-shrink-0'>
                                                    <img src={mainImage.url} alt="logo" className="h-[100px]" />
                                                </div>
                                                <div className='flex flex-col items-start justify-center flex-grow pl-3 gap'>
                                                    <div className='text-2xl font-semibold'>
                                                        {title}
                                                    </div>
                                                    <div className='text-sm text-gray-500'>
                                                        {artist.nickname}
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    }

                                    <div className={`flex flex-col  max-w-xl w-full gap-2
                                    
                                        `}>
                                        <label
                                            htmlFor="inline-input-label-with-helper-text"
                                            className="block text-lg font-semibold "
                                        >
                                            프로젝트 제목
                                        </label>
                                        <input
                                            type="text"
                                            id="inline-input-label-with-helper-text"
                                            className="block w-full max-w-xl px-4 py-3 border border-gray-200 rounded-lg text-md focus:border-primary focus:ring-primary disabled:opacity-50 disabled:pointer-events-none "
                                            placeholder="프로젝트 제목을 입력해주세요."
                                            aria-describedby="hs-inline-input-helper-text"
                                            value={dealTitle}


                                            onChange={
                                                (e) => {
                                                    setDealTitle(e.target.value)
                                                    if (e.target.value.length > 20) {
                                                        setDealTitleError({ type: "error", message: `프로젝트 제목은 20자 이내로 입력해주세요. (${e.target.value.length} / 20)` });
                                                    } else {
                                                        setDealTitleError({ type: "good", message: `(${e.target.value.length} / 20)` })
                                                    }
                                                }
                                            }
                                        />
                                        {
                                            errorBuilder(dealTitleError)
                                        }
                                    </div>


                                    <div className='flex flex-col w-full max-w-xl gap-2'>
                                        <label
                                            htmlFor="inline-input-label-with-helper-text"
                                            className="block text-lg font-semibold "
                                        >
                                            프로젝트 설명
                                        </label>
                                        <textarea
                                            id="inline-input-label-with-helper-text"
                                            className="block w-full max-w-xl px-4 py-3 border border-gray-200 rounded-lg text-md focus:border-primary focus:ring-primary disabled:opacity-50 disabled:pointer-events-none "
                                            placeholder="프로젝트 설명을 입력해주세요."
                                            aria-describedby="hs-inline-input-helper-text"
                                            value={dealDescription}

                                            onChange={
                                                (e) => {
                                                    setDealDescription(e.target.value)
                                                    if (e.target.value.length > 50) {
                                                        setDealDescriptionError({ type: "error", message: `프로젝트 설명은 500자 이내로 입력해주세요. (${e.target.value.length} / 500)` });
                                                    } else {
                                                        setDealDescriptionError({ type: "good", message: `(${e.target.value.length} / 500)` })
                                                    }
                                                }
                                            }
                                        />
                                        {
                                            errorBuilder(dealDescriptionError)
                                        }
                                    </div>
                                    <div className='flex flex-col w-full max-w-xl'>
                                        <label
                                            htmlFor="inline-input-label-with-helper-text"
                                            className="block text-lg font-semibold"
                                        >
                                            참고 이미지 등록
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
                                                            <img src={exampleImageList[index].url} alt="" className='object-cover h-[130px] w-fit rounded-xl' />
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
                                                            url: image.media.link,
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

                                    <div className='flex flex-col w-full max-w-xl gap-2'>
                                        <label
                                            htmlFor="inline-input-label-with-helper-text"
                                            className="block text-lg font-semibold "
                                        >
                                            희망 거래가
                                        </label>
                                        <div className="relative max-w-xl ">
                                            <input
                                                type="text"
                                                id="hs-input-with-leading-and-trailing-icon"
                                                name="hs-input-with-leading-and-trailing-icon"
                                                className="block w-full max-w-xl px-4 py-3 border border-gray-200 rounded-lg text-md ps-9 pe-16 focus:z-10 focus:border-primary focus:ring-primary disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                                                placeholder={dealPrice.toString()}
                                                onChange={(e) => {
                                                    const value: string = e.target.value;
                                                    const removedCommaValue: number = Number(value.replaceAll(",", ""));
                                                    if (removedCommaValue < 10000) {
                                                        if (removedCommaValue < price) {
                                                            console.log(removedCommaValue, price)
                                                            setDealPriceError({ type: "error", message: `거래가는 최소 가격 ${price}만원 이상으로 입력해주세요.` });
                                                        } else {
                                                            setDealPriceError({ type: "good", message: `` });
                                                        }
                                                        setDealPrice(removedCommaValue);
                                                    }

                                                }}
                                                value={dealPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
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

                                        {
                                            errorBuilder(dealPriceError)
                                        }
                                    </div>

                                    <div className='flex flex-col w-full max-w-xl gap-2 px-10 py-2 bg-white'>
                                        <div className='flex flex-row items-center justify-between text-md'>
                                            <div>
                                                거래 가격
                                            </div>
                                            <div>
                                                <span className='text-xl font-bold'>{(dealPrice * 10000).toLocaleString()}</span> 원
                                            </div>
                                        </div>
                                        <div className='flex flex-row items-center justify-between text-md'>
                                            <div>
                                                부가 가치세
                                            </div>
                                            <div>
                                                <span className='text-xl font-bold'>{(dealPrice * 1000).toLocaleString()}</span> 원
                                            </div>
                                        </div>

                                        <div className='flex flex-row items-center justify-between pt-2 border-t-2 text-md'>
                                            <div>
                                                합계
                                            </div>
                                            <div>
                                                <span className='text-2xl font-bold'>{(dealPrice * 11000).toLocaleString()}</span> 원
                                            </div>
                                        </div>
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

                                            if (dealTitleError && dealTitleError.type === 'error') {
                                                toast.error('제목을 확인해주세요.', {
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

                                            if (dealDescriptionError && dealDescriptionError.type === 'error') {
                                                toast.error('설명을 확인해주세요.', {
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

                                            if (dealPriceError && dealPriceError.type === 'error') {
                                                toast.error('가격을 확인해주세요.', {
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


                                            if (dealTitle === '' || dealDescription === '' || dealPrice === 0) {
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



                                            submitButtonRef.current.disabled = true;

                                            let data = {
                                                title: dealTitle,
                                                description: dealDescription,
                                                price: dealPrice,
                                                artist_goods_id: slug,
                                                request_image_list: exampleImageList.map((image) => image.id),

                                            }
                                            let res;
                                            if (isEdit) {
                                                let data = {
                                                    title: dealTitle,
                                                    description: dealDescription,
                                                    price: dealPrice,
                                                    artist_goods_id: slug,
                                                    request_image_list: exampleImageList.map((image) => image.id),
                                                    id : props.id
                                                }
                                                res = await fetch(Config().baseUrl + '/artist/goods/deal', {
                                                    method: 'PUT',
                                                    headers: {
                                                        'Content-Type': 'application/json',
                                                        'Accept': 'application/json',
                                                        'Authorization': 'Bearer ' + new Cookies().get('accessToken')
                                                    },

                                                    body: JSON.stringify(data)
                                                })
                                            } else {
                                                let data = {
                                                    title: dealTitle,
                                                    description: dealDescription,
                                                    price: dealPrice,
                                                    artist_goods_id: slug,
                                                    request_image_list: exampleImageList.map((image) => image.id),

                                                }
                                                res = await fetch(Config().baseUrl + '/artist/goods/deal', {
                                                    method: 'POST',
                                                    headers: {
                                                        'Content-Type': 'application/json',
                                                        'Accept': 'application/json',
                                                        'Authorization': 'Bearer ' + new Cookies().get('accessToken')
                                                    },

                                                    body: JSON.stringify(data)
                                                })
                                            }


                                            console.log(res);

                                            if (res.status === 200) {
                                                toast.success('등록에 성공했습니다.', {
                                                    position: "top-right",
                                                    autoClose: 3000,
                                                    hideProgressBar: false,
                                                    closeOnClick: true,
                                                    pauseOnHover: true,
                                                    draggable: true,
                                                    progress: undefined,
                                                    theme: "light",

                                                });
                                                window.location.href = '/my';
                                            } else if(res.status === 201){
                                                window.location.href = '/my';
                                            }else{
                                                submitButtonRef.current.disabled = false;
                                                toast.error('등록에 실패했습니다.', {
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
                                    제출
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

export default GoodsDealFormPage;

