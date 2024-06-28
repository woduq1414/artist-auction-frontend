import { create } from 'zustand'

import fetcher from '../_common/fetcher'
import Config from '@/config/config.export';

import Artist from '../_data/Artist';
import { Cookies } from 'react-cookie';

interface ImageModal {
  modalImage : string;
  setModalImage : (modalImage : string) => void;

}


export const useImageModal = create<ImageModal>((set) => ({
 
  modalImage: '',
  setModalImage: (image : string) => set({ modalImage: image }),
}))

