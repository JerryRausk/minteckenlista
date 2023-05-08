import SignList from "@/models/SharedList";
import Sign, { SignWithMeta } from "@/models/Sign";
import ApiService from "@/services/apiService";
import SignService from "@/services/signService";
import { defineStore } from "pinia";
import { computed, ref } from "vue";

export const useSignStore = defineStore("signStore", () => {
  const itemsPerPagination = 10;
  const signs = ref<SignWithMeta[]>([]);
  const filterSaved = ref<Boolean>(false);
  const filterString = ref<string>("");
  const filterCateogry = ref<string>("");
  const currentPaginationStart = ref<number>(0);
  const currentList = ref<SignList>(new SignList(0, "local", undefined, null));
  const signsInitialized = ref<Boolean>(false);
  /*const localStorageService = new LocalStorageService(
    "savedSigns",
    "savedSigns",
    "savedSigns",
    "word"
  );*/

  const filteredSigns = computed<SignWithMeta[]>(() => {
    let _signs = signs.value.filter((s) =>
      s.word.toLowerCase().includes(filterString.value.toLowerCase())
    );

    if (filterSaved.value) {
      _signs = _signs.filter((s) => s.selected);
    }

    if (filterCateogry.value) {
      _signs = _signs.filter((s) => s.category === filterCateogry.value);
    }

    return _signs;
  });

  const filteredSignsIgnoringCateogry = computed<SignWithMeta[]>(() => {
    let _signs = signs.value.filter((s) =>
      s.word.toLowerCase().includes(filterString.value.toLowerCase())
    );

    if (filterSaved.value) {
      _signs = _signs.filter((s) => s.selected);
    }

    return _signs;
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

  const availableCategories = computed<Array<string>>(() => {
    const ac: string[] = [];
    filteredSignsIgnoringCateogry.value.map((s) => {
      if (!ac.includes(s.category)) {
        ac.push(s.category);
      }
    });
    return ac;
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
    const _signs = await SignService.getFileSigns();
    // Get stuff from file
    _signs.map((s: Sign, i: number) => {
      i > 0 && signs.value[signs.value.length - 1].word === s.word
        ? signs.value[signs.value.length - 1].signs.push(s)
        : signs.value.push(new SignWithMeta(s.word, s.category, false, [s]));
    });

    //localStorageService.getItemsFromIdb(setSavedFromIdb);

    signsInitialized.value = true;
  }

  /*
  async function setSavedFromIdb(word: string): Promise<void> {
    const wordToUpdate = signs.value.find((swm) => swm.word === word);
    if (wordToUpdate) {
      wordToUpdate.selected = true;
    } else {
      console.error("Found word in idb that doesnt exist...");
    }
  }
  */

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

  function resetSaved() {
    signs.value.map((swm) => (swm.selected = false));
  }

  function setSaved(word: string) {
    const sign = signs.value.find(
      (swm) => swm.word.toLowerCase() === word.toLowerCase()
    );
    if (sign) {
      sign.selected = true;
    } else {
      console.error(`Tried to set unknown word ${word} to saved.`);
    }
  }

  function unsetSaved(word: string) {
    const sign = signs.value.find(
      (swm) => swm.word.toLowerCase() === word.toLowerCase()
    );
    if (sign) {
      sign.selected = false;
    } else {
      console.error(`Tried to set unknown word ${word} to not saved.`);
    }
  }

  async function toggleSaved(word: string) {
    const s = signs.value.find((swm) => swm.word === word);
    if (s) {
      s.selected = !s.selected;
      if (s.selected) {
        // localStorageService.insertIndexDb(word);
        ApiService.PostNewListEvent({
          event: "addWord",
          listUrl: currentList.value.Url,
          word: s.word,
        });
      } else {
        // localStorageService.deleteIndexDb(word);
        ApiService.PostNewListEvent({
          event: "removeWord",
          listUrl: currentList.value.Url,
          word: s.word,
        });
      }
    }
  }

  function setCurrentList(list: SignList) {
    currentList.value = list;
  }

  return {
    signsInitialized,
    currentPaginationStart,
    currentPaginationIsFirst,
    currentPaginationIsLast,
    currentList,
    availableCategories,
    filterSaved,
    filterCateogry,
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
    setCurrentList,
    setSaved,
    unsetSaved,
    resetSaved,
  };
});
