import Sign, { SignWithMeta } from "@/models/Sign";
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
  const currentList = ref<string>("local");
  const signsInitialized = ref<Boolean>(false);
  let signIndexedDb: IDBDatabase | null = null;

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
    initIndexDb();
    const _signs = await SignService.getFileSigns();
    // Get stuff from file
    _signs.map((s: Sign, i: number) => {
      i > 0 && signs.value[signs.value.length - 1].word === s.word
        ? signs.value[signs.value.length - 1].signs.push(s)
        : signs.value.push(new SignWithMeta(s.word, s.category, false, [s]));
    });

    if (signIndexedDb) {
      updateSaveStateFromIdb(signIndexedDb);
    }

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
      if (signIndexedDb) {
        if (s.selected) {
          insertIndexDb(signIndexedDb, word);
        } else {
          deleteIndexDb(signIndexedDb, word);
        }
      }
    }
  }

  //Indexdb Stuff
  function initIndexDb() {
    const openRequest = window.indexedDB.open("savedSigns", 1);
    openRequest.onerror = (e) => {
      console.error("Couldnt open indexDB", e);
    };

    openRequest.onupgradeneeded = () => {
      console.info("DB version is not up to date, needs migrating!");
      signIndexedDb = openRequest.result;

      signIndexedDb.onerror = (e) =>
        console.error("something went wrong when migrating the db.", e);
      signIndexedDb.createObjectStore("savedSigns", { keyPath: "word" });
    };

    openRequest.onsuccess = () => {
      signIndexedDb = openRequest.result;
    };
  }

  async function updateSaveStateFromIdb(db: IDBDatabase): Promise<void> {
    const objectStore = db.transaction("savedSigns").objectStore("savedSigns");

    const request = objectStore.openCursor();

    request.onsuccess = (_) => {
      const cursor = request.result;

      if (!cursor) {
        return;
      }

      if (cursor.value.word !== undefined) {
        setSavedFromIdb(cursor.value.word);
      } else {
        console.error("Object in idb corrupt", cursor.value);
      }

      cursor.continue();
    };
  }

  async function setSavedFromIdb(word: string): Promise<void> {
    const wordToUpdate = signs.value.find((swm) => swm.word === word);
    if (wordToUpdate) {
      wordToUpdate.selected = true;
    } else {
      console.error("Found word in idb that doesnt exist...");
    }
  }

  async function insertIndexDb(db: IDBDatabase, key: string): Promise<void> {
    const transaction = db.transaction("savedSigns", "readwrite");
    const objectStore = transaction.objectStore("savedSigns");
    const objectStoreRequest = objectStore.add({ word: key });
    objectStoreRequest.onerror = (e) => {
      console.error(`Couldnt insert ${key} into db`, e);
    };
  }

  async function deleteIndexDb(db: IDBDatabase, key: string): Promise<void> {
    const transaction = db.transaction("savedSigns", "readwrite");
    const objectStore = transaction.objectStore("savedSigns");
    const objectStoreRequest = objectStore.delete(key);
    objectStoreRequest.onerror = (e) => {
      console.error(`Couldnt delete ${key} from db`, e);
    };
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
  };
});
