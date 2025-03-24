import { createApp } from "vue";
import App from "./App.vue";
import "./assets/index.css";
import routes from "./mods/rotas/index";
import Maska from "maska";
createApp(App).use(routes).use(Maska).mount("#app");
