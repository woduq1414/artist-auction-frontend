'use client'
import React from 'react'

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

    function getTransformStyle(index: number) {

        if (selectedCategory === index) {
            if (!showDetail) {
                return `[transform:rotateY(180deg)]`
            } else {
                if (index == 0) return `[transform:rotateY(180deg)]`
                else if (index == 1) return `[transform:translateX(calc(-100%-24px))rotateY(180deg)]`
                else if (index == 2) return `[transform:translateX(calc(-200%-48px))rotateY(180deg)]`
                else if (index == 3) return `[transform:translateX(calc(-300%-72px))rotateY(180deg)]`
                else if (index == 4) return `[transform:translateX(calc(-400%-96px))rotateY(180deg)]`
            }
        } else {
            if (showDetail) {
                return `[transform:translateY(calc(10%))] opacity-0`
            }
        }

        return ''
    }

    function getBackgroundImageStyle(index: number) {
        if(index == 0) return "[background-image:linear-gradient(rgba(0,0,0,.5),rgba(187,83,83,.5)),url('https://cdn.logojoy.com/wp-content/uploads/20200612115158/AdobeStock_88222430-1-min-scaled.jpeg')]"
        else if(index == 1) return "[background-image:linear-gradient(rgba(0,0,0,.5),rgba(187,83,83,.5)),url('https://www.kdanmobile.com/blog/wp-content/uploads/2022/03/balazs-ketyi-byoBbHSlP5U-unsplash.jpg')]"
        else if(index == 2) return "[background-image:linear-gradient(rgba(0,0,0,.5),rgba(187,83,83,.5)),url('https://dimg.donga.com/wps/NEWS/IMAGE/2022/02/03/111561272.2.jpg')]"
        else if(index == 3) return "[background-image:linear-gradient(rgba(0,0,0,.5),rgba(187,83,83,.5)),url('https://blog.native-instruments.com/wp-content/uploads/dynamic/2023/04/how-to-write-song-lyrics-2-1200x0-c-default.jpg')]"
        else if(index == 4) return "[background-image:linear-gradient(rgba(0,0,0,.5),rgba(187,83,83,.5)),url('https://as2.ftcdn.net/v2/jpg/02/02/96/41/1000_F_202964122_Ia4oFHOgm7Iy5yHvP9GbzECsRDOX9FZH.jpg')]"
    }

    return (
        <div className='min-w-full min-h-screen bg-white px-[5%] py-0 flex flex-col'>
            <div className='flex-shrink-0 mt-16 text-6xl font-bold text-gray-600'>주요 카테고리</div>
            <div className='relative'>
                <div className='flex flex-row items-center flex-grow py-8'>
                    {categories.map((category, index) => {
                        return (
              
                            <div className={`cursor-pointer group perspective flex flex-col items-center justify-center w-1/5 mx-3 rounded-lg  h-[75vh] bg-white transition ease-in-out duration-300
                         ${canChangeCategory ? '' : ''}
                        `}

                            >
                                <div className={` transform relative w-full h-full duration-1000 preserve-3d 
                             ${getTransformStyle(index)}
                            `}>
                                    <div className="absolute flex flex-col items-center justify-center w-full h-full transition duration-300 ease-in-out shadow-lg backface-hidden hover:-translate-y-1 hover:scale-110"
                                        onClick={() => {
                                            if (!canChangeCategory) return;

                                            setCanChangeCategory(false)
                                            if (selectedCategory === index) {
                                                setSelectedCategory(-1)
                                                setShowDetail(false);
                                                setCanChangeCategory(true)
                                            } else {
                                                setSelectedCategory(index)
                                                setTimeout(() => {
                                                    setCanChangeCategory(true)
                                                    setShowDetail(true);

                                                }, 300)
                                            }

                                        }}>
                                        <div className='font-bold text-[20rem] leading-[18rem]'>{category.en[0]}</div>
                                        <div className='text-2xl font-bold text-gray-600'>{category.ko}</div>
                                    </div>
                                    <div className={`absolute flex flex-col items-center justify-center w-full h-full overflow-hidden shadow-lg my-rotate-y-180 backface-hidden 
                                    ${getBackgroundImageStyle(index)} bg-no-repeat bg-cover bg-center 
                                    `}
                                        onClick={() => {
                                            if (selectedCategory === index) {
                                                setSelectedCategory(-1)
                                                setShowDetail(false);
                                                setCanChangeCategory(true)
                                            }
                                        }}
                                    >
                                        <div className='font-bold text-[20rem] leading-[18rem] text-white'>{category.en[0]}</div>
                                        <div className='text-2xl font-bold text-gray-100'>{category.ko}</div>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>

                <div className={`absolute top-0 left-[calc(20%+12px)] w-[80%] py-8 h-full 
                transition ease-in-out duration-[1000ms]
                ${showDetail ? 'visible opacity-100' : 'invisible opacity-0'

                    }`}>
                    <div className={`flex w-full
                        shadow-2xl h-full bg-white text-xl text-gray-600 font-bold  justify-center items-center
                        `}>
                        <div>{selectedCategory != -1 ? categories[selectedCategory]["ko"]: ' '} 포트폴리오</div>
                    </div>
                </div>
            </div>
        </div>
    )
}