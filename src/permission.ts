// 全局路由守卫
import router from "@/router";
import type { RouteLocationNormalized } from "vue-router";
import Nprogress from "nprogress";
import "nprogress/nprogress.css"; // 引入 nprogress 样式
Nprogress.configure({ showSpinner: false });
import setting from "@/setting";

// 获取用户相关的store内的token
import useUserStore from "./store/modules/user";

// 全局守卫：项目当中的任意路由切换都会触发的钩子

// 全局前置守卫
router.beforeEach(
  async (to: RouteLocationNormalized, from: RouteLocationNormalized, next) => {
    // 您可以在此访问 to 和 from 的属性，例如 to.path、to.name 等
    Nprogress.start();

    // 在路由守卫内部获取 userStore
    // const useUserStore = import("./store/modules/user");
    const userStore = useUserStore();

    const token = userStore.token;
    const username = userStore.username;
    //用户已经登录
    if (token) {
      if (to.path == "/login") {
        next({ path: "/" });
      } else {
        if (username) {
          next();
        } else {
          try {
            // 如果没有用户名就重新发请求调API
            await userStore.userInfo();
            next();
          } catch (error) {
            // token过期后调不到API，或者是用户手动修改本地存储的token
            await userStore.userLogout();
            next({ path: "/login", query: { redirect: to.path } });
          }
        }
      }
    }
    //用户未登入
    else {
      if (to.path == "/login") {
        next();
      } else {
        next({ path: "/login", query: { redirect: to.path } });
      }
    }
  }
);

// 全局后置守卫
router.afterEach(
  (to: RouteLocationNormalized, from: RouteLocationNormalized) => {
    // 网页顶上tab标题
    document.title = `${setting.title} - ${to.meta.title}` as string;
    // 后置守卫逻辑
    Nprogress.done();
  }
);

// 任意路由切换：实现进度条业务 --nprogress, 需要在 maints 引入样式 'nprogress/nprogress.css'

// 设置路由权限：登录、404、任意路由、首页、数据大屏、权限管理(三个子路由)、商品管理(四个子路由)
// 用户未登录：可以访问login，其余六个路由都不能访问(重定向去login页)
// 用户已登录：不可以访问login(重定向去login页)，其余六个路由都能访问
