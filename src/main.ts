import { createApp } from "vue";
import App from "./App.vue";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import zhCn from "element-plus/es/locale/lang/zh-cn";
import * as ElementPlusIconsVue from "@element-plus/icons-vue";
import "@/style/reset.scss";
import "normalize.css";

//mock接口
import "../mock/user";
import router from "./router";

import pinia from "./store";

const app = createApp(App);
app.use(ElementPlus, {
  locale: zhCn,
});

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}

// 引入在线 iconfont CSS 文件
const link = document.createElement("link");
link.rel = "stylesheet";
link.href = "//at.alicdn.com/t/c/font_4816216_vjg1oy5o568.css";
document.head.appendChild(link);

app.use(pinia);

app.use(router);

// 引入路由健全文件
import "./permission";

app.mount("#app");
