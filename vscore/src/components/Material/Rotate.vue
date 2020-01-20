<template>
  <div class="player-button">
    <v-btn style="height: 100%;" class="background-button" v-on:click="onClickRotate"></v-btn>
    <span class="player-name">ローテ</span>
    <rotateSvg></rotateSvg>
  </div>
</template>

<script>
import rotateSvg from "../SVG/RotateSVG";

export default {
  name: "player",
  components: {
    rotateSvg
  },
  methods: {
    onClickRotate() {
      this.$emit("on-click-rotate");
    }
  }
};
</script>

<style lang='scss'>
@import "../../style/common.scss";
</style>
