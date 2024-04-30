'use client'

import './globals.css'
import { Inter } from 'next/font/google'
import localFont from 'next/font/local'
import { useEffect, useState, useRef } from 'react';
import Link from "next/link"
import Image from "next/image"
import { XMarkIcon } from '@heroicons/react/24/solid';


import PrelineScript from "./_components/PrelineScript";

// export const metadata = {
//   title: 'Create Next App',
//   description: 'Generated by create next app',
// }
const pretendard = localFont({
  src: '../fonts/PretendardVariable.woff2',
  display: 'optional',
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

  const modalBackgroundRef = useRef<HTMLDivElement>(null);
  // useEffect(() => {

  // const handleScroll = () => {
  //   const currentScrollY = window.scrollY;

  //   if (currentScrollY > 100) {
  //     setIsWhiteNav(true);
  //   } else {
  //     setIsWhiteNav(false);
  //   }
  //   // 마지막 스크롤 위치 업데이트
  //   setLastScrollY(currentScrollY);
  // };

  // 스크롤 이벤트 리스너 등록
  // window.addEventListener('scroll', handleScroll);

  // 클린업 함수에서 이벤트 리스너 제거
  // return () => window.removeEventListener('scroll', handleScroll);
  // }, [lastScrollY]); // lastScrollY가 변경될 때마다 useEffect가 실행됩니다.


  return (
    <html lang="en">
      <head>
       
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body className={pretendard.className}>



        <div className={`fixed top-0 z-[9000] flex items-center justify-center w-full h-20 py-4 flex-wrap md:flex-row md:flex-nowrap md:h-16 md:px-4 md:justify-between md:py-4 transition ease-in-out duration-300 ${isWhiteNav ? 'bg-white bg-opacity-85 shadow-md shadow-black/5' : ''}
        md:bg-white md:bg-opacity-85 md:shadow-md md:shadow-black/5
        
        `}>
          <div className="flex items-center w-[250px] ml-6 md:ml-0">
            <Image src={'/images/logo.png'} alt='logo' width={250} height={150} />
          </div>
          <div className={`flex flex-row items-center gap-8 md:flex-col lg:gap-5 ml-auto mr-10 
           md:hidden
          `}>
            <Link className="text-xl font-semibold text-pro" href="#">
              Pro
            </Link>
            <Link className={`text-xl font-semibold ${isWhiteNav ? "text-black" : "text-white"}`} href="#">
              Info
            </Link>
            <Link className={`text-xl font-semibold ${isWhiteNav ? "text-black" : "text-white"}`} href="#">
              구인
            </Link>
            <Link className={`text-xl font-semibold ${isWhiteNav ? "text-black" : "text-white"}`} href="/market">
              구직
            </Link>
            <Link className={`text-xl font-semibold ${isWhiteNav ? "text-black" : "text-white"}`} href="#">
              로그인
            </Link>
            <button type="button" className={`text-xl ${isWhiteNav ? "text-black hover:bg-gray-100" : "text-white hover:bg-gray-600 hover:bg-opacity-20 "} border border-gray-300 focus:outline-none focus:ring-4 font-bold rounded-sm px-4 py-2.5 `}>
              회원가입
            </button>
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
        
      
        ${isMenuOpen ? 'visible' : 'invisible'}
        
        `}
          ref={modalBackgroundRef}
          onClick={(e) => {
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
              <Link className="text-lg font-semibold text-pro " href="#">
                Pro
              </Link>
              <hr />
              <Link className={`text-lg font-semibold text-black`} href="#">
                Info
              </Link>
              <hr />
              <Link className={`text-lg font-semibold text-black`} href="#">
                구인
              </Link>
              <hr />
              <Link className={`text-lg font-semibold text-black`} href="/market">
                구직
              </Link>
              <hr />
              <Link className={`text-lg font-semibold text-black`} href="#">
                로그인
              </Link>
              <button type="button" className={`text-lg text-black hover:bg-gray-100 border border-gray-300 focus:outline-none focus:ring-4 font-bold rounded-sm px-4 py-2.5 `}>
                회원가입
              </button>
            </div>

          </div>
        </div>
        {children}
        <PrelineScript />
      </body>
    </html>
  )
}
