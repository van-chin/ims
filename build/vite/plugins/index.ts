import type { PluginOption } from "vite";


import { configAutoImport } from "./autoImport";

import { configMkcert } from "./mkcert";

import { configWindicss } from "./windicss";



import { configSvgIconsPlugin } from "./svgSprite";

import { configVueMacros } from "./macros";

import { configHtmlPlugin } from './html';



export function createVitePlugins(viteEnv: ViteEnv, isBuild: boolean) {
  const {
    // VITE_USE_IMAGEMIN,
    VITE_USE_MOCK,
    VITE_LEGACY,
    VITE_BUILD_COMPRESS,
    VITE_BUILD_COMPRESS_DELETE_ORIGIN_FILE,
    VITE_USE_SERVER_HTTPS,
  } = viteEnv;

  const vitePlugins: (PluginOption | PluginOption[])[] = [];
  // necessary
  vitePlugins.push(configVueMacros());

  // vite-plugin-windicss
  vitePlugins.push(configWindicss());

  // unplugin-auto-import && unplugin-vue-components
  vitePlugins.push(configAutoImport());

  vitePlugins.push(configMkcert(viteEnv));

  // vite-plugin-svg-icons
  vitePlugins.push(configSvgIconsPlugin(isBuild));


  // vite-plugin-html
  vitePlugins.push(configHtmlPlugin(viteEnv, isBuild));



  return vitePlugins;
}
