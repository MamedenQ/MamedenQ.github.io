<template>
  <div class="grid-top" v-bind:style="styleGridHome">
    <div class="btninput">
      <v-btn v-on:click="onClickScoreInput" style="width:100%;height:100%;"></v-btn>
      <span>スコアを入力する</span>
      <scoreInputSvg style="width:100%;height:100%;"></scoreInputSvg>
    </div>
    <div class="btnlist">
      <v-btn v-on:click="onClickScoreList" style="width:100%;height:100%;"></v-btn>
      <span>スコアを分析する</span>
      <analyzeSvg style="width:100%;height:100%;"></analyzeSvg>
    </div>
    <div class="btnsettings">
      <v-btn v-on:click="onClickSettings" style="width:100%;height:100%;"></v-btn>
      <span>アプリをメンテナンスする</span>
      <settingsSvg style="width:100%;height:100%;"></settingsSvg>
    </div>
    <div class="empty">ここにアプリ名入れる</div>
  </div>
</template>

<script>
import scoreInputSvg from "../components/SVG/ScoreInputSVG";
import analyzeSvg from "../components/SVG/AnalyzeSVG";
import settingsSvg from "../components/SVG/SettingsSVG";

export default {
  name: "home",
  components: {
    scoreInputSvg,
    analyzeSvg,
    settingsSvg
  },
  data() {
    return {
      styleGridHome: {
        "grid-template-rows": "1fr 1fr"
      }
    };
  },
  mounted() {
    var itemHeight = (window.innerHeight - 30) / 2;
    this.styleGridHome = {
      "grid-template-rows": itemHeight + "px " + itemHeight + "px"
    };
  },
  methods: {
    onClickScoreInput() {
      this.$emit("route-score-input-new");
    },
    onClickScoreList() {
      this.$emit("route-score-list");
    },
    onClickSettings() {
      this.$emit("route-settings");
    }
  }
};
</script>

<style>
.grid-top {
  /* height: 100%; */
  margin: 10px;
  display: grid;
  grid-column-gap: 10px;
  grid-row-gap: 10px;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  grid-template-areas: "btninput btnlist" "empty btnsettings";
}

.btninput {
  /* color: #333;
  background: #eee; */
  position: relative;
  grid-area: btninput;
  /* filter: drop-shadow(1px 1px 1px rgba(0, 0, 0, 0.6));
  border-radius: 2px; */
}

.btnlist {
  /* color: #333;
  background: #eee; */
  position: relative;
  grid-area: btnlist;
  /* filter: drop-shadow(1px 1px 1px rgba(0, 0, 0, 0.6));
  border-radius: 2px; */
}

.btnsettings {
  /* color: #333;
  background: #eee; */
  position: relative;
  grid-area: btnsettings;
  /* filter: drop-shadow(1px 1px 1px rgba(0, 0, 0, 0.6));
  border-radius: 2px; */
}

.grid-top div span {
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  text-align: center;
  line-height: 40px;
  pointer-events: none;
}

.grid-top div svg {
  position: absolute;
  right: 0;
  left: 0;
  bottom: 0;
  width: 100%;
  pointer-events: none;
}
</style>
