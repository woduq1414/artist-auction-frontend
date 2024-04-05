import Image from "next/image";
import Link from "next/link";
import { EllipsisVerticalIcon, MagnifyingGlassIcon } from '@heroicons/react/24/solid'

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
    <main className="flex min-h-screen flex-col items-center justify-between">
      <div className="min-h-screen min-w-full bg-primary">
        <div className="flex flex-row items-center justify-between">
          <div className="min-h-screen flex-shrink-0 flex items-center">
            {/* <Image src="next.svg" alt="logo" width={100} height={100} /> */}
          </div>
          <div className="min-h-screen flex-grow flex-col flex justify-center items-end">
            <div className="mt-[10vh] mr-12 flex flex-col items-end ">
              <div className="text-right text-8xl">
                BROWSE ARTIST<br />BID INSTANTLY
              </div>

              {/* search bar */}
              <div className="flex relative mt-3">
                <EllipsisVerticalIcon className="w-10 h-10 text-black absolute top-5 left-0
                    flex items-center " />
                <input className="w-[30rem] h-20 pl-10 text-xl rounded-l-[20px] placeholder:font-bold" type="text" placeholder="프리랜서 아티스트 구인구직 마켓플레이스" />
                <button className="w-20 h-20 bg-black rounded-r-[20px] flex justify-center items-center">
                  <MagnifyingGlassIcon className="w-10 h-10 text-white" />
                </button>
              </div>
            </div>

          </div>
        </div>
      </div>
      <div className="min-w-full bg-gray-200">
        협력사
      </div>

    </main>
  );
}
