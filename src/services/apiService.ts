import WordList from "@/models/SharedList";
import { WordVariant } from "@/models/Word";
import type {
  Events,
  List,
  ListEvent,
  WordVariant as WordVariantDto,
} from "@prisma/client";

export interface ListEventDto {
  event: Events;
  data: string;
  listUrl: string;
}

export default class ApiService {
  static async CreateNewSharedList(): Promise<WordList> {
    const response = await fetch("/api/GetNewList");
    const list: List = await response.json();
    return new WordList(list.id, list.url, list.created, list.publicName);
  }

  static async GetList(listurl: string): Promise<List | null> {
    const response = await fetch(`api/GetList/${listurl}`);
    if (response.status !== 200) {
      return null;
    }
    const list: List = await response.json();
    return list;
  }

  static async GetListEvents(listurl: string): Promise<ListEvent[] | null> {
    const response = await fetch(`api/GetEvents?listUrl=${listurl}`);
    if (response.status !== 200) {
      return null;
    }
    const events: ListEvent[] = await response.json();
    return await events;
  }

  static async PostNewListEvent(listEvent: ListEventDto) {
    await fetch("/api/AddListEvent", {
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

  static async UpdateListName(
    listUrl: string,
    name: string
  ): Promise<string | null> {
    const response = await fetch("api/UpdateListName", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ listUrl: listUrl, listName: name }),
    });
    if (response.status !== 200) {
      console.error("Couldnt update list name.", response.body);
      return null;
    }
    return response.json().then((j) => j.listName);
  }
}
