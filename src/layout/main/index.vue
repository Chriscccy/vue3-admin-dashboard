<template>
  <div class="layout_main_route">
    <router-view v-slot="{ Component }">
      <transition name="slide-fade">
        <component :is="Component" v-if="flag" />
      </transition>
    </router-view>
  </div>
</template>

<script setup lang="ts" name="Main">
import { watch, ref, nextTick } from "vue";
import useLayoutSettingStore from "@/store/modules/setting";
const layoutSettingStore = useLayoutSettingStore();

const flag = ref(true);

watch(
  () => layoutSettingStore.refresh,
  () => {
    flag.value = false;
    nextTick(() => {
      flag.value = true;
    });
  }
);
</script>

<style scoped lang="scss">
.layout_main_route {
  width: 100%;
  height: calc(100vh - $base-tabbar-height);
  display: flex;
  padding: 10px;
}

.slide-fade-enter-active {
  transition: all 0.3s ease-out;
  overflow: hidden;
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateX(100px);
  opacity: 0;
  overflow: hidden;
}
</style>
