<template>
  <div class="tabbar_container">
    <div class="left_tab">
      <BreadCrumb />
    </div>
    <div class="right_tab">
      <Setting />
    </div>
  </div>
</template>
<script setup lang="ts" name="Tabbar">
import BreadCrumb from "./breadcrumb/index.vue";
import Setting from "./setting/index.vue";
</script>

<style scoped lang="scss">
.tabbar_container {
  background-color: white;
  //   background-image: linear-gradient(to right, rgb(243, 243, 243), black, white);
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 100%;

  .left_tab {
    display: flex;
    align-items: center;
    height: 100%;
    margin: 8px;
    margin-left: 20px;

    .toggle {
      font-size: 20px;
      width: 36px;
      height: 36px;
    }
  }
}
.right_tab {
  //   background-color: purple;
  margin: 8px;
  display: flex;
  align-items: center;
  height: 100%;
  margin-right: 20px;
}
</style>
