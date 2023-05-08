import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { createPinia } from "pinia";
import { createApp } from "vue";
import App from "./App.vue";
import ApiService from "./services/apiService";

const pinia = createPinia();
const app = createApp(App);

/* If queryParam list was provided init that list */
const uri = window.location.href.split("?");
if (uri.length === 2) {
  const params = uri[1].split("&");
  for (const param of params) {
    const kv = param.split("=");
    if (kv[0].toLowerCase() === "list") {
      ApiService.GetAndActivateSharedList(kv[1]);
    }
  }
}

app.use(pinia);
app.mount("#app");
