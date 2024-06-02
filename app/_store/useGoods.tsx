import { create } from 'zustand'

import fetcher from '../_common/fetcher'
import Config from '@/config/config.export';

import Artist from '../_data/Artist';
import { Cookies } from 'react-cookie';

interface Goods {
  id : string;
  backgroundList: any[string];
  mainImage: any;
  title: string | undefined;
  description: string | undefined;
  content: string | undefined;
  artist : Artist;
  isFetchFinished: boolean;
  price : number;
  category : string;

  getGoods: (artistGoodsId : string, isEdit : boolean) => Promise<string>;
  setTitle: (title: string) => void;
  setContent: (content: string) => void;
  setDescription: (description: string) => void;

  reset : () => void;

}


export const useGoods = create<Goods>((set) => ({
  isFetchFinished : false,
  id : "",
  reset : () => set({
    title : undefined,
    description : undefined,
    content : undefined,
    artist : {
      id : '',
      nickname : '',
      profile_image : ''
    },
    // backgroundList : [],
    isFetchFinished : false
  }),
  backgroundList: [],
  getGoods: async (artistGoodsId, isEdit = false) => {
   
    // const res = await fetcher('/category/list');
    // const data = res.json();
    let res = await fetch(Config().baseUrl + `/artist/goods/${artistGoodsId}${isEdit == true ? '?is_edit=true' : ''}`, {
      method: 'GET',
      headers: {

        'Accept': 'application/json',
        "Authorization": "Bearer " + new Cookies().get('accessToken')

      },

    })

    if(res.status != 200) {
      document.location.href = `/market/${artistGoodsId}`
    }

    const data = (await res.json())?.data;

    set({
      id : data.id,
      title : data.title, description : data.description, content : data.content,
      price : data.price / 10000,
      category : data.category,
      artist : {
        id : data.artist.id,
        nickname : data.artist.nickname,
        profile_image : data.artist.profile_image
      },
      
    })

    let backgroundListData = data.example_image_url_list
    let main_image = {
      'id' : data.main_image_id,
      'url' : data.image.media.path
    }

    console.log(backgroundListData)
    // if (main_image_url) {
    //   backgroundListData.unshift(main_image_url)
    // }


    // const data = ['/images/sample-pf.jpg', '/images/sample-pf2.jpg', 'https://www.shutterstock.com/image-vector/vector-illustration-landscape-wood-surface-600nw-1734516854.jpg']

    // set({
    //   title: '세상을 놀라게 할 디자인', description: '저만 믿고 맡겨 주시면 엄청난 세상을 놀라게 할 제품을 만들어드리겠습니다.',
    //   'content': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In et tellus arcu. Fusce vitae commodo neque, sit amet condimentum dui. Sed commodo faucibus magna quis eleifend. Nam nec augue lectus. Curabitur blandit ante sed mi condimentum, nec aliquet libero tempor. Donec a convallis nunc. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Maecenas accumsan nisl odio, ut elementum nibh varius ac. Nulla luctus lobortis tristique. Donec ornare, orci sed dapibus fermentum, nisl purus ornare leo, ac accumsan nisi magna sed mauris. Ut eget quam a nisi semper porttitor. Morbi ex dui, cursus id arcu quis, porttitor auctor tellus. Ut ut mauris vitae libero elementum auctor at non nisl. Nam non erat neque. Pellentesque sit amet urna dui. \n\n Sed in blandit nibh, at hendrerit lorem. Donec libero arcu, eleifend at ante suscipit, iaculis faucibus magna. Vivamus id libero nulla. Nullam eu est id dui commodo venenatis sit amet ut ligula. Vivamus vel sodales metus, sed gravida orci. Ut feugiat nisi cursus, mollis sem vehicula, bibendum turpis. Integer eget erat sed lectus volutpat sodales a vitae neque. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Sed laoreet, nisl vel scelerisque imperdiet, risus leo rhoncus eros, eget sagittis sapien enim non massa. Aliquam nec nulla ex. Vivamus non aliquet risus, id mollis nunc. Praesent eu sollicitudin sem. Suspendisse nec vestibulum justo, ut fermentum tellus. \n\n '

    // })
    set({ backgroundList: backgroundListData, mainImage: main_image})

    return data.title
  },
  mainImage : {},
  artist : {
    id : '',
    nickname : '',
    profile_image : ''
  },
  price : 0,
  category : '',

  content: undefined,
  setContent: (content: string) => set({ content }),
  title: undefined,
  setTitle: (title: string) => set({ title }),
  description: undefined,
  setDescription: (description: string) => set({ description })
}))

