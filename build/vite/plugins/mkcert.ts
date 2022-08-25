import type { PluginOption, Plugin } from "vite"
import mkcert from 'vite-plugin-mkcert'

export function configMkcert(env: ViteEnv): PluginOption[] {

  const { VITE_USE_SERVER_HTTPS } = env;
  const plugins: PluginOption[] = [];

  let mkcertPlugin: Plugin;

  if (VITE_USE_SERVER_HTTPS !== false) {
    mkcertPlugin = mkcert({
      source: 'coding',
    })
    plugins.push(mkcertPlugin);
  }
  return plugins;
}
