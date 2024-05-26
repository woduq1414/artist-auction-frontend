'use client'
import Image from "next/image";
import Link from "next/link";
import { useRouter } from 'next/navigation'
import { useCategory } from "../_store/useCategory";
import { useEffect, useState } from "react";

import { MagnifyingGlassIcon, Squares2X2Icon } from "@heroicons/react/24/solid";
import { QueueListIcon } from "@heroicons/react/24/solid";
import Config from "@/config/config.export";
import { get } from "lodash";
import Skeleton from "react-loading-skeleton";
import React from "react";



function CategoryListContainer(): JSX.Element {

  const { categoryList, getCategoryList, selectedCategory, setSelectedCategory, listviewType, setListViewType, fetchGoodsList } = useCategory();




  return (
    <div className="hs-accordion-group" data-hs-accordion-always-open="">

      {categoryList.map((category, index) => {
        // console.log(category.id + index.toString())
        return (
          <div
            key={category.id + index.toString()}
            className="hs-accordion active"
            id={`hs-basic-with-title-and-arrow-stretched-heading-${index}`}
          >
            <button
              className="inline-flex items-center justify-between w-full py-1  text-gray-800 rounded-lg hs-accordion-toggle gap-x-3 text-start hover:text-gray-500 disabled:opacity-50 disabled:pointer-events-none
              text-[1rem] font-semibold
              "
              aria-controls={`hs-basic-with-title-and-arrow-stretched-collapse-${index}`}

              onClick={() => {
                // setSelectedCategory(category);

              }}
            >
              {category.name}
              <svg
                className="block hs-accordion-active:hidden size-4"
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
                <path d="m6 9 6 6 6-6" />
              </svg>
              <svg
                className="hidden hs-accordion-active:block size-4"
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
                <path d="m18 15-6-6-6 6" />
              </svg>
            </button>
            <div
              id={`hs-basic-with-title-and-arrow-stretched-collapse-${index}`}
              className="hs-accordion-content w-full overflow-hidden transition-[height] duration-300"
              aria-labelledby="hs-basic-with-title-and-arrow-stretched-heading-one"
            >
              <ul className="hs-accordion-content-inner">
                {category.list.map((item: any) => {
                  return (
                    <li key={item.id} className={`ml-3 cursor-pointer font-light hs-accordion-content-item ${selectedCategory !== null && item.id === selectedCategory.id ? "text-primary-light" : "text-gray-600"} text-[1rem]`} onClick={() =>
                      setSelectedCategory(item)
                    }
                    >

                      {item.name}

                    </li>
                  )
                })}
              </ul>
            </div>
          </div>
        )
      })}

    </div>
  );
}

