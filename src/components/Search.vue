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
import { useSignStore } from "@/stores/signStore";
const store = useSignStore();
</script>

<style scoped>
.search-input {
  width: 7em;
}
</style>
