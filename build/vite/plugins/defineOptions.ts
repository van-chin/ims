import type { PluginOption, Plugin } from "vite";

import DefineOptions from "unplugin-vue-define-options/vite";

export function configDefineOptions(): PluginOption[] {
  const plugins: PluginOption[] = [];

  const defineOptionsPlugin = DefineOptions();

  // console.info("defineOptionsPlugin =>", defineOptionsPlugin);

  plugins.push(defineOptionsPlugin);

  return plugins;
}