function CategoryItemContainer(): JSX.Element {
  const router = useRouter();
  const { selectedCategory, listviewType, goodsList } = useCategory();
  // {``}
  return (
    <div className="w-full ">
      {selectedCategory !== null && (
        <div className={`flex  w-full  my-2 pl-4 h-[calc(100vh-210px)] 
        ${listviewType === 'column' ? 'flex-col gap-6' : 'flex-wrap flex-row gap-3'}
        ${goodsList === undefined ? 'overflow-y-hidden' : 'overflow-y-auto'}
        `}>
          {goodsList !== undefined ? (goodsList.map((item: any) => {
            return (
              <div key={item.id} className={`${listviewType === 'column' ? "w-full border-b" : "flex-1 min-w-[31%] max-w-[34%] h-[fit-content]"} cursor-pointer`}
                onClick={() => {
                  console.log('click');
                  router.push('/market/' + item.id)

                }}
              >
                <div className={`${listviewType === 'column' ? "h-[300px] flex flex-row" : "w-full"} border`}>
                  <img
                    src={item.image.media.link}
                    //  src={'/images/sample-pf.jpg'} 
                    alt='samplepf' className={`${listviewType === 'column' ? "h-[300px] w-[532px]" : "w-full"}  flex-shrink-0`} />
                  <div className={`
                  ${listviewType === 'column' ? "flex items-center justify-center flex-grow h-full bg-gray-300" : "hidden"} 
                  
                  `}>
                    <div className="">

                    </div>
                  </div>
                </div>
                <div className="px-6 py-3 ">
                  <div>
                  </div>
                  <div className={`${listviewType === 'column' ? "flex flex-row justify-between" : "flex flex-col gap-2"} `}>
                    <div className={`${listviewType === 'column' ? 'text-2xl' : 'text-xl'} font-bold text-gray-800`}>{item.title}</div>
                    <div>
                      <span className="inline-flex items-center gap-x-1.5 py-1.5 px-3 rounded-full text-xs font-medium bg-primary-light text-white ">인증됨</span>
                    </div>
                  </div>
                  <div className={`${listviewType === 'column' ? "flex flex-row items-center justify-between mt-2" : "flex flex-col mt-2"} `}>
                    <div className={`text-gray-600 ${listviewType === 'column' ? 'display-block' : 'hidden'}`}>
                      {item.description}
                    </div>
                    <div>
                      <span className={`${listviewType === 'column' ? 'text-xl' : 'text-lg'}  font-light text-gray-800`}>{`${Math.floor((Date.parse(item.end_date) - Date.now()) / (1000 * 60 * 60 * 24))
                        }일 후 종료`}</span>
                      <span className={`${listviewType === 'column' ? 'text-xl' : 'text-lg'}  font-light text-gray-800`}>{` | `}</span>
                      <span className={`${listviewType === 'column' ? 'text-2xl' : 'text-xl'}  font-semibold text-gray-800`}>{item.price.toLocaleString()}</span>
                      <span className={`${listviewType === 'column' ? 'text-2xl' : 'text-xl'}  font-light text-gray-800`}>{` ~ `}</span>
                      <span className={`${listviewType === 'column' ? 'text-2xl' : 'text-xl'}  font-semibold text-gray-800`}>{item.max_price.toLocaleString()}</span>
                      <span className={`${listviewType === 'column' ? 'text-2xl' : 'text-xl'}  font-light text-gray-800`}>{`원`}</span>
                    </div>
                  </div>


                </div>
              </div>
            )
          })) : ([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14].map((item: any) => {
            return (
              <div key={item.id} className={`${listviewType === 'column' ? "w-full" : "flex-1 min-w-[31%]"} `}

              >
                <div className={`${listviewType === 'column' ? "h-[300px] flex flex-row" : "w-full"} `}>
                  <Skeleton containerClassName="flex-1" height={'300px'} />
                </div>
                <div className="py-3 pr-6 ">
                  <Skeleton containerClassName="flex-1"
                    count={2}
                  />

                </div>
              </div>
            )
          }))}
        </div>
      )
      }
    </div >
  );


}



