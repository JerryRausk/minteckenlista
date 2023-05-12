<template>
  <select
    class="dropdown form-control"
    @change="store.resetPaginationStart"
    v-model="store.filterCateogry"
  >
    <option value="" selected>Alla kategorier</option>
    <option v-for="category in store.availableCategories">
      {{ category }}
    </option>
  </select>
</template>
<script setup lang="ts">
import { useWordStore } from "@/stores/wordStore";
const store = useWordStore();
</script>

<style scoped>
.dropdown {
  width: 13em;
}
</style>
