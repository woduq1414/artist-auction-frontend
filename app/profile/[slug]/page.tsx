'use client'
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useCategory } from "../../_store/useCategory";
import { useEffect, useState } from "react";

import { ArrowRightIcon, MagnifyingGlassIcon, PencilIcon, PencilSquareIcon, Squares2X2Icon, TrashIcon } from "@heroicons/react/24/solid";
import { QueueListIcon } from "@heroicons/react/24/solid";
import Config from "@/config/config.export";
import { get, set } from "lodash";
import Skeleton from "react-loading-skeleton";
import React from "react";
import { dateDiffToKor } from "../../_common/date";
import { useAuth } from "../../_store/useAuth";
import { Cookies } from "react-cookie";
import Cropper, { ReactCropperElement } from "react-cropper";
import "cropperjs/dist/cropper.css";




export default function Page({ params }: { params: { slug: string } }) {

    // const data = await Data();
    // console.log(data);
    const { checkAuth, isLogin, profileImage, nickname, id } = useAuth();

    const [profile, setProfile] = useState(undefined) as any;
    const [isMe, setIsMe] = useState(false) as any;
    const [tempProfileImage, setTempProfileImage] = useState(undefined) as any;
    const [tempProfileImageTitle, setTempProfileImageTitle] = useState(undefined) as any;
    const [isUploadingProfileImage, setIsUploadingProfileImage] = useState(false) as any;

    let profileImageUploaderRef = React.createRef<HTMLInputElement>();
    let uploadProfileImageButtonRef = React.createRef<HTMLButtonElement>();
    let cropperModalOpenRef = React.createRef<HTMLButtonElement>();
    let cropperRef = React.createRef<any>();

    async function getProfile() {
        const res = await fetch(Config().baseUrl + '/auth/profile/' + params.slug,
            {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    "Authorization": "Bearer " + new Cookies().get('accessToken')
                },
            }

        );
        const data = await res.json();
        console.log(data.data)
        setProfile(data.data);
    }

    useEffect(() => {
        import('preline/preline').then((module) => {
            // alert(props.cat  egory)

            const { HSStaticMethods, HSSelect, HSOverlay } = module;
            HSStaticMethods.autoInit(['tabs']);


        })
        getProfile();
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
                    <div className="w-[350px]  flex-shrink-0 bg-slate-50 flex flex-col items-center">
                        <div className="relative inline-block mt-[2.75rem]">
                            <img className="inline-block w-[120px] h-[120px] rounded-full" src={
                                profile && profile.profile_image ? profile.profile_image.media.path : "https://st3.depositphotos.com/9998432/13335/v/450/depositphotos_133351928-stock-illustration-default-placeholder-man-and-woman.jpg"

                            } alt="Image Description" />
                            <div className={`absolute bottom-0 z-50 flex items-center justify-center w-6 h-6 bg-gray-200 rounded-full cursor-pointer end-0 ring-1 ring-white dark:ring-neutral-900
                            ${!isMe && `hidden`
                                }
                            `}
                                onClick={openProfileImageUploader}
                            >
                                <PencilIcon className="w-3 h-3 text-gray-500" />
                            </div>
                            <div className={`absolute top-0 w-[120px] h-[120px] rounded-full flex items-center justify-center  start-0 ring-1 ring-white dark:ring-neutral-900
                          duration-300 bg-gray-500 opacity-0 bg-opacity-30  text-sm font-semibold hover:opacity-100 cursor-pointer text-white
                          ${!isMe && `hidden`
                                }
                          `
                            }
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
                            {profile ? <div className="mt-6 text-2xl font-bold">{profile.nickname}</div> : <Skeleton
                                className="mt-6"
                                width={100} height={20} />}
                        </div>
                        <div className="w-full">
                            {profile ? <div className="px-3 py-3 mx-8 mt-2 text-[0.9rem] font-medium text-gray-800 bg-slate-100">{profile.description}</div> : <Skeleton
                                className="mx-8 mt-6 "
                                width={350 - 64}
                                height={100} />}
                        </div>

                        <button type="button" className={`inline-flex items-center px-4 py-2 mt-4 text-sm font-semibold text-gray-800 bg-white border border-gray-200 rounded-lg shadow-sm gap-x-2 hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-800
                        ${!isMe && `hidden`
                            }
                        `}

                            onClick={() => {
                                router.push(`/profile/edit`)
                            }}
                        >
                            프로필 수정
                            <PencilSquareIcon className="w-4 h-4" />
                        </button>

                    </div>
                    <div className="w-full px-6 py-8">
                        <>
                            <div className="border-b border-gray-200 dark:border-neutral-700">
                                <nav className="flex space-x-5" aria-label="Tabs" role="tablist">
                                    <button
                                        type="button"
                                        className="inline-flex items-center px-1 py-2 text-gray-500 border-b-2 border-transparent text-md hs-tab-active:font-semibold hs-tab-active:border-primary hs-tab-active:text-primary gap-x-2 whitespace-nowrap hover:text-primary focus:outline-none focus:text-primary disabled:opacity-50 disabled:pointer-events-none dark:text-neutral-400 dark:hover:text-blue-500 active"
                                        id="tabs-with-underline-item-1"
                                        data-hs-tab="#tabs-with-underline-1"
                                        aria-controls="tabs-with-underline-1"
                                        role="tab"
                                    >
                                        소개
                                    </button>
                                    <button
                                        type="button"
                                        className="inline-flex items-center px-1 py-2 text-gray-500 border-b-2 border-transparent text-md hs-tab-active:font-semibold hs-tab-active:border-primary hs-tab-active:text-primary gap-x-2 whitespace-nowrap hover:text-primary focus:outline-none focus:text-primary disabled:opacity-50 disabled:pointer-events-none dark:text-neutral-400 dark:hover:text-blue-500"
                                        id="tabs-with-underline-item-2"
                                        data-hs-tab="#tabs-with-underline-2"
                                        aria-controls="tabs-with-underline-2"
                                        role="tab"
                                    >
                                        포트폴리오
                                    </button>

                                </nav>
                            </div>
                            <div className="mt-3">
                                <div
                                    id="tabs-with-underline-1"
                                    role="tabpanel"
                                    aria-labelledby="tabs-with-underline-item-1"
                                >
                                    {
                                        profile ? <div dangerouslySetInnerHTML={
                                            { __html: profile.content }

                                        } /> : <Skeleton count={5} />
                                    }
                                </div>
                                <div
                                    id="tabs-with-underline-2"
                                    className="hidden"
                                    role="tabpanel"
                                    aria-labelledby="tabs-with-underline-item-2"
                                >
                                    <p className="text-gray-500 dark:text-neutral-400">
                                        This is the{" "}
                                        <em className="font-semibold text-gray-800 dark:text-neutral-200">
                                            second
                                        </em>{" "}
                                        item's tab body.
                                    </p>
                                </div>
                                <div
                                    id="tabs-with-underline-3"
                                    className="hidden"
                                    role="tabpanel"
                                    aria-labelledby="tabs-with-underline-item-3"
                                >
                                    <p className="text-gray-500 dark:text-neutral-400">
                                        This is the{" "}
                                        <em className="font-semibold text-gray-800 dark:text-neutral-200">
                                            third
                                        </em>{" "}
                                        item's tab body.
                                    </p>
                                </div>
                            </div>
                        </>

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
