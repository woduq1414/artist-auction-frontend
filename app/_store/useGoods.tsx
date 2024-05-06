import { create } from 'zustand'

import fetcher from '../_common/fetcher'

interface Goods {
  backgroundList: any[string];
  title : string;
  description : string;

  getBackgroundList: () => void;
  setTitle: (title: string) => void;
  setDescription: (description: string) => void;
  
}


export const useGoods = create<Goods>((set) => ({
  backgroundList: [],
  getBackgroundList: async () => {
    // const res = await fetcher('/category/list');
    // const data = res.json();
    const data = ['/images/sample-pf.jpg','/images/sample-pf2.jpg','/images/sample-pf.jpg']
    set({ backgroundList: data })
  },
  title: 'title',
  setTitle: (title: string) => set({ title }),
  description: 'description',
  setDescription: (description: string) => set({ description })
}))

