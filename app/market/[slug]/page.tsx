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

const ApexChart = dynamic(() => import("react-apexcharts"), { ssr: false });

export default function Page({ params }: { params: { slug: string } }) {
  let slug = params.slug;
  let imageRefList = [useRef<any>(null), useRef<any>(null), useRef<any>(null), useRef<any>(null),
  useRef<any>(null), useRef<any>(null), useRef<any>(null), useRef<any>(null), useRef<any>(null), useRef<any>(null)];

  let contentRef = useRef<any>(null);
  let priceRef = useRef<any>(null);
  let reviewRef = useRef<any>(null);

  let mainRef = useRef<any>(null);

  let carouselPrevRef = useRef<any>(null);
  let carouselNextRef = useRef<any>(null);

  const [isSectionMovingAllowed, setIsSectionMovingAllowed] = useState(true);

  const [tempTitle, setTempTitle] = useState("");


  const [currentSection, setCurrentSection] = useState(0);

  const { backgroundList, getGoods, title, description, content, artist, reset } = useGoods();
  useEffect(() => {
    reset();
    fetchGoods();

  }, []);

  async function fetchGoods() {
    let title = await getGoods(
      slug, false
    )
    // alert(title);
    setTempTitle(title);
  }


  const router = useRouter();





  const handleScroll = throttle(() => {
    if (!isSectionMovingAllowed) return;
    const currentScrollY = window.scrollY;
    // console.log(currentScrollY, reviewRef.current.offsetTop, priceRef.current.offsetTop, contentRef.current.offsetTop, currentSection);
    // console.log(-(mainRef.current.clientHeight - currentScrollY - window.innerHeight));

    if(reviewRef.current === null || priceRef.current === null || contentRef.current === null) return;

    if (currentScrollY + 126 >= reviewRef.current.offsetTop || -(mainRef.current.clientHeight - currentScrollY - window.innerHeight) >= 78) {
      setCurrentSection(2);
    } else if (currentScrollY + 126 >= priceRef.current.offsetTop) {
      setCurrentSection(1);
    } else {

      setCurrentSection(0);




    }

  }, 30);

  useEffect(() => {
    handleScroll();
    window.addEventListener("scroll", handleScroll);



    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);


  useEffect(() => {
    const fac = new FastAverageColor();
    imageRefList.forEach((imageRef, index) => {
      if (imageRef.current) {
        const img = imageRef.current;
        img.crossOrigin = "anonymous";
        fac.getColorAsync(img).then((color) => {

          if (imageRef.current) {
            imageRef.current.parentElement.style.backgroundColor = color.hex;
          }
          // imageBackgroundColorList[index] = "bg-[" + color.hex + "]";
          // console.log(imageBackgroundColorList);

        });
      }

    });

    if (backgroundList.length > 0 && tempTitle != '') {
      console.log(backgroundList,   "!!")
      import('preline/preline').then((module) => {

        const { HSStaticMethods, HSCarousel } = module;
        // type HSSelect = import('preline/preline').HSSelect;



        // stepper.setProcessedNavItem(3);




        HSStaticMethods.autoInit([
          'carousel'
        ]);


      });

    }


  }, [backgroundList, tempTitle]);

  const handlers = useSwipeable({
    onSwipedLeft: () => {
      carouselNextRef.current.click();
    },
    onSwipedRight: () => {
      carouselPrevRef.current.click();
    },
    swipeDuration: 500,
    preventScrollOnSwipe: true,
    trackMouse: true
  });




  return (
    <main className="w-[100%] h-full mx-auto mt-20 md:mt-16  flex flex-col " ref={mainRef}>
      <>
        {/* Slider */}
        <div id="carousel"
          data-hs-carousel='{
    "loadingClasses": "opacity-0"
  }'
          className="relative"

        >
          <div className={`relative w-full overflow-x-hidden hs-carousel min-h-[500px] h-[500px] bg-red 
            ${backgroundList.length == 0 ? 'bg-slate-100 ' : 'bg-white'}
          `}  >
            <div className="absolute top-0 bottom-0 flex transition-transform duration-700 opacity-0 hs-carousel-body start-0 flex-nowrap">

              {
                title && backgroundList.map((background: any | undefined, index: any) => {
                  return (
                    <div className="hs-carousel-slide" key={index}  >
                      <div className={"flex justify-center h-[480px] "} {...handlers}>
                        <div className="relative top-[20px] 
                        w-full h-[480px]
                        bg-contain
                         bg-center bg-no-repeat" style={{ backgroundImage: `url(${background.url})` }}></div>
                        <img src={background.url} alt='samplepf' className={`relative top-[20px] hidden`} ref={imageRefList[index]} />

                      </div>
                    </div>
                  );
                })
              }
            </div>
          </div>
          <button
            type="button"
            className={`hs-carousel-prev hs-carousel:disabled:opacity-50 disabled:pointer-events-none absolute inset-y-0 start-0 inline-flex justify-center items-center w-[46px] h-full text-gray-800 hover:bg-gray-800/10  dark:text-white dark:hover:bg-white/10
              ${backgroundList.length == 0 ? 'hidden' : ''}
            `}
            ref={carouselPrevRef}
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
            className={`hs-carousel-next hs-carousel:disabled:opacity-50 disabled:pointer-events-none absolute inset-y-0 end-0 inline-flex justify-center items-center w-[46px] h-full text-gray-800 hover:bg-gray-800/10 dark:text-white dark:hover:bg-white/10
            ${backgroundList.length == 0 ? 'hidden' : ''}
            `}
            ref={carouselNextRef}
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
                  <span key={index} className="bg-opacity-50 border-8 border-gray-400 border-opacity-50 rounded-full cursor-pointer hs-carousel-active:bg-black hs-carousel-active:border-black hs-carousel-active:bg-opacity-50 hs-carousel-active:border-opacity-50 size-5 " />

                );
              })
            }
          </div>
        </div>
        {/* End Slider */}

        <div className="w-full m-auto text-center">
          <h1 className="mt-6 text-4xl font-bold">{title || <Skeleton containerClassName="flex-1" width={150} />}</h1>
          <p className="mt-5 text-lg">{description || <Skeleton containerClassName="flex-1" width={250} />}</p>
          <div className="px-[15%] mt-5">


            <div className="sticky z-50 bg-white top-20">
              <div className="border-b border-gray-200 dark:border-neutral-700">
                <nav
                  className="-mb-0.5 flex justify-center space-x-6"
                  aria-label="Tabs"
                  role="tablist"
                >
                  <button

                    type="button"
                    className={`w-[30%] justify-center inline-flex items-center px-1 py-3 text-sm text-gray-500 border-b-2 border-transparent hs-tab-active:font-semibold hs-tab-active:border-primary hs-tab-active:text-primary gap-x-2 whitespace-nowrap hover:text-primary focus:outline-none  disabled:opacity-50 disabled:pointer-events-none dark:text-neutral-400  
                    ${currentSection == 0 ? ' active' : ''}`}
                    id="horizontal-alignment-item-1"
                    data-hs-tab="#horizontal-alignment-1"
                    aria-controls="horizontal-alignment-1"
                    role="tab"
                    onClick={() => {
                      setIsSectionMovingAllowed(false);
                      setTimeout(() => {
                        setIsSectionMovingAllowed(true);
                      }, 1000);
                      setCurrentSection(0);
                      window.scrollTo({ top: contentRef.current.offsetTop - 126, behavior: 'smooth' });
                    }}
                  >
                    상품 설명
                  </button>
                  <button

                    type="button"
                    className={`w-[30%] justify-center inline-flex items-center px-1 py-3 text-sm text-gray-500 border-b-2 border-transparent hs-tab-active:font-semibold hs-tab-active:border-primary hs-tab-active:text-primary gap-x-2 whitespace-nowrap hover:text-primary focus:outline-none  disabled:opacity-50 disabled:pointer-events-none dark:text-neutral-400  
                    ${currentSection == 1 ? ' active' : ''}`}
                    id="horizontal-alignment-item-2"
                    data-hs-tab="#horizontal-alignment-2"
                    aria-controls="horizontal-alignment-2"
                    role="tab"
                    onClick={() => {
                      setIsSectionMovingAllowed(false);
                      setTimeout(() => {
                        setIsSectionMovingAllowed(true);
                      }, 1000);
                      setCurrentSection(1);
                      window.scrollTo({ top: priceRef.current.offsetTop - 126, behavior: 'smooth' });
                    }}
                  >
                    가격
                  </button>
                  <button

                    type="button"
                    className={`w-[30%] justify-center inline-flex items-center px-1 py-3 text-sm text-gray-500 border-b-2 border-transparent hs-tab-active:font-semibold hs-tab-active:border-primary hs-tab-active:text-primary gap-x-2 whitespace-nowrap hover:text-primary focus:outline-none  disabled:opacity-50 disabled:pointer-events-none dark:text-neutral-400  
                    ${currentSection == 2 ? ' active' : ''}`}
                    id="horizontal-alignment-item-3"
                    data-hs-tab="#horizontal-alignment-3"
                    aria-controls="horizontal-alignment-3"
                    role="tab"
                    onClick={() => {
                      setIsSectionMovingAllowed(false);
                      setTimeout(() => {
                        setIsSectionMovingAllowed(true);
                      }, 1000);
                      setCurrentSection(2);
                      window.scrollTo({ top: reviewRef.current.offsetTop - 126, behavior: 'smooth' });
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
            </div>


            <div className="mt-5 text-lg leading-10 whitespace-pre-line" ref={contentRef}>
              {
                content ? <div dangerouslySetInnerHTML={
                  { __html: content }

                } /> : <Skeleton count={10} />

              }

            </div>

            {
              content ?
                <div>
                  <div className="flex flex-row w-full px-[0%] py-8 my-8 bg-gray-50  rounded-2xl  ">
                    <div className="flex flex-col flex-shrink-0 gap-2 mr-[2rem] justify-center w-[350px] items-center border-r-2 border-gray-200">
                      <img className="w-[125px] rounded-full " src={
                        artist.profile_image != null ?
                        artist.profile_image.media.path
                        : "https://st3.depositphotos.com/9998432/13335/v/450/depositphotos_133351928-stock-illustration-default-placeholder-man-and-woman.jpg"
                      
                      } alt="Image Description" />
                      <h4 className="text-lg font-light text-gray-600">@{artist.nickname}</h4>
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

                </div> : <div className="flex flex-row w-full px-[0%] py-8 my-8   rounded-2xl  "> <Skeleton
                  containerClassName="flex-1"
                  height={200} /> </div>
            }

            <div ref={priceRef} className="flex flex-row w-full my-8 rounded-2xl shadow-black/2 ">
              {
                content ? <div className="flex flex-row w-full bg-gray-50 px-[6%] py-8">
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
                    <ApexChart
                      width={'100%'}
                      height={400}
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
                    </ApexChart>
                  </div>
                </div> : <Skeleton
                  containerClassName="flex-1"
                  height={500} />
              }

            </div>

            <div className="sticky flex gap-3 my-2 top-[calc(100vh-70px)] z-50 bg-white py-3 flex-row items-center">
              <button type="button" className="inline-flex items-center justify-center w-full px-4 py-3 text-sm font-semibold text-gray-800 bg-white border border-gray-200 rounded-lg shadow-sm gap-x-2 hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-800">
                아티스트에게 1:1 문의
              </button>

              <button type="button" className="inline-flex items-center justify-center w-full px-4 py-3 text-sm font-semibold text-white border border-transparent rounded-lg bg-primary gap-x-2 disabled:opacity-50 disabled:pointer-events-none">
                거래 진행
              </button>

            </div>


            <div ref={reviewRef} className="w-full h-[600px]  translate-y-[-44px]">
              {
                content ?
                  <div>
                    <div className="w-full h-[560px] mb-10 bg-gray-50 rounded-2xl flex flex-row px-8 py-8">
                      <div className="flex flex-row flex-shrink-0 h-[fit-content] items-center gap-4">
                        <svg className="flex-shrink-0 w-[2rem] h-[2rem] text-primary" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                          <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"></path>
                        </svg>
                        <span className="text-5xl">
                          3.0
                        </span>

                      </div>
                      <div className="flex-grow px-4 ml-20 overflow-y-auto border-l-2 border-gray-200">
                        {
                          [1, 2, 3, 4, 5, 6, 7].map((index) => (
                            <div key={index} className="flex flex-row items-center gap-4 py-4 [&:not(:last-child)]:border-b border-gray-200">
                              <div className="flex flex-col">
                                <img className="w-[65px] rounded-full" src="https://st3.depositphotos.com/9998432/13335/v/450/depositphotos_133351928-stock-illustration-default-placeholder-man-and-woman.jpg" alt="Image Description" />

                              </div>
                              <div className="flex flex-col">
                                <div className="flex flex-row">
                                  <>
                                    {/* Rating */}
                                    <div className="flex items-center">
                                      <svg
                                        className="flex-shrink-0 text-primary size-5"
                                        xmlns="http://www.w3.org/2000/svg"
                                        width={16}
                                        height={16}
                                        fill="currentColor"
                                        viewBox="0 0 16 16"
                                      >
                                        <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
                                      </svg>
                                      <svg
                                        className="flex-shrink-0 text-primary size-5"
                                        xmlns="http://www.w3.org/2000/svg"
                                        width={16}
                                        height={16}
                                        fill="currentColor"
                                        viewBox="0 0 16 16"
                                      >
                                        <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
                                      </svg>
                                      <svg
                                        className="flex-shrink-0 text-primary size-5"
                                        xmlns="http://www.w3.org/2000/svg"
                                        width={16}
                                        height={16}
                                        fill="currentColor"
                                        viewBox="0 0 16 16"
                                      >
                                        <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
                                      </svg>
                                      <svg
                                        className="flex-shrink-0 text-gray-300 size-5"
                                        xmlns="http://www.w3.org/2000/svg"
                                        width={16}
                                        height={16}
                                        fill="currentColor"
                                        viewBox="0 0 16 16"
                                      >
                                        <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
                                      </svg>
                                      <svg
                                        className="flex-shrink-0 text-gray-300 size-5"
                                        xmlns="http://www.w3.org/2000/svg"
                                        width={16}
                                        height={16}
                                        fill="currentColor"
                                        viewBox="0 0 16 16"
                                      >
                                        <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
                                      </svg>
                                    </div>
                                    {/* End Rating */}
                                  </>
                                  <span className="ml-2 text-lg font-semibold">"정말 감동적인 결과물이 나왔어요!{index}"</span>
                                </div>


                                <div className="flex flex-row items-center gap-2">
                                  <h4 className="font-light text-md">@삼성전자</h4>
                                  <span className="font-light text-md">2024. 05. 27.</span>
                                </div>
                              </div>
                            </div>
                          ))

                        }
                      </div>
                    </div>

                  </div> : <Skeleton
                    containerClassName="flex-1"
                    height={600} />
              }
            </div>
          </div>
        </div>
      </>


    </main>
  );
}