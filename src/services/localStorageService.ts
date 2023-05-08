export default class LocalStorageService {
  StoreName: string;
  ObjectStore: string;
  DBName: string;
  KeyPath: string;
  DB: IDBDatabase | undefined = undefined;

  constructor(
    storeName: string,
    objectStore: string,
    dbName: string,
    keyPath: string
  ) {
    this.StoreName = storeName;
    this.ObjectStore = objectStore;
    this.DBName = dbName;
    this.KeyPath = keyPath;
    this.initIndexDb();
  }

  //Indexdb Stuff
  private initIndexDb() {
    const openRequest = window.indexedDB.open(this.DBName, 1);
    openRequest.onerror = (e) => {
      console.error("Couldnt open indexDB", e);
    };

    openRequest.onupgradeneeded = () => {
      console.info("DB version is not up to date, needs migrating!");
      this.DB = openRequest.result;

      this.DB.onerror = (e) =>
        console.error("something went wrong when migrating the db.", e);
      this.DB.createObjectStore(this.ObjectStore, { keyPath: this.KeyPath });
    };

    openRequest.onsuccess = () => {
      this.DB = openRequest.result;
    };
  }

  async getItemsFromIdb(callBackPerResult: CallableFunction): Promise<void> {
    if (this.DB === undefined) {
      throw new Error("DB hasnt been initialized.");
    }

    const objectStore = this.DB.transaction(this.StoreName).objectStore(
      this.ObjectStore
    );

    const request = objectStore.openCursor();

    request.onsuccess = (_) => {
      const cursor = request.result;

      if (!cursor) {
        return;
      }

      if (cursor.value.word !== undefined) {
        callBackPerResult(cursor.value.word);
      } else {
        console.error("Object in idb corrupt", cursor.value);
      }

      cursor.continue();
    };
  }

  async insertIndexDb(key: string): Promise<void> {
    if (this.DB === undefined) {
      throw new Error("DB isnt initialized");
    }

    const transaction = this.DB.transaction(this.StoreName, "readwrite");
    const objectStore = transaction.objectStore(this.ObjectStore);
    const obj: Record<string, string> = {};
    obj[this.KeyPath] = key;
    const objectStoreRequest = objectStore.add(obj);
    objectStoreRequest.onerror = (e) => {
      console.error(`Couldnt insert ${key} into db`, e);
    };
  }

  async deleteIndexDb(key: string): Promise<void> {
    if (this.DB === undefined) {
      throw new Error("DB isnt initialized");
    }

    const transaction = this.DB.transaction(this.StoreName, "readwrite");
    const objectStore = transaction.objectStore(this.ObjectStore);
    const objectStoreRequest = objectStore.delete(key);
    objectStoreRequest.onerror = (e) => {
      console.error(`Couldnt delete ${key} from db`, e);
    };
  }
}
