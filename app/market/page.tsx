'use client'
import Image from "next/image";
import Link from "next/link";
import { useRouter } from 'next/navigation'
import { useCategory } from "../_store/useCategory";
import { useEffect } from "react";

import { MagnifyingGlassIcon, Squares2X2Icon } from "@heroicons/react/24/solid";
import { QueueListIcon } from "@heroicons/react/24/solid";

function CategoryListContainer(): JSX.Element {

  const { categoryList, getCategoryList, selectedCategory, setSelectedCategory, listviewType, setListViewType } = useCategory();
  useEffect(() => {
    getCategoryList();
  }, [])

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
                setSelectedCategory(category);

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
  const { selectedCategory, listviewType } = useCategory();
  // {``}
  return (
    <div className="w-full ">
      {selectedCategory !== null && (
        <div className={`flex  w-full  py-3 pl-4
        ${listviewType === 'column' ? 'flex-col gap-6' : 'flex-wrap flex-row gap-3'}
        `}>
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((item: any) => {
            return (
              <div key={item} className={`${listviewType === 'column' ? "w-full" : "flex-1 min-w-[31%]"} shadow-md cursor-pointer`}
                onClick={() => {
                  console.log('click');
                  router.push('/market/' + item)

                }}
              >
                <div className={`${listviewType === 'column' ? "h-[300px] flex flex-row" : "w-full"} `}>
                  <img src={'/images/sample-pf.jpg'} alt='samplepf' className={`${listviewType === 'column' ? "h-[300px] w-[532px]" : "w-full"}  flex-shrink-0`} />
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
                    <div className={`${listviewType === 'column' ? 'text-2xl' : 'text-xl'} font-bold text-gray-800`}>{`세상을 놀라게 할 ${selectedCategory.name} ${item}`}</div>
                    <div>
                      <span className="inline-flex items-center gap-x-1.5 py-1.5 px-3 rounded-full text-xs font-medium bg-primary-light text-white ">인증됨</span>
                    </div>
                  </div>
                  <div className={`${listviewType === 'column' ? "flex flex-row items-center justify-between mt-2" : "flex flex-col mt-2"} `}>
                    <div className={`text-gray-600 ${listviewType === 'column' ? 'display-block' : 'hidden'}`}>
                      {`저만 믿고 맡겨 주시면 엄청난 ${selectedCategory.name}를 만들어드리겠습니다.`}
                    </div>
                    <div>
                      <span className={`${listviewType === 'column' ? 'text-xl' : 'text-lg'}  font-light text-gray-800`}>{`1일 후 종료`}</span>
                      <span className={`${listviewType === 'column' ? 'text-xl' : 'text-lg'}  font-light text-gray-800`}>{` | `}</span>
                      <span className={`${listviewType === 'column' ? 'text-2xl' : 'text-xl'}  font-semibold text-gray-800`}>{`150,000`}</span>
                      <span className={`${listviewType === 'column' ? 'text-2xl' : 'text-xl'}  font-light text-gray-800`}>{` ~ `}</span>
                      <span className={`${listviewType === 'column' ? 'text-2xl' : 'text-xl'}  font-semibold text-gray-800`}>{`200,000`}</span>
                      <span className={`${listviewType === 'column' ? 'text-2xl' : 'text-xl'}  font-light text-gray-800`}>{`원`}</span>
                    </div>
                  </div>


                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  );


}



export default function Market() {

  // const data = await Data();
  // console.log(data);
  const { listviewType, setListViewType, setSelectedCategory } = useCategory();
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
            <div className="flex flex-row">
              <QueueListIcon className={`w-8 h-8 ${listviewType === 'column' ? 'text-gray-700' : 'text-gray-500'} cursor-pointer`} onClick={
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
