<template>
  <div style="position: relative;">
    <v-btn style="height:100%;width:100%;" v-on:click="onClickRotate"></v-btn>
    <span v-bind:style="labelStyle">ローテ</span>
    <rotateSvg v-bind:style="iconStyle"></rotateSvg>
  </div>
</template>

<script>
import rotateSvg from "../SVG/RotateSVG";

export default {
  name: "player",
  components: {
    rotateSvg
  },
  // props: {
  //   item: Object
  // },
  data() {
    return {
      labelStyle: {
        position: "absolute",
        top: "2px",
        left: "0",
        right: "0",
        "text-align": "center",
        height: "50%",
        "pointer-events": "none"
      },
      iconStyle: {
        position: "absolute",
        left: "0",
        right: "0",
        bottom: "2px",
        width: "100%",
        height: "60%",
        "pointer-events": "none"
      }
    };
  },
  methods: {
    onClickRotate() {
      this.$emit("on-click-rotate");
    }
  }
};
</script>

<style src="../../style/style.css" lang="css">
</style>
