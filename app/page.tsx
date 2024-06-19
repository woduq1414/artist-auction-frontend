'use client';
import Image from "next/image";
import Link from "next/link";
import { EllipsisVerticalIcon, MagnifyingGlassIcon } from '@heroicons/react/24/solid'
import CategoryList from "./_components/CategoryList";
import { useEffect, useRef, useState } from "react";
import { useAuth } from "./_store/useAuth";
import { set } from "lodash";

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

  const [isCategoryBarShow, setIsCategoryBarShow ] = useState(false);
  let categoryListRef = useRef(null);
  const { setIsNavSearchBarShow } = useAuth();
  useEffect(() => {
    setIsNavSearchBarShow(false);
    window.addEventListener('scroll', () => {
      const getTop = (el: { offsetTop: any; offsetParent: any; }): number => el.offsetTop + (el.offsetParent && getTop(el.offsetParent))
      const searchBar = document.getElementById('mainPageSearchBar');
      let searchBarTop = getTop(searchBar as any);
      if (searchBar && window.scrollY > searchBarTop) {
        setIsNavSearchBarShow(true);
      } else {
        setIsNavSearchBarShow(false);
      }

      if (categoryListRef.current && window.scrollY > (categoryListRef.current as HTMLElement).offsetTop - 300) {
        setIsCategoryBarShow(true);
      }else{
        setIsCategoryBarShow(false);
      }
    });
  }, []);


  return (
    <main className="flex flex-col items-center justify-between min-h-screen">
      <div className={`h-[50px] sticky top-[0px]  w-full text-gray-700 bg-white border-b-2 z-[100] transition duration-500 flex flex-row items-center px-10 gap-[80px]
        ${isCategoryBarShow ? "translate-y-[80px] opacity-100" : "translate-y-[0px] opacity-0"}
        
        `}>
        {
          ["Design", "Illustration", "Animation"].map((category, index) => (
            <div className="text-lg">
              {category}
            </div>
          ))
        }
      </div>
      <div
        className="h-[30px] md:h-[14px]"
      />


      <div className="w-[calc(100%-72px)] h-[calc(100vh-80px-32px)]  mx-10 mt-4  my-auto relative">
        <img src="/images/main_image.jpg" alt="hero"
          className="absolute top-0 left-0 object-cover object-center w-full h-full rounded-2xl"
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
      <div className="mt-4 h-[5000px] bg-primary" ref={categoryListRef}>
        안녕하세요
      </div>

    </main>
  );
}
