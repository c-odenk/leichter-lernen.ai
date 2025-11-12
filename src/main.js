import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import ButtonBlue from "@/components/base/Button-Blue.vue";
import ButtonGray from "@/components/base/Button-Gray.vue";
import ButtonDropdown from "@/components/base/Button-Dropdown.vue";
import LinkButtonBlue from "@/components/base/Link-Button-Blue.vue";
import LinkButtonWhite from "@/components/base/Link-Button-White.vue";

const app = createApp(App);
app.component("ButtonBlue", ButtonBlue); // Global registrieren
app.component("ButtonGray", ButtonGray); // Global registrieren
app.component("ButtonDropdown", ButtonDropdown); // Global registrieren
app.component("LinkButtonBlue", LinkButtonBlue); // Global registrieren
app.component("LinkButtonWhite", LinkButtonWhite); // Global registrieren
app.use(router).mount("#app");
