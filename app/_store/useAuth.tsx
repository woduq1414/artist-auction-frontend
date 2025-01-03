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
  userId: string;
  isLogin: boolean;

  setInfo: (info: any) => void;
  checkAuth: () => void;

  isNavSearchBarShow: boolean;
  setIsNavSearchBarShow: (flag: boolean) => void;

  notifyCount: number;
  plusNotifyCount: () => void;
  minusNotifyCount: () => void;
  setNotifyCount: (count: number) => void;

  chatCount : number;
  setChatCount : (count : number) => void;
  plusChatCount : (count : number) => void;
  minusChatCount : (count : number) => void;

  selectedChattingRoom: any;
  setSelectedChattingRoom: (room: any) => void;

  chattingRoomList: any[];
  setChattingRoomList: (list: any[]) => void;

  chattingList: any[];
  setChattingList: (list: any[]) => void;

  notifyList: any[];
  setNotifyList: (list: any[]) => void;

  notifyRead: number;
  setNotifyRead: (count: number) => void;
}


export const useAuth = create<Auth>((set) => ({
  accessToken: '',
  refreshToken: '',
  nickname: '',
  id: '',
  userId: '',
  profileImage: '',
  loginType: '',
  accountType: '',
  isNavSearchBarShow: true,
  notifyCount: 0,
  notifyList: [],
  notifyRead : 0,
  setNotifyList: (list: any[]) => set({ notifyList: list }),
  setNotifyRead: (count: number) => set({ notifyRead: count }),
  setIsNavSearchBarShow: (flag: boolean) => set({ isNavSearchBarShow: flag }),
  isLogin: false,
  setInfo: (info: any) => set({ ...info }),


  plusNotifyCount: () => set((state) => ({ notifyCount: state.notifyCount + 1 })),
  minusNotifyCount: () => set((state) => ({ notifyCount: state.notifyCount - 1 })),
  setNotifyCount: (count: number) => set({ notifyCount: count }),

  chatCount : 0,
  setChatCount : (count : number) => set({ chatCount : count }),
  plusChatCount : (count : number) => set((state) => ({ chatCount : state.chatCount + count })),
  minusChatCount : (count : number) => set((state) => ({ chatCount : state.chatCount - count })),

  chattingList: [],
  setChattingList: (list: any[]) => set({ chattingList: list }),

  chattingRoomList: [],
  setChattingRoomList: (list: any[]) => set({ chattingRoomList: list }),

  selectedChattingRoom: undefined,
  setSelectedChattingRoom: (room: any) => set({ selectedChattingRoom: room }),


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

