import { createApp } from "vue";
import { createPinia } from "pinia";

import naive from "naive-ui";

import App from "./App.vue";
import router from "./router";

import "tippy.js/dist/tippy.css";
import "tippy.js/themes/light.css";
import "./assets/main.scss";

const app = createApp(App);
app.use(createPinia());
app.use(naive);
app.use(router);

app.mount("#app");
