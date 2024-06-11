import { create } from 'zustand'

import fetcher from '../_common/fetcher'
import Config from '@/config/config.export';
import { Cookies } from 'react-cookie';

interface Auth {
  accessToken: string;
  refreshToken: string;

  nickname: string;
  accountType: string;
  profileImage: string;

  loginType: string;
  id: string;
  isLogin: boolean;

  setInfo: (info: any) => void;
  checkAuth: () => void;



}


export const useAuth = create<Auth>((set) => ({
  accessToken: '',
  refreshToken: '',
  nickname: '',
  id: '',
  profileImage: '',
  loginType: '',
  accountType: '',
  isLogin: false,
  setInfo: (info: any) => set({ ...info }),
  checkAuth: async () => {
    // const res = await fetcher('/auth/check');
    // const data = res.json();

    const cookies = new Cookies();
    const accessToken = cookies.get('accessToken');

    let isLoginFlag = false;
    if (accessToken) {
      let jwtPayload
      try {
        jwtPayload = JSON.parse(atob(accessToken.split('.')[1]))
      } catch (e) {
        console.log(e);
        isLoginFlag = false
        return;
      }
      const exp = jwtPayload.exp
      const data = jwtPayload.data
      const now = new Date().getTime() / 1000
      if (now > exp) {
        isLoginFlag = false
        cookies.remove('accessToken')
        set({ isLogin: false })
      } else {
        isLoginFlag = true
        set({ ...data, isLogin: true })

      }
    } else {
      isLoginFlag = false
      cookies.remove('accessToken')
      set({ isLogin: false })
    }

    // const path = window.location.pathname
    // if (path === '/auth' || path === '/auth/new') {
    //   if (isLoginFlag) {
    //     window.location.href = '/'
    //   }
    // }else if (path === '/market/new'){
    //   if (!isLoginFlag) {
    //     window.location.href = '/auth'
    //   }
    // }





    // let res = await fetch(Config().baseUrl + '/auth/me', {
    //   method: 'GET',
    //   headers: {
    //     'Content-Type': 'application/json',
    //     'Accept': 'application/json',
    //     "Authorization": "Bearer " + accessToken
    //   },

    // })
    // if (res.status === 200) {
    //   let data = await res.json()
    //   set({ ...data.data, isLogin: true })
    // } else {
    //   set({ isLogin: false })
    // }



  }
}))

