<template>
  <div class="logo_container" v-if="setting.logoVisible">
    <img :src="setting.logo" alt="" />
    <!-- <p v-show="!isCollapse">{{ setting.title }}</p> -->
    <p v-show="!LayoutSettingStore.fold">{{ setting.title }}</p>
  </div>
</template>

<script setup lang="ts" name="Logo">
import setting from "@/setting";
import useLayoutSettingStore from "@/store/modules/setting";

const LayoutSettingStore = useLayoutSettingStore();
</script>

<style scoped lang="scss">
.logo_container {
  display: flex;
  align-items: center;
  justify-content: left;
  background-color: $base-color;
  width: 100%;
  min-height: $base-tabbar-height;
  overflow: hidden;

  img {
    width: 50px;
    height: 50px;
    margin-left: 7px;
  }
  p {
    white-space: nowrap;
    overflow: hidden;
    margin-left: 10px;
    font-weight: 700;
    transition: all 3s ease-in-out;
  }
}
</style>
