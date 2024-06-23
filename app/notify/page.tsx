'use client'
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useCategory } from "../_store/useCategory";
import { useEffect, useState } from "react";

import { ArrowRightIcon, MagnifyingGlassIcon, PencilIcon, PencilSquareIcon, Squares2X2Icon } from "@heroicons/react/24/solid";
import { TrashIcon } from "@heroicons/react/24/outline";
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
import notifyParser from "../_common/notifyParser";


class Notify {

    title: string;
    description: string;
    action: string;
    receiver_id: string[];
    created_at: number;
    type: string;

    constructor(title: string, description: string, action: string, receiver_id: string[], created_at: number, type: string) {

        this.title = title;
        this.description = description;
        this.action = action;
        this.receiver_id = receiver_id;
        this.created_at = created_at;
        this.type = type;
    }


}


export default function MyPage() {



    // const data = await Data();
    // console.log(data);
    const { notifyCount, setNotifyCount, notifyList, setNotifyList, notifyRead, setNotifyRead } = useAuth();

    // const [tmpNotifyCount, setTmpNotifyCount] = useState(notifyCount);
    const [tmpNotifyRead, setTmpNotifyRead] = useState(0);


    let profileImageUploaderRef = React.createRef<HTMLInputElement>();
    let uploadProfileImageButtonRef = React.createRef<HTMLButtonElement>();
    let cropperModalOpenRef = React.createRef<HTMLButtonElement>();
    let cropperRef = React.createRef<any>();

    async function getNotifyList() {
        const res = await fetch(Config().baseUrl + '/notify?is_read=true',
            {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    "Authorization": "Bearer " + new Cookies().get('accessToken')
                },
            }

        );
        const data = await res.json();

        setNotifyList(data.data.notify_list.reverse());
        setNotifyRead(data.data.notify_read);

    }



    useEffect(() => {

        getNotifyList();
        setTmpNotifyRead(0);
        setNotifyCount(0);
    }, []);


    useEffect(() => {
        if (tmpNotifyRead == 0) {
            setTmpNotifyRead(notifyRead);
        }
    }, [notifyRead]);





    const router = useRouter();



    return (
        <main className="w-[100%] h-full mx-auto mt-20 md:mt-16  flex flex-col">
            {/* <div className="mx-auto mt-6 text-4xl font-bold">
      </div> */}
            <div className="w-[40%] mx-auto h-full min-w-[650px]">
                <div className="flex flex-col w-[100%] mt-10 h-full bg-white min-h-[80vh] shadow-md px-6">

                    <div className="flex flex-row items-center justify-between w-full my-5">
                        <div className="ml-3 w-7" />
                        <div className="w-full text-2xl font-semibold text-center">
                            알림
                        </div>
                        <TrashIcon className="mr-3 text-gray-500 cursor-pointer w-7 h-7" onClick={() => {
                            confirm("모든 알림을 삭제하시겠습니까?") && fetch(Config().baseUrl + '/notify/all',
                                {
                                    method: 'DELETE',
                                    headers: {
                                        'Content-Type': 'application/json',
                                        'Accept': 'application/json',
                                        "Authorization": "Bearer " + new Cookies().get('accessToken')
                                    },
                                }

                            ).then(() => {
                                setNotifyList([]);
                            })
                        }} />
                    </div>
                    <div className="overflow-y-auto max-h-[70vh] overflow-x-hidden">
                        {
                            notifyList.map((notify, index) => {
                                return (
                                    <div
                                        key={notify.created_at}
                                        id={"dismiss-alert-" + notify.created_at}
                                        className="w-full p-4 text-sm text-gray-800 transition duration-300 border-b rounded-lg hs-removing:translate-x-5 hs-removing:opacity-0 dark:bg-teal-800/10 dark:border-teal-900 dark:text-teal-500"
                                        role="alert"
                                    >
                                        <div className="flex flex-row items-center w-full">
                                            <div className="flex flex-row items-center ms-2">
                                                <div className="block w-full font-medium text-[1.0rem] text-wrap items-center ">
                                                    <div className={`
                                                       
                                                        mr-[5px] mb-[1px] rounded-full w-[8px] h-[8px] text-xs text-white bg-primary-light inline-block
                                                         ${notify.created_at > tmpNotifyRead ? "animate-pulse" : "hidden"
                                                        }
                                                        `}></div>
                                                    <span dangerouslySetInnerHTML={
                                                        { __html : notifyParser(notify.title) }

                                                    }
                                                    onClick={()=>{
                                                        const action = notify.action;
                                                        const token = action.split('/')[0];
                                                        const id = action.split('/')[1];
                                                        if(token === 'artist_goods_deal'){
                                                            router.push('/market/deal/' + id);
                                                        }
                                                    }}
                                                    className="cursor-pointer"
                                                    >
                                                        
                                                    </span>
                                                    <br />
                                                    <div className="mt-1 text-sm font-medium text-gray-500">
                                                        {dateDiffToKor(notify.created_at)}
                                                    </div>
                                                </div>

                                            </div>
                                            <div className="flex-shrink-0 ps-3 ms-auto">
                                                <div className="-mx-1.5 -my-1.5">
                                                    <button
                                                        type="button"
                                                        className="inline-flex  rounded-lg p-1.5  hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-offset-2 "
                                                        // data-hs-remove-element={"#dismiss-alert-" + notify.created_at.replace('.', '').replaceAll(':', "")}
                                                        onClick={() => {
                                                            fetch(Config().baseUrl + '/notify',
                                                                {
                                                                    body: JSON.stringify(
                                                                        {
                                                                            title: notify.title,
                                                                            description: notify.description,
                                                                            action: notify.action,
                                                                            type: notify.type,
                                                                            receiver_id: notify.receiver_id,
                                                                            created_at: notify.created_at
                                                                        }
                                                                    ),
                                                                    method: 'DELETE',
                                                                    headers: {
                                                                        'Content-Type': 'application/json',
                                                                        'Accept': 'application/json',
                                                                        "Authorization": "Bearer " + new Cookies().get('accessToken')
                                                                    },
                                                                }

                                                            ).then(() => {
                                                                setNotifyList(notifyList.filter((item) => item.created_at !== notify.created_at));

                                                            })
                                                        }}
                                                    >
                                                        <span className="sr-only">Dismiss</span>
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
                                            </div>
                                        </div>
                                    </div>

                                )

                            })
                        }
                    </div>
                </div>
            </div>
            <div className="absolute float-left w-full h-[200px] bg-gray-300 z-[-10]">

            </div>


        </main>
    );
}
