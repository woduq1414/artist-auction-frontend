import Image from "next/image";
import Link from "next/link";
import { EllipsisVerticalIcon, MagnifyingGlassIcon } from '@heroicons/react/24/solid'






export default async function Market() {

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
            <div className="hs-accordion-group">
              <div
                className="hs-accordion active"
                id="hs-basic-with-title-and-arrow-stretched-heading-one"
              >
                <button
                  className="inline-flex items-center justify-between w-full py-3 font-semibold text-gray-800 rounded-lg hs-accordion-toggle hs-accordion-active:text-blue-600 gap-x-3 text-start hover:text-gray-500 disabled:opacity-50 disabled:pointer-events-none dark:hs-accordion-active:text-blue-500 dark:text-neutral-200 dark:hover:text-neutral-400 dark:focus:outline-none dark:focus:text-neutral-400"
                  aria-controls="hs-basic-with-title-and-arrow-stretched-collapse-one"
                >
                  Accordion #1
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
                  id="hs-basic-with-title-and-arrow-stretched-collapse-one"
                  className="hs-accordion-content w-full overflow-hidden transition-[height] duration-300"
                  aria-labelledby="hs-basic-with-title-and-arrow-stretched-heading-one"
                >
                  <p className="text-gray-800 dark:text-neutral-200">
                    <em>This is the third item's accordion body.</em> It is hidden by
                    default, until the collapse plugin adds the appropriate classes that we
                    use to style each element. These classes control the overall appearance,
                    as well as the showing and hiding via CSS transitions.
                  </p>
                </div>
              </div>
              <div
                className="hs-accordion"
                id="hs-basic-with-title-and-arrow-stretched-heading-two"
              >
                <button
                  className="inline-flex items-center justify-between w-full py-3 font-semibold text-gray-800 rounded-lg hs-accordion-toggle hs-accordion-active:text-blue-600 gap-x-3 text-start hover:text-gray-500 disabled:opacity-50 disabled:pointer-events-none dark:hs-accordion-active:text-blue-500 dark:text-neutral-200 dark:hover:text-neutral-400 dark:focus:outline-none dark:focus:text-neutral-400"
                  aria-controls="hs-basic-with-title-and-arrow-stretched-collapse-two"
                >
                  Accordion #2
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
                  id="hs-basic-with-title-and-arrow-stretched-collapse-two"
                  className="hs-accordion-content hidden w-full overflow-hidden transition-[height] duration-300"
                  aria-labelledby="hs-basic-with-title-and-arrow-stretched-heading-two"
                >
                  <p className="text-gray-800 dark:text-neutral-200">
                    <em>This is the third item's accordion body.</em> It is hidden by
                    default, until the collapse plugin adds the appropriate classes that we
                    use to style each element. These classes control the overall appearance,
                    as well as the showing and hiding via CSS transitions.
                  </p>
                </div>
              </div>
              <div
                className="hs-accordion"
                id="hs-basic-with-title-and-arrow-stretched-heading-three"
              >
                <button
                  className="inline-flex items-center justify-between w-full py-3 font-semibold text-gray-800 rounded-lg hs-accordion-toggle hs-accordion-active:text-blue-600 gap-x-3 text-start hover:text-gray-500 disabled:opacity-50 disabled:pointer-events-none dark:hs-accordion-active:text-blue-500 dark:text-neutral-200 dark:hover:text-neutral-400 dark:focus:outline-none dark:focus:text-neutral-400"
                  aria-controls="hs-basic-with-title-and-arrow-stretched-collapse-three"
                >
                  Accordion #3
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
                  id="hs-basic-with-title-and-arrow-stretched-collapse-three"
                  className="hs-accordion-content hidden w-full overflow-hidden transition-[height] duration-300"
                  aria-labelledby="hs-basic-with-title-and-arrow-stretched-heading-three"
                >
                  <p className="text-gray-800 dark:text-neutral-200">
                    <em>This is the third item's accordion body.</em> It is hidden by
                    default, until the collapse plugin adds the appropriate classes that we
                    use to style each element. These classes control the overall appearance,
                    as well as the showing and hiding via CSS transitions.
                  </p>
                </div>
              </div>
            </div>


          </div>
        </div>
        <div className="grow-1">
          asd
        </div>
      </div>

    </main>
  );
}
