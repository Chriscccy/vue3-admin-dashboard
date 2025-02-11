<template>
  <!-- 左侧toggle -->
  <el-icon style="margin-right: 12px" @click="changeIcon">
    <component :is="LayoutSettingStore.fold ? 'Expand' : 'Fold'" />
  </el-icon>

  <!-- 左侧面包屑 -->
  <el-breadcrumb separator-icon="ArrowRight" class="breadcrumb_box">
    <el-breadcrumb-item
      v-for="(item, index) in $route.matched"
      :key="index"
      v-show="!item.meta.hidden"
      :to="item.path"
    >
      <!-- 图标 -->
      <el-icon class="breadcrumb_icon">
        <component :is="item.meta.icon" />
      </el-icon>
      <!-- 展示匹配得路由标题 -->
      <span class="breadcrumb_title">{{ item.meta.title }}</span>
    </el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script setup lang="ts" name="BraedCrumb">
import useLayoutSettingStore from "@/store/modules/setting";
import { useRoute } from "vue-router";

const LayoutSettingStore = useLayoutSettingStore();
const $route = useRoute();

const changeIcon = () => {
  LayoutSettingStore.toggleFold();
};
</script>

<style scoped lang="scss">
.breadcrumb_icon {
  vertical-align: middle;
}

.breadcrumb_title {
  margin: 0px 5px;
  vertical-align: middle;
}
</style>
