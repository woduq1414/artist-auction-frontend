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
import errorBuilder from '@/app/_common/errorBuilder';
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import MarketFormPage from '@/app/_components/MarketFormPage';
import GoodsDealFormPage from '@/app/_components/GoodsDealFormPage';
import Skeleton from 'react-loading-skeleton';



const NewDealPage = function Page({ params }: { params: { slug: string } }) {
    let [canMakeDeal, setCanMakeDeal] = useState<boolean | undefined>(undefined);
    const router = useRouter();
    async function checkCanMakeDeal() {
        const res = await fetch(Config().baseUrl + '/artist/goods/deal/my?artist_goods_id=' + params.slug,
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
      
        if(res.status !== 200){
            // window.location.href = "/market"
            return;
        }
        if(data.data.items.length > 0){
            router.replace(
                "/market/deal/" + data.data.items[0].id
            )
            setTimeout(() => {
                setCanMakeDeal(false);
            }, 300);
        }else{
            setCanMakeDeal(true);
        }
      
    }

    useEffect(() => {
        checkCanMakeDeal();
    }, []);


    return (
        canMakeDeal === undefined ? <div className="w-full my-auto px-[12%] pt-[10vh]">
            <Skeleton

                height={750} />
        </div> :
        <GoodsDealFormPage isEdit={false} artistGoodsId={params.slug}/>
    )

}

export default NewDealPage;