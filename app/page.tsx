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

            <div className="absolute bottom-[8vh] ml-[3vw] w-[90vh]">
              <Image src={'/images/brush.png'} alt='logo' width={1600} height={1600} />
            </div>



          </div>
          <div className="flex flex-col items-end justify-center flex-grow min-h-screen">
            <div className="mt-[10vh] mr-12 flex flex-col items-end ">




              <div className="z-10 text-right text-8xl">
                BROWSE ARTIST<br />BID INSTANTLY
              </div>

              {/* search bar */}
              <div className="relative flex mt-3">
                <EllipsisVerticalIcon className="absolute left-0 flex items-center w-10 h-10 text-black top-5 " />
                <input className="w-[30rem] h-20 pl-10 text-xl rounded-l-[20px] placeholder:font-bold" type="text" placeholder="프리랜서 아티스트 구인구직 마켓플레이스" />
                <button className="w-20 h-20 bg-black rounded-r-[20px] flex justify-center items-center">
                  <MagnifyingGlassIcon className="w-10 h-10 text-white" />
                </button>
              </div>
            </div>

          </div>
        </div>
      </div>
      <div className="flex flex-row justify-center gap gap-8  items-center h-20 min-w-full px-30% bg-gray-400 md:gap-2">
        <div className="text-2xl font-bold text-white">
          협력사
        </div>
        <img src={"/images/company-toss.png"} alt="companylogo" className="h-24 md:h-12" />
        <img src={"/images/company-samsung.png"} alt="companylogo" className="h-12 pr-3 md:h-6" />
        <img src={"/images/company-kakaopay.png"} alt="companylogo" className="h-8 pr-3 md:h-4"/> 
        <img src={"/images/company-modusign.png"} alt="companylogo" className="h-14 md:h-7" />
      </div>
      <CategoryList />

    </main>
  );
}
