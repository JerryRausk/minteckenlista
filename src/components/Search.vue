<template>
  <input
    type="text"
    placeholder="Sök..."
    aria-label="Sök"
    class="form-control search-input"
    v-model="store.filterString"
    @input="store.resetPaginationStart()"
  />
</template>

<script setup lang="ts">
import { useWordStore } from "@/stores/wordStore";
const store = useWordStore();
</script>

<style scoped>
.search-input {
  width: 7em;
}
</style>
