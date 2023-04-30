import { SignWithMeta } from "@/models/Sign";
import SignService from "@/services/signService";
import { defineStore } from "pinia";
import { computed, ref } from "vue";

export const useSignStore = defineStore("signStore", () => {
  const itemsPerPagination = 10;
  const signs = ref<SignWithMeta[]>([]);
  const filterSaved = ref<Boolean>(false);
  const filterString = ref<string>("");
  const currentPaginationStart = ref<number>(0);
  const signsInitialized = ref<Boolean>(false);

  const filteredSigns = computed<SignWithMeta[]>(() => {
    if (filterSaved.value) {
      return signs.value.filter((s) => s.selected);
    }
    return signs.value
      .filter((s) => s.word !== undefined)
      .filter((s) =>
        s.word.toLowerCase().includes(filterString.value.toLowerCase())
      );
  });

  const paginationRange = computed<Array<number>>(() => {
    return [
      currentPaginationStart.value,
      Math.min(
        currentPaginationStart.value + itemsPerPagination,
        filteredSigns.value.length
      ),
    ];
  });

  const filteredSignsCount = computed<number>(() => {
    return filteredSigns.value.length;
  });

  const currentPaginationIsFirst = computed<Boolean>(() => {
    return currentPaginationStart.value === 0;
  });

  const currentPaginationIsLast = computed<Boolean>(() => {
    return (
      currentPaginationStart.value + itemsPerPagination >
      filteredSigns.value.length
    );
  });

  function getSignsFromRange(start: number, end: number) {
    return signs.value.slice(start, end);
  }

  function getPaginatedSigns(): SignWithMeta[] {
    return filteredSigns.value.slice(
      currentPaginationStart.value,
      currentPaginationStart.value + itemsPerPagination
    );
  }

  async function initializeSigns(): Promise<void> {
    const _signs = await SignService.getSomeSigns();

    _signs.map((s, i) => {
      i > 0 && signs.value[signs.value.length - 1].word === s.word
        ? signs.value[signs.value.length - 1].signs.push(s)
        : signs.value.push(new SignWithMeta(s.word, s.category, false, [s]));
    });
    signsInitialized.value = true;
  }

  function toggleFilterSaved() {
    filterSaved.value = !filterSaved.value;
    currentPaginationStart.value = 0;
  }

  function nextPaginationPage() {
    currentPaginationStart.value = Math.min(
      filteredSigns.value.length,
      currentPaginationStart.value + itemsPerPagination
    );
  }

  function previousPaginationPage() {
    currentPaginationStart.value = Math.max(
      0,
      currentPaginationStart.value - itemsPerPagination
    );
  }

  function resetPaginationStart() {
    currentPaginationStart.value = 0;
  }

  async function toggleSaved(word: string) {
    const s = signs.value.find((swm) => swm.word === word);
    if (s) {
      s.selected = !s.selected;
    }
  }

  return {
    signsInitialized,
    currentPaginationStart,
    currentPaginationIsFirst,
    currentPaginationIsLast,
    filterSaved,
    paginationRange,
    filteredSignsCount,
    filterString,
    getSignsFromRange,
    getPaginatedSigns,
    initializeSigns,
    toggleFilterSaved,
    nextPaginationPage,
    previousPaginationPage,
    resetPaginationStart,
    toggleSaved,
  };
});
