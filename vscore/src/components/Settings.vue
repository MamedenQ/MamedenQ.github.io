<template>
  <div class="main-area">
    <span id="page-top"></span>
    <div class="view-contents">
      <v-card>
        <v-tabs v-model="tab" background-color="primary accent-4" centered dark>
          <v-tabs-slider></v-tabs-slider>

          <v-tab href="#tab-score-settings">スコア設定</v-tab>
          <v-tab href="#tab-trash-list">削除済みスコア</v-tab>
          <v-tab href="#tab-master">マスタメンテ</v-tab>
          <v-tab href="#tab-backup">バックアップ</v-tab>
        </v-tabs>
        <v-tabs-items v-model="tab" style="margin-bottom:10px;">
          <v-tab-item value="tab-score-settings" style="padding:10px;">
            <scoreSettings style="margin-bottom:10px;"></scoreSettings>
          </v-tab-item>
          <v-tab-item value="tab-trash-list" style="padding:10px;">
            <trashList style="margin:10px;"></trashList>
          </v-tab-item>
          <v-tab-item value="tab-master" style="padding:10px;">
            <v-card style="width:100%;margin-bottom:10px;" class="d-inline-block mx-auto">
              <v-container>
                <masterMaintenancePlayer></masterMaintenancePlayer>
              </v-container>
            </v-card>
            <v-card style="width:100%;" class="d-inline-block mx-auto">
              <v-container>
                <masterMaintenanceTeam></masterMaintenanceTeam>
              </v-container>
            </v-card>
          </v-tab-item>
          <v-tab-item value="tab-backup" style="padding:10px;">
            <backup v-on:route-home="routeHome" style="margin-bottom:10px;"></backup>
          </v-tab-item>
        </v-tabs-items>
      </v-card>

      <!-- <trashList style="margin-bottom:10px;"></trashList> -->
      <!-- <masterMaintenancePlayer style="margin-bottom:10px;"></masterMaintenancePlayer> -->
      <!--
        <span>詳細あり・なし</span><br>
        <input type="radio" id="detail_off" name="detail" v-model="settings.detail" value="0">
        <label for="detail_off">ON</label>
        <input type="radio" id="detail_on" name="detail" v-model="settings.detail" value="1">
        <label for="detail_on">OFF</label>
        <span>色設定</span><br>
      -->

      <a
        href="#page-top"
        style="position:fixed;bottom:10px;right:10px;filter: drop-shadow(3px 3px 3px rgba(0, 0, 0, 0.6));"
        v-smooth-scroll
      >
        <moveTop></moveTop>
      </a>
    </div>
    <!-- <div class="menu" v-bind:style="styleNavi">
      <span>
        <span>ホーム</span>
        <svg
          v-on:click="onHome"
          xmlns="http://www.w3.org/2000/svg"
          width="70"
          height="70"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#000000"
          stroke-width="1"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <path d="M20 9v11a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V9" />
          <path d="M9 22V12h6v10M2 10.6L12 2l10 8.6" />
        </svg>
      </span>
    </div>-->
  </div>
</template>

<script>
import trashList from "./Material/TrashList";
import masterMaintenancePlayer from "./Material/MasterMaintenancePlayer";
import masterMaintenanceTeam from "./Material/MasterMaintenanceTeam";
import backup from "./Material/Backup";
import scoreSettings from "./Material/ScoreSettings";
import moveTop from "./SVG/MoveTopSVG";

export default {
  name: "settings",
  components: {
    trashList,
    masterMaintenancePlayer,
    masterMaintenanceTeam,
    backup,
    scoreSettings,
    moveTop
  },
  props: {
    commonProp: Object
  },
  data() {
    return {
      tab: "tab-score-settings",
      title: "",
      msg: "",
      positive: "OK",
      negative: "キャンセル",
      // styleGrid: {
      //     "grid-template-rows": "1fr",
      // },
      styleNavi: {
        "line-height": "700px"
      }
    };
  },
  computed: {
    // compMessage() {
    //     return this.modelA + this.modelB;
    // }
  },
  mounted() {
    this.commonProp.back = this.onBack;

    var gridHeight = window.innerHeight - 10;
    // this.styleGrid = {
    //     "grid-template-rows": gridHeight + "px",
    // };
    this.styleNavi = {
      "line-height": gridHeight + "px"
    };
  },
  methods: {
    onBack() {
      this.$emit("route-home");
    },
    routeHome() {
      this.$emit("route-home");
    }
  }
};
</script>

<style>
</style>
