'use client'

import { useCategory } from '@/app/_store/useCategory';



import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import React, { useEffect, useMemo, useRef, useState } from 'react';
import CustomEditor from '@/app/_components/CustomEditor';
import { ChevronDoubleLeftIcon, ChevronDoubleRightIcon, PlusIcon, TrashIcon } from '@heroicons/react/24/solid';
// import { HSSelect, HSSelect } from 'preline';
import Cropper, { ReactCropperElement } from "react-cropper";
import "cropperjs/dist/cropper.css";
import { toast } from 'react-toastify';
import Config from '@/config/config.export';
import { Cookies } from 'react-cookie';
import { set } from 'lodash';
import errorBuilder from '@/app/_common/errorBuilder';
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import MarketFormPage from '@/app/_components/MarketFormPage';


const NewMarketPage = () => {

    return (
        <MarketFormPage isEdit={false}/>
    )

}

export default NewMarketPage;