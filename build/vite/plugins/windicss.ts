import type { PluginOption, Plugin } from "vite"

import WindiCSS from 'vite-plugin-windicss'

export function configWindicss(): PluginOption[] {

  const plugins: PluginOption[] = [];

  const windiCSSPlugin = WindiCSS();


  plugins.push(windiCSSPlugin);

  return plugins;

}
