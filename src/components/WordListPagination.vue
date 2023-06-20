<template>
  <div class="flex-row justify-center w-full">
    <div>
      <span
        class="cursor-pointer caret-blue-700 underline text-sm text-link"
        v-if="!store.allFilteredWordsArePaginated"
        @click="store.increasePagination()"
        >Ladda fler ord</span
      >
    </div>
  </div>
</template>
<script setup lang="ts">
import { useWordStore } from "@/stores/wordStore";
const store = useWordStore();
</script>

<style scoped>
.hide {
  visibility: hidden;
}
</style>
