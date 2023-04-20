import { defineStore } from 'pinia';

import { Pen } from '@meta2d/core';
// state: (): TabBarState => ({
//   cacheTabList: new Set([DEFAULT_ROUTE_NAME]),
//   tagList: [DEFAULT_ROUTE],
// }),
function isValidKey(
  key: string | number | symbol,
  object: object
): key is keyof typeof object {
  return key in object;
}
const useMeta2dStore = defineStore('meta2dPen', {
  state: () => {
    return {
      pen: { x: 0, y: 0, width: 0, height: 0, id: '', text: '' },
    };
  },

  getters: {
    // userInfo(state: UserState): UserState {
    //   return { ...state };
    // },
  },
  actions: {
    setPen(obj: Pen) {
      console.log('setPen', this.pen);
      console.log('setPen', obj);

      Object.keys(this.pen).forEach((key) => {
        if (isValidKey(key, this.pen)) {
          this.pen[key] = obj[key];
        }
      });
    },
  },
});

export default useMeta2dStore;
