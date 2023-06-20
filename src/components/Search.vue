<template>
  <div
    class="w-full flex-row bg-white items-center justify-between p-1 border rounded-full border-gray-400"
  >
    <input
      type="search"
      name="search"
      placeholder="Sök..."
      aria-label="Sök"
      autocomplete="off"
      aria-autocomplete="none"
      class="border-none outline-none w-full pl-2 text-sm"
      v-model="store.filterString"
    /><Cross
      v-if="store.filterString"
      class="bg-white mr-1 -ml-10 h-4 w-4 rounded-full"
      @click="store.filterString = ''"
    /><MagnifyingGlass
      v-else
      stroke-color="grey"
      class="bg-white mr-1 -ml-10 h-4 w-4"
    />
  </div>
</template>

<script setup lang="ts">
import MagnifyingGlass from "@/components/svg/MagnifyingGlass.vue";
import Cross from "@/components/svg/cross.vue";
import { useWordStore } from "@/stores/wordStore";
const store = useWordStore();
</script>

<style scoped></style>
