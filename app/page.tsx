'use client';
import Image from "next/image";
import Link from "next/link";
import { ChevronLeftIcon, ChevronRightIcon, EllipsisVerticalIcon, MagnifyingGlassIcon } from '@heroicons/react/24/solid'
import CategoryList from "./_components/CategoryList";
import { JSXElementConstructor, PromiseLikeOfReactNode, ReactElement, ReactFragment, ReactPortal, useEffect, useRef, useState } from "react";
import { useAuth } from "./_store/useAuth";
import { set } from "lodash";
import { HomeIcon } from "@heroicons/react/24/outline";
import React from "react";

// const fetchData = async () => {
//   const response = await fetch("http://127.0.0.1", {
//     next: {
//       revalidate: 3,
//     }
//   });
//   const data = await response.json();
//   console.log(fetchData);
//   return data;
// }

// const Data = async () => {
//   const data = await fetchData();
//   return data.message;
// }


export default function Home() {


  // on scroll event

  const categoryData = [
    {
      title: "Design",
      subCategory: [
        "어린이 그림책", "손그림 느낌", "웹툰", "광고 이미지", "교육용", "스케치"]
    },
    {
      title: "Illustration",
      subCategory: [
        "어린이 그림책", "손그림 느낌", "웹툰", "광고 이미지", "교육용", "스케치"]
    },
    {
      title: "Animation",
      subCategory: [
        "어린이 그림책", "손그림 느낌", "웹툰", "광고 이미지", "교육용", "스케치"]
    }
  ]

  const [isCategoryBarShow, setIsCategoryBarShow] = useState(false);

  const [selectedCategory, setSelectedCategory] = useState<any>();

  const [selectedSubCategory, setSelectedSubCategory] = useState<any>("어린이 그림책");

  const artistContainerRef = React.useRef<HTMLDivElement>(null);
  const pfRef = React.useRef<HTMLDivElement>(null);


  

  const [delayedSelectedCategory, setDelayedSelectedCategory] = useState<any>();
  let categoryListRef = useRef(null);
  const { setIsNavSearchBarShow } = useAuth();
  useEffect(() => {
    setIsNavSearchBarShow(false);
    window.addEventListener('scroll', () => {
      const getTop = (el: { offsetTop: any; offsetParent: any; }): number => {

        if (!el) return 0;

        return el.offsetTop + (el.offsetParent && getTop(el.offsetParent))
      }
      const searchBar = document.getElementById('mainPageSearchBar');
      let searchBarTop = getTop(searchBar as any);
      if (searchBar && window.scrollY > searchBarTop) {
        setIsNavSearchBarShow(true);
      } else {
        setIsNavSearchBarShow(false);
      }

      if (categoryListRef.current && window.scrollY > (categoryListRef.current as HTMLElement).offsetTop - 300) {
        setIsCategoryBarShow(true);
      } else {
        setIsCategoryBarShow(false);
      }
    });
  }, []);

  useEffect(() => {
    if (true) {
      setTimeout(() => {
        setDelayedSelectedCategory(selectedCategory);
      }, 700);
    }
    setSelectedSubCategory('');
  }, [selectedCategory]);

  return (
    <main className="flex flex-col items-center justify-between min-h-screen">
      <div className={`h-[50px] sticky top-[0px]  w-full text-gray-700 bg-white border-b-2  transition duration-500 flex flex-row items-center px-10 gap-[80px]
        ${isCategoryBarShow ? "translate-y-[80px] opacity-100" : "translate-y-[0px] opacity-0"}
        
        `}>
        {
          categoryData.map((category, index) => (
            <div className="text-lg" key={category.title}>
              {category.title}
            </div>
          ))
        }
      </div>
      <div
        className="h-[30px] md:h-[14px]"
      />


      <div className="w-[calc(100%-72px)] h-[calc(100vh-80px-32px)]  mx-10 mt-4  my-auto relative">
        <img src="/images/main_image.jpg" alt="hero"
          className="absolute top-0 left-0 object-cover object-center w-full h-full rounded-2xl z-[-1]"
        />
        <div className="absolute top-0 left-0 mt-6 ml-10">
          <div className="relative flex mt-3 sm:mt-8" id="mainPageSearchBar">
            <EllipsisVerticalIcon className="absolute left-0 flex items-center w-10 h-10 text-black top-5 sm:h-7 sm:top-3 " />
            <input className="w-[30rem] max-w-[80vw] h-20 pl-10 text-xl rounded-l-[20px] placeholder:font-bold
                sm:text-sm sm:h-14 sm:pl-8
                " type="text" placeholder="프리랜서 아티스트 구인구직 마켓플레이스" />
            <button className="w-16 h-20 sm:h-14 bg-black rounded-r-[20px] flex justify-center items-center
                sm:w-14
                ">
              <MagnifyingGlassIcon className="w-6 h-10 text-white sm:w-7" />
            </button>
          </div>

          <div className="mt-4 font-medium leading-[1.15] text-white text-7xl drop-shadow-[2px_2px_#333333]">
            BROWSE ARTIST,<br />BID INSTANTLY
          </div>
        </div>
      </div>
      <div className="relative flex flex-row justify-center w-full mt-6 mb-6" ref={categoryListRef}>
        <div className=" w-[calc(100%-72px)] flex flex-row flex-wrap justify-center gap-3">
          {
            categoryData.map((category, index) => (
              <div className={`w-[calc(33.3%-8px)] h-[calc(90vh-100px)] hover:scale-[1.03] duration-500 relative 
                ${selectedCategory ? "-translate-y-10 opacity-0 duration-700 z-[1] cursor-auto" : "z-[500]"}
              `}
                key={category.title}
              >
                <img src={`/images/main_${category.title.toLowerCase()
                  }.jpg`} alt="hero" className="object-cover object-center w-full h-full cursor-pointer rounded-2xl"
                  onClick={() => {
                    if (selectedCategory) return;
                    setSelectedCategory(category)
                  }}
                />
                <div className="absolute text-lg font-semibold text-white bottom-3 left-6">
                  {category.title}
                </div>
              </div>
            ))
          }

        </div>
        <div className={`absolute top-0 left-[75px] w-[calc(100%-150px)] flex flex-col mx-3
          duration-700 
          ${selectedCategory ? (
            delayedSelectedCategory ? "opacity-100 z-50 " : "opacity-0 z-0"
          ) : (
            delayedSelectedCategory ? "-z-30 hidden opacity-0" : "opacity-0 z-0"
          )}
          
          `}
        >
          <div className="flex flex-row items-center gap-3 ">
            <HomeIcon className="w-6 h-6 text-gray-500 cursor-pointer"
              onClick={() => setSelectedCategory(undefined)}
            />
            <div className="ml-2 text-lg font-semibold text-gray-500">
              /
            </div>
            <div className="text-lg font-semibold text-gray-500">
              {
                delayedSelectedCategory?.title
              }
            </div>

          </div>
          <div className="mt-5 text-3xl font-semibold text-gray-600">
            {delayedSelectedCategory?.title}
          </div>
          <div className="mt-5 text-lg font-semibold text-gray-600">
            스타일
          </div>
          <div className="relative flex flex-row flex-wrap gap-3 mt-2">
            {
              delayedSelectedCategory?.subCategory.map((subCategory: string, index: any) => (
                <div className={`px-3 py-1   border border-gray-600 cursor-pointer rounded-xl text-md
                  ${selectedSubCategory === subCategory ? " bg-gray-600 text-white " : "hover:bg-gray-200 bg-white text-gray-800"}
                  `}
                  key={subCategory}
                  onClick={() => {
                    if (selectedSubCategory === subCategory) {
                      setSelectedSubCategory('');
                    } else {
                      setSelectedSubCategory(subCategory);
                    }
                  }}
                >
                  {subCategory}
                </div>
              ))
            }

            <div className={`absolute top-[0px] right-[0] flex items-center justify-between  h-[30px] 
                             z-[200] gap gap-6
                             
            
                            `} >
              <div>
                <ChevronLeftIcon className='w-12 h-12 p-2 bg-white rounded-full shadow-md cursor-pointer'
                  onClick={() => {
                    if (artistContainerRef.current != null && pfRef.current != null) {
                      let pfContainerScrollX = artistContainerRef.current.scrollLeft;
                      let pfWIdth = pfRef.current.offsetWidth

                      let targetScrollX = (Math.ceil(pfContainerScrollX / (pfWIdth + 12)) - 1) * (pfWIdth + 12)

                      artistContainerRef.current.scrollTo({ top: 0, left: targetScrollX, behavior: 'smooth' })

                    }
                  }}
                />
              </div>
              <div>
                <ChevronRightIcon className='w-12 h-12 p-2 bg-white rounded-full shadow-md cursor-pointer'
                  onClick={() => {
                    if (artistContainerRef.current != null && pfRef.current != null) {
                      let pfContainerScrollX = artistContainerRef.current.scrollLeft;
                      let pfWIdth = pfRef.current.offsetWidth

                      let targetScrollX = (Math.floor(pfContainerScrollX / (pfWIdth + 12)) + 1) * (pfWIdth + 12)

                      artistContainerRef.current.scrollTo({ top: 0, left: targetScrollX, behavior: 'smooth' })

                    }
                  }}
                />
              </div>

            </div>
          </div>
          <div className="flex flex-row w-full gap-5 mt-5 overflow-hidden"
            ref={artistContainerRef}
          >
            {
              [1, 2, 3, 4, 5, 6].map((i, index) => (
                <div className="flex flex-col"
                 
                  key={index}
                  ref={index === 0 ? pfRef : null

                  }

                >
                  <div className={`w-[calc(21vw)] h-[calc(21vw)]  duration-500 relative 
  
  `}>
                    <img src={`/images/main_${delayedSelectedCategory?.title.toLowerCase()
                      }.jpg`} alt="hero" className="object-cover object-center w-full h-full cursor-pointer rounded-2xl"

                    />

                  </div>
                  <div className="flex flex-col ml-1">
                    <div className="mt-3 text-xl font-semibold text-gray-800">
                      작가1
                    </div>
                    <div className="mt-2 text-lg text-gray-800">
                      디자인 고수입니다.
                    </div>
                    <div className="text-lg font-semibold text-gray-800">
                      From 100,000원
                    </div>
                  </div>
                </div>
              ))
            }
          </div>
        </div>
      </div>

    </main>
  );
}
