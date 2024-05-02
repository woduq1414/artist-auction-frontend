'use client'
import Image from "next/image";
import Link from "next/link";

import { useCategory } from "../_store/useCategory";
import { useEffect } from "react";

function CategoryListContainer(): JSX.Element {

  const { categoryList, getCategoryList, selectedCategory, setSelectedCategory } = useCategory();
  useEffect(() => {
    getCategoryList();
  }, [])

  return (
    <div className="hs-accordion-group" data-hs-accordion-always-open="">

      {categoryList.map((category, index) => {
        return (
          <div
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
                    <li className={`ml-3 cursor-pointer font-light hs-accordion-content-item ${selectedCategory !== null && item.id === selectedCategory.id ? "text-primary-light" : "text-gray-600"} text-[1rem]`} onClick={() =>
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
  const { selectedCategory } = useCategory();

  return (
    <div className="w-full ">
      {selectedCategory !== null && (
        <div className="flex flex-col w-full gap-3 ml-4">
          {[1, 2, 3, 4, 5].map((item: any) => {
            return (
              <div className="w-full  h-[270px] shadow-md">
                <div className="h-[200px] flex flex-row">
                  <img src={'/images/sample-pf.jpg'} alt='samplepf' className="h-[200px] w-[355px] flex-shrink-0" />
                  <div className="flex items-center justify-center flex-grow h-full bg-gray-300">
                    <div className="">
                      더보기
                    </div>
                  </div>
                </div>
                <div className="h-[20px] ">
                  <div className="text-lg font-bold">{`세상을 놀라게 할 ${selectedCategory.name} ${item}`}</div>

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

  return (
    <main className="w-[80%] h-full mx-auto mt-20 md:mt-16  flex flex-col">
      {/* <div className="mx-auto mt-6 text-4xl font-bold">
      </div> */}
      <div className="flex flex-row w-[100%] mt-6 h-full">
        <div className="w-[270px] h-full bg-red shrink-0   grow-1">
          <div className="text-lg font-bold">
            카테고리
            <CategoryListContainer />


          </div>
        </div>
        <div className="w-full ml-5 border-l-2 border-gray-300">
          <CategoryItemContainer />
        </div>
      </div>

    </main>
  );
}
