'use client'

import './globals.css'
import { usePathname, useSearchParams } from 'next/navigation'
import { Inter } from 'next/font/google'
import localFont from 'next/font/local'
import { useEffect, useState, useRef } from 'react';
import Link from "next/link"
import Image from "next/image"
import { EllipsisVerticalIcon, MagnifyingGlassIcon, XMarkIcon } from '@heroicons/react/24/solid';


import PrelineScript from "./_components/PrelineScript";
import path from 'path'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useAuth } from './_store/useAuth'

import { Cookies } from 'react-cookie';


import Config from '@/config/config.export'
import "react-loading-skeleton/dist/skeleton.css";

// import { CookiesProvider } from 'next-client-cookies/server';

// export const metadata = {
//   title: 'Create Next App',
//   description: 'Generated by create next app',
// }
const pretendard = localFont({
  src: '../fonts/PretendardVariable.woff2',
  display: 'auto',
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isWhiteNav, setIsWhiteNav] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const { checkAuth, isLogin, profileImage, nickname, isNavSearchBarShow, setIsNavSearchBarShow } = useAuth();

  const [isNavExist, setIsNavExist] = useState(false);

  const [isNavReact, setIsNavReact] = useState(true);

  const pathname = usePathname();
  const searchParams = useSearchParams();


  const [searchBarPlaceHolder, setSearchBarPlaceHolder] = useState('원하는 아티스트가 있나요?');

  function randomSearchBarPlaceHolder() {
    let placeholderList = [
      "원하는 아티스트가 있나요?",
      "어떤 아티스트를 찾으시나요?",
      "원하는 디자인을 검색해보세요!",
      "당신이 찾는 아티스트는 누구인가요?",
      "아티스트가 필요하신가요?"
    ]
    let randomIndex = Math.floor(Math.random() * placeholderList.length);
    setSearchBarPlaceHolder(placeholderList[randomIndex]);
  }
  useEffect(() => {


    if (pathname.startsWith("/auth")) {
      setIsNavExist(false);
    } else {
      setIsNavExist(true);
    }
    if (searchParams.get('nav') === 'false') {
      setIsNavReact(false);
    }
    if (pathname !== '/') {
      setIsNavSearchBarShow(true);
    } else {
      randomSearchBarPlaceHolder();
    }



  }
    , [pathname])

  useEffect(() => {
    checkAuth();
    randomSearchBarPlaceHolder();
  }, [])

  const modalBackgroundRef = useRef<HTMLDivElement>(null);







  return (

    <html lang="en">
      <head>
        <meta name="color-scheme" content="light only" />
        <meta name="supported-color-schemes" content="light" />


        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body className={pretendard.className}>



        <div className={`fixed top-0 z-[9000] flex items-center justify-center w-full h-20 py-4 flex-wrap md:flex-row md:flex-nowrap md:h-16 md:px-4 md:justify-between md:py-4 transition ease-in-out duration-300 ${isWhiteNav ? 'bg-white bg-opacity-85 shadow-md shadow-black/5' : ''}
        md:bg-white md:bg-opacity-85 md:shadow-md md:shadow-black/5
        px-3
        ${!isNavExist ? 'hidden' : ''}
        `}>
          <div className="flex items-center ml-6 md:ml-0">
            <Link href={
              isNavReact ? "/" : "#"

            }>
              <img src={'/images/logo.png'} alt='logo' width={220} height={100} />
            </Link>
            <div className={`relative flex ml-5
              ${!isNavSearchBarShow && pathname == "/" ? 'opacity-0' : 'opacity-100'}
              transition ease-in-out duration-200 
              `}>
              <input className="w-[15rem] max-w-[80vw] h-10  text-sm rounded-l-[5px] placeholder:font-medium
                sm:text-sm sm:h-14 border border-gray-300 focus:w-[20rem] focus:outline-none 
                " type="text" placeholder={searchBarPlaceHolder} />
              <button className="w-8 h-10 sm:h-14 bg-black rounded-r-[5px] flex justify-center items-center
                sm:w-14
                ">
                <MagnifyingGlassIcon className="w-4 h-5 text-white sm:w-7" />
              </button>
            </div>
          </div>
          <div className={`flex flex-row items-center md:flex-col  ml-auto mr-6 
           md:hidden
          `}>
            {/* <Link className="text-lg font-semibold text-pro" href="#">
              Pro
            </Link>
            <Link className={`text-lg font-semibold ${isWhiteNav ? "text-black" : "text-white"}`} href="#">
              Info
            </Link> */}
            <Link className={`mr-6 text-lg font-semibold ${isWhiteNav ? "text-black" : "text-white"}`} href={
              isNavReact ? "/" : "#"}>
              구인
            </Link>
            <Link className={`mr-6 text-lg font-semibold ${isWhiteNav ? "text-black" : "text-white"}`} href={
              isNavReact ? "/market" : "#"
            }>
              구직
            </Link>

            <Link className={``} href={
              isNavReact ? "/auth" : "#"
            }>
              <button type="button" className={`text-lg ${isWhiteNav ? "text-black hover:bg-gray-100" : "text-white hover:bg-gray-600 hover:bg-opacity-20 "} border border-gray-300 focus:outline-none focus:ring-4 font-bold rounded-sm px-4 py-2.5 
              ${isLogin ? 'hidden' : ''}
              `}>

                로그인

              </button>
            </Link>

            <div className={`hs-dropdown relative inline-flex ${!isLogin ? 'hidden' : ' '}`}>
              <button
                id="hs-dropdown-custom-trigger"
                type="button"
                className="inline-flex items-center py-1 text-sm font-semibold text-gray-800 bg-white border border-gray-200 rounded-full shadow-sm hs-dropdown-toggle ps-1 pe-3 gap-x-2 hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-800"
              >
                <img
                  className="w-8 h-auto rounded-full"
                  src={
                    profileImage
                      ? profileImage
                      : "https://st3.depositphotos.com/9998432/13335/v/450/depositphotos_133351928-stock-illustration-default-placeholder-man-and-woman.jpg"
                  }
                  alt="Maria"
                />
                <span className="text-gray-600 font-semibold text-md truncate max-w-[7.5rem] dark:text-neutral-400">
                  {nickname}
                </span>
                <svg
                  className="hs-dropdown-open:rotate-180 size-4"
                  xmlns="http://www.w3.org/2000/svg"
                  width={24}
                  height={24}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#888888"
                  strokeWidth={1}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="m6 9 6 6 6-6" />
                </svg>
              </button>
              <div
                className="hs-dropdown-menu transition-[opacity,margin] duration hs-dropdown-open:opacity-100 opacity-0 hidden min-w-60 bg-white shadow-md rounded-lg p-2 mt-2 dark:bg-neutral-800 dark:border dark:border-neutral-700"
                aria-labelledby="hs-dropdown-custom-trigger"
              >
                <a
                  className="flex items-center gap-x-3.5 py-2 px-3 rounded-lg text-md text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 dark:text-neutral-400 dark:hover:bg-neutral-700 dark:hover:text-neutral-300 dark:focus:bg-neutral-700"
                  href={
                    isNavReact ? "/my" : "#"
                  }
                >
                  내 정보
                </a>
                <a
                  className="flex items-center gap-x-3.5 py-2 px-3 rounded-lg text-md text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 dark:text-neutral-400 dark:hover:bg-neutral-700 dark:hover:text-neutral-300 dark:focus:bg-neutral-700"
                  href="#"
                  onClick={() => {
                    if (!isNavReact) {
                      return;
                    }
                    const cookies = new Cookies();
                    cookies.remove('accessToken', {
                      path: '/',
                      domain: Config().cookieDomain,
                    });
                    cookies.remove('refreshToken', {
                      path: '/',
                      domain: Config().cookieDomain,
                    });
                    window.location.reload();
                  }}
                >
                  로그아웃
                </a>

              </div>
            </div>

          </div>
          {/* 햄버거 메뉴 아이콘 */}
          <button className="hidden md:flex" onClick={toggleMenu}>
            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
            </svg>
          </button>
        </div>

        <div className={`fixed top-0 z-[9000] items-center justify-center w-full h-full transition ease-in-out duration-300 
        bg-gray-800 bg-opacity-50 shadow-md shadow-black/5 backdrop-blur-sm
        
        ${!isNavExist ? 'hidden' : ''}
        ${isMenuOpen ? 'visible' : 'invisible'}
        
        `}
          ref={modalBackgroundRef}
          onClick={(e) => {
            if (!isNavReact) {
              return;
            }
            if (e.target === modalBackgroundRef.current) {
              toggleMenu();
            }
          }}
        >
          <div className={`
          absolute
          w-[250px] max-w-[90%] top-0 right-0 bg-white h-full
          flex flex-col items-end
          transition ease-in-out duration-300 
          ${isMenuOpen ? '[transform:translateX(0px)]' : '[transform:translateX(300px)]'}
          `}>
            <XMarkIcon className='w-8 m-4 cursor-pointer' onClick={toggleMenu} />
            <div className='flex flex-col w-full gap-3 px-4 py-4'>
              {/* <Link className="text-lg font-semibold text-pro " href="#">
                Pro
              </Link>
              <hr />
              <Link className={`text-lg font-semibold text-black`} href="#">
                Info
              </Link> */}
              <hr />
              <Link className={`text-lg font-semibold text-black`} href="/">
                구인
              </Link>
              <hr />
              <Link className={`text-lg font-semibold text-black`} href="/market">
                구직
              </Link>
              <hr />

              <Link className={``} href="/auth">
                <button type="button" className={`w-full text-lg ${isWhiteNav ? "text-black hover:bg-gray-100" : "text-white hover:bg-gray-600 hover:bg-opacity-20 "} border border-gray-300 focus:outline-none focus:ring-4 font-bold rounded-sm px-4 py-2.5 
              ${isLogin ? 'hidden' : ''}
              `}>

                  로그인 / 회원가입

                </button>
              </Link>

              <div className={`w-full hs-dropdown relative inline-flex ${!isLogin ? 'hidden' : ' '}`}>
                <button
                  id="hs-dropdown-custom-trigger"
                  type="button"
                  className="flex flex-row items-center justify-between w-full py-1 text-sm font-semibold text-gray-800 bg-white border border-gray-200 rounded-md shadow-sm hs-dropdown-toggle ps-1 pe-3 gap-x-2 hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-800"
                >
                  <div className='flex flex-row items-center gap-2'>
                    <img
                      className="w-8 h-auto rounded-full"
                      src={
                        profileImage
                          ? profileImage
                          : "https://st3.depositphotos.com/9998432/13335/v/450/depositphotos_133351928-stock-illustration-default-placeholder-man-and-woman.jpg"
                      }
                      alt="Maria"
                    />
                    <span className="text-gray-600 font-semibold text-md truncate max-w-[7.5rem] dark:text-neutral-400">
                      {nickname}
                    </span>
                  </div>
                  <svg
                    className="hs-dropdown-open:rotate-180 size-4"
                    xmlns="http://www.w3.org/2000/svg"
                    width={24}
                    height={24}
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#888888"
                    strokeWidth={1}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="m6 9 6 6 6-6" />
                  </svg>
                </button>
                <div
                  className="hs-dropdown-menu transition-[opacity,margin] duration hs-dropdown-open:opacity-100 opacity-0 hidden min-w-60 bg-white shadow-md rounded-lg p-2 mt-2 dark:bg-neutral-800 dark:border dark:border-neutral-700"
                  aria-labelledby="hs-dropdown-custom-trigger"
                >
                  <a
                    className="flex items-center gap-x-3.5 py-2 px-3 rounded-lg text-md text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 dark:text-neutral-400 dark:hover:bg-neutral-700 dark:hover:text-neutral-300 dark:focus:bg-neutral-700"
                    href="/my"
                  >
                    내 정보
                  </a>
                  <a
                    className="flex items-center gap-x-3.5 py-2 px-3 rounded-lg text-md text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 dark:text-neutral-400 dark:hover:bg-neutral-700 dark:hover:text-neutral-300 dark:focus:bg-neutral-700"
                    href="#"
                    onClick={() => {
                      const cookies = new Cookies();
                      cookies.remove('accessToken', {
                        path: '/',
                        domain: Config().cookieDomain,
                      });
                      cookies.remove('refreshToken', {
                        path: '/',
                        domain: Config().cookieDomain,
                      });
                      window.location.reload();
                    }}
                  >
                    로그아웃
                  </a>

                </div>
              </div>
            </div>

          </div>
        </div>
        {children}
        <PrelineScript />
        <ToastContainer />
      </body>

    </html>

  )
}
