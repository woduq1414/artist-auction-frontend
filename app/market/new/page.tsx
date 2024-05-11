'use client'

import { useCategory } from '@/app/_store/useCategory';
import { HSSelect, HSStaticMethods } from 'preline/preline';

import React, { useEffect, useRef, useState } from 'react';

const NewMarketPage: React.FC = () => {

    const [step, setStep] = useState(1);

    const stepList = [
        "기본 정보 입력",
        "상세 정보 입력",
        "가격 / 기간 설정"
    ];
    const { categoryList, getCategoryList } = useCategory();

    const [firstCategory, setFirstCategory] = useState<any>(null);
    const [subCategoryList, setSubCategoryList] = useState<any[]>([]);
    const [preSubCategoryList, setPreSubCategoryList] = useState<any[]>([]);
    const [secondCategory, setSecondCategory] = useState<any>(null);

    const [title, setTitle] = useState<string>('');
    const [description, setDescription] = useState<string>('');


    let firstCategoryRef = useRef<any>(null);
    let secondCategoryRef = useRef<any>(null);

    useEffect(() => {
        getCategoryList();



    }, [])

    useEffect(() => {
        firstCategoryRef.current.addEventListener('change.hs.select', (e: any) => {
            setFirstCategory(e.detail.payload);
            console.log(e.detail.payload, categoryList);
            setSubCategoryList(categoryList.find((category) => category.id.toString() === e.detail.payload)?.list);

        });
        secondCategoryRef.current.addEventListener('change.hs.select', (e: any) => {
            setSecondCategory(e.detail.payload);
        });
    }, [categoryList])



    // ...

    useEffect(() => {
        if (subCategoryList.length > 0) {
            const select: HSSelect = HSSelect.getInstance('#secondCategorySelect') as HSSelect;
            console.log(select, subCategoryList);

            setSecondCategory(null);


            for (let i = 0; i < preSubCategoryList.length; i++) {
                select?.removeOption(preSubCategoryList[i].id.toString());
            }

            for (let i = 0; i < subCategoryList.length; i++) {
                select?.addOption({
                    val: subCategoryList[i].id.toString(),
                    title: subCategoryList[i].name

                });


            }

            setPreSubCategoryList(subCategoryList);
            HSStaticMethods.autoInit(['select']);

            document.getElementById('secondCategoryButton')?.classList.remove('hidden');
            document.getElementById('secondCategoryExtra')?.classList.remove('hidden');

            select.open();

        }
    }, [subCategoryList])


    return (
        <main className="w-[80%] h-[calc(100vh-80px)] mx-auto mt-20 md:mt-16  flex flex-col justify-center items-center">
            <div className="w-[100%] rounded-xl bg-slate-50">
                <div className='mx-5 my-5'>
                    {/* Stepper */}
                    <div data-hs-stepper="">
                        {/* Stepper Nav */}
                        <ul className="relative flex flex-row justify-center mx-auto gap-x-2">
                            {
                                [1, 2, 3].map((item, index) => (
                                    <li
                                        key={index}
                                        className={`flex items-center gap-x-2 shrink  group`}
                                        data-hs-stepper-nav-item={JSON.stringify({
                                            "index": index + 1
                                        })}
                                    >
                                        <span className="inline-flex flex-col items-center justify-center text-xs align-middle min-w-7 min-h-7 group">
                                            <span className="flex items-center justify-center flex-shrink-0 font-medium text-gray-800 bg-gray-100 rounded-full w-7 h-7 group-focus:bg-gray-200 hs-stepper-active:bg-primary hs-stepper-active:text-white hs-stepper-success:bg-primary hs-stepper-success:text-white hs-stepper-completed:bg-teal-500 hs-stepper-completed:group-focus:bg-teal-600 dark:bg-neutral-700 dark:text-white dark:group-focus:bg-gray-600 dark:hs-stepper-active:bg-primary dark:hs-stepper-success:bg-primary dark:hs-stepper-completed:bg-teal-500 dark:hs-stepper-completed:group-focus:bg-teal-600">
                                                <span className="hs-stepper-success:hidden hs-stepper-completed:hidden">
                                                    {index + 1}
                                                </span>
                                                <svg
                                                    className="flex-shrink-0 hidden size-2 hs-stepper-success:block"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    width={12}
                                                    height={12}
                                                    viewBox="0 0 24 24"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    strokeWidth={3}
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                >
                                                    <polyline points="20 6 9 17 4 12" />
                                                </svg>
                                            </span>
                                            <span className="mt-2 text-sm font-medium text-gray-800 dark:text-neutral-200">
                                                {
                                                    stepList[index]
                                                }
                                            </span>
                                        </span>
                                        <div className={` w-[300px] max-w-[15vw] h-px bg-gray-200 group-last:hidden hs-stepper-success:bg-primary hs-stepper-completed:bg-teal-600 dark:bg-neutral-700 dark:hs-stepper-success:bg-primary dark:hs-stepper-completed:bg-teal-600
                                      
                                        `} />
                                    </li>
                                ))
                            }

                            {/* End Item */}
                        </ul>
                        {/* End Stepper Nav */}
                        {/* Stepper Content */}
                        <div className="mt-5 sm:mt-8">
                            {/* First Contnet */}
                            <div
                                data-hs-stepper-content-item='{
"index": 1
    }'
                            >
                                <div className="w-[700px] max-w-[90%] mx-auto px-5 py-8 space-y-2 border-dashed rounded-xl flex flex-col gap-6">
                                    <div className='flex flex-col gap-2'>
                                        <label
                                            htmlFor="inline-input-label-with-helper-text"
                                            className="block text-lg font-semibold dark:text-white"
                                        >
                                            상품 제목
                                        </label>
                                        <input
                                            type="email"
                                            id="inline-input-label-with-helper-text"
                                            className="block w-full max-w-xl px-4 py-3 border border-gray-200 rounded-lg text-md focus:border-primary focus:ring-primary disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                                            placeholder="상품 제목을 입력해주세요."
                                            aria-describedby="hs-inline-input-helper-text"
                                            onChange={(e) => setTitle(e.target.value)}
                                        />
                                        <p
                                            className="text-gray-500 text-md dark:text-neutral-500"
                                            id="hs-inline-input-helper-text"
                                        >
                                            ({title.length} / 20)
                                        </p>
                                    </div>
                                    <div className='flex flex-col gap-2'>
                                        <label
                                            htmlFor="inline-input-label-with-helper-text"
                                            className="block text-lg font-semibold dark:text-white"
                                        >
                                            한 줄 설명
                                        </label>
                                        <input
                                            type="email"
                                            id="inline-input-label-with-helper-text"
                                            className="block w-full max-w-xl px-4 py-3 border border-gray-200 rounded-lg text-md focus:border-primary focus:ring-primary disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                                            placeholder="한 줄 설명을 입력해주세요."
                                            aria-describedby="hs-inline-input-helper-text"
                                            onChange={(e) => setDescription(e.target.value)}
                                        />
                                        <p
                                            className="text-gray-500 text-md dark:text-neutral-500"
                                            id="hs-inline-input-helper-text"
                                        >
                                            ({description.length} / 40)
                                        </p>
                                    </div>
                                    <div className='flex flex-col gap-2'>
                                        <label
                                            htmlFor="inline-input-label-with-helper-text"
                                            className="block text-lg font-semibold dark:text-white"
                                        >
                                            카테고리
                                        </label>
                                        <div className='max-w-xl'>
                                            <select data-hs-select='{
  "placeholder": "카테고리를 선택해주세요.",
  "toggleTag": "<button type=\"button\"></button>",
  "toggleClasses": "hs-select-disabled:pointer-events-none hs-select-disabled:opacity-50 relative py-3 px-4 pe-9 flex text-nowrap w-full cursor-pointer bg-white border border-gray-200 rounded-lg text-start text-sm focus:border-blue-500 focus:ring-blue-500 before:absolute before:inset-0 before:z-[1] dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400",
  "dropdownClasses": "mt-2 z-50 w-full max-h-72 p-1 space-y-0.5 bg-white border border-gray-200 rounded-lg overflow-hidden overflow-y-auto [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:bg-gray-300 dark:[&::-webkit-scrollbar-track]:bg-neutral-700 dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500 dark:bg-neutral-900 dark:border-neutral-700",
  "optionClasses": "py-2 px-4 w-full text-sm text-gray-800 cursor-pointer hover:bg-gray-100 rounded-lg focus:outline-none focus:bg-gray-100 dark:bg-neutral-900 dark:hover:bg-neutral-800 dark:text-neutral-200 dark:focus:bg-neutral-800",
  "optionTemplate": "<div class=\"flex justify-between items-center w-full\"><span data-title></span><span class=\"hidden hs-selected:block\"><svg class=\"flex-shrink-0 size-3.5 text-blue-600 dark:text-blue-500\" xmlns=\"http:.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><polyline points=\"20 6 9 17 4 12\"/></svg></span></div>",
  "extraMarkup": "<div class=\"absolute top-1/2 end-3 -translate-y-1/2\"><svg class=\"flex-shrink-0 size-3.5 text-gray-500 dark:text-neutral-500\" xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"m7 15 5 5 5-5\"/><path d=\"m7 9 5-5 5 5\"/></svg></div>"
}' className="hidden" ref={firstCategoryRef} id='firstCategorySelect'
                                                onClick={(e) => { console.log(e) }}
                                            >
                                                <option value="">카테고리 선택</option>
                                                {
                                                    categoryList.map((category, index) => (
                                                        <option key={index} value={category.id}>{category.name}</option>
                                                    ))

                                                }

                                            </select>
                                            <div className='my-2'>

                                            </div>
                                            <select data-hs-select={JSON.stringify({
                                                "placeholder": "세부 카테고리를 선택해주세요.",
                                                "toggleTag": `<button id="secondCategoryButton" class="hidden" type=\"button\"></button>`,
                                                "toggleClasses": "hs-select-disabled:pointer-events-none hs-select-disabled:opacity-50 relative py-3 px-4 pe-9 flex text-nowrap w-full cursor-pointer bg-white border border-gray-200 rounded-lg text-start text-sm focus:border-blue-500 focus:ring-blue-500 before:absolute before:inset-0 before:z-[1] dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400",
                                                "dropdownClasses": "mt-2 z-50 w-full max-h-72 p-1 space-y-0.5 bg-white border border-gray-200 rounded-lg overflow-hidden overflow-y-auto [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:bg-gray-300 dark:[&::-webkit-scrollbar-track]:bg-neutral-700 dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500 dark:bg-neutral-900 dark:border-neutral-700",
                                                "optionClasses": "py-2 px-4 w-full text-sm text-gray-800 cursor-pointer hover:bg-gray-100 rounded-lg focus:outline-none focus:bg-gray-100 dark:bg-neutral-900 dark:hover:bg-neutral-800 dark:text-neutral-200 dark:focus:bg-neutral-800",
                                                "optionTemplate": "<div class=\"flex justify-between items-center w-full\"><span data-title></span><span class=\"hidden hs-selected:block\"><svg class=\"flex-shrink-0 size-3.5 text-blue-600 dark:text-blue-500\" xmlns=\"http:.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><polyline points=\"20 6 9 17 4 12\"/></svg></span></div>",
                                                "extraMarkup": "<div id=\"secondCategoryExtra\" class=\"absolute top-1/2 end-3 -translate-y-1/2 hidden \"><svg class=\"flex-shrink-0 size-3.5 text-gray-500 dark:text-neutral-500\" xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"m7 15 5 5 5-5\"/><path d=\"m7 9 5-5 5 5\"/></svg></div>"
                                            })} className={`hidden`} ref={secondCategoryRef} id='secondCategorySelect'

                                            >
                                                <option value="">세부 카테고리 선택</option>
                                                {
                                                    subCategoryList?.map((category, index) => (
                                                        <option key={index} value={category.id}>{category.name}</option>
                                                    ))

                                                }

                                            </select>
                                            <p
                                                className="mt-2 text-gray-500 text-md dark:text-neutral-500"
                                                id="hs-inline-input-helper-text"
                                            >
                                                {
                                                    firstCategory === null ? '' : categoryList.find((category) => category.id.toString() === firstCategory)?.name

                                                }
                                                {
                                                    secondCategory === null ? '' : " > " + subCategoryList.find((category) => category.id.toString() === secondCategory)?.name

                                                }
                                            </p>
                                        </div>
                                    </div>
                                </div>



                            </div>
                            {/* End First Contnet */}
                            {/* First Contnet */}
                            <div
                                data-hs-stepper-content-item='{
