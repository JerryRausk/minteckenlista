import SignList from "@/models/SharedList";
import { useSignStore } from "@/stores/signStore";
import type { List, ListEvent } from "@prisma/client";

export default class ApiService {
  static async CreateNewSharedListThenActivate(): Promise<void> {
    const response = await fetch("/api/GetNewList");
    const list: List = await response.json();
    useSignStore().setCurrentList(
      new SignList(list.id, list.url, list.created, list.publicName)
    );
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

  private static async SetActiveListAndProcessEventsToStore(
    list: List,
    events: ListEvent[]
  ) {
    events.sort((a, b) => a.id - b.id);
    const store = useSignStore();
    store.setCurrentList(
      new SignList(list.id, list.url, list.created, list.publicName)
    );
    store.resetSaved();
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
