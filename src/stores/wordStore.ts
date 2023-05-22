import WordList from "@/models/SharedList";
import Word from "@/models/Word";
import ApiService from "@/services/apiService";
import WordService from "@/services/wordService";
import { defineStore } from "pinia";
import { computed, ref, watch } from "vue";

interface NoteEventDTO {
  word: string;
  note: string;
}

export const useWordStore = defineStore("wordStore", () => {
  const ItemsPerScreenHeight = window.screen.height / 85;
  const itemsPerPagination = ItemsPerScreenHeight;
  const words = ref<Word[]>([]);
  const filterSaved = ref<Boolean>(false);
  const filterString = ref<string>("");
  const filterCateogry = ref<string>("");
  const currentPaginationStart = ref<number>(0);
  const currentPaginatedWordsCount = ref<number>(ItemsPerScreenHeight);
  const currentList = ref<WordList>(new WordList(0, "local", undefined, null));
  const wordsInitialized = ref<Boolean>(false);
  const loadingReasons = ref<string[]>([]);
  const isLoading = computed<Boolean>(() => loadingReasons.value.length > 0);

  watch(filterSaved, () => {
    if (availableCategories.value.includes(filterCateogry.value)) {
      filterCateogry.value = "";
    }
  });

  watch(filterString, () => {
    if (!availableCategories.value.includes(filterCateogry.value)) {
      filterCateogry.value = "";
    }
    if (filteredWords.value.length === 0) {
      filterSaved.value = false;
    }
  });

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

  const allFilteredWordsArePaginated = computed<Boolean>(() => {
    return currentPaginatedWordsCount.value >= filteredWords.value.length;
  });

  function getPaginatedWords(): Word[] {
    return filteredWords.value.slice(0, currentPaginatedWordsCount.value);
  }

  async function initializeWords(): Promise<void> {
    words.value = await WordService.getFileWords();

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

  function toggleFilterSaved() {
    filterSaved.value = !filterSaved.value;
    currentPaginatedWordsCount.value = ItemsPerScreenHeight;
  }

  function increasePagination() {
    currentPaginatedWordsCount.value += ItemsPerScreenHeight;
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
    if (!foundWord) {
      console.error(`Tried to toggle save word ${word} but couldn't find it.`);
      return;
    }

    foundWord.saved = !foundWord.saved;

    ApiService.PostNewListEvent({
      event: foundWord.saved ? "addWord" : "removeWord",
      listUrl: currentList.value.Url,
      data: foundWord.word,
    });
  }

  function setCurrentList(list: WordList) {
    currentList.value = list;
  }

  function setNote(word: string, note: string) {
    const foundWord = words.value.find((w) => w.word === word);
    if (!foundWord) {
      console.error(`Tried to set not on word ${word} but couldn't find it.`);
      return;
    }
    foundWord.userNote = note;
    ApiService.PostNewListEvent({
      event: "setNote",
      listUrl: currentList.value.Url,
      data: JSON.stringify({
        word: word,
        note: note,
      } satisfies NoteEventDTO),
    });
  }

  async function setListName(name: string) {
    const res = await ApiService.UpdateListName(currentList.value.Url, name);
    if (res) {
      currentList.value.PublicName = res;
    }
  }

  async function createAndSetNewList() {
    const loadingMsg = "Lista skapas...";
    resetSaved();
    loadingReasons.value.push(loadingMsg);
    const newList = await ApiService.CreateNewSharedList();
    setCurrentList(newList);
    loadingReasons.value = loadingReasons.value.filter((s) => s !== loadingMsg);
  }

  async function activateList(listUrl: string) {
    const loadingMsg = "Lista hämtas...";
    loadingReasons.value.push(loadingMsg);
    resetSaved();
    filterSaved.value = true;
    const listFetch = ApiService.GetList(listUrl);
    const eventsFetch = ApiService.GetListEvents(listUrl);

    const [list, events] = await Promise.all([listFetch, eventsFetch]);
    if (list && events) {
      currentList.value = new WordList(
        list.id,
        list.url,
        list.created,
        list.publicName
      );
      events.sort((a, b) => a.id - b.id);
      for (const event of events) {
        switch (event.event) {
          case "addWord":
            setSaved(event.eventData);
            break;
          case "removeWord":
            unsetSaved(event.eventData);
            break;
          case "setNote":
            const noteData: NoteEventDTO = JSON.parse(event.eventData);
            const foundWord = words.value.find((w) => w.word === noteData.word);
            if (!foundWord) {
              console.error(
                `Found setNote event for word ${noteData.word} but couldn't find the word.`
              );
              break;
            }
            foundWord.userNote = noteData.note;
            break;
          default:
            console.error(`Unrecognized event ${event}`);
            break;
        }
      }
    }
    loadingReasons.value = loadingReasons.value.filter((s) => s !== loadingMsg);
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
    getPaginatedWords,
    initializeWords,
    toggleFilterSaved,
    toggleSaved,
    setCurrentList,
    setSaved,
    unsetSaved,
    resetSaved,
    setWordVariantsToWord,
    setListName,
    createAndSetNewList,
    increasePagination,
    allFilteredWordsArePaginated,
    activateList,
    isLoading,
    setNote,
  };
});
