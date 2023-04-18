import { defineStore } from 'pinia';

import { Pen } from '@meta2d/core';

const useMeta2dStore = defineStore('user', {
  state: (): Pen => ({
    text: undefined,
  }),

  getters: {
    // userInfo(state: UserState): UserState {
    //   return { ...state };
    // },
  },

  actions: {},
});

export default useMeta2dStore;
