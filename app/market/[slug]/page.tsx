'use client'

import { useGoods } from "@/app/_store/useGoods";
import { FastAverageColor } from "fast-average-color";
import { useEffect, useRef, useState } from "react";


export default function Page({ params }: { params: { slug: string } }) {
  let slug = params.slug;
  let imageRefList = [useRef<any>(null), useRef<any>(null), useRef<any>(null), useRef<any>(null), useRef<any>(null)];
  const { backgroundList, getBackgroundList } = useGoods();
  useEffect(() => {
    getBackgroundList();


  }, []);


  useEffect(() => {
    const fac = new FastAverageColor();
    imageRefList.forEach((imageRef, index) => {
      if (imageRef.current) {
        const img = imageRef.current;
        fac.getColorAsync(img).then((color) => {

          if (imageRef.current) {
            imageRef.current.parentElement.style.backgroundColor = color.hex;
          }
          // imageBackgroundColorList[index] = "bg-[" + color.hex + "]";
          // console.log(imageBackgroundColorList);

        });
      }
    });
  }, [backgroundList]);

  return (
    <main className="w-[80%] h-full mx-auto mt-20 md:mt-16  flex flex-col">
      <>
        {/* Slider */}
        <div
          data-hs-carousel='{
    "loadingClasses": "opacity-0"
  }'
          className="relative"
        >
          <div className="relative w-full overflow-hidden bg-white hs-carousel min-h-[500px] h-[500px] bg-red">
            <div className="absolute top-0 bottom-0 flex transition-transform duration-700 opacity-0 hs-carousel-body start-0 flex-nowrap">

              {
                backgroundList.map((background: string | undefined, index: any) => {
                  return (
                    <div className="hs-carousel-slide">
                      <div className={"flex justify-center h-full "} >
                        <img src={background} alt='samplepf' className={``} ref={imageRefList[index]} />
                      </div>
                    </div>
                  );
                })
              }
            </div>
          </div>
          <button
            type="button"
            className="hs-carousel-prev hs-carousel:disabled:opacity-50 disabled:pointer-events-none absolute inset-y-0 start-0 inline-flex justify-center items-center w-[46px] h-full text-gray-800 hover:bg-gray-800/10  dark:text-white dark:hover:bg-white/10"
          >
            <span className="text-2xl" aria-hidden="true">
              <svg
                className="flex-shrink-0 size-5"
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
                <path d="m15 18-6-6 6-6" />
              </svg>
            </span>
            <span className="sr-only">Previous</span>
          </button>
          <button
            type="button"
            className="hs-carousel-next hs-carousel:disabled:opacity-50 disabled:pointer-events-none absolute inset-y-0 end-0 inline-flex justify-center items-center w-[46px] h-full text-gray-800 hover:bg-gray-800/10 dark:text-white dark:hover:bg-white/10"
          >
            <span className="sr-only">Next</span>
            <span className="text-2xl" aria-hidden="true">
              <svg
                className="flex-shrink-0 size-5"
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
            </span>
          </button>
          <div className="absolute flex justify-center space-x-2 hs-carousel-pagination bottom-3 start-0 end-0">
            {
              backgroundList.map((background: string | undefined, index: any) => {
                return (
                  <span className="border-4 border-gray-400 rounded-full cursor-pointer hs-carousel-active:bg-primary-light hs-carousel-active:border-primary size-5 " />

                );
              })
            }
          </div>
        </div>
        {/* End Slider */}
      </>


    </main>
  );
}