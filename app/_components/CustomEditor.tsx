'use client'
import React, { useEffect } from 'react'
import Image from "next/image"
import { Editor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Placeholder from '@tiptap/extension-placeholder';
import Paragraph from '@tiptap/extension-paragraph';
import Bold from '@tiptap/extension-bold';
import Underline from '@tiptap/extension-underline';
import Link from '@tiptap/extension-link';
import BulletList from '@tiptap/extension-bullet-list';
import OrderedList from '@tiptap/extension-ordered-list';
import ListItem from '@tiptap/extension-list-item';
import Blockquote from '@tiptap/extension-blockquote';
import Color from '@tiptap/extension-color';

import TextStyle from '@tiptap/extension-text-style';
import FontSize from 'tiptap-extension-font-size';
import TextAlign from '@tiptap/extension-text-align';

import '@tiptap/extension-text-style';



export default function CustomEditor() {
    const fontSizeList = [28, 20, 16, 12, 10];

    useEffect(() => {
        const editor = new Editor({
            element: document.querySelector('#hs-editor-tiptap [data-hs-editor-field]') as HTMLElement,
            extensions: [
                Placeholder.configure({
                    placeholder: 'Add a message, if you\'d like.',
                    emptyNodeClass: 'text-gray-800 '
                }),
                StarterKit,
                Paragraph.configure({
                    HTMLAttributes: {
                        class: 'text-gray-800 '
                    }
                }),
                Bold.configure({
                    HTMLAttributes: {
                        class: 'font-bold'
                    }
                }),
                Underline,
                // Link.configure({
                //     HTMLAttributes: {
                //         class: 'inline-flex items-center gap-x-1 text-blue-600 decoration-2 hover:underline font-medium dark:text-white'
                //     }
                // }),
                BulletList.configure({
                    HTMLAttributes: {
                        class: 'list-disc list-inside text-gray-800 '
                    }
                }),
                OrderedList.configure({
                    HTMLAttributes: {
                        class: 'list-decimal list-inside text-gray-800 '
                    }
                }),
                ListItem,
                Blockquote.configure({
                    HTMLAttributes: {
                        class: 'text-gray-800 sm:text-xl '
                    }
                }),
                Color,
                TextStyle,
                FontSize,
                TextAlign.configure({
                    types: ['heading', 'paragraph'],
                    alignments: ['left', 'center', 'right', 'justify'],
                    defaultAlignment: 'left'
                })

            ]
        });
        const actions = [
            {
                id: '#hs-editor-tiptap [data-hs-editor-bold]',
                fn: () => editor.chain().focus().toggleBold().run()
            },
            {
                id: '#hs-editor-tiptap [data-hs-editor-italic]',
                fn: () => editor.chain().focus().toggleItalic().run()
            },
            {
                id: '#hs-editor-tiptap [data-hs-editor-underline]',
                fn: () => editor.chain().focus().toggleUnderline().run()
            },
            {
                id: '#hs-editor-tiptap [data-hs-editor-strike]',
                fn: () => editor.chain().focus().toggleStrike().run()
            },
            // {
            //     id: '#hs-editor-tiptap [data-hs-editor-link]',
            //     fn: () => {
            //         const url = window.prompt('URL') as string;
            //         editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
            //     }
            // },
            {
                id: '#hs-editor-tiptap [data-hs-editor-ol]',
                fn: () => editor.chain().focus().toggleOrderedList().run()
            },
            {
                id: '#hs-editor-tiptap [data-hs-editor-ul]',
                fn: () => editor.chain().focus().toggleBulletList().run()
            },
            {
                id: '#hs-editor-tiptap [data-hs-editor-blockquote]',
                fn: () => editor.chain().focus().toggleBlockquote().run()
            },
            {
                id: '#hs-editor-tiptap [data-hs-editor-leftalign]',
                fn: () => editor.chain().focus().setTextAlign('left').run()
            },
            {
                id: '#hs-editor-tiptap [data-hs-editor-centeralign]',
                fn: () => editor.chain().focus().setTextAlign('center').run()
            },
            {
                id: '#hs-editor-tiptap [data-hs-editor-rightalign]',
                fn: () => editor.chain().focus().setTextAlign('right').run()
            },
            ...fontSizeList.map((size) => {
                return {
                    id: `#hs-font-size-${size}`,
                    fn: () => editor.chain().focus().setFontSize(size.toString() + 'pt').run()
                }
            })
        ];

        actions.forEach(({ id, fn }) => {
            const action = document.querySelector(id);

            if (action === null) return;

            action.addEventListener('click', fn);
        });

        document.querySelector('#hs-editor-tiptap [data-hs-editor-color] input')?.addEventListener('input', (e: Event) => {
            console.log(e);
            if (!e.target || !(e.target as HTMLInputElement).value) return;
            editor.chain().focus().setColor((e.target as HTMLInputElement).value).run();

        });
    }, [])

    return (
        <div className="overflow-hidden border border-gray-200 rounded-xl ">
            <div id="hs-editor-tiptap">
                <div className="flex items-center px-3 py-2 align-middle border-b border-gray-200 gap-x-1">


                    <div className="relative inline-flex hs-dropdown">
                        <button
                            id="hs-dropdown-default"
                            type="button"
                            className="inline-flex items-center px-2 py-2 text-sm font-medium text-gray-800 bg-white border border-gray-200 rounded-lg shadow-sm gap-x-1 hs-dropdown-toggle hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none"
                        >
                            <svg
                                width={16}
                                height={16}
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    fillRule="evenodd"
                                    clipRule="evenodd"
                                    d="M7.93417 2C7.95604 2 7.97799 2 8 2L16.0658 2C16.9523 1.99995 17.7161 1.99991 18.3278 2.08215C18.9833 2.17028 19.6117 2.36902 20.1213 2.87868C20.631 3.38835 20.8297 4.0167 20.9179 4.67221C21.0001 5.28388 21.0001 6.0477 21 6.9342L21 7.95C21 8.50229 20.5523 8.95 20 8.95C19.4477 8.95 19 8.50229 19 7.95V7.00001C19 6.02893 18.9979 5.40122 18.9357 4.93871C18.8774 4.50497 18.7832 4.36902 18.7071 4.2929C18.631 4.21677 18.495 4.12263 18.0613 4.06431C17.5988 4.00213 16.9711 4 16 4H13V21C13 21.5523 12.5523 22 12 22C11.4477 22 11 21.5523 11 21V4H8C7.02893 4 6.40122 4.00213 5.93871 4.06431C5.50497 4.12263 5.36902 4.21677 5.2929 4.2929C5.21677 4.36902 5.12263 4.50497 5.06431 4.93871C5.00213 5.40122 5 6.02893 5 7.00001V7.95C5 8.50229 4.55229 8.95 4 8.95C3.44772 8.95 3 8.50229 3 7.95V7.00001C3 6.97799 3 6.95604 3 6.93418C2.99995 6.04769 2.99991 5.28387 3.08215 4.67221C3.17028 4.0167 3.36902 3.38835 3.87868 2.87868C4.38835 2.36902 5.0167 2.17028 5.67221 2.08215C6.28387 1.99991 7.04769 1.99995 7.93417 2Z"
                                    fill="#1C274C"
                                />
                                <path
                                    d="M7 21H17"
                                    stroke="#333333"
                                    strokeWidth={2}
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>


                            <svg
                                className="hs-dropdown-open:rotate-180 size-4"
                                xmlns="http://www.w3.org/2000/svg"
                                width={10}
                                height={10}
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth={2}
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <path d="m6 9 6 6 6-6" />
                            </svg>
                        </button>
                        <div
                            className="z-50 hs-dropdown-menu transition-[opacity,margin] duration hs-dropdown-open:opacity-100 opacity-0 hidden min-w-60 bg-white shadow-md rounded-lg p-2 mt-2 after:h-4 after:absolute after:-bottom-4 after:start-0 after:w-full before:h-4 before:absolute before:-top-4 before:start-0 before:w-full"
                            aria-labelledby="hs-dropdown-default"
                        >
                            {
                                fontSizeList.map((size) => {
                                    return (
                                        <a key={size}
                                            className={`flex items-center gap-x-3.5 py-2 px-3 rounded-lg text-sm text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100`}

                                            id={`hs-font-size-${size}`}

                                        >
                                            {size}pt
                                        </a>
                                    )
                                })
                            }

                        </div>
                    </div>


                    <div className="inline-block hs-tooltip">
                        <button
                            className="inline-flex items-center justify-center w-8 h-8 text-sm font-semibold text-gray-800 border border-transparent rounded-full gap-x-2 hover:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none "
                            type="button"
                            data-hs-editor-bold=""
                        >
                            <svg
                                className="flex-shrink-0 size-4"
                                xmlns="http://www.w3.org/2000/svg"
                                width={20}
                                height={20}
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth={2}
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <path d="M14 12a4 4 0 0 0 0-8H6v8" />
                                <path d="M15 20a4 4 0 0 0 0-8H6v8Z" />
                            </svg>
                            <span className="absolute z-10 invisible inline-block px-2 py-1 text-xs font-medium text-white transition-opacity bg-gray-900 rounded shadow-sm opacity-0 hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible " role="tooltip">
                                굵게
                            </span>
                        </button>
                    </div>

                    <div className="inline-block hs-tooltip">
                        <button
                            className="inline-flex items-center justify-center w-8 h-8 text-sm font-semibold text-gray-800 border border-transparent rounded-full gap-x-2 hover:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none "
                            type="button"
                            data-hs-editor-italic=""
                        >
                            <svg
                                className="flex-shrink-0 size-4"
                                xmlns="http://www.w3.org/2000/svg"
                                width={20}
                                height={20}
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth={2}
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <line x1={19} x2={10} y1={4} y2={4} />
                                <line x1={14} x2={5} y1={20} y2={20} />
                                <line x1={15} x2={9} y1={4} y2={20} />
                            </svg>
                            <span className="absolute z-10 invisible inline-block px-2 py-1 text-xs font-medium text-white transition-opacity bg-gray-900 rounded shadow-sm opacity-0 hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible " role="tooltip">
                                이탤릭
                            </span>
                        </button>
                    </div>
                    <div className="inline-block hs-tooltip">
                        <button
                            className="inline-flex items-center justify-center w-8 h-8 text-sm font-semibold text-gray-800 border border-transparent rounded-full gap-x-2 hover:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none "
                            type="button"
                            data-hs-editor-underline=""
                        >
                            <svg
                                className="flex-shrink-0 size-4"
                                xmlns="http://www.w3.org/2000/svg"
                                width={20}
                                height={20}
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth={2}
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <path d="M6 4v6a6 6 0 0 0 12 0V4" />
                                <line x1={4} x2={20} y1={20} y2={20} />
                            </svg>
                            <span className="absolute z-10 invisible inline-block px-2 py-1 text-xs font-medium text-white transition-opacity bg-gray-900 rounded shadow-sm opacity-0 hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible " role="tooltip">
                                밑줄
                            </span>
                        </button>
                    </div>
                    <div className="inline-block hs-tooltip">
                        <button
                            className="inline-flex items-center justify-center w-8 h-8 text-sm font-semibold text-gray-800 border border-transparent rounded-full gap-x-2 hover:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none "
                            type="button"
                            data-hs-editor-strike=""
                        >
                            <svg
                                className="flex-shrink-0 size-4"
                                xmlns="http://www.w3.org/2000/svg"
                                width={20}
                                height={20}
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth={2}
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <path d="M16 4H9a3 3 0 0 0-2.83 4" />
                                <path d="M14 12a4 4 0 0 1 0 8H6" />
                                <line x1={4} x2={20} y1={12} y2={12} />
                            </svg>
                            <span className="absolute z-10 invisible inline-block px-2 py-1 text-xs font-medium text-white transition-opacity bg-gray-900 rounded shadow-sm opacity-0 hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible " role="tooltip">
                                취소선
                            </span>
                        </button>
                    </div>
                    {/* <div className="inline-block hs-tooltip">
                        <button
                            className="inline-flex items-center justify-center w-8 h-8 text-sm font-semibold text-gray-800 border border-transparent rounded-full gap-x-2 hover:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:text-white dark:hover:bg-neutral-700"
                            type="button"
                        data-hs-editor-link=""
                    >
                        <svg
                            className="flex-shrink-0 size-4"
                            xmlns="http://www.w3.org/2000/svg"
                            width={20}
                            height={20}
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth={2}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
                            <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
                        </svg>
                    </button>
</div> */}
                    <div className="inline-block hs-tooltip">
                        <button
                            className="inline-flex items-center justify-center w-8 h-8 text-sm font-semibold text-gray-800 border border-transparent rounded-full gap-x-2 hover:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none "
                            type="button"
                            data-hs-editor-ol=""
                        >
                            <svg
                                className="flex-shrink-0 size-4"
                                xmlns="http://www.w3.org/2000/svg"
                                width={20}
                                height={20}
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth={2}
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <line x1={10} x2={21} y1={6} y2={6} />
                                <line x1={10} x2={21} y1={12} y2={12} />
                                <line x1={10} x2={21} y1={18} y2={18} />
                                <path d="M4 6h1v4" />
                                <path d="M4 10h2" />
                                <path d="M6 18H4c0-1 2-2 2-3s-1-1.5-2-1" />
                            </svg>
                            <span className="absolute z-10 invisible inline-block px-2 py-1 text-xs font-medium text-white transition-opacity bg-gray-900 rounded shadow-sm opacity-0 hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible " role="tooltip">
                                숫자 글머리
                            </span>
                        </button>
                    </div>
                    <div className="inline-block hs-tooltip">
                        <button
                            className="inline-flex items-center justify-center w-8 h-8 text-sm font-semibold text-gray-800 border border-transparent rounded-full gap-x-2 hover:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none "
                            type="button"
                            data-hs-editor-ul=""
                        >
                            <svg
                                className="flex-shrink-0 size-4"
                                xmlns="http://www.w3.org/2000/svg"
                                width={20}
                                height={20}
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth={2}
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <line x1={8} x2={21} y1={6} y2={6} />
                                <line x1={8} x2={21} y1={12} y2={12} />
                                <line x1={8} x2={21} y1={18} y2={18} />
                                <line x1={3} x2="3.01" y1={6} y2={6} />
                                <line x1={3} x2="3.01" y1={12} y2={12} />
                                <line x1={3} x2="3.01" y1={18} y2={18} />
                            </svg>
                            <span className="absolute z-10 invisible inline-block px-2 py-1 text-xs font-medium text-white transition-opacity bg-gray-900 rounded shadow-sm opacity-0 hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible " role="tooltip">
                                기호 글머리
                            </span>
                        </button>
                    </div>
                    <div className="inline-block hs-tooltip">
                        <button
                            className="inline-flex items-center justify-center w-8 h-8 text-sm font-semibold text-gray-800 border border-transparent rounded-full gap-x-2 hover:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none "
                            type="button"
                            data-hs-editor-leftalign=""
                        >
                            <svg
                                fill="#000000"
                                xmlns="http://www.w3.org/2000/svg"
                                width={20}
                                height={16}
                                strokeWidth={1}
                                viewBox="0 0 52 52"
                                enableBackground="new 0 0 52 52"
                                xmlSpace="preserve"
                            >
                                <path d="M48,6.5C48,5.7,47.3,5,46.5,5h-41C4.7,5,4,5.7,4,6.5v3C4,10.3,4.7,11,5.5,11h41c0.8,0,1.5-0.7,1.5-1.5V6.5z" />
                                <path
                                    d="M40,18.5c0-0.8-0.7-1.5-1.5-1.5h-33C4.7,17,4,17.7,4,18.5v3C4,22.3,4.7,23,5.5,23h33c0.8,0,1.5-0.7,1.5-1.5
	V18.5z"
                                />
                                <path
                                    d="M40,42.5c0-0.8-0.7-1.5-1.5-1.5h-33C4.7,41,4,41.7,4,42.5v3C4,46.3,4.7,47,5.5,47h33c0.8,0,1.5-0.7,1.5-1.5
	V42.5z"
                                />
                                <path
                                    d="M48,30.5c0-0.8-0.7-1.5-1.5-1.5h-41C4.7,29,4,29.7,4,30.5v3C4,34.3,4.7,35,5.5,35h41c0.8,0,1.5-0.7,1.5-1.5
	V30.5z"
                                />
                            </svg>

                            <span className="absolute z-10 invisible inline-block px-2 py-1 text-xs font-medium text-white transition-opacity bg-gray-900 rounded shadow-sm opacity-0 hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible " role="tooltip">
                                왼쪽 정렬
                            </span>
                        </button>
                    </div>
                    <div className="inline-block hs-tooltip">
                        <button
                            className="inline-flex items-center justify-center w-8 h-8 text-sm font-semibold text-gray-800 border border-transparent rounded-full gap-x-2 hover:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none "
                            type="button"
                            data-hs-editor-centeralign=""
                        >
                            <svg
                                width={20}
                                height={18}
                                viewBox="0 0 48 48"
                                version="1.1"
                                xmlns="http://www.w3.org/2000/svg"
                                xmlnsXlink="http://www.w3.org/1999/xlink"
                            >
                                {/* Uploaded to: SVG Repo, www.svgrepo.com, Generator: SVG Repo Mixer Tools */}
                                <title>align-text-center1</title>
                                <desc>Created with Sketch.</desc>
                                <g
                                    id="align-text-center1"
                                    stroke="none"
                                    strokeWidth={1}
                                    fill="none"
                                    fillRule="evenodd"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                >
                                    <rect width={48} height={48} fill="white" fillOpacity="0.01" />
                                    <g
                                        id="编组"
                                        transform="translate(6.000000, 8.000000)"
                                        stroke="#000000"
                                        strokeWidth={4}
                                    >
                                        <path d="M30,11 L6,11" id="路径"></path>
                                        <path d="M36,1 L0,1" id="路径"></path>
                                        <path d="M36,21 L0,21" id="路径"></path>
                                        <path d="M30,31 L6,31" id="路径"></path>
                                    </g>
                                </g>
                            </svg>

                            <span className="absolute z-10 invisible inline-block px-2 py-1 text-xs font-medium text-white transition-opacity bg-gray-900 rounded shadow-sm opacity-0 hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible " role="tooltip">
                                가운데 정렬
                            </span>
                        </button>
                    </div>
                    <div className="inline-block hs-tooltip">
                        <button
                            className="inline-flex items-center justify-center w-8 h-8 text-sm font-semibold text-gray-800 border border-transparent rounded-full gap-x-2 hover:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none "
                            type="button"
                            data-hs-editor-rightalign=""
                        >
                            <svg fill="#000000" xmlns="http://www.w3.org/2000/svg"
                                width={20} height={16} viewBox="0 0 52 52" enableBackground="new 0 0 52 52" xmlSpace="preserve">
                                <path d="M46.5,5h-41C4.7,5,4,5.7,4,6.5v3C4,10.3,4.7,11,5.5,11h41c0.8,0,1.5-0.7,1.5-1.5v-3C48,5.7,47.3,5,46.5,5z"
                                />
                                <path d="M46.5,17h-33c-0.8,0-1.5,0.7-1.5,1.5v3c0,0.8,0.7,1.5,1.5,1.5h33c0.8,0,1.5-0.7,1.5-1.5v-3
	C48,17.7,47.3,17,46.5,17z"/>
                                <path d="M46.5,41h-33c-0.8,0-1.5,0.7-1.5,1.5v3c0,0.8,0.7,1.5,1.5,1.5h33c0.8,0,1.5-0.7,1.5-1.5v-3
	C48,41.7,47.3,41,46.5,41z"/>
                                <path d="M46.5,29h-41C4.7,29,4,29.7,4,30.5v3C4,34.3,4.7,35,5.5,35h41c0.8,0,1.5-0.7,1.5-1.5v-3
	C48,29.7,47.3,29,46.5,29z"/>
                            </svg>
                            <span className="absolute z-10 invisible inline-block px-2 py-1 text-xs font-medium text-white transition-opacity bg-gray-900 rounded shadow-sm opacity-0 hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible " role="tooltip">
                                오른쪽 정렬
                            </span>
                        </button>
                    </div>
                    <div className="inline-block hs-tooltip">
                        <button
                            className="inline-flex items-center justify-center w-8 h-8 text-sm font-semibold text-gray-800 border border-transparent rounded-full gap-x-2 hover:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none "
                            type="button"
                            data-hs-editor-blockquote=""
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
                                <path d="M9.983 3v7.391c0 5.704-3.731 9.57-8.983 10.609l-.995-2.151c2.432-.917 3.995-3.638 3.995-5.849h-4v-10h9.983zm14.017 0v7.391c0 5.704-3.748 9.571-9 10.609l-.996-2.151c2.433-.917 3.996-3.638 3.996-5.849h-3.983v-10h9.983z" />
                            </svg>
                            <span className="absolute z-10 invisible inline-block px-2 py-1 text-xs font-medium text-white transition-opacity bg-gray-900 rounded shadow-sm opacity-0 hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible " role="tooltip">
                                인용문
                            </span>
                        </button>
                    </div>
                    <div className="inline-block hs-tooltip">
                        <button
                            className="inline-flex items-center justify-center w-8 h-8 text-sm font-semibold text-gray-800 border border-transparent rounded-full gap-x-2 disabled:opacity-50 disabled:pointer-events-none "
                            type="button"
                            data-hs-editor-color=""
                        >
                            <input
                                type="color"


                                className='w-8 h-8 text-sm font-semibold text-gray-800 bg-transparent border border-transparent rounded-full cursor-pointer gap-x-2 disabled:opacity-50 disabled:pointer-events-none'
                            />
                            <span className="absolute z-10 invisible inline-block px-2 py-1 text-xs font-medium text-white transition-opacity bg-gray-900 rounded shadow-sm opacity-0 hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible " role="tooltip">
                                글자 색상
                            </span>
                        </button>
                    </div>

                </div>
                <div className="h-[25rem] overflow-auto px-3 py-2" data-hs-editor-field="" />
            </div>
        </div>

    )
}
