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

import '@tiptap/extension-text-style';



export default function CustomEditor() {

    useEffect(() => {
        const editor = new Editor({
            element: document.querySelector('#hs-editor-tiptap [data-hs-editor-field]') as HTMLElement,
            extensions: [
                Placeholder.configure({
                    placeholder: 'Add a message, if you\'d like.',
                    emptyNodeClass: 'text-gray-800 dark:text-neutral-200'
                }),
                StarterKit,
                Paragraph.configure({
                    HTMLAttributes: {
                        class: 'text-gray-800 dark:text-neutral-200'
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
                        class: 'list-disc list-inside text-gray-800 dark:text-white'
                    }
                }),
                OrderedList.configure({
                    HTMLAttributes: {
                        class: 'list-decimal list-inside text-gray-800 dark:text-white'
                    }
                }),
                ListItem,
                Blockquote.configure({
                    HTMLAttributes: {
                        class: 'text-gray-800 sm:text-xl dark:text-white'
                    }
                }),
                Color,
                TextStyle
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
        <div className="overflow-hidden border border-gray-200 rounded-xl dark:border-neutral-700">
            <div id="hs-editor-tiptap">
                <div className="flex px-3 py-2 align-middle border-b border-gray-200 gap-x-1 dark:border-neutral-700">
                    <div className="inline-block hs-tooltip">
                        <button
                            className="inline-flex items-center justify-center w-8 h-8 text-sm font-semibold text-gray-800 border border-transparent rounded-full gap-x-2 hover:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:text-white dark:hover:bg-neutral-700"
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
                            <span className="absolute z-10 invisible inline-block px-2 py-1 text-xs font-medium text-white transition-opacity bg-gray-900 rounded shadow-sm opacity-0 hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible dark:bg-neutral-700" role="tooltip">
                                굵게
                            </span>
                        </button>
                    </div>

                    <div className="inline-block hs-tooltip">
                        <button
                            className="inline-flex items-center justify-center w-8 h-8 text-sm font-semibold text-gray-800 border border-transparent rounded-full gap-x-2 hover:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:text-white dark:hover:bg-neutral-700"
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
                            <span className="absolute z-10 invisible inline-block px-2 py-1 text-xs font-medium text-white transition-opacity bg-gray-900 rounded shadow-sm opacity-0 hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible dark:bg-neutral-700" role="tooltip">
                                이탤릭
                            </span>
                        </button>
                    </div>
                    <div className="inline-block hs-tooltip">
                        <button
                            className="inline-flex items-center justify-center w-8 h-8 text-sm font-semibold text-gray-800 border border-transparent rounded-full gap-x-2 hover:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:text-white dark:hover:bg-neutral-700"
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
                            <span className="absolute z-10 invisible inline-block px-2 py-1 text-xs font-medium text-white transition-opacity bg-gray-900 rounded shadow-sm opacity-0 hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible dark:bg-neutral-700" role="tooltip">
                                밑줄
                            </span>
                        </button>
                    </div>
                    <div className="inline-block hs-tooltip">
                        <button
                            className="inline-flex items-center justify-center w-8 h-8 text-sm font-semibold text-gray-800 border border-transparent rounded-full gap-x-2 hover:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:text-white dark:hover:bg-neutral-700"
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
                            <span className="absolute z-10 invisible inline-block px-2 py-1 text-xs font-medium text-white transition-opacity bg-gray-900 rounded shadow-sm opacity-0 hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible dark:bg-neutral-700" role="tooltip">
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
                            className="inline-flex items-center justify-center w-8 h-8 text-sm font-semibold text-gray-800 border border-transparent rounded-full gap-x-2 hover:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:text-white dark:hover:bg-neutral-700"
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
                            <span className="absolute z-10 invisible inline-block px-2 py-1 text-xs font-medium text-white transition-opacity bg-gray-900 rounded shadow-sm opacity-0 hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible dark:bg-neutral-700" role="tooltip">
                                숫자 글머리
                            </span>
                        </button>
                    </div>
                    <div className="inline-block hs-tooltip">
                        <button
                            className="inline-flex items-center justify-center w-8 h-8 text-sm font-semibold text-gray-800 border border-transparent rounded-full gap-x-2 hover:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:text-white dark:hover:bg-neutral-700"
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
                            <span className="absolute z-10 invisible inline-block px-2 py-1 text-xs font-medium text-white transition-opacity bg-gray-900 rounded shadow-sm opacity-0 hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible dark:bg-neutral-700" role="tooltip">
                                기호 글머리
                            </span>
                        </button>
                    </div>
                    <div className="inline-block hs-tooltip">
                        <button
                            className="inline-flex items-center justify-center w-8 h-8 text-sm font-semibold text-gray-800 border border-transparent rounded-full gap-x-2 hover:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:text-white dark:hover:bg-neutral-700"
                            type="button"
                            data-hs-editor-blockquote=""
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
                                <path d="M17 6H3" />
                                <path d="M21 12H8" />
                                <path d="M21 18H8" />
                                <path d="M3 12v6" />
                            </svg>
                            <span className="absolute z-10 invisible inline-block px-2 py-1 text-xs font-medium text-white transition-opacity bg-gray-900 rounded shadow-sm opacity-0 hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible dark:bg-neutral-700" role="tooltip">
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
                            <span className="absolute z-10 invisible inline-block px-2 py-1 text-xs font-medium text-white transition-opacity bg-gray-900 rounded shadow-sm opacity-0 hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible dark:bg-neutral-700" role="tooltip">
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
