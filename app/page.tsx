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
          <div className="flex items-center flex-shrink-0 min-h-screen">
            {/* <Image src="next.svg" alt="logo" width={100} height={100} /> */}
          </div>
          <div className="flex flex-col items-end justify-center flex-grow min-h-screen">
            <div className="mt-[10vh] mr-12 flex flex-col items-end ">
              <div className="text-right text-8xl">
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
      <div className="flex flex-row items-center h-20 min-w-full px-30% bg-gray-400">
        <div className="text-2xl font-bold px-[20%] text-white">
          협력사
        </div>
      </div>
      <CategoryList />

    </main>
  );
}
