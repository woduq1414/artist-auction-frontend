'use client'
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useCategory } from "../_store/useCategory";
import { useEffect, useState } from "react";

import { ArrowRightIcon, MagnifyingGlassIcon, PencilIcon, PencilSquareIcon, Squares2X2Icon, TrashIcon } from "@heroicons/react/24/solid";
import { QueueListIcon } from "@heroicons/react/24/solid";
import Config from "@/config/config.export";
import { get, set } from "lodash";
import Skeleton from "react-loading-skeleton";
import React from "react";
import { dateDiffToKor } from "../_common/date";
import { useAuth } from "../_store/useAuth";
import { Cookies } from "react-cookie";
import Cropper, { ReactCropperElement } from "react-cropper";
import "cropperjs/dist/cropper.css";




export default function MyPage() {

    // const data = await Data();
    // console.log(data);
    const { checkAuth, isLogin, profileImage, nickname, id, accountType } = useAuth();

    const [goodsList, setGoodsList] = useState(undefined) as any;
    const [dealList, setDealList] = useState(undefined) as any;

    const [tempProfileImage, setTempProfileImage] = useState(undefined) as any;
    const [tempProfileImageTitle, setTempProfileImageTitle] = useState(undefined) as any;
    const [isUploadingProfileImage, setIsUploadingProfileImage] = useState(false) as any;

    let profileImageUploaderRef = React.createRef<HTMLInputElement>();
    let uploadProfileImageButtonRef = React.createRef<HTMLButtonElement>();
    let cropperModalOpenRef = React.createRef<HTMLButtonElement>();
    let cropperRef = React.createRef<any>();

    async function getMyGoodsList() {
        const res = await fetch(Config().baseUrl + '/artist/goods/my',
            {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    "Authorization": "Bearer " + new Cookies().get('accessToken')
                },
            }

        );
        const data = await res.json();
        console.log(data.data.items)
        setGoodsList(data.data.items);
    }

    async function getMyDealList() {
        const res = await fetch(Config().baseUrl + '/artist/goods/deal/my',
            {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    "Authorization": "Bearer " + new Cookies().get('accessToken')
                },
            }

        );
        const data = await res.json();
        console.log(data.data.items)
        setDealList(data.data.items);
    }

    useEffect(() => {

        if (accountType === 'artist') {
            getMyGoodsList();
            getMyDealList();
        } else if (accountType === "company") {
            getMyDealList();
        }

    }, [accountType]);



    const router = useRouter();

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
    function openProfileImageUploader() {
        profileImageUploaderRef.current?.click();
    }

    return (
        <main className="w-[100%] h-full mx-auto mt-20 md:mt-16  flex flex-col">
            {/* <div className="mx-auto mt-6 text-4xl font-bold">
      </div> */}
            <div className="w-[80%] mx-auto h-full">
                <div className="flex flex-row w-[100%] mt-10 h-full bg-white min-h-[80vh] shadow-md">
                    <div className="w-[350px]  flex-shrink-0 bg-slate-50 flex flex-col items-center">
                        <div className="relative inline-block mt-[2.75rem]">
                            <img className="inline-block w-[120px] h-[120px] rounded-full" src={
                                profileImage ? profileImage : "https://st3.depositphotos.com/9998432/13335/v/450/depositphotos_133351928-stock-illustration-default-placeholder-man-and-woman.jpg"

                            } alt="Image Description" />
                            <div className="absolute bottom-0 z-50 flex items-center justify-center w-6 h-6 bg-gray-200 rounded-full cursor-pointer end-0 ring-1 ring-white dark:ring-neutral-900"
                                onClick={openProfileImageUploader}
                            >
                                <PencilIcon className="w-3 h-3 text-gray-500" />
                            </div>
                            <div className="absolute top-0 w-[120px] h-[120px] rounded-full flex items-center justify-center  start-0 ring-1 ring-white dark:ring-neutral-900
                          duration-300 bg-gray-500 opacity-0 bg-opacity-30  text-sm font-semibold hover:opacity-100 cursor-pointer text-white"
                                onClick={openProfileImageUploader}
                            >
                                프로필 사진 변경
                            </div>
                            <input
                                id="profileImageUploader"
                                type="file"
                                style={{ display: 'none' }}
                                ref={profileImageUploaderRef}

                                accept="image/*"
                                onChange={async (e) => {
                                    const fileList = (e.target as HTMLInputElement)?.files;
                                    if (!fileList) return;

                                    for (let i = 0; i < fileList.length; i++) {
                                        const file = fileList[i];
                                        if (file) {

                                            const reader = new FileReader();
                                            reader.onload = function (e2) {
                                                const src = e2.target?.result;
                                                console.log(src);

                                                setTempProfileImage(src as string);
                                                setTempProfileImageTitle(file.name);

                                                cropperModalOpenRef.current?.click();




                                            };
                                            reader.readAsDataURL(file);

                                        }
                                    }

                                }
                                }
                            />

                        </div>
                        <div className="">
                            {nickname ? <div className="mt-6 text-2xl font-bold">{nickname}</div> : <Skeleton
                                className="mt-6"
                                width={100} height={20} />}
                        </div>


                        <button type="button" className="inline-flex items-center px-4 py-2 mt-4 text-sm font-semibold text-gray-800 bg-white border border-gray-200 rounded-lg shadow-sm gap-x-2 hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-800"

                            onClick={() => {
                                router.push(`/profile/${id
                                    }`)

                            }}
                        >
                            프로필로 이동
                            <ArrowRightIcon className="w-4 h-4" />
                        </button>

                    </div>
                    <div className="flex flex-col w-full">
                        <div className="w-full px-6 py-8">
                            <div className="my-3 text-2xl font-semibold">
                                내 거래
                            </div>

                            <div className="w-full  overflow-y-auto max-h-[400px]">
                                {
                                    dealList === undefined ?
                                        <Skeleton height={200} />
                                        :
                                        dealList.length === 0 ?
                                            <div className="py-20 text-center bg-gray-100 font-xl">
                                                아직 거래가 없습니다.
                                            </div>
                                            :
                                            <div className="flex flex-col ">
                                                {
                                                    dealList.map((item: any) => {
                                                        return (
                                                            <div key={item.id} className={`flex flex-row items-center w-full border-b border-gray-200
                                                                px-2 py-3
                                                        ${item.status === 'draft' ? 'bg-gray-100' : ''
                                                                }
                                                                
                                                        `}

                                                            >
                                                                <div className="flex flex-col items-center justify-center flex-shrink-0 text-lg font-semibold w-[80px]">
                                                                    {
                                                                        accountType === "artist" ? (<>
                                                                            <img src={
                                                                                item.company.profile_image ? item.company.profile_image.media.link : "https://st3.depositphotos.com/9998432/13335/v/450/depositphotos_133351928-stock-illustration-default-placeholder-man-and-woman.jpg"

                                                                            } className={`w-[60px] h-[60px] rounded-full ring-1 ring-gray-500 cursor-pointer`}
                                                                                height={100}

                                                                                onClick={() => {
                                                                                    router.push(
                                                                                        "/profile/company/" + item.company.id
                                                                                    )
                                                                                }}
                                                                            />
                                                                            <span className="text-gray-800 text-[0.9rem] cursor-pointer" onClick={() => {
                                                                                router.push(
                                                                                    "/profile/company/" + item.company.id
                                                                                )
                                                                            }}>
                                                                                {
                                                                                    item.company.nickname
                                                                                }
                                                                            </span>
                                                                        </>) : (<>
                                                                            <img src={
                                                                                item.artist.profile_image ? item.artist.profile_image.media.link : "https://st3.depositphotos.com/9998432/13335/v/450/depositphotos_133351928-stock-illustration-default-placeholder-man-and-woman.jpg"

                                                                            } className={`w-[60px] h-[60px] rounded-full ring-1 ring-gray-500 cursor-pointer`}
                                                                                height={100}
                                                                                onClick={() => {
                                                                                    router.push(
                                                                                        "/profile/artist/" + item.artist.id
                                                                                    )
                                                                                }}
                                                                            />
                                                                            <span className="text-gray-800 text-[0.9rem] cursor-pointer" onClick={() => {
                                                                                router.push(
                                                                                    "/profile/artist/" + item.artist.id
                                                                                )
                                                                            }}>
                                                                                {
                                                                                    item.artist.nickname
                                                                                }
                                                                            </span>
                                                                        </>)
                                                                    }

                                                                </div>
                                                                <div className="flex flex-col items-start justify-center flex-grow gap-2 ml-5">
                                                                    <div className="flex flex-row items-center text-2xl font-semibold">
                                                                        <Link href={
                                                                            `/market/deal/${item.id}`

                                                                        }>
                                                                            {item.title}
                                                                        </Link>
                                                                        <span className="ml-2 inline-flex items-center gap-x-1.5 py-1 px-3 rounded-full text-xs font-medium bg-primary-light text-white">{
                                                                            item.status === 'pending' ? '거래 대기' : item.status === 'accept' ? '결제 대기 중' : item.status === 'paid' ? '결제 완료' : '거래 완료'
                                                                        }</span>
                                                                    </div>
                                                                    <div className="flex flex-row items-center text-gray-500 cursor-pointer text-md"
                                                                        onClick={
                                                                            (e) => {
                                                                                router.push(`/market/${item.artist_goods.id}`)
                                                                            }
                                                                        }


                                                                    >{`[ ${item.artist_goods.title} ] 상품에 대한 거래`}

                                                                    </div>


                                                                </div>
                                                                <div className="flex flex-row items-center justify-center flex-shrink-0 gap-5 mr-2">
                                                                    <div className="flex flex-col items-end ">
                                                                        <div className="text-lg font-medium ">
                                                                            희망 거래가 <span className="text-2xl font-bold">{(item.price / 10000).toLocaleString()}</span> 만원
                                                                        </div>
                                                                        <div className="text-sm font-medium text-gray-500">
                                                                            최소 거래가 {(item.artist_goods.price / 10000).toLocaleString()} 만원
                                                                        </div>
                                                                    </div>

                                                                    <div className={`flex flex-row gap-2
                                                                        ${accountType === 'artist' && (
                                                                            item.status === 'pending'
                                                                        )
                                                                            ? '' : 'hidden'}
                                                                        `}>
                                                                        <div className="flex flex-row items-start justify-center flex-shrink-0 gap-3 ">
                                                                            <div className={`p-3 rounded-full cursor-pointer bg-primary
                                                        
                                                                
                                                                `}
                                                                                onClick={
                                                                                    (e) => {
                                                                                        router.push(`/market/deal/${item.id}/edit`)
                                                                                    }
                                                                                }>

                                                                                <PencilSquareIcon className="w-4 h-4 text-white" />
                                                                            </div>

                                                                        </div>
                                                                        <div className="flex flex-row items-start justify-center flex-shrink-0 gap-3 mr-2">
                                                                            <div className={`p-3 rounded-full cursor-pointer bg-gray-200 
                                                           
                                                                
                                                                `}

                                                                                onClick={
                                                                                    async (e) => {
                                                                                        const cfm = confirm(`[${item.title}] 거래를 취소하시겠습니까?`);

                                                                                        if (cfm) {
                                                                                            const res = await fetch(Config().baseUrl + '/artist/goods/deal/' + item.id, {
                                                                                                method: 'DELETE',
                                                                                                headers: {
                                                                                                    'Accept': 'application/json',
                                                                                                    "Authorization": "Bearer " + new Cookies().get('accessToken')
                                                                                                },
                                                                                            })
                                                                                            console.log(res);
                                                                                            if (res.status === 200) {
                                                                                                window.location.reload();
                                                                                            }
                                                                                        }
                                                                                    }
                                                                                }>

                                                                                <TrashIcon className="w-4 h-4 text-gray-500" />
                                                                            </div>

                                                                        </div>


                                                                    </div>



                                                                </div>

                                                            </div>
                                                        )

                                                    })
                                                }
                                            </div>
                                }

                            </div>
                        </div>
                        {
                            accountType === 'artist' && <div className="flex-col w-full px-6 py-8">
                                <div className="my-0 text-2xl font-semibold">
                                    내 상품
                                </div>

                                <div className="w-full  overflow-y-auto max-h-[500px]">
                                    {
                                        goodsList === undefined ?
                                            <Skeleton height={200} />
                                            :
                                            goodsList.length === 0 ?
                                                <div className="py-20 text-center bg-gray-100 font-xl">
                                                    아직 등록된 상품이 없습니다. 상품을 등록해보세요!
                                                </div>
                                                :
                                                <div className="flex flex-col ">
                                                    {
                                                        goodsList.map((item: any) => {
                                                            return (
                                                                <div key={item.id} className={`flex flex-row items-center w-full border-b border-gray-200
                                                    ${item.status === 'draft' ? 'bg-gray-100' : ''
                                                                    }
                                                    `}>
                                                                    <div className="flex-shrink-0 text-lg font-semibold">
                                                                        <img src={
                                                                            item.image.media.link
                                                                        } className={`h-[100px] my-3 ring-gray-200 ring-1`}
                                                                            height={100}
                                                                        />
                                                                    </div>
                                                                    <div className="flex flex-col items-start justify-center flex-grow gap-3 ml-5">
                                                                        <div className="text-2xl font-semibold">
                                                                            <Link href={
                                                                                `/market/${item.id}`

                                                                            }>
                                                                                {item.title}
                                                                            </Link></div>
                                                                        <div className="text-sm text-gray-500">{new Date(Date.parse(item.created_at)).toISOString().substring(0, 10)} 등록</div>


                                                                    </div>
                                                                    <div className="flex flex-row items-start justify-center flex-shrink-0 gap-3 mr-2">
                                                                        <div className={`p-3 rounded-full cursor-pointer bg-primary
                                                            ${item.status != 'draft' ? 'hidden' : ''}
                                                            
                                                            `}
                                                                            onClick={
                                                                                (e) => {
                                                                                    router.push(`/market/${item.id}/edit`)
                                                                                }
                                                                            }>

                                                                            <PencilSquareIcon className="w-4 h-4 text-white" />
                                                                        </div>

                                                                    </div>
                                                                    <div className="flex flex-row items-start justify-center flex-shrink-0 gap-3 mr-5">
                                                                        <div className={`p-3 rounded-full cursor-pointer bg-gray-200 
                                                            ${item.status != 'draft' ? 'hidden' : ''}
                                                            
                                                            `}

                                                                            onClick={
                                                                                async (e) => {
                                                                                    const cfm = confirm(`[${item.title}] 상품의 임시저장본을 삭제하시겠습니까?`);

                                                                                    if (cfm) {
                                                                                        const res = await fetch(Config().baseUrl + '/artist/goods/' + item.id, {
                                                                                            method: 'DELETE',
                                                                                            headers: {
                                                                                                'Accept': 'application/json',
                                                                                                "Authorization": "Bearer " + new Cookies().get('accessToken')
                                                                                            },
                                                                                        })
                                                                                        console.log(res);
                                                                                        if (res.status === 200) {
                                                                                            window.location.reload();
                                                                                        }
                                                                                    }
                                                                                }
                                                                            }>

                                                                            <TrashIcon className="w-4 h-4 text-gray-500" />
                                                                        </div>

                                                                    </div>
                                                                </div>
                                                            )

                                                        })
                                                    }
                                                </div>
                                    }

                                </div>
                                <div className="flex flex-row justify-end w-full mt-4">
                                    <button
                                        type="button"
                                        className={`inline-flex items-center px-3 py-2 text-sm font-semibold text-white border border-transparent rounded-lg bg-primary gap-x-1 hover:bg-primary disabled:opacity-50 disabled:pointer-events-none
                       
                            `}
                                        onClick={
                                            (e) => {

                                                router.push('/market/new')
                                            }
                                        }
                                    >
                                        새 상품 등록
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
                                </div>
                            </div>
                        }
                    </div>
                </div>
            </div>
            <div className="absolute float-left w-full h-[200px] bg-gray-300 z-[-10]">

            </div>
            <button type="button" data-hs-overlay="#cropperModal"
                className='hidden'
                ref={cropperModalOpenRef}
            >
                Open modal
            </button>
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
                                    tempProfileImage
                                }
                                style={{ height: 400, width: "100%" }}
                                // Cropper.js options
                                initialAspectRatio={1 / 1}
                                aspectRatio={1 / 1}
                                autoCropArea={1}
                                viewMode={1}
                                guides={false}
                                crop={() => {


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
                                // data-hs-overlay="#cropperModal"
                                ref={uploadProfileImageButtonRef}

                                onClick={async () => {
                                    uploadProfileImageButtonRef.current?.setAttribute('disabled', 'true');


                                    const cropper = cropperRef.current?.cropper;
                                    if (cropper) {

                                        // setMainImageList([...mainImageList, {
                                        //     'src': cropper.getCroppedCanvas().toDataURL(),
                                        //     'file': null
                                        // }]);


                                        var blob = dataURLtoFile(cropper.getCroppedCanvas().toDataURL(), tempProfileImageTitle); //Converts to blob using link above
                                        let formData = new FormData();
                                        formData.append("files", blob);


                                        let res = await fetch(Config().baseUrl + '/image/', {
                                            method: 'POST',
                                            headers: {
                                                "Authorization": "Bearer " + new Cookies().get('accessToken')
                                            },
                                            body: formData
                                        })

                                        console.log(res);

                                        if (res.status !== 200) return;

                                        let data = await res.json();

                                        console.log(data);

                                        let res2 = await fetch(Config().baseUrl + '/auth/profile-image?image_media_id=' + data.data[0].id, {
                                            method: 'PUT',
                                            headers: {

                                                "Authorization": "Bearer " + new Cookies().get('accessToken')
                                            },

                                        })
                                        // let res2 = await fetch(Config().baseUrl + '/artist/profile-image?image_media_id=' + '018fd249-aeab-7f3a-ae44-9b6efd69a209', {
                                        //     method: 'PUT',
                                        //     headers: {

                                        //         "Authorization": "Bearer " + new Cookies().get('accessToken')
                                        //     },

                                        // })
                                        console.log(res2);
                                        let data2 = await res2.json();
                                        console.log(data2);
                                        if (res2.status === 200) {

                                            let accessToken = data2.data.accessToken;
                                            const cookies = new Cookies();
                                            cookies.set('accessToken', accessToken, {
                                                path: '/',
                                                domain: Config().cookieDomain,
                                            });

                                            window.location.reload();


                                        }


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
}
