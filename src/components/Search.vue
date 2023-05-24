<template>
  <div class="search-input-wrapper">
    <input
      type="text"
      placeholder="Sök..."
      aria-label="Sök"
      class="form-control"
      v-model="store.filterString"
    /><MagnifyingGlass stroke-color="grey" class="icon" />
  </div>
</template>

<script setup lang="ts">
import MagnifyingGlass from "@/components/svg/MagnifyingGlass.vue";
import { useWordStore } from "@/stores/wordStore";
const store = useWordStore();
</script>

<style scoped>
.icon {
  height: 1.5rem;
  width: 1.5rem;
  background-color: white;
  margin-right: 6px;
  margin-left: -2rem;
}
input {
  border: none;
}

input:focus {
  border: 1px solid #86b7fe;
  box-shadow: 0 0 0 1px rgba(13, 110, 253, 0.25);
}
.search-input-wrapper {
  width: 100%;
  flex-direction: row;
  background-color: white;
  align-items: center;
  justify-content: space-between;
  border-radius: 8px;
  border: solid 1px rgba(0, 0, 100, 0.5);
  padding: 4px;
}
</style>
