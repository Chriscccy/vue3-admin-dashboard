// 小仓库：设置layout模块
import { defineStore } from "pinia";

const useLayoutSettingStore = defineStore("SettingStore", {
  state: () => {
    return {
      fold: false, //用户控制菜单折叠或收起
      refresh: false, //用于控制刷新效果
    };
  },
  actions: {
    toggleFold() {
      this.fold = !this.fold;
    },
    toggleRefresh() {
      this.refresh = !this.refresh;
    },
  },
  // 配置session数据持久化
  persist: {
    storage: sessionStorage,
    pick: ["fold"],
  },
  getters: {},
});

export default useLayoutSettingStore;
