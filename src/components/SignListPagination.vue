<template>
  <div class="flex-row justify-content-between align-items-center">
    <div>
      <button
        type="button"
        class="pagination-button"
        @click="store.previousPaginationPage()"
        :class="{ hide: store.currentPaginationIsFirst }"
      >
        ⬅️
      </button>
    </div>
    <div>{{ store.paginationRange[0] }} - {{ store.paginationRange[1] }}</div>
    <div>
      <button
        type="button"
        class="pagination-button"
        @click="store.nextPaginationPage()"
        :class="{ hide: store.currentPaginationIsLast }"
      >
        ➡️
      </button>
    </div>
  </div>
</template>
<script setup lang="ts">
import { useSignStore } from "@/stores/signStore";
const store = useSignStore();
</script>

<style scoped>
.pagination-button {
  background-color: transparent;
  border: none;
  font-size: 1.5em;
}
.hide {
  visibility: hidden;
}
</style>
