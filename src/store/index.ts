import { createPinia } from 'pinia';
import useAppStore from './modules/app';
import useUserStore from './modules/user';
import useTabBarStore from './modules/tab-bar';
import useMeta2dStore from './modules/meta2d';

const pinia = createPinia();

export { useAppStore, useUserStore, useTabBarStore, useMeta2dStore };
export default pinia;
