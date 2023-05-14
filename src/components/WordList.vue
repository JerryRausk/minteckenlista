<template>
  <div
    class="container flex-column word-list no-touch-strangeness"
    v-if="!store.isLoading"
  >
    <div class="flex-row justify-content-between align-items-end">
      <Search class="search-input" />
      <Picklist class="categories-dropdown" />
    </div>

    <ul class="list-group">
      <Loader class="loader" v-if="!store.wordsInitialized" />
      <WordListItem
        v-if="store.filteredWordsCount > 0"
        v-for="word in store.getPaginatedWords()"
        :key="word.word"
        :word="word"
        @save-toggled="(w: string) => store.toggleSaved(w)"
      ></WordListItem>
      <div v-else class="nothing-to-display">{{ noWordsFoundReason() }}</div>
    </ul>
    <WordListPagination v-if="store.wordsInitialized" />
  </div>
  <IsLoading v-else />
</template>

<script setup lang="ts">
import {
  default as IsLoading,
  default as Loader,
} from "@/components/IsLoading.vue";
import Picklist from "@/components/Picklist.vue";
import Search from "@/components/Search.vue";
import WordListItem from "@/components/WordListItem.vue";
import WordListPagination from "@/components/WordListPagination.vue";
import { useWordStore } from "@/stores/wordStore";
import { onMounted } from "vue";

const store = useWordStore();

onMounted(async () => {
  await store.initializeWords();
});

const noWordsFoundReason = (): string => {
  if (store.filterString !== "") {
    return `Inga ord som innehåller "${store.filterString}" hittades`;
  } else if (store.filterSaved && store.filterString === "") {
    return "Inga ord har sparats än";
  } else {
    return "";
  }
};
</script>

<style scoped>
.word-list {
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
.search-input {
  width: 40%;
}

.categories-dropdown {
  width: 40%;
}

.nothing-to-display {
  align-items: center;
}
</style>
