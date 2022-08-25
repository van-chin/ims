import "virtual:windi.css";
import '@/styles/index.less';
import { createApp } from "vue";

import App from "./App.vue";


import { router, setupRouter } from "@/router";


import { initAppConfigStore } from "@/logics/initAppConfig"



import { setupStore } from "@/stores";

(async function bootstrap() {
    const app = createApp(App);

    // Configure store
    setupStore(app);

    // Initialize internal system configuration
    initAppConfigStore();

    // await setupI18n(app);

    // Configure routing
    setupRouter(app);

    console.info("bootstrap  111 ok...");

    await app.mount("#app");

    console.info("bootstrap  mount ok...");
})();

// bootstrap();
