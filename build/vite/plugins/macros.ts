import type { PluginOption, Plugin } from "vite";

import Vue from '@vitejs/plugin-vue'



import VueMacros from 'unplugin-vue-macros/vite';

export function configVueMacros(): PluginOption[] {
  const plugins: PluginOption[] = [];

  const vueMacrosPlugin = VueMacros({
    plugins:{
      vue: Vue()
    }
  });



  plugins.push(vueMacrosPlugin);

  return plugins;
}


// // vite.config.ts
// import VueMacros from 'unplugin-vue-macros/vite'
// import Vue from '@vitejs/plugin-vue'
// // import VueJsx from '@vitejs/plugin-vue-jsx'
//
// export default defineConfig({
//   plugins: [
//     VueMacros({
//       plugins: {
//         vue: Vue(),
//         // vueJsx: VueJsx(), // 如有需要
//       },
//     }),
//   ],
// })