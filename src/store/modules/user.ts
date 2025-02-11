// 创建用户相关的小仓库
import { defineStore } from "pinia";
import { reqLogin, reqUserInfo } from "@/api/user";
import type { loginForm, loginResponseData } from "@/api/user/type";
import type { UserState } from "./types/type";
import { constantRoute } from "@/router/routes";

import { SET_TOKEN, GET_TOKEN, REMOVE_TOKEN } from "@/utils/token";

let useUserStore = defineStore("User", {
  state: (): UserState => {
    return {
      token: GET_TOKEN(),
      menuRoutes: constantRoute,
      username: "",
      avatar: "",
      desc: "",
    };
  },
  // 处理异步或逻辑
  actions: {
    async userLogin(data: loginForm) {
      const result: loginResponseData = await reqLogin(data);
      // 登入成功：200->token
      if (result.code === 200) {
        this.token = result.data.token as string;
        SET_TOKEN(result.data.token as string);
        return Promise.resolve();
      } else {
        // 登入失败：201->登录失败错误信息
        // 清除 token
        this.token = "";
        return Promise.reject(new Error(result.data.message));
      }
    },
    async userLogout() {
      this.token = "";
      this.username = "";
      this.avatar = "";
      REMOVE_TOKEN();
    },
    async userInfo() {
      try {
        const result = await reqUserInfo();
        if (result.code === 200) {
          const res = result.data.checkUser;
          this.username = res.username;
          this.avatar = res.avatar;
          this.desc = res.desc;
          return "ok";
        } else {
          throw new Error("获取用户信息失败");
        }
      } catch (error) {
        return Promise.reject(error);
      }
    },
    getToken() {
      return this.token;
    },
  },
  // 配置session数据持久化
  // persist: false，
  // persist: {
  //   storage: sessionStorage,
  //   pick: ["token", "username", "avatar", "desc"],
  // },

  getters: {},
});

export default useUserStore;