export default function Market() {

  // const data = await Data();
  // console.log(data);
  const { listviewType, setListViewType, setSelectedCategory, getCategoryList, fetchGoodsList, selectedCategory } = useCategory();

  const [sort, setSort] = useState('recent');
  const sortRef = React.createRef<HTMLSelectElement>() as React.MutableRefObject<HTMLSelectElement>;



  useEffect(() => {
    getCategoryList();
    fetchGoodsList('all', 'recent');

    sortRef.current.addEventListener('change.hs.select', (e: any) => {
      console.log(e.target.value);
      setSort(e.target.value);

    });
  }, [])


  useEffect(() => {
    

      // if (
      //   sort === 'recent'
      // ) {
      //   return
      // }

      const element = document.querySelector('div.sort-select-option[tabindex="0"]') as HTMLDivElement;
      element?.click();

    }, [selectedCategory])


  useEffect(() => {
    fetchGoodsList(selectedCategory.id === 0 ? 'all' : selectedCategory.id + '', sort);
  }, [selectedCategory, sort])



  return (
    <main className="w-[80%] h-full mx-auto mt-20 md:mt-16  flex flex-col">
      {/* <div className="mx-auto mt-6 text-4xl font-bold">
      </div> */}
      <div className="flex flex-row w-[100%] mt-6 h-full">
        <div className="w-[270px] h-full bg-red shrink-0   grow-1">
          <div className="text-lg font-bold">
            <span className="cursor-pointer" onClick={
              () => setSelectedCategory({
                id: 0,
                name: '전체',
                list: []

              })
            }>전체</span>
            <CategoryListContainer />


          </div>

          <div className="flex w-full mt-3 sm:mt-8" >
            <input className="w-full h-12 pl-2  text-md rounded-l-[20px] placeholder:font-bold
                sm:text-sm sm:h-14 sm:pl-8 border-2 border-r-0
                " type="text" placeholder="검색어" />
            <button className="w-12 h-12 sm:h-14 bg-gray-700 rounded-r-[20px] flex justify-center items-center
                sm:w-14
                ">
              <MagnifyingGlassIcon className="w-6 h-6 text-white sm:w-7" />
            </button>
          </div>
        </div>
        <div className="w-full ml-5 border-l-2 border-gray-300">
          <div className="flex flex-row justify-between w-full">
            <div>

            </div>
            <div className="flex flex-row items-center">
              <select data-hs-select='{
  "placeholder": "최신순",
  "toggleTag": "<button type=\"button\"></button>",
  "toggleClasses": "hs-select-disabled:pointer-events-none hs-select-disabled:opacity-50 relative py-2 px-2 pe-9 flex text-nowrap w-full cursor-pointer bg-white border border-gray-200 rounded-lg text-start text-sm focus:border-primary focus:ring-primary before:absolute before:inset-0 before:z-[1] dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400",
  "dropdownClasses": "mt-2 z-50 min-w-[8rem] max-h-72 p-1 space-y-0.5 bg-white border border-gray-200 rounded-lg overflow-hidden overflow-y-auto [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:bg-gray-300 dark:[&::-webkit-scrollbar-track]:bg-neutral-700 dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500 dark:bg-neutral-900 dark:border-neutral-700",
  "optionClasses": "sort-select-option py-2 px-4 w-full text-sm text-gray-800 cursor-pointer hover:bg-gray-100 rounded-lg focus:outline-none focus:bg-gray-100 dark:bg-neutral-900 dark:hover:bg-neutral-800 dark:text-neutral-200 dark:focus:bg-neutral-800",
  "optionTemplate": "<div class=\"flex justify-between items-center w-full\"><span data-title></span><span class=\"hidden hs-selected:block\"><svg class=\"flex-shrink-0 size-3.5 text-primary dark:text-primary\" xmlns=\"http:.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><polyline points=\"20 6 9 17 4 12\"/></svg></span></div>",
  "extraMarkup": "<div class=\"absolute top-1/2 right-2 end-3 -translate-y-1/2\"><svg class=\"flex-shrink-0 size-3.5 text-gray-500 dark:text-neutral-500\" xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"m7 15 5 5 5-5\"/><path d=\"m7 9 5-5 5 5\"/></svg></div>"
}' className="hidden" id='sortSelect' ref={sortRef}
                onClick={(e) => { console.log(e) }}
              >
                <option value="">최신순</option>
                {
                  [{
                    "value": "recent",
                    "text": "최신순"
                  },
                  {
                    "value": "highPrice",
                    "text": "높은 가격순"
                  },
                  {
                    "value": "lowPrice",
                    "text": "낮은 가격순"
                  },
                  {
                    "value": "end_date",
                    "text": "마감 임박"
                  }
                  ].map((item, index) => (
                    <option key={index} value={item.value}>{item.text}</option>
                  ))

                }

              </select>
              <QueueListIcon className={`ml-2 w-8 h-8 ${listviewType === 'column' ? 'text-gray-700' : 'text-gray-500'} cursor-pointer`} onClick={
                () => {
                  setListViewType('column')
                }

              } />
              <Squares2X2Icon className={`w-8 h-8 ${listviewType === 'grid' ? 'text-gray-700' : 'text-gray-500'} cursor-pointer`} onClick={
                () => {
                  setListViewType('grid')
                }

              } />

            </div>
          </div>
          <CategoryItemContainer />
        </div>
      </div>

    </main>
  );
}
