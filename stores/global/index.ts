import { GLOBAL_STORE } from "~~/stores/storeIdList";
import { storeToRefs } from "pinia";

export const globalStore = defineStore(GLOBAL_STORE, () => {
  const count = ref(0);
  const increment = () => count.value++;
  return { count, increment };
});

export const useGlobalStore = () => storeToRefs(globalStore());
