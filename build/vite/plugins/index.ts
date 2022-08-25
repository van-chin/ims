import type { PluginOption } from "vite";
import vue from "@vitejs/plugin-vue";

import { configAutoImport } from "./autoImport";

import { configMkcert } from "./mkcert";

import { configWindicss } from "./windicss";

import { configTheme } from "./theme";

import { configSvgIconsPlugin } from "./svgSprite";

// import { configDefineOptions } from "./defineOptions";

import DefineOptions from "unplugin-vue-define-options/vite";

export function createVitePlugins(viteEnv: ViteEnv, isBuild: boolean) {
  const {
    // VITE_USE_IMAGEMIN,
    VITE_USE_MOCK,
    VITE_LEGACY,
    VITE_BUILD_COMPRESS,
    VITE_BUILD_COMPRESS_DELETE_ORIGIN_FILE,
    VITE_USE_SERVER_HTTPS,
  } = viteEnv;

  const vitePlugins: (PluginOption | PluginOption[])[] = [
    // have to
    vue(),
    DefineOptions(),
  ];

  // unplugin-vue-define-options

  // console.info("configDefineOptions() =>", configDefineOptions());

  // vitePlugins.push(configDefineOptions());

  // vite-plugin-windicss
  vitePlugins.push(configWindicss());

  // unplugin-auto-import && unplugin-vue-components
  vitePlugins.push(configAutoImport());

  vitePlugins.push(configMkcert(viteEnv));

  // vite-plugin-svg-icons
  vitePlugins.push(configSvgIconsPlugin(isBuild));

  // vite-plugin-theme
  vitePlugins.push(configTheme(isBuild));

  return vitePlugins;
}
