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
import { useSignStore } from "@/stores/signStore";
const store = useSignStore();
</script>

<style scoped>
.dropdown {
  width: 13em;
}
</style>
