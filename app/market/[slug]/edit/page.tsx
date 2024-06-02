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

const ApexChart = dynamic(() => import("react-apexcharts"), { ssr: false });

export default function Page({ params }: { params: { slug: string } }) {
    let slug = params.slug;


    const { backgroundList, mainImage, getGoods, title, description, content, artist, reset, category, price } = useGoods();
    useEffect(() => {
        // reset();
        getGoods(slug, true);

    }, []);



    return (
        title === undefined || mainImage === undefined ? <div className="w-full my-auto px-[12%] pt-[10vh]">
            <Skeleton

                height={750} />
        </div> :
            <MarketFormPage
                title={title}
                description={description}
                content={content}
                exampleImageList={backgroundList}
                mainImageList={[mainImage]}
                category={category}
                price={price}
                isEdit={true}



            />
    )




}