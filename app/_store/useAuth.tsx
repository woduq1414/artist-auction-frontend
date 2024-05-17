import { create } from 'zustand'

import fetcher from '../_common/fetcher'
import Config from '@/config/config.export';
import { Cookies } from 'react-cookie';

interface Auth {
  accessToken: string;
  refreshToken: string;

  nickname: string;
  profileImage: string;
  isLogin : boolean;

  setInfo: (info: any) => void;
  checkAuth: () => void;



}


export const useAuth = create<Auth>((set) => ({
  accessToken: '',
  refreshToken: '',
  nickname: '',
  profileImage: '',
  isLogin : false,
  setInfo: (info: any) => set({ ...info }),
  checkAuth: async () => {
    // const res = await fetcher('/auth/check');
    // const data = res.json();

    const cookies = new Cookies();
    const accessToken = cookies.get('accessToken');

    let res = await fetch(Config().baseUrl + '/auth/me', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        "Authorization": "Bearer " + accessToken
      },

    })
    if (res.status === 200) {
      let data = await res.json()
      set({ ...data.data, isLogin: true })
    } else {
      set({ isLogin: false })
    }



  }
}))

