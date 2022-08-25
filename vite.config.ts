import type { UserConfig, ConfigEnv } from "vite";
import { loadEnv } from "vite";

import { resolve } from "path";

import dayjs from "dayjs";

import pkg from "./package.json";

import { wrapperEnv } from "./build/utils";

import { generateModifyVars } from "./build/generate/generateModifyVars";

import { createVitePlugins } from "./build/vite/plugins";

function pathResolve(dir: string) {
  return resolve(process.cwd(), ".", dir);
}
const { dependencies, devDependencies, name, version } = pkg;
const __APP_INFO__ = {
  pkg: { dependencies, devDependencies, name, version },
  lastBuildTime: dayjs().format("YYYY-MM-DD HH:mm:ss"),
};



// https://vitejs.dev/config/
export default ({ command, mode }: ConfigEnv): UserConfig => {
  const root = process.cwd();

  const env = loadEnv(mode, root);

  const viteEnv = wrapperEnv(env);

  const {
    VITE_PORT,
    VITE_PUBLIC_PATH,
    VITE_PROXY,
    VITE_DROP_CONSOLE,
    VITE_USE_SERVER_HTTPS,
  } = viteEnv;

  const isBuild = command === "build";

  return {
    root,
    resolve: {
      alias: [
        {
          find: "vue-i18n",
          replacement: "vue-i18n/dist/vue-i18n.cjs.js",
        },
        // /@/xxxx => src/xxxx
        {
          find: /@\//,
          replacement: pathResolve("src") + "/",
        },
        // /#/xxxx => types/xxxx
        {
          find: /#\//,
          replacement: pathResolve("types") + "/",
        },
      ],
    },
    server: {
      https: VITE_USE_SERVER_HTTPS,
      host: true,
      port: VITE_PORT,
    },
    define: {
      // setting vue-i18-next
      // Suppress warning
      __INTLIFY_PROD_DEVTOOLS__: false,
      __APP_INFO__: JSON.stringify(__APP_INFO__),
    },
    css: {
      preprocessorOptions: {
        less: {
          modifyVars: generateModifyVars(),
          javascriptEnabled: true,
        },
      },
    },
    plugins: createVitePlugins(viteEnv, isBuild),

    // optimizeDeps:{
    //   include:[
    //     'ant-design-vue/es'
    //   ],
    // }
  };
};
