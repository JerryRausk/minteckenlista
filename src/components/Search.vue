<template>
  <input
    type="text"
    placeholder="Sök..."
    aria-label="Sök"
    class="form-control"
    v-model="store.filterString"
  />
</template>

<script setup lang="ts">
import { useWordStore } from "@/stores/wordStore";
const store = useWordStore();
</script>

<style scoped></style>
