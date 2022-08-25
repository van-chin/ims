import type { PluginOption } from "vite"

import AutoImport from "unplugin-auto-import/vite"
import Components from "unplugin-vue-components/vite";

import { AntDesignVueResolver } from "unplugin-vue-components/resolvers";


export function configAutoImport() {
  const plugins: PluginOption[] = [];
  plugins.push(
    AutoImport({
      resolvers: [AntDesignVueResolver()],
      imports: ["vue", "vue-router"],
      //为true时在项目根目录自动创建
      dts: "types/auto-imports.d.ts",
    }),
    Components({
      resolvers: [AntDesignVueResolver()],
      dirs: ["src/components"],
      //组件名称包含目录，防止同名组件冲突
      directoryAsNamespace: true,
      //指定类型声明文件，为true时在项目根目录创建
      dts: "types/components.d.ts",
    })
  );

  return plugins;
}
