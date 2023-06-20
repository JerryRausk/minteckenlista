<template>
  <div
    class="rounded-full bg-white flex-row w-7/12 m-auto justify-between pl-3 pe-3 pt-1 pb-1 text-sm h-9 border gap-2"
  >
    <div class="h-full w-full text-center cursor-pointer">
      <span
        class="rounded-full h-full pt-1 pb-1 font-semibold"
        :class="store.filterSaved ? 'bg-gray-200' : ''"
        @click="handleSwitch(true)"
        >Sparade</span
      >
    </div>
    <div class="h-full w-full text-center cursor-pointer">
      <span
        class="rounded-full h-full pt-1 pb-1 font-semibold"
        :class="store.filterSaved ? '' : 'bg-gray-200'"
        @click="handleSwitch(false)"
        >Alla</span
      >
    </div>
  </div>
</template>
<script setup lang="ts">
import { useWordStore } from "@/stores/wordStore";

const store = useWordStore();

const handleSwitch = (newVal: Boolean) => {
  store.filterSaved = newVal;
  store.filterString = "";
};
</script>
