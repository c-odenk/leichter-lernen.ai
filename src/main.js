import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import ButtonBlue from "@/components/base/Button-Blue.vue";
import LinkButtonBlue from "@/components/base/Link-Button-Blue.vue";

const app = createApp(App);
app.component("ButtonBlue", ButtonBlue); // Global registrieren
app.component("LinkButtonBlue", LinkButtonBlue); // Global registrieren
app.use(router).mount("#app");
