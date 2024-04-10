import Image from "next/image";
import Link from "next/link";
import { EllipsisVerticalIcon, MagnifyingGlassIcon } from '@heroicons/react/24/solid'
import CategoryList from "./_components/CategoryList";

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


export default async function Home() {

  // const data = await Data();
  // console.log(data);

  return (
    <main className="flex flex-col items-center justify-between min-h-screen">
      <div className="min-w-full min-h-screen bg-primary">
        <div className="flex flex-row items-center justify-between">


          <div className="relative flex items-center flex-shrink-0 min-h-screen ">

            <div className="absolute bottom-[8vh] ml-[3vw] w-[90vh] max-w-[95vw] sm:invisible">
              <Image src={'/images/brush.png'} alt='logo' width={1600} height={1600} />
            </div>



          </div>
          <div className="flex flex-col items-end justify-center flex-grow min-h-screen sm:items-center">
            <div className="mt-[10vh] mr-12 flex flex-col items-end sm:items-center sm:mr-0">




              <div className="z-10 font-semibold text-right text-8xl md:text-6xl sm:text-5xl sm:text-center">
                BROWSE ARTIST<br />BID INSTANTLY
              </div>

              {/* search bar */}
              <div className="relative flex mt-3 sm:mt-8">
                <EllipsisVerticalIcon className="absolute left-0 flex items-center w-10 h-10 text-black top-5 sm:h-7 sm:top-3 " />
                <input className="w-[30rem] max-w-[80vw] h-20 pl-10 text-xl rounded-l-[20px] placeholder:font-bold
                sm:text-sm sm:h-14 sm:pl-8
                " type="text" placeholder="프리랜서 아티스트 구인구직 마켓플레이스" />
                <button className="w-20 h-20 sm:h-14 bg-black rounded-r-[20px] flex justify-center items-center
                sm:w-14
                ">
                  <MagnifyingGlassIcon className="w-10 h-10 text-white sm:w-7" />
                </button>
              </div>
            </div>

          </div>
        </div>
      </div>
      <div className="flex flex-row justify-center gap gap-8  items-center h-20 min-w-full px-30% bg-gray-400 md:gap-2">
        <div className="text-2xl font-bold text-white sm:text-sm">
          협력사
        </div>
        <img src={"/images/company-toss.png"} alt="companylogo" className="h-24 md:h-12 sm:h-8" />
        <img src={"/images/company-samsung.png"} alt="companylogo" className="h-12 pr-3 md:h-6 sm:h-4" />
        <img src={"/images/company-kakaopay.png"} alt="companylogo" className="h-8 pr-3 md:h-4 sm:h-3"/> 
        <img src={"/images/company-modusign.png"} alt="companylogo" className="h-14 md:h-7 sm:h-5" />
      </div>
      <CategoryList />

    </main>
  );
}
