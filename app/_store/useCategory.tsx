import { create } from 'zustand'

import fetcher from '../_common/fetcher'
import Config from '@/config/config.export';

interface Category {
  categoryList: any[];
  selectedCategory: any;
  listviewType: string;
  getCategoryList: () => void;
  setSelectedCategory: (selectedCategory: any) => void;
  setListViewType: (listviewType: string) => void;
  goodsList: any[] | undefined;
  fetchGoodsList: (category : string, 
    sort : string,
  ) => void;
}



export const useCategory = create<Category>((set) => ({
  categoryList: [],
  getCategoryList: async () => {
    // const res = await fetcher('/category/list');
    // const data = res.json();
    const data = [{
      id: 1, name: '디자인', list: [{ id: 2, name: '웹 UI/UX' },
      { id: 3, name: '앱 UI/UX' }, { id: 4, name: '로고' }]
    }, {
      id: 8,
      name: '모델링', list: [{ id: 5, name: '3D' },
      { id: 6, name: '4D' }, { id: 7, name: '5D' }]
    }

    ]
    set({ categoryList: data })
  },
  selectedCategory: {
    id: 0,
    name: '전체',
    list: []

  },
  setSelectedCategory: (selectedCategory: any) => set({ selectedCategory }),
  listviewType: 'column',
  setListViewType: (listviewType: string) => set({ listviewType }),
  goodsList: undefined,
  fetchGoodsList: async (category : string, sort : string) => {
    set({ goodsList: undefined })
    if (category === 'all') {
      category = '';
    }
    let res = await fetch(Config().baseUrl + `/artist/goods?category=${category}&sort=${sort}`, {
      method: 'GET',
      headers: {

        'Accept': 'application/json',

      },

    })
    const data = await res.json();
    console.log(data);

    set({ goodsList: data.data.items })
  }
}))