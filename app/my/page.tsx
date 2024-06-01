'use client'
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useCategory } from "../_store/useCategory";
import { useEffect, useState } from "react";

import { MagnifyingGlassIcon, PencilIcon, PencilSquareIcon, Squares2X2Icon } from "@heroicons/react/24/solid";
import { QueueListIcon } from "@heroicons/react/24/solid";
import Config from "@/config/config.export";
import { get, set } from "lodash";
import Skeleton from "react-loading-skeleton";
import React from "react";
import { dateDiffToKor } from "../_common/date";
import { useAuth } from "../_store/useAuth";
import { Cookies } from "react-cookie";






export default function MyPage() {

    // const data = await Data();
    // console.log(data);
    const { checkAuth, isLogin, profileImage, nickname } = useAuth();

    const [goodsList, setGoodsList] = useState(undefined) as any;

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

    useEffect(() => {
        getMyGoodsList();
    }, []);

    const router = useRouter();
    return (
        <main className="w-[100%] h-full mx-auto mt-20 md:mt-16  flex flex-col">
            {/* <div className="mx-auto mt-6 text-4xl font-bold">
      </div> */}
            <div className="w-[80%] mx-auto h-full">
                <div className="flex flex-row w-[100%] mt-10 h-full bg-white min-h-[80vh] shadow-md">
                    <div className="w-[350px]  flex-shrink-0 bg-slate-50 flex flex-col items-center">
                        <div className="relative inline-block mt-6">
                            <img className="inline-block w-[120px] h-[120px] rounded-full" src={
                                profileImage ? profileImage : "https://st3.depositphotos.com/9998432/13335/v/450/depositphotos_133351928-stock-illustration-default-placeholder-man-and-woman.jpg"

                            } alt="Image Description" />
                            <div className="absolute bottom-0 flex items-center justify-center w-6 h-6 bg-gray-300 rounded-full end-0 ring-1 ring-white dark:ring-neutral-900 ">
                                <PencilIcon className="w-3 h-3 text-gray-700" />
                            </div>


                        </div>
                        <div className="flex-grow">
                            {nickname ? <div className="mt-6 text-2xl font-bold">{nickname}</div> : <Skeleton 
                            className="mt-6"
                            width={100} height={20} />}
                        </div>

                    </div>
                    <div className="w-full px-6 py-8">
                        <div className="my-3 text-2xl font-semibold">
                            내 상품
                        </div>

                        <div className="w-full">
                            {
                                goodsList === undefined ?
                                    <Skeleton height={200} />
                                    :
                                    goodsList.length === 0 ?
                                        <div className="py-20 text-center bg-gray-100 font-xl">
                                            아직 등록된 상품이 없습니다. 상품을 등록해보세요!
                                        </div>
                                        :
                                        <div className="flex flex-col gap-3">
                                            {
                                                goodsList.map((item: any) => {
                                                    return (
                                                        <div key={item.id} className="flex flex-row items-center w-full border-b border-gray-200">
                                                            <div className="flex-shrink-0 text-lg font-semibold">
                                                                <img src={
                                                                    item.image.media.link
                                                                } className={`h-[100px] mb-3 ring-gray-200 ring-1`}
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
                                                            <div className="flex flex-row items-start justify-center flex-shrink-0 gap-3 mr-5">
                                                                <div className="p-3 rounded-full cursor-pointer bg-primary">
                                                                    <PencilSquareIcon className="w-4 h-4 text-white" />
                                                                </div>

                                                            </div>
                                                        </div>
                                                    )

                                                })
                                            }
                                        </div>
                            }
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
                    </div>
                </div>
            </div>
            <div className="absolute float-left w-full h-[200px] bg-gray-300 z-[-10]">

            </div>

        </main>
    );
}
