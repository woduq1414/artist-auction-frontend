import { create } from 'zustand'

import fetcher from '../_common/fetcher'

interface Goods {
  backgroundList: any[string];
  title : string;
  description : string;
  content : string;

  getGoods: () => void;
  setTitle: (title: string) => void;
  setContent: (content: string) => void;
  setDescription: (description: string) => void;
  
}


export const useGoods = create<Goods>((set) => ({
  backgroundList: [],
  getGoods: async () => {
    // const res = await fetcher('/category/list');
    // const data = res.json();
    const data = ['/images/sample-pf.jpg','/images/sample-pf2.jpg','/images/sample-pf.jpg']

    set({ title : '세상을 놀라게 할 디자인', description : '저만 믿고 맡겨 주시면 엄청난 세상을 놀라게 할 제품을 만들어드리겠습니다.',
      'content' : 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In et tellus arcu. Fusce vitae commodo neque, sit amet condimentum dui. Sed commodo faucibus magna quis eleifend. Nam nec augue lectus. Curabitur blandit ante sed mi condimentum, nec aliquet libero tempor. Donec a convallis nunc. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Maecenas accumsan nisl odio, ut elementum nibh varius ac. Nulla luctus lobortis tristique. Donec ornare, orci sed dapibus fermentum, nisl purus ornare leo, ac accumsan nisi magna sed mauris. Ut eget quam a nisi semper porttitor. Morbi ex dui, cursus id arcu quis, porttitor auctor tellus. Ut ut mauris vitae libero elementum auctor at non nisl. Nam non erat neque. Pellentesque sit amet urna dui. \n\n Sed in blandit nibh, at hendrerit lorem. Donec libero arcu, eleifend at ante suscipit, iaculis faucibus magna. Vivamus id libero nulla. Nullam eu est id dui commodo venenatis sit amet ut ligula. Vivamus vel sodales metus, sed gravida orci. Ut feugiat nisi cursus, mollis sem vehicula, bibendum turpis. Integer eget erat sed lectus volutpat sodales a vitae neque. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Sed laoreet, nisl vel scelerisque imperdiet, risus leo rhoncus eros, eget sagittis sapien enim non massa. Aliquam nec nulla ex. Vivamus non aliquet risus, id mollis nunc. Praesent eu sollicitudin sem. Suspendisse nec vestibulum justo, ut fermentum tellus. \n\n '

     })
    set({ backgroundList: data })
  },
  content : 'content',
  setContent: (content: string) => set({ content }),
  title: 'title',
  setTitle: (title: string) => set({ title }),
  description: 'description',
  setDescription: (description: string) => set({ description })
}))

