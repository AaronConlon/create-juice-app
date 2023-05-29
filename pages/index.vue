<template>
  <div
    class="flex justify-center items-center flex-col py-32 min-h-screen gap-12"
  >
    <h1 class="text-3xl font-bold underline">Hello Juice!</h1>
    <a href="https://github.com/Developer27149/create-juice-app">
      <Icon name="uil:github" color="black" size="32" />
    </a>
    <button
      class="px-2 items-center py-1 flex rounded-sm bg-blue-700 text-white min-w-[90px]"
      @click="increment"
    >
      <Icon name="material-symbols:add" />
      <span class="text-center flex-grow relative top-[1px]">
        {{ count }}
      </span>
    </button>
    <div
      v-for="{ id, title, body } in data"
      :key="id"
      class="text-left max-w-[600px] w-full px-4 py-2 border border-gray-300 rounded-md shadow-md"
    >
      <h2 class="text-xl font-bold">{{ title }}</h2>
      <p class="text-gray-500">{{ body }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useQuery } from '@tanstack/vue-query';
import { globalStore, useGlobalStore } from '~/stores/global';
import { commonApi } from '~/services/common';

const { count } = useGlobalStore();
const { increment } = globalStore();

const { data, suspense } = useQuery({
  queryKey: ['demo'],
  queryFn: () => commonApi.getDemoData(),
});

await suspense();
</script>
