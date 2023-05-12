import WordList from "@/models/SharedList";
import Word from "@/models/Word";
import ApiService from "@/services/apiService";
import WordService from "@/services/wordService";
import { defineStore } from "pinia";
import { computed, ref } from "vue";

export const useWordStore = defineStore("wordStore", () => {
  const itemsPerPagination = 10;
  const words = ref<Word[]>([]);
  const filterSaved = ref<Boolean>(false);
  const filterString = ref<string>("");
  const filterCateogry = ref<string>("");
  const currentPaginationStart = ref<number>(0);
  const currentList = ref<WordList>(new WordList(0, "local", undefined, null));
  const wordsInitialized = ref<Boolean>(false);
  /*const localStorageService = new LocalStorageService(
    "savedSigns",
    "savedSigns",
    "savedSigns",
    "word"
  );*/

  const filteredWords = computed<Word[]>(() => {
    let _words = words.value.filter((w) =>
      w.word.toLowerCase().includes(filterString.value.toLowerCase())
    );

    if (filterSaved.value) {
      _words = _words.filter((w) => w.saved);
    }

    if (filterCateogry.value) {
      _words = _words.filter((s) => s.category === filterCateogry.value);
    }

    return _words;
  });

  const filteredWordsIgnoringCateogry = computed<Word[]>(() => {
    let _words = words.value.filter((w) =>
      w.word.toLowerCase().includes(filterString.value.toLowerCase())
    );

    if (filterSaved.value) {
      _words = _words.filter((w) => w.saved);
    }

    return _words;
  });

  const paginationRange = computed<Array<number>>(() => {
    return [
      currentPaginationStart.value + 1,
      Math.min(
        currentPaginationStart.value + itemsPerPagination,
        filteredWords.value.length
      ),
    ];
  });

  const availableCategories = computed<Array<string>>(() => {
    const ac: string[] = [];
    filteredWordsIgnoringCateogry.value.map((s) => {
      if (!ac.includes(s.category)) {
        ac.push(s.category);
      }
    });
    return ac;
  });

  const filteredWordsCount = computed<number>(() => {
    return filteredWords.value.length;
  });

  const currentPaginationIsFirst = computed<Boolean>(() => {
    return currentPaginationStart.value === 0;
  });

  const currentPaginationIsLast = computed<Boolean>(() => {
    return (
      currentPaginationStart.value + itemsPerPagination >
      filteredWords.value.length - 1
    );
  });

  function getWordsFromRange(start: number, end: number) {
    return words.value.slice(start, end);
  }

  function getPaginatedWords(): Word[] {
    return filteredWords.value.slice(
      currentPaginationStart.value,
      currentPaginationStart.value + itemsPerPagination
    );
  }

  async function initializeWords(): Promise<void> {
    words.value = await WordService.getFileWords();

    //localStorageService.getItemsFromIdb(setSavedFromIdb);

    wordsInitialized.value = true;
  }

  async function setWordVariantsToWord(wordId: number): Promise<void> {
    const _word = words.value.find((w) => w.id === wordId);
    if (!_word) {
      console.error(`Cant find word with id ${wordId} in store.`);
      return;
    }

    (await ApiService.GetWordVariants(_word.id)).map((variant) =>
      _word.setNewVariant(variant)
    );
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
    resetPaginationStart();
  }

  function nextPaginationPage() {
    currentPaginationStart.value = Math.min(
      filteredWords.value.length,
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
    words.value.map((w) => (w.saved = false));
  }

  function setSaved(word: string) {
    const foundWord = words.value.find(
      (w) => w.word.toLowerCase() === word.toLowerCase()
    );
    if (foundWord) {
      foundWord.saved = true;
    } else {
      console.error(`Tried to set unknown word ${word} to saved.`);
    }
  }

  function unsetSaved(word: string) {
    const foundWord = words.value.find(
      (w) => w.word.toLowerCase() === word.toLowerCase()
    );
    if (foundWord) {
      foundWord.saved = false;
    } else {
      console.error(`Tried to set unknown word ${word} to not saved.`);
    }
  }

  async function toggleSaved(word: string) {
    const foundWord = words.value.find((w) => w.word === word);
    if (foundWord) {
      foundWord.saved = !foundWord.saved;
      if (foundWord.saved) {
        // localStorageService.insertIndexDb(word);
        ApiService.PostNewListEvent({
          event: "addWord",
          listUrl: currentList.value.Url,
          data: foundWord.word,
        });
      } else {
        // localStorageService.deleteIndexDb(word);
        ApiService.PostNewListEvent({
          event: "removeWord",
          listUrl: currentList.value.Url,
          data: foundWord.word,
        });
      }
    }
  }

  function setCurrentList(list: WordList) {
    currentList.value = list;
  }

  async function setListName(name: string) {
    const res = await ApiService.UpdateListName(currentList.value.Url, name);
    if (res) {
      currentList.value.PublicName = res;
    }
  }

  return {
    wordsInitialized,
    currentPaginationStart,
    currentPaginationIsFirst,
    currentPaginationIsLast,
    currentList,
    availableCategories,
    filterSaved,
    filterCateogry,
    paginationRange,
    filteredWordsCount,
    filterString,
    getWordsFromRange,
    getPaginatedWords,
    initializeWords,
    toggleFilterSaved,
    nextPaginationPage,
    previousPaginationPage,
    resetPaginationStart,
    toggleSaved,
    setCurrentList,
    setSaved,
    unsetSaved,
    resetSaved,
    setWordVariantsToWord,
    setListName,
  };
});
