import { library } from "@fortawesome/fontawesome-svg-core";
import { faCopy, faEdit } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { createPinia } from "pinia";
import { createApp } from "vue";
import App from "./App.vue";
import { useWordStore } from "./stores/wordStore";
import "./style.css";
library.add(faCopy);
library.add(faEdit);

const pinia = createPinia();
const app = createApp(App);
app.component("font-awesome-icon", FontAwesomeIcon);
app.use(pinia);
app.mount("#app");

/* If queryParam list was provided init that list */
const uri = window.location.href.split("?");
if (uri.length === 2) {
  const params = uri[1].split("&");
  for (const param of params) {
    const kv = param.split("=");
    if (kv[0].toLowerCase() === "list") {
      const store = useWordStore();
      store.activateList(kv[1]);
    }
  }
} else {
  const store = useWordStore();
  store.createAndSetNewList();
}
