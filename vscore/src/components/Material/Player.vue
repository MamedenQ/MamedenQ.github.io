<template>
  <div style="position: relative;">
    <v-btn style="height:100%;width:100%;" v-on:click="onClickPlayer" v-bind:color="buttonColor"></v-btn>
    <span v-show="!item.isEmpty" v-bind:style="labelStyle">{{item.no + ":" + item.name}}</span>
    <playerSvg v-bind:style="iconStyle" v-show="item.sex == 0 && !item.isEmpty"></playerSvg>
    <playerFSvg v-bind:style="iconStyle" v-show="item.sex == 1 && !item.isEmpty"></playerFSvg>
    <span v-if="item.isLibero" style="position:absolute;left:5px;bottom:0px;">L</span>
  </div>
</template>

<script>
import playerSvg from "../SVG/PlayerSVG";
import playerFSvg from "../SVG/PlayerFSVG";

export default {
  name: "player",
  components: {
    playerSvg,
    playerFSvg
  },
  props: {
    item: Object
  },
  data() {
    return {
      buttonColor: "#d6edbe",
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
  mounted() {
    if (!this.item.isFront) {
      this.buttonColor = "#edd5be";
    }
  },
  methods: {
    onClickPlayer() {
      this.$emit("on-click-player", this.item);
    }
  }
};
</script>

<style src="../../style/style.css" lang="css">
</style>
