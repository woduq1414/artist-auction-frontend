'use client'
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from 'next/navigation'

import { useEffect, useState } from "react";

import { ArrowRightIcon, MagnifyingGlassIcon, PencilIcon, PencilSquareIcon, Squares2X2Icon, TrashIcon } from "@heroicons/react/24/solid";
import { QueueListIcon } from "@heroicons/react/24/solid";
import Config from "@/config/config.export";
import { get, set } from "lodash";
import Skeleton from "react-loading-skeleton";
import React from "react";

import { Cookies } from "react-cookie";
import Cropper, { ReactCropperElement } from "react-cropper";
import "cropperjs/dist/cropper.css";
import { useAuth } from "@/app/_store/useAuth";
import { toast } from "react-toastify";
import { useImageModal } from "@/app/_store/useImageModal";
import { PaperClipIcon } from "@heroicons/react/24/outline";




export default function Page({ params }: { params: { slug: string } }) {

    // const data = await Data();
    // console.log(data);
    const { checkAuth, isLogin, profileImage, nickname, id, accountType } = useAuth();

    const [deal, setDeal] = useState(undefined) as any;

    const [isMe, setIsMe] = useState(false) as any;
    const [tempProfileImage, setTempProfileImage] = useState(undefined) as any;
    const [tempProfileImageTitle, setTempProfileImageTitle] = useState(undefined) as any;
    const [isUploadingProfileImage, setIsUploadingProfileImage] = useState(false) as any;

    const { modalImage, setModalImage } = useImageModal();

    let profileImageUploaderRef = React.createRef<HTMLInputElement>();
    let uploadProfileImageButtonRef = React.createRef<HTMLButtonElement>();
    let cropperModalOpenRef = React.createRef<HTMLButtonElement>();
    let cropperRef = React.createRef<any>();

    async function getDeal() {
        const res = await fetch(Config().baseUrl + '/artist/goods/deal/' + params.slug,
            {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    "Authorization": "Bearer " + new Cookies().get('accessToken')
                },
            }

        );
        const data = await res.json();

        if (res.status !== 200) {
            window.location.href = "/market"
        }
        console.log(data.data)
        setDeal(data.data);
    }

    useEffect(() => {
        import('preline/preline').then((module) => {
            // alert(props.cat  egory)

            const { HSStaticMethods, HSSelect, HSOverlay } = module;
            HSStaticMethods.autoInit(['tabs']);


        })
        getDeal();
    }, []);


    useEffect(() => {
        if (id === params.slug) {
            setIsMe(true);
        }
    }, [id])

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
                    <div className="w-[350px]  flex-shrink-0 bg-slate-50 flex flex-col  pt-10 items-center">

                        {
                            deal ? <img className="inline-block w-[80%] mx-auto cursor-pointer" src={
                                deal ? deal.artist_goods.image.media.path : '/images/default-profile-image.jpg'
                            } alt="Image Description"
                                onClick={
                                    () => {
                                        router.push('/market/' + deal.artist_goods.id)
                                    }
                                }
                            /> : <Skeleton
                                className="mx-auto"
                                width={280}
                                height={280 / 16 * 9} />
                        }
                        <div className="">
                            {deal ? <Link href={
                                `/market/${deal.artist_goods.id}`

                            }><div className="mt-2 text-2xl font-bold text-center">{deal.artist_goods.title}</div> </Link> : <Skeleton
                                className="mt-2"
                                width={100} height={20} />}
                        </div>


                        {
                            deal && (accountType === 'artist' ? <>
                                <div className="w-[80%] mx-auto mt-6 text-xl font-semibold ">
                                    의뢰인
                                </div>
                                <div className="w-[80%] mx-auto mt-2 flex flex-col items-start">
                                    <div className="flex flex-col items-center">
                                        <img src={
                                            deal.company.profile_image ? deal.company.profile_image.media.link : "https://st3.depositphotos.com/9998432/13335/v/450/depositphotos_133351928-stock-illustration-default-placeholder-man-and-woman.jpg"

                                        } className={`w-[60px] h-[60px] rounded-full ring-1 ring-gray-500 cursor-pointer`}
                                            height={100}
                                            onClick={() => {
                                                router.push(
                                                    "/profile/company/" + deal.company.id
                                                )
                                            }}
                                        />
                                        <span className="text-gray-800 text-[0.9rem] cursor-pointer" onClick={() => {
                                            router.push(
                                                "/profile/company/" + deal.company.id
                                            )
                                        }}>
                                            {
                                                deal.company.nickname
                                            }
                                        </span>
                                    </div>
                                </div>
                            </> : <>
                                <div className="w-[80%] mx-auto mt-6 text-xl font-semibold ">
                                    아티스트
                                </div>
                                <div className="w-[80%] mx-auto mt-2 flex flex-col items-start">
                                    <div className="flex flex-col items-center">
                                        <img src={
                                            deal.artist.profile_image ? deal.artist.profile_image.media.link : "https://st3.depositphotos.com/9998432/13335/v/450/depositphotos_133351928-stock-illustration-default-placeholder-man-and-woman.jpg"

                                        } className={`w-[60px] h-[60px] rounded-full ring-1 ring-gray-500 cursor-pointer`}
                                            height={100}
                                            onClick={() => {
                                                router.push(
                                                    "/profile/artist/" + deal.artist.id
                                                )
                                            }}
                                        />
                                        <span className="text-gray-800 text-[0.9rem] cursor-pointer" onClick={() => {
                                            router.push(
                                                "/profile/artist/" + deal.artist.id
                                            )
                                        }}>
                                            {
                                                deal.artist.nickname
                                            }
                                        </span>
                                    </div>
                                </div>
                            </>
                            )
                        }
                        {/* <div className="w-full">
                            {deal ? <div className="px-3 py-3 mx-8 mt-2 text-[0.9rem] font-medium text-gray-800 bg-slate-100">{profile.description}</div> : <Skeleton
                                className="mx-8 mt-6 "
                                width={350 - 64}
                                height={100} />}
                        </div> */}



                    </div>
                    {
                        deal && <div className="flex-col w-full px-6 py-10">
                            <div className="flex flex-row">
                                <div className="flex flex-col flex-grow gap-2">
                                    <div className="text-2xl font-semibold">
                                        프로젝트 제목

                                    </div>
                                    <div className="text-lg">
                                        {
                                            deal.title
                                        }
                                    </div>

                                </div>
                                <div className="flex-shrink-0">
                                    <div className={`flex flex-row gap-2
                                                                        ${accountType === 'company' && (
                                            deal.status === 'pending'
                                        ) ? '' : 'hidden'}
                                                                        `}>
                                        <div className="flex flex-row items-start justify-center flex-shrink-0 gap-3 ">
                                            <div className={`p-3 rounded-full cursor-pointer bg-gray-200
                                                        
                                                                
                                                                `}
                                                onClick={
                                                    (e) => {
                                                        router.push(`/market/deal/${deal.id}/edit`)
                                                    }
                                                }>

                                                <PencilSquareIcon className="w-4 h-4 text-gray-500" />
                                            </div>

                                        </div>
                                        <div className="flex flex-row items-start justify-center flex-shrink-0 gap-3 mr-2">
                                            <div className={`p-3 rounded-full cursor-pointer bg-gray-200 
                                                           
                                                                
                                                                `}

                                                onClick={
                                                    async (e) => {
                                                        const cfm = confirm(`[${deal.title}] 거래를 취소하시겠습니까?`);

                                                        if (cfm) {
                                                            const res = await fetch(Config().baseUrl + '/artist/goods/deal/' + deal.id, {
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
                            <div className="flex flex-col gap-2 mt-8">
                                <div className="text-2xl font-semibold">
                                    프로젝트 설명

                                </div>
                                <div className="w-full px-4 py-2 text-lg whitespace-pre-wrap bg-slate-100">
                                    {
                                        deal.description
                                    }
                                </div>
                            </div>
                            {deal.request_image_list && deal.request_image_list.length > 0 &&

                                <div className="flex flex-col gap-2 mt-8">
                                    <div className="text-2xl font-semibold">
                                        참고 이미지

                                    </div>
                                    <div className="flex w-full">
                                        {
                                            deal.request_image_list.map((x: { url: string | undefined; }) => {
                                                return <img
                                                    key={x.url}
                                                    className="h-[150px] cursor-pointer"
                                                    src={
                                                        x.url
                                                    }
                                                    onClick={() => {
                                                        if (x.url) {
                                                            setModalImage(x.url)
                                                        }

                                                    }}
                                                />
                                            })

                                        }

                                    </div>
                                </div>
                            }

                            {
                                deal.request_file_list && deal.request_file_list.length > 0 && <div className="flex flex-col gap-2 mt-8">
                                    <div className="text-2xl font-semibold">
                                        첨부 파일

                                    </div>
                                    <div className="flex w-full gap-3">
                                        {
                                            deal.request_file_list.map((x: { url: string, title: string }) => {
                                                return <div className="flex flex-row items-center pl-3 cursor-pointer bg-slate-100 rounded-2xl"
                                                    onClick={() => {

                                                        fetch(x.url, {
                                                            method: 'GET',
                                                        }).then(response => {

                                                            response.blob().then(blob => {
                                                                const url = window.URL.createObjectURL(blob);
                                                                const a = document.createElement('a');
                                                                a.href = url;
                                                                a.download = x.title
                                                                a.click();
                                                            });

                                                        });


                                                    }
                                                    }
                                                >
                                                    <PaperClipIcon className="w-4 h-4 text-gray-600" />
                                                    <div className="py-2 pl-2 pr-4 text-gray-800 rounded-2xl">
                                                        {
                                                            x.title
                                                        }
                                                    </div>
                                                </div>
                                            })
                                        }
                                    </div>
                                </div>
                            }

                            <div className="flex flex-col gap-2 mt-8">
                                <div className="text-2xl font-semibold">
                                    희망 거래가

                                </div>
                                <div className="flex flex-row items-center w-full gap-2">
                                    <div className="text-lg font-medium ">
                                        <span className="text-2xl font-bold">{deal.price.toLocaleString()}</span> 만원 (최소 거래가 {(deal.artist_goods.price / 10000).toLocaleString()} 만원)
                                    </div>

                                </div>

                            </div>

                            <div className={`sticky flex gap-3 my-2 top-[calc(100vh-70px)] z-50 bg-white py-3 flex-row items-center
                                    }
                            `}>
                                <button type="button" className="inline-flex items-center justify-center w-full px-4 py-3 text-sm font-semibold text-gray-800 bg-white border border-gray-200 rounded-lg shadow-sm gap-x-2 hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-800"
                                    onClick={() => {
                                        if (accountType === 'artist') {
                                            router.push('/chat?companyId=' + deal.company.id)
                                        }
                                        else {
                                            router.push(
                                                "/chat?artistId=" + deal.artist.id
                                            )
                                        }
                                    }}
                                >
                                    {
                                        accountType === 'artist' ? "의뢰인과 1:1 대화" : "아티스트와 1:1 대화"
                                    }
                                </button>

                                {
                                    (() => {
                                        let disabledStatusDict: { [key: string]: { [key: string]: boolean } } = {
                                            "artist": {
                                                "pending": false,
                                                "accept": true,
                                                "paid": true
                                            },
                                            "company": {
                                                "pending": true,
                                                "accept": false,
                                                "paid": true
                                            }
                                        }

                                        let activeButtonTextDict: { [key: string]: { [key: string]: string } } = {
                                            "artist": {
                                                "pending": "거래 수락",
                                                "accept": "결제 대기 중",
                                                "paid": "결제 완료"
                                            },
                                            "company": {
                                                "pending": "수락 대기 중",
                                                "accept": "결제 진행",
                                                "paid": "결제 완료"
                                            }
                                        }

                                        let disabledStatus = disabledStatusDict[accountType][deal.status];
                                        let activeButtonText = activeButtonTextDict[accountType][deal.status];

                                        return (<button type="button" className="inline-flex items-center justify-center w-full px-4 py-3 text-sm font-semibold text-white border border-transparent rounded-lg bg-primary gap-x-2 disabled:opacity-50 disabled:pointer-events-none"
                                            disabled={disabledStatus}
                                            onClick={async () => {
                                                if (deal.status == "pending") {
                                                   
                                                    let res = await fetch(Config().baseUrl + '/artist/goods/deal/' + params.slug + "/accept", {
                                                        method: 'PUT',
                                                        headers: {
                                                            'Content-Type': 'application/json',
                                                            'Accept': 'application/json',
                                                            "Authorization": "Bearer " + new Cookies().get('accessToken')
                                                        },

                                                    })

                                                    if (res.status === 201) {
                                                        window.location.reload()
                                                    } else {
                                                        toast.error(
                                                            "알 수 없는 이유로 실패하였습니다."
                                                        )
                                                    }
                                                }else if(deal.status == "accept"){
                                                    router.push('/market/deal/' + params.slug + '/payment')
                                                }
                                            }}

                                        >
                                            {
                                                activeButtonText
                                            }
                                        </button>)
                                    })()
                                }

                            </div>
                        </div>
                    }
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

        </main >
    );
}
