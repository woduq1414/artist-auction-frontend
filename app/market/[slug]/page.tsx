'use client'

import { useGoods } from "@/app/_store/useGoods";
import { FastAverageColor } from "fast-average-color";
import { useEffect, useRef, useState } from "react";
import Chart from "react-apexcharts";
//Or 
import ApexCharts from "react-apexcharts";

import { ArrowRightIcon } from "@heroicons/react/24/solid";

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
    <main className="w-[100%] h-full mx-auto mt-20 md:mt-16  flex flex-col">
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
                    <div className="hs-carousel-slide" key={index}>
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
                  <span key={index} className="border-4 border-gray-400 rounded-full cursor-pointer hs-carousel-active:bg-black hs-carousel-active:border-black size-5 " />

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

            <div className="flex flex-row w-full px-[0%] py-8 my-8 bg-gray-50  rounded-2xl  ">
              <div className="flex flex-col flex-shrink-0 gap-2 mr-[2rem] justify-center w-[350px] items-center border-r-2 border-gray-200">
                <img className="w-[125px] rounded-full " src="https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80" alt="Image Description" />
                <h4 className="text-lg font-light text-gray-600">@김민수</h4>
              </div>
              <div className="mr-[5%] flex flex-col justify-between">
                <div className="flex flex-row flex-wrap gap-3 mb-3">
                  <span className="inline-flex items-center gap-x-1.5 py-1.5 px-3 rounded-full text-xs font-medium bg-primary-light text-white ">인증됨</span>
                  <span className="inline-flex items-center gap-x-1.5 py-1.5 px-3 rounded-full text-xs font-medium bg-gray-100 text-gray-800 ">총 거래수 12회</span>
                  <span className="inline-flex items-center gap-x-1.5 py-1.5 px-3 rounded-full text-xs font-medium bg-gray-100 text-gray-800 ">웹 디자인 전문</span>
                </div>
                <div className="font-light text-left text-md line-clamp-2">
                  안녕하세요 저는 김민수입니다. 그리고 세상을 뒤흔들어놓고 뒤집어놓을 디자이너라고 자부합니다. 저는 디자인을 통해 세상을 놀라게 할 수 있는 무언가를 만들어드리겠습니다. 그리고 엄청나게 기가 막힌 디자인을 매일 같이 뽑아내는 것이 저의 일상이니 많은 관심 부탁드립니다. 그럼 오늘도 좋은 하루 보내세요.
                </div>
                <div className="flex items-center justify-end w-full">
                <button type="button" className="inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-800 bg-white border border-gray-200 rounded-lg shadow-sm gap-x-2 hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-800">
                  포트폴리오로 이동
                  <ArrowRightIcon className="w-4 h-4" />
                </button>
              </div>

              </div>

          
            </div>

            <div ref={priceRef} className="flex flex-row w-full px-[6%] py-8 my-8 bg-gray-50  rounded-2xl shadow-black/2 ">
              <div className="flex flex-col flex-shrink-0 gap-10 mr-[2rem] justify-center">
                <div className="flex flex-row items-center justify-center">
                  <h3 className="mr-3 text-2xl font-light">시작가</h3>
                  <h3 className="text-4xl font-semibold">150,000</h3>
                  <h3 className="ml-2 text-2xl font-light">원</h3>
                </div>
                <div className="flex flex-row items-center justify-center">
                  <h3 className="mr-3 text-2xl font-light">최고가</h3>
                  <h3 className="text-4xl font-semibold">270,000</h3>
                  <h3 className="ml-2 text-2xl font-light">원</h3>
                </div>
                <div className="flex flex-col items-start gap-2">
                  <h3 className="mr-3 font-light text-gray-800 text-md">최근 거래 성사일 : 2024. 05. 27.</h3>
                  <h3 className="mr-3 font-light text-gray-800 text-md">평균 거래가 : 220,000원</h3>
                </div>
              </div>
              <div className="flex-grow">
                <ApexCharts
                  type="line"
                  series={[
                    {
                      name: "거래가",
                      data: [150000, 180000, 240000, 270000, 220000, 220000, 260000],
                    },

                  ]}


                  options={{

                    chart: {

                      width: '100%',
                      toolbar: { show: false },
                      zoom: { enabled: false },
                      fontFamily: 'Pretendard',

                    },
                    xaxis: {
                      categories: ["5/10", "5/16", "5/17", "5/22", "5/24", "5/26", "5/27"],
                    },

                    yaxis: {
                      labels: {
                        formatter: function (value) {
                          return value.toLocaleString('ko-KR') + "원";
                        }
                      },
                    },

                    theme: {
                      mode: 'light',
                      palette: 'palette7',

                    }


                  }}>
                </ApexCharts>
              </div>

            </div>

            <div className="flex gap-3 my-5">
              <button type="button" className="inline-flex items-center justify-center w-full px-4 py-3 text-sm font-semibold text-gray-800 bg-white border border-gray-200 rounded-lg shadow-sm gap-x-2 hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-800">
                아티스트에게 1:1 문의
              </button>

              <button type="button" className="inline-flex items-center justify-center w-full px-4 py-3 text-sm font-semibold text-white border border-transparent rounded-lg bg-primary gap-x-2 disabled:opacity-50 disabled:pointer-events-none">
                거래 진행
              </button>

            </div>


            <div ref={reviewRef}></div>
          </div>
        </div>
      </>


    </main>
  );
}