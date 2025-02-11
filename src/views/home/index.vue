<template>
  <div>
    <h1>一级路由展示登入成功</h1>
    <el-card class="welcome_card">
      <p>你好！{{ userStore.username }}</p>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import useUserStore from "@/store/modules/user";

const userStore = useUserStore();
</script>

<style scoped lang="scss">
.welcome_card {
  // display: flex;
  width: 100%;
}
</style>
