<template>
  <div class="container flex-column sign-list no-touch-strangeness">
    <div class="flex-row justify-content-between align-items-end">
      <Search />
      <div class="filter-save-button">
        <span class="filter-save-icon" @click="store.toggleFilterSaved()">
          {{ savedIcon }}
        </span>
      </div>
      <Picklist />
    </div>

    <ul class="list-group">
      <Loader class="loader" v-if="!store.signsInitialized" />
      <SignListItem
        v-for="sign in store.getPaginatedSigns()"
        :key="sign.word"
        :sign="sign"
        @save-toggled="(e) => store.toggleSaved(e)"
      ></SignListItem>
    </ul>
    <SignListPagination v-if="store.signsInitialized" />
  </div>
</template>

<script setup lang="ts">
import Loader from "@/components/IsLoading.vue";
import Search from "@/components/Search.vue";
import SignListItem from "@/components/SignListItem.vue";
import { useSignStore } from "@/stores/signStore";
import { computed, onMounted } from "vue";
import Picklist from "./Picklist.vue";
import SignListPagination from "./SignListPagination.vue";

const store = useSignStore();
const savedIcon = computed<string>(() => (store.filterSaved ? "❤️" : "🤍"));

onMounted(async () => {
  await store.initializeSigns();
});
</script>

<style scoped>
.sign-list {
  margin: auto;
  width: 95%;
  max-width: 32em;
  gap: 8px;
}
.icon {
  border: none;
  background-color: transparent;
  font-size: 1.2em;
}
.form-check {
  gap: 4px;
  padding-left: 0;
}
.no-touch-strangeness {
  touch-action: manipulation;
}
.loader {
  margin: auto;
}
.filter-save-icon {
  cursor: pointer;
  font-size: 1.3em;
  margin: auto;
}
.filter-save-button {
  cursor: pointer;
  border: 1px solid #ced4da;
  background-color: white;
  border-radius: 4px;
}
</style>
