<template>
  <div class="layout_container">
    <keep-alive>
      <div class="layout_slider" :class="{ fold: LayoutSettingStore.fold }">
        <Logo :is-collapse="LayoutSettingStore.fold" />
        <el-scrollbar class="scrollbar">
          <el-menu
            text-color="gray"
            active-text-color="white"
            background-color="#060f2b"
            router
            :collapse="LayoutSettingStore.fold"
            :default-active="$route.path"
          >
            <Menu :menuList="userStore.menuRoutes"></Menu>
          </el-menu>
        </el-scrollbar>
      </div>
    </keep-alive>
    <div class="layout_main_container">
      <keep-alive>
        <div class="layout_tabbar">
          <Tabbar />
        </div>
      </keep-alive>
      <el-scrollbar class="scrollbar">
        <div class="layout_main">
          <Main />
        </div>
      </el-scrollbar>
    </div>
  </div>
</template>

<script setup lang="ts" name="Layout">
import { useRoute } from "vue-router";
// 组件
import Logo from "./logo/index.vue";
import Menu from "./menu/index.vue";
import Tabbar from "./tabbar/index.vue";
import Main from "./main/index.vue";
// Store
import useUserStore from "@/store/modules/user";
import useLayoutSettingStore from "@/store/modules/setting";

const LayoutSettingStore = useLayoutSettingStore();

const userStore = useUserStore();

const $route = useRoute();
</script>

<style scoped lang="scss">
.layout_container {
  width: 100%;
  height: 100vh;
  background-color: gray;
  display: flex;

  .layout_slider {
    &.fold {
      width: auto;
      min-width: auto;
    }
    width: $base-menu-width;
    min-width: $base-menu-width;

    display: flex;
    flex-direction: column;
    direction: row;
    background-color: $base-menu-color;
    color: $base-menu-text-color;

    .el-menu {
      border-right: none;
    }
  }

  .layout_main_container {
    width: 100%;
    height: 100vh;
    display: flex;
    flex-direction: column;
    .layout_tabbar {
      width: 100%;
      height: $base-tabbar-height;
      min-height: $base-tabbar-height;
      display: flex;
      background-color: #b3c0d1;
    }
    .layout_main {
      width: 100%;
      height: 100%;
      overflow: hidden;
      display: flex;
      background-color: #b3c0d1;
    }
  }
}
</style>
