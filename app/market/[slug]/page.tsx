'use client'

import { useGoods } from "@/app/_store/useGoods";
import { FastAverageColor } from "fast-average-color";
import { useEffect, useRef, useState } from "react";


export default function Page({ params }: { params: { slug: string } }) {
  let slug = params.slug;
  let imageRefList = [useRef<any>(null), useRef<any>(null), useRef<any>(null), useRef<any>(null), useRef<any>(null)];

  let contentRef = useRef<any>(null);
  let priceRef = useRef<any>(null);
  let reviewRef = useRef<any>(null);

  const { backgroundList, getGoods, title, description, content } = useGoods();
  useEffect(() => {
    getGoods();


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
          <div className="relative w-full overflow-x-hidden bg-white hs-carousel min-h-[500px] h-[500px] bg-red">
            <div className="absolute top-0 bottom-0 flex transition-transform duration-700 opacity-0 hs-carousel-body start-0 flex-nowrap">

              {
                backgroundList.map((background: string | undefined, index: any) => {
                  return (
                    <div className="hs-carousel-slide">
                      <div className={"flex justify-center h-[480px] "} >
                        <img src={background} alt='samplepf' className={`relative top-[20px]`} ref={imageRefList[index]} />
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
                  <span className="border-4 border-gray-400 rounded-full cursor-pointer hs-carousel-active:bg-black hs-carousel-active:border-black size-5 " />

                );
              })
            }
          </div>
        </div>
        {/* End Slider */}

        <div className="w-full m-auto text-center">
          <h1 className="mt-6 text-4xl font-bold">{title}</h1>
          <p className="mt-5 text-lg">{description}</p>
          <div className="px-[15%] mt-5">
            <>
              <div className="border-b border-gray-200 dark:border-neutral-700">
                <nav
                  className="-mb-0.5 flex justify-center space-x-6"
                  aria-label="Tabs"
                  role="tablist"
                >
                  <button
                    type="button"
                    className="w-[30%] justify-center inline-flex items-center px-1 py-2 text-sm text-gray-500 border-b-2 border-transparent hs-tab-active:font-semibold hs-tab-active:border-primary hs-tab-active:text-primary gap-x-2 whitespace-nowrap hover:text-primary focus:outline-none focus:text-primary disabled:opacity-50 disabled:pointer-events-none dark:text-neutral-400 active"
                    id="horizontal-alignment-item-1"
                    data-hs-tab="#horizontal-alignment-1"
                    aria-controls="horizontal-alignment-1"
                    role="tab"
                    onClick={() => {
                      contentRef.current.scrollIntoView({ behavior: 'smooth' });
                    }}
                  >
                    상품 설명
                  </button>
                  <button
                    type="button"
                    className="w-[30%] justify-center inline-flex items-center px-1 py-2 text-sm text-gray-500 border-b-2 border-transparent hs-tab-active:font-semibold hs-tab-active:border-primary hs-tab-active:text-primary gap-x-2 whitespace-nowrap hover:text-primary focus:outline-none focus:text-primary disabled:opacity-50 disabled:pointer-events-none dark:text-neutral-400 "
                    id="horizontal-alignment-item-2"
                    data-hs-tab="#horizontal-alignment-2"
                    aria-controls="horizontal-alignment-2"
                    role="tab"
                    onClick={() => {
                      priceRef.current.scrollIntoView({ behavior: 'smooth' });
                    }}
                  >
                    가격
                  </button>
                  <button
                    type="button"
                    className="w-[30%] justify-center inline-flex items-center px-1 py-2 text-sm text-gray-500 border-b-2 border-transparent hs-tab-active:font-semibold hs-tab-active:border-primary hs-tab-active:text-primary gap-x-2 whitespace-nowrap hover:text-primary focus:outline-none focus:text-primary disabled:opacity-50 disabled:pointer-events-none dark:text-neutral-400 "
                    id="horizontal-alignment-item-3"
                    data-hs-tab="#horizontal-alignment-3"
                    aria-controls="horizontal-alignment-3"
                    role="tab"
                    onClick={() => {
                      reviewRef.current.scrollIntoView({ behavior: 'smooth' });
                    }}
                  >
                    후기
                  </button>
                </nav>
              </div>
              <div className="mt-3">
                <div
                  id="horizontal-alignment-1"
                  role="tabpanel"
                  aria-labelledby="horizontal-alignment-item-1"
                >
           
                </div>
                <div
                  id="horizontal-alignment-2"
                  className="hidden"
                  role="tabpanel"
                  aria-labelledby="horizontal-alignment-item-2"
                >
                 
                </div>
                <div
                  id="horizontal-alignment-3"
                  className="hidden"
                  role="tabpanel"
                  aria-labelledby="horizontal-alignment-item-3"
                >
               
                </div>
              </div>
            </>


            <p className="mt-5 text-lg leading-10 whitespace-pre-line" ref={contentRef}>{content}</p>
            <div ref={priceRef}></div>
            <div ref={reviewRef}></div>
          </div>
        </div>
      </>


    </main>
  );
}