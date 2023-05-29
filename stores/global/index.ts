import { storeToRefs } from 'pinia';
import { GLOBAL_STORE } from '~~/stores/storeIdList';

export const globalStore = defineStore(GLOBAL_STORE, () => {
  const count = ref(0);
  const increment = () => count.value++;
  return { count, increment };
});

export const useGlobalStore = () => storeToRefs(globalStore());
