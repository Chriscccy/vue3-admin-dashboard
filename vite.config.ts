import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vueDevTools from "vite-plugin-vue-devtools";
import VueSetupExtend from "vite-plugin-vue-setup-extend";
import path from "path";

// import { createSvgIconsPlugin } from "vite-plugin-svg-icons";

import { viteMockServe } from "vite-plugin-mock";

// https://vite.dev/config/
export default defineConfig(({ command }) => {
  return {
    plugins: [
      vue(),
      vueDevTools(),
      VueSetupExtend(),
      // createSvgIconsPlugin({
      //   iconDirs: [path.resolve(process.cwd(), "src/assets/icons")],
      //   symbolId: "icon-[dir]-[name]",
      // }),
      viteMockServe({
        enable: command === "serve",
      }),
    ],
    resolve: {
      alias: {
        "@": path.resolve("./src/"), // 使用 path 而不是 resolve
      },
    },
    css: {
      preprocessorOptions: {
        scss: {
          // javascriptEnabled: true,
          additionalData: `@use "@/style/variable.scss" as *;`,
        },
      },
    },
  };
});
