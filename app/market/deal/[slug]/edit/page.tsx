'use client'

import { useGoods } from "@/app/_store/useGoods";
import { FastAverageColor } from "fast-average-color";
import { useEffect, useRef, useState } from "react";
import Chart from "react-apexcharts";
import { debounce, set, throttle } from 'lodash';
//Or 
import dynamic from 'next/dynamic'



import { ArrowRightIcon } from "@heroicons/react/24/solid";
import { useSwipeable } from "react-swipeable";
import Skeleton from "react-loading-skeleton";
import { useRouter } from "next/navigation";
import { Mark } from "@tiptap/pm/model";
import MarketFormPage from "@/app/_components/MarketFormPage";
import Config from "@/config/config.export";
import { Cookies } from "react-cookie";
import NewDealPage from "@/app/market/[slug]/deal/new/page";
import GoodsDealFormPage from "@/app/_components/GoodsDealFormPage";

const ApexChart = dynamic(() => import("react-apexcharts"), { ssr: false });

export default function Page({ params }: { params: { slug: string } }) {
    let slug = params.slug;


    const [deal, setDeal] = useState<any>(undefined);



    async function getDeal() {
        const res = await fetch(Config().baseUrl + '/artist/goods/deal/' + params.slug + "?isEdit=true",
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

        getDeal();
    }, []);



    return (
        deal === undefined ? <div className="w-full my-auto px-[12%] pt-[10vh]">
            <Skeleton

                height={750} />
        </div> :
            <GoodsDealFormPage
                title={deal.title}
                description={deal.description}

                exampleImageList={deal.request_image_list}
                requestFileList={deal.request_file_list}

                price={deal.price}
                isEdit={true}
                id={slug}
                artistGoodsId={deal.artist_goods.id}

            />
    )




}