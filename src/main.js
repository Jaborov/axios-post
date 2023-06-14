import { createApp } from "vue";
import App from "./App.vue";
import router from "./router/Router";
import store from "./store/Store";
import "bootstrap/dist/js/bootstrap";
import "./axios/instance";

createApp(App).use(store).use(router).mount("#app");
