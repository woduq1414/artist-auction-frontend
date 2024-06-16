'use client'
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useCategory } from "../../../_store/useCategory";
import { useEffect, useState } from "react";

import { ArrowRightIcon, MagnifyingGlassIcon, PencilIcon, PencilSquareIcon, Squares2X2Icon, TrashIcon } from "@heroicons/react/24/solid";
import { QueueListIcon } from "@heroicons/react/24/solid";
import Config from "@/config/config.export";
import { get, set } from "lodash";
import Skeleton from "react-loading-skeleton";
import React from "react";
import { dateDiffToKor } from "../../../_common/date";
import { useAuth } from "../../../_store/useAuth";
import { Cookies } from "react-cookie";
import Cropper, { ReactCropperElement } from "react-cropper";
import "cropperjs/dist/cropper.css";




export default function Page({ params }: { params: { slug: string } }) {

    // const data = await Data();
    // console.log(data);
    const { checkAuth, isLogin, profileImage, nickname, id } = useAuth();

    const router = useRouter();
    async function getAccount() {
        const res = await fetch(Config().baseUrl + '/auth/artist/' + params.slug,
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
        
        if(res.status === 200){
            router.replace(
                "/profile/" + data.data.id
            )
        }else{
            window.location.href = "/";
        }
    }

    useEffect(() => {

        getAccount();
    }, []);



    return (
        <main className="w-[100%] h-full mx-auto mt-20 md:mt-16  flex flex-col">
            {/* <div className="mx-auto mt-6 text-4xl font-bold">
      </div> */}
            <div className="w-[80%] mx-auto h-full">
                <div className="flex flex-row w-[100%] mt-10 h-full bg-white min-h-[80vh] shadow-md">
                    <div className="w-[350px]  flex-shrink-0 bg-slate-50 flex flex-col items-center">
                        

                    </div>
                    <div className="w-full px-6 py-8">
                        <>
                         
                        </>

                    </div>
                </div>
            </div>
            <div className="absolute float-left w-full h-[200px] bg-gray-300 z-[-10]">

            </div>
      
     

        </main>
    );
}
