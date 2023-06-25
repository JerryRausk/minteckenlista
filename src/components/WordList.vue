<template>
  <div class="word-list no-touch-strangeness w-full" v-if="!store.isLoading">
    <div class="list-item-wrapper">
      <Loader class="loader" v-if="!store.wordsInitialized" />
      <WordListItem
        v-if="store.filteredWordsCount > 0"
        v-for="word in store.getPaginatedWords()"
        :key="word.word"
        :word="word"
        @save-toggled="(w: string) => store.toggleSaved(w)"
      ></WordListItem>
      <div v-else class="nothing-to-display">{{ noWordsFoundReason() }}</div>
    </div>
    <WordListPagination v-if="store.wordsInitialized" />
  </div>
  <IsLoading v-else />
</template>

<script setup lang="ts">
import {
  default as IsLoading,
  default as Loader,
} from "@/components/IsLoading.vue";
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
  gap: 8px;
  flex-direction: column;
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
.search-wrapper {
  flex-direction: row;
  align-items: end;
  justify-content: space-between;
}
.search-input {
  width: 100%;
}
.categories-dropdown {
  width: 40%;
}
.nothing-to-display {
  align-items: center;
}

.list-item-wrapper {
  flex-direction: column;
  gap: 8px;
}
.new-list-item {
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  align-content: center;
  border: 1px solid rgba(0, 0, 75, 0.8);
  border-radius: 8px;
  padding: 8px;
  background: linear-gradient(355deg, white 0%, rgba(0, 0, 125, 0.1) 100%);
}

.new-list-saved-icon {
  height: 100%;
  width: 24px;
}
</style>