"index": 2
    }'
                                style={{ display: "none" }}
                            >
                                <div className="flex items-center justify-center h-48 p-4 border border-gray-200 border-dashed bg-gray-50 rounded-xl dark:bg-neutral-800 dark:border-neutral-700">
                                    <h3 className="text-gray-500 dark:text-neutral-500">
                                        Second content
                                    </h3>
                                </div>
                            </div>
                            {/* End First Contnet */}
                            {/* First Contnet */}
                            <div
                                data-hs-stepper-content-item='{
"index": 3
    }'
                                style={{ display: "none" }}
                            >
                                <div className="flex items-center justify-center h-48 p-4 border border-gray-200 border-dashed bg-gray-50 rounded-xl dark:bg-neutral-800 dark:border-neutral-700">
                                    <h3 className="text-gray-500 dark:text-neutral-500">Third content</h3>
                                </div>
                            </div>
                            {/* End First Contnet */}
                            {/* Final Contnet */}
                            <div
                                data-hs-stepper-content-item='{
"isFinal": true
    }'
                                style={{ display: "none" }}
                            >
                                <div className="flex items-center justify-center h-48 p-4 border border-gray-200 border-dashed bg-gray-50 rounded-xl dark:bg-neutral-800 dark:border-neutral-700">
                                    <h3 className="text-gray-500 dark:text-neutral-500">Final content</h3>
                                </div>
                            </div>
                            {/* End Final Contnet */}
                            {/* Button Group */}
                            <div className="flex items-center justify-between mt-5 gap-x-2">
                                <button
                                    type="button"
                                    className="inline-flex items-center px-3 py-2 text-sm font-medium text-gray-800 bg-white border border-gray-200 rounded-lg shadow-sm gap-x-1 hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none"
                                    data-hs-stepper-back-btn=""
                                >
                                    <svg
                                        className="flex-shrink-0 size-4"
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
                                        <path d="m15 18-6-6 6-6" />
                                    </svg>
                                    이전
                                </button>
                                <button
                                    type="button"
                                    className="inline-flex items-center px-3 py-2 text-sm font-semibold text-white border border-transparent rounded-lg bg-primary gap-x-1 hover:bg-primary disabled:opacity-50 disabled:pointer-events-none"
                                    data-hs-stepper-next-btn=""
                                >
                                    다음
                                    <svg
                                        className="flex-shrink-0 size-4"
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
                                        <path d="m9 18 6-6-6-6" />
                                    </svg>
                                </button>
                                <button
                                    type="button"
                                    className="inline-flex items-center px-3 py-2 text-sm font-semibold text-white border border-transparent rounded-lg bg-primary gap-x-1 hover:bg-primary disabled:opacity-50 disabled:pointer-events-none"
                                    data-hs-stepper-finish-btn=""
                                    style={{ display: "none" }}
                                >
                                    제출
                                </button>
                                <button
                                    type="reset"
                                    className="inline-flex items-center px-3 py-2 text-sm font-semibold text-white border border-transparent rounded-lg bg-primary gap-x-1 hover:bg-primary disabled:opacity-50 disabled:pointer-events-none"
                                    data-hs-stepper-reset-btn=""
                                    style={{ display: "none" }}
                                >
                                    Reset
                                </button>
                            </div>
                            {/* End Button Group */}
                        </div>
                        {/* End Stepper Content */}
                    </div>
                    {/* End Stepper */}
                </div>

            </div>
        </main>
    );
};

export default NewMarketPage;