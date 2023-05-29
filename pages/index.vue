<template>
  <div class="flex justify-center items-center flex-col h-screen gap-12">
    <h1 class="text-3xl font-bold underline">Hello world!</h1>
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
  </div>
</template>

<script setup lang="ts">
import { globalStore, useGlobalStore } from "~/stores/global";

const { count } = useGlobalStore();
const { increment } = globalStore();
</script>
