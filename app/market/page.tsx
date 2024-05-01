'use client'
import Image from "next/image";
import Link from "next/link";

import { useCategory } from "../_store/useCategory";
import { useEffect } from "react";

function CategoryListContainer(): JSX.Element {

  const { categoryList, getCategoryList, selectedCategory, setSelectedCategory }= useCategory();
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
                    <li className={`ml-3 cursor-pointer font-light hs-accordion-content-item ${selectedCategory !== null && item.id === selectedCategory.id ? "text-primary-light" : "text-gray-600"} text-[1rem]`} onClick={()=>
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



export default function Market() {

  // const data = await Data();
  // console.log(data);

  return (
    <main className="w-[80%] h-full mx-auto mt-20 md:mt-16  flex flex-col">
      {/* <div className="mx-auto mt-6 text-4xl font-bold">
      </div> */}
      <div className="flex flex-row w-[100%] mt-6">
        <div className="w-[270px] h-full bg-red shrink-0">
          <div className="text-lg font-bold">
            카테고리
            <CategoryListContainer />


          </div>
        </div>
        <div className="grow-1">
          asdasㄴㄴㅁㅁㅁ
        </div>
      </div>

    </main>
  );
}
