<template>
  <div class="container flex-column sign-list no-touch-strangeness">
    <input
      type="text"
      placeholder="Sök..."
      aria-label="Sök"
      class="form-control search-input"
      v-model="store.filterString"
      @input="store.resetPaginationStart()"
    />

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
import SignListItem from "@/components/SignListItem.vue";
import { useSignStore } from "@/stores/signStore";
import { onMounted } from "vue";
import SignListPagination from "./SignListPagination.vue";

const store = useSignStore();

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

.search-input {
  width: 16em;
  margin-inline: auto;
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
</style>
