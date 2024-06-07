import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import router from "./Router";
import { createPinia } from 'pinia';
import { VueQueryPlugin } from "@tanstack/vue-query";

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')
