'use client'
import React from 'react'
import Image from "next/image"

import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/solid'

export default function CategoryList() {

    let categories = [
        {
            "en": "Design", "ko": "디자인"
        },
        {
            "en": "Illustration", "ko": "일러스트"
        },
        {
            "en": "Compose", "ko": "작곡"
        },
        {
            "en": "Lyric", "ko": "작사"
        },
        {
            "en": "Arrange", "ko": "편곡"
        },
    ]


    const [selectedCategory, setSelectedCategory] = React.useState(-1);
    const [showDetail, setShowDetail] = React.useState(false);
    const [canChangeCategory, setCanChangeCategory] = React.useState(true);

    const [mouseOverState, setMouseOverState] = React.useState(-1);

    const pfRef = React.useRef<HTMLDivElement>(null);
    const pfContainerRef = React.useRef<HTMLDivElement>(null);

    function getTransformStyle(index: number, mode: string) {

        if (selectedCategory === index) {
            if (!showDetail) {
                return `[transform:rotateY(180deg)]`
            } else {
                if (mode == 'pc') {
                    if (index == 0) return `[transform:rotateY(180deg)]`
                    else if (index == 1) return `[transform:translateX(calc(-100%-24px))rotateY(180deg)]`
                    else if (index == 2) return `[transform:translateX(calc(-200%-48px))rotateY(180deg)]`
                    else if (index == 3) return `[transform:translateX(calc(-300%-72px))rotateY(180deg)]`
                    else if (index == 4) return `[transform:translateX(calc(-400%-96px))rotateY(180deg)]`
                } else if (mode == 'mobile') {
                    if (index == 0) return `sm:[transform:rotateY(180deg)]`
                    else if (index == 1) return `sm:[transform:translateY(-96px)rotateY(180deg)]`
                    else if (index == 2) return `sm:[transform:translateY(-192px)rotateY(180deg)]`
                    else if (index == 3) return `sm:[transform:translateY(-288px)rotateY(180deg)]`
                    else if (index == 4) return `sm:[transform:translateY(-384px)rotateY(180deg)]`
                }

            }
        } else {
            if (showDetail) {
                return `[transform:translateY(calc(10%))] opacity-0`
            }
        }

        return ''
    }

    function getBackgroundImageStyle(index: number) {
        if (index == 0) return "[background-image:linear-gradient(rgba(0,0,0,.5),rgba(187,83,83,.5)),url('https://cdn.logojoy.com/wp-content/uploads/20200612115158/AdobeStock_88222430-1-min-scaled.jpeg')]"
        else if (index == 1) return "[background-image:linear-gradient(rgba(0,0,0,.5),rgba(187,83,83,.5)),url('https://www.kdanmobile.com/blog/wp-content/uploads/2022/03/balazs-ketyi-byoBbHSlP5U-unsplash.jpg')]"
        else if (index == 2) return "[background-image:linear-gradient(rgba(0,0,0,.5),rgba(187,83,83,.5)),url('https://dimg.donga.com/wps/NEWS/IMAGE/2022/02/03/111561272.2.jpg')]"
        else if (index == 3) return "[background-image:linear-gradient(rgba(0,0,0,.5),rgba(187,83,83,.5)),url('https://blog.native-instruments.com/wp-content/uploads/dynamic/2023/04/how-to-write-song-lyrics-2-1200x0-c-default.jpg')]"
        else if (index == 4) return "[background-image:linear-gradient(rgba(0,0,0,.5),rgba(187,83,83,.5)),url('https://as2.ftcdn.net/v2/jpg/02/02/96/41/1000_F_202964122_Ia4oFHOgm7Iy5yHvP9GbzECsRDOX9FZH.jpg')]"
    }
    function getBackgroundImageStyleFront(index: number) {
        if (index == 0) return "[background-image:linear-gradient(rgba(0,0,0,.5),rgba(0,0,0,.5)),url('https://cdn.logojoy.com/wp-content/uploads/20200612115158/AdobeStock_88222430-1-min-scaled.jpeg')]"
        else if (index == 1) return "[background-image:linear-gradient(rgba(0,0,0,.5),rgba(0,0,0,.5)),url('https://www.kdanmobile.com/blog/wp-content/uploads/2022/03/balazs-ketyi-byoBbHSlP5U-unsplash.jpg')]"
        else if (index == 2) return "[background-image:linear-gradient(rgba(0,0,0,.5),rgba(0,0,0,.5)),url('https://dimg.donga.com/wps/NEWS/IMAGE/2022/02/03/111561272.2.jpg')]"
        else if (index == 3) return "[background-image:linear-gradient(rgba(0,0,0,.5),rgba(0,0,0,.5)),url('https://blog.native-instruments.com/wp-content/uploads/dynamic/2023/04/how-to-write-song-lyrics-2-1200x0-c-default.jpg')]"
        else if (index == 4) return "[background-image:linear-gradient(rgba(0,0,0,.5),rgba(0,0,0,.5)),url('https://as2.ftcdn.net/v2/jpg/02/02/96/41/1000_F_202964122_Ia4oFHOgm7Iy5yHvP9GbzECsRDOX9FZH.jpg')]"
    }

    return (
        <div className='min-w-full min-h-screen bg-white px-[5%] py-0 flex flex-col'>
            <div className='flex-shrink-0 mt-8 text-6xl font-bold text-gray-600 sm:text-4xl'>주요 카테고리</div>
            <div className='relative'>
                <div className='flex flex-row items-center flex-grow py-8 sm:flex-col sm:gap-4 '>
                    {categories.map((category, index) => {
                        return (

                            <div key={index} className={`cursor-pointer group perspective flex flex-col items-center justify-center w-1/5 mx-3 rounded-lg  h-[70vh] bg-white transition ease-in-out duration-300
                         ${canChangeCategory ? '' : ''}

                         sm:w-[90%] sm:h-[80px]
                        `}

                            >
                                <div className={` transform relative w-full h-full duration-1000 preserve-3d 
                             ${getTransformStyle(index, 'pc')}
                             ${getTransformStyle(index, 'mobile')}
                            `}>
                                    <div className={`absolute flex flex-col items-center justify-center w-full h-full overflow-hidden transition duration-300 ease-in-out shadow-lg backface-hidden hover:-translate-y-1 hover:scale-110
                                    ${getBackgroundImageStyleFront(index)} [-webkit-background-clip:text] text-transparent bg-clip-text bg-cover bg-center
                                    `}
                                        onClick={() => {
                                            if (!canChangeCategory) return;

                                            setCanChangeCategory(false)
                                            if (selectedCategory === index) {
                                                // setMouseOverState(-1);
                                                // setSelectedCategory(-1)
                                                // setShowDetail(false);
                                                // setCanChangeCategory(true)
                                            } else {
                                                setSelectedCategory(index)
                                                setTimeout(() => {

                                                    setCanChangeCategory(true)
                                                    setShowDetail(true);

                                                }, 300)
                                                setTimeout(() => {
                                                    setMouseOverState(0);
                                                }, 1800)

                                            }

                                        }}>
                                        <div className='font-bold text-[18rem] leading-[18rem]
                                        
                                        md:text-[8rem] sm:text-[3rem] sm:leading-[3rem]
                                        
                                        '>{category.en[0]}</div>
                                        <div className='text-2xl font-bold text-gray-600
                                        sm:text-[0.8em] sm:leading-[0.8rem]
                                        '>{category.ko}</div>
                                    </div>
                                    <div className={`absolute flex flex-col items-center justify-center w-full h-full overflow-hidden shadow-lg my-rotate-y-180 backface-hidden 
                                    ${getBackgroundImageStyle(index)} bg-no-repeat bg-cover bg-center 
                                    `}
                                        onClick={() => {
                                            if (selectedCategory === index) {
                                                setMouseOverState(-1);
                                                setSelectedCategory(-1)
                                                setShowDetail(false);
                                                setCanChangeCategory(true)

                                                if (pfContainerRef.current != null) {
                                                    pfContainerRef.current.scrollLeft = 0;
                                                    pfContainerRef.current.scrollTop = 0;
                                                }
                                            }
                                        }}
                                    >
                                        <div className='font-bold text-[18rem] leading-[18rem]
                                        text-white
                                        md:text-[8rem] sm:text-[3rem] sm:leading-[3rem]
                                        
                                        '>{category.en[0]}</div>
                                        <div className='text-2xl font-bold text-gray-100
                                        sm:text-[0.8em] sm:leading-[0.8rem]
                                        
                                        '>{category.ko}</div>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>

                <div className={`absolute top-0 left-[calc(20%+12px)] w-[80%] py-8 h-full 
                transition ease-in-out duration-[1000ms]

                sm:left-[5%] sm:top-[88px] sm:w-[90%] sm:h-[75vh]
                ${showDetail ? 'visible opacity-100' : 'invisible opacity-0'

                    }`}>
                    <div className={`relative flex w-full
                        shadow-2xl h-full bg-white text-xl text-gray-600 font-bold  items-center
                        group
                        `}>
                        <div className={`absolute top-0 left-0  w-full h-full
                      transition duration-[800ms] ease-in-out  group-hover:blur-none blur-[3px]
                        flex flex-col flex-wrap  justify-center overflow-x-scroll 
                        sm:overflow-x-hidden sm:overflow-y-scroll
                        gap-3
                        sm:flex-row
                        `}
                            ref={pfContainerRef}

                        >
                            {
                                Array(24).fill(null).map((_, i) => i + 1).map((x, idx) => {
                                    let price = 500000 + x * 100;
                                    return (

                                        <div className='h-[32%] flex justify-center items-center
                                            relative overflow-hidden group/label
                                            transition duration-[400ms] ease-in-out
                                            hover:shadow-xl
                                            sm:w-[100%] sm:h-auto
                                            '  key={idx}

                                            ref={idx == 0 ? pfRef : undefined}

                                            onClick={() => {
                                                console.log(pfRef.current?.offsetWidth);
                                            }}

                                        >
                                            <img src={'/images/sample-pf.jpg'} alt='sample-pf'
                                                className='h-full sm:w-full sm:h-auto'

                                            />
                                            <div className="
                                                w-full bg-white bg-opacity-95
                                                absolute left-[0] top-[100%] bottom-[0%] right-[0]
                                                
                                                origin-center transform duration-[800ms] ease-in-out
                                                group-hover/label:top-[70%] group-hover/label:bottom-[0]
                                                text-[1rem] font-extrabold
                                                px-6 py-0

                                                ">
                                                리얼리굿{selectedCategory != -1 ? categories[selectedCategory]["ko"] : ''}
                                                <br />
                                                From {price.toLocaleString()}원
                                            </div>
                                        </div>


                                    );
                                })
                            }

                        </div>
                        <div className={`absolute top-[-50px] right-[0] flex items-center justify-between  h-[30px] transition duration-[800ms] ease-in-out
                             z-[200] gap gap-6
                             
                            ${showDetail ? 'visible' : 'invisible'

                            }
                            sm:invisible
                            
                            `} >
                            <div>
                                <ChevronLeftIcon className='w-12 h-12 p-2 bg-white rounded-full shadow-md cursor-pointer'
                                    onClick={() => {
                                        if (pfContainerRef.current != null && pfRef.current != null) {
                                            let pfContainerScrollX = pfContainerRef.current.scrollLeft;
                                            let pfWIdth = pfRef.current.offsetWidth

                                            let targetScrollX = (Math.ceil(pfContainerScrollX / (pfWIdth + 12)) - 1) * (pfWIdth + 12)

                                            pfContainerRef.current.scrollTo({ top: 0, left: targetScrollX, behavior: 'smooth' })

                                        }
                                    }}
                                />
                            </div>
                            <div>
                                <ChevronRightIcon className='w-12 h-12 p-2 bg-white rounded-full shadow-md cursor-pointer'
                                    onClick={() => {
                                        if (pfContainerRef.current != null && pfRef.current != null) {
                                            let pfContainerScrollX = pfContainerRef.current.scrollLeft;
                                            let pfWIdth = pfRef.current.offsetWidth

                                            let targetScrollX = (Math.floor(pfContainerScrollX / (pfWIdth + 12)) + 1) * (pfWIdth + 12)

                                            pfContainerRef.current.scrollTo({ top: 0, left: targetScrollX, behavior: 'smooth' })

                                        }
                                    }}
                                />
                            </div>

                        </div>

                        <div className={`absolute top-0 left-0 flex items-center w-full h-full transition duration-[800ms] ease-in-out
                            group-hover:opacity-0 opacity-1 z-60
                            group-hover:invisible 
                            sm:justify-center
                            ${showDetail ? 'visible' : 'invisible'

                            }

                            bg-[linear-gradient(90deg,hsla(0,0%,100%,0.0)75%,hsla(0,0%,22%,0.5)100%)]
                        
                            sm:bg-[linear-gradient(180deg,hsla(0,0%,100%,0.0)75%,hsla(0,0%,22%,0.5)100%)]
                            `} >
                            <div className={`font-bold text-[10rem] leading-[18rem] text-gray-700 
                            tracking-tight    

                            md:text-[8rem] md:leading-[8rem] 
                    
                            
                            sm:hidden
                 
                        `}>
                                {selectedCategory != -1 ? categories[selectedCategory]["en"].substring(1) : ' '}
                            </div>
                            <div className={`font-bold  text-gray-700 
                            tracking-tight    

                            text-[3rem] leading-[3rem] 
                            
                            hidden
                            sm:flex
                        
                           
                 
                        `}>
                                {selectedCategory != -1 ? categories[selectedCategory]["en"] : ' '}
                            </div>

                        </div>



                        {/* <div>{selectedCategory != -1 ? categories[selectedCategory]["ko"]: ' '} 포트폴리오</div> */}
                    </div>
                </div>
            </div>
        </div>
    )
}