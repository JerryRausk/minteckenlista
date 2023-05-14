<template>
  <div class="flex-row justify-content-center align-items-center">
    <div>
      <span
        class="paginate-next"
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

.paginate-next {
  cursor: pointer;
  color: blue;
  text-decoration: underline;
}
</style>
