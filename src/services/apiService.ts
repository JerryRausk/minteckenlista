import WordList from "@/models/SharedList";
import { WordVariant } from "@/models/Word";
import { useWordStore } from "@/stores/wordStore";
import type {
  List,
  ListEvent,
  WordVariant as WordVariantDto,
} from "@prisma/client";

interface listEventDto {
  event: string;
  word: string;
  listUrl: string;
}

export default class ApiService {
  static async CreateNewSharedList(): Promise<List> {
    const response = await fetch("/api/GetNewList");
    const list: List = await response.json();
    return list;
  }

  static async GetAndActivateSharedList(listurl: string): Promise<void> {
    const listResponse = await fetch(`api/GetList/${listurl}`);
    if (listResponse.status !== 200) {
      return;
    }
    const list: List = await listResponse.json();
    const eventsResponse = await fetch(`api/GetEvents?listId=${list.id}`);
    const events: ListEvent[] = await eventsResponse.json();
    this.SetActiveListAndProcessEventsToStore(list, events);
  }

  static async PostNewListEvent(listEvent: listEventDto) {
    fetch("/api/AddListEvent", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(listEvent),
    });
  }

  static async GetWordVariants(wordId: number): Promise<WordVariant[]> {
    const response = await fetch(`api/GetVariants/${wordId}`);
    if (response.status !== 200) {
      console.error(`Could not fetch variants for word with id ${wordId}`);
      return [];
    }
    const variants: WordVariantDto[] = await response.json();
    return variants.map(
      (dto) =>
        new WordVariant(
          dto.id,
          dto.description,
          dto.urlSuffix,
          dto.videoUrlSuffix
        )
    );
  }

  private static async SetActiveListAndProcessEventsToStore(
    list: List,
    events: ListEvent[]
  ) {
    events.sort((a, b) => a.id - b.id);
    const store = useWordStore();
    store.setCurrentList(
      new WordList(list.id, list.url, list.created, list.publicName)
    );
    store.resetSaved();
    store.filterSaved = true;
    for (const event of events) {
      const word = event.eventData;
      if (event.event === "addWord") {
        store.setSaved(word);
      }
      if (event.event === "removeWord") {
        store.unsetSaved(word);
      }
    }
  }
}
