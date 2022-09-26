import "virtual:windi.css";
import '@/styles/index.less';
import { createApp } from "vue";

import App from "./App.vue";


import { router, setupRouter } from "@/router";

import { setupI18n } from '@/locales/setupI18n';


import { initAppConfigStore } from "@/logics/initAppConfig"

import { setupRouterGuard } from '@/router/guards';

import formCreate from '@form-create/ant-design-vue'

import install from '@form-create/ant-design-vue/auto-import';
formCreate.use(install);



import { setupStore } from "@/stores";

(async function bootstrap() {
    const app = createApp(App);

    app.use(formCreate);

    // Configure store
    setupStore(app);

    // Initialize internal system configuration
    initAppConfigStore();

    await setupI18n(app);

    // Configure routing
    setupRouter(app);

    //
    setupRouterGuard(router);

    console.info("bootstrap  111 ok...");

    await app.mount("#app");

    console.info("bootstrap  mount ok...");
})();

// bootstrap();
