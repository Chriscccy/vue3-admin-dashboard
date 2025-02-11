<template>
  <el-button icon="Refresh" circle @click="updateRefresh"></el-button>
  <el-button icon="FullScreen" circle @click="fullScreen"></el-button>
  <el-button icon="Setting" circle></el-button>
  <img
    :src="
      userStore.avatar || '	https://assets.crypto.ro/logos/bitcoin-btc-logo.svg'
    "
    alt="User Avatar"
    style="width: 32px; height: 32px; margin: 0px 12px; border-radius: 100%"
  />
  <el-dropdown placement="bottom-end">
    <span class="el-dropdown-link">
      {{ userStore.username }}
      <el-icon class="el-icon--right">
        <arrow-down />
      </el-icon>
    </span>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item @click="logoutToggle">登出</el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script setup lang="ts" name="Setting">
import useLayoutSettingStore from "@/store/modules/setting";
import useUserStore from "@/store/modules/user";
import { useRouter, useRoute } from "vue-router";
const layoutSettingStore = useLayoutSettingStore();
const userStore = useUserStore();
const $router = useRouter();
const $route = useRoute();

const updateRefresh = () => {
  layoutSettingStore.toggleRefresh();
};
const fullScreen = () => {
  const full = document.fullscreenElement;
  if (!full) {
    document.documentElement.requestFullscreen();
  } else {
    document.exitFullscreen();
  }
};
const logoutToggle = () => {
  userStore.userLogout();
  $router.push({ path: "/login", query: { redirect: $route.path } });
};
</script>

<style scoped></style>
