<template>
  <div class="app_container">
    <RouterView />
  </div>
</template>

<script setup lang="ts">
import { RouterView } from "vue-router";
</script>

<style scoped lang="scss">
.app_container {
  width: 100%;
  height: 100vh;
  display: flex;
}
</style>
