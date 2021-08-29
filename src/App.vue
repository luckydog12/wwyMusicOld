<template>
  <div>
    <router-view></router-view>
    <PlayController />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import PlayController from "./components/PlayController.vue";
export default defineComponent({
  name: "App",
  components: {
    PlayController
  }
});
</script>

<style lang="less">
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: '微软雅黑';
  }

  .iconfont {
    font-size: 0.5rem;
  }
</style>