<template>
  <v-app>
    <v-app-bar app color="primary" height="64px" dark>
      <v-btn v-on:click="onClickBack" v-bind:disabled="!isEnableBack" icon>
        <v-icon>fas fa-arrow-left</v-icon>
      </v-btn>
      <v-btn v-show="false" style="margin-left:8px;" icon>
        <v-icon>fas fa-home</v-icon>
      </v-btn>
      <v-toolbar-title style="margin-left:16px;">Vスコア</v-toolbar-title>
      <v-toolbar-title style="margin-left:16px;">{{ title }}</v-toolbar-title>
      <v-toolbar-title style="margin-left:16px;">{{ target }}</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn
        v-on:click="onClickUndo"
        v-show="isShowUndo"
        v-bind:disabled="!isEnableUndo"
        style="margin-left:8px;"
        icon
      >
        <v-icon>fas fa-undo</v-icon>
      </v-btn>
      <v-btn
        v-on:click="onClickRedo"
        v-show="isShowRedo"
        v-bind:disabled="!isEnableRedo"
        style="margin-left:8px;"
        icon
      >
        <v-icon>fas fa-redo</v-icon>
      </v-btn>
      <v-btn
        v-on:click="onClickMemberChange"
        v-show="isShowMemberChange"
        style="margin-left:8px;"
        icon
      >
        <v-icon>fas fa-exchange-alt</v-icon>
        <!-- <memberSvg></memberSvg> -->
      </v-btn>
      <v-btn
        v-on:click="onClickAnalyzeList"
        v-show="isShowAnalyzeList"
        v-bind:disabled="!isEnabledAnalyzeList"
        style="margin-left:8px;"
        text
      >分析一覧へ</v-btn>
      <v-btn v-on:click="onClickNewScore" v-show="isShowNewScore" style="margin-left:8px;" icon>
        <v-icon>fas fa-edit</v-icon>
      </v-btn>
      <v-btn
        v-on:click="onClickAnalyzePlayer"
        v-show="isShowAnalyzePlayer"
        style="margin-left:8px;"
        v-bind:disabled="!isEnableAnalyzePlayer"
        text
      >人別</v-btn>
      <v-btn
        v-on:click="onClickAnalyzeMatch"
        v-show="isShowAnalyzeMatch"
        style="margin-left:8px;"
        v-bind:disabled="!isEnableAnalyzeMatch"
        text
      >試合別</v-btn>
      <v-btn v-on:click="onClickSave" v-show="isShowSave" style="margin-left:8px;" icon>
        <v-icon>fas fa-save</v-icon>
      </v-btn>
      <!-- <v-btn icon>
        <v-icon>fas fa-youtube</v-icon>
      </v-btn>
      <v-btn icon>
        <v-icon>fas fa-trash-alt</v-icon>
      </v-btn>-->
      <!-- <v-btn icon>
        <v-icon>fas fa-tools</v-icon>
      </v-btn>-->
      <v-btn v-bind:disabled="!isEnableSettings" v-on:click="onClickSettings" style="margin-left:32px;" icon>
        <v-icon>fas fa-cog</v-icon>
      </v-btn>
      <!-- <v-app-bar-nav-icon></v-app-bar-nav-icon> -->
      <!-- <div class="d-flex align-center">
        <v-img
          alt="Vuetify Logo"
          class="shrink mr-2"
          contain
          src="https://cdn.vuetifyjs.com/images/logos/vuetify-logo-dark.png"
          transition="scale-transition"
          width="40"
        />

        <v-img
          alt="Vuetify Name"
          class="shrink mt-1 hidden-sm-and-down"
          contain
          min-width="100"
          src="https://cdn.vuetifyjs.com/images/logos/vuetify-name-dark.png"
          width="100"
        />
      </div>-->
    </v-app-bar>

    <!-- <v-spacer></v-spacer>

      <v-btn href="https://github.com/vuetifyjs/vuetify/releases/latest" target="_blank" text>
        <span class="mr-2">Latest Release</span>
        <v-icon>mdi-open-in-new</v-icon>
    </v-btn>-->
    <!-- </v-app-bar> -->

    <!-- <v-content> -->
    <!-- <HelloWorld /> -->
    <div class="grid-main">
      <div class="contents">
        <router-view
          v-on:route-home="routeHome"
          v-on:route-score-input-new="routeScoreInputNew"
          v-on:route-score-input="routeScoreInput"
          v-on:route-analyze-list-player="routeAnalyzeListPlayer"
          v-on:route-analyze-list-match="routeAnalyzeListMatch"
          v-on:route-score-list="routeScoreList"
          v-on:route-settings="routeSettings"
          v-on:route-analyze-detail="routeAnalyzeDetail"
          v-bind:is-new-score="isNewScore"
          v-bind:score-id="scoreId"
          v-bind:analyze-data="analyzeData"
          v-bind:analyze-player-data="analyzePlayerData"
          v-bind:is-match-prop="isMatchProp"
          v-bind:is-match-from="isMatchFrom"
          v-bind:score-input-prop="scoreInputProp"
          v-bind:score-list-prop="scoreListProp"
          v-bind:analyze-list-prop="analyzeListProp"
          v-bind:common-prop="commonProp"
        ></router-view>
      </div>
    </div>
  </v-app>
</template>

<script>
// import HelloWorld from "./components/HelloWorld";

export default {
  name: "App",
  methods: {
    popup() {
      console.log("popup!");
    },
    onClickBack() {
      if (this.commonProp.back != null) {
        this.commonProp.back();
      } else {
        console.log("this.commonProp.back is null !!!");
      }
    },
    onClickNewScore() {
      this.routeScoreInputNew();
    },
    onClickUndo() {
      if (this.scoreInputProp.undo != null) {
        this.scoreInputProp.undo();
      } else {
        console.log("this.scoreInputProp.undo is null !!!");
      }
    },
    onClickRedo() {
      if (this.scoreInputProp.redo != null) {
        this.scoreInputProp.redo();
      } else {
        console.log("this.scoreInputProp.redo is null !!!");
      }
    },
    onClickSave() {
      if (this.scoreInputProp.save != null) {
        this.scoreInputProp.save();
      } else {
        console.log("this.scoreInputProp.save is null !!!");
      }
    },
    onClickMemberChange() {
      if (this.scoreInputProp.changeMember != null) {
        this.scoreInputProp.changeMember();
      } else {
        console.log("this.scoreInputProp.changeMember is null !!!");
      }
    },
    checkChangedScoreList(checkedNum) {
      if (checkedNum > 0) {
        this.isEnabledAnalyzeList = true;
      } else {
        this.isEnabledAnalyzeList = false;
      }
    },
    onClickSettings() {
      this.routeSettings();
    },
    onClickAnalyzeList() {
      if (this.scoreListProp.linkAnalyzeList != null) {
        this.scoreListProp.linkAnalyzeList();
      } else {
        console.log("this.scoreListProp.linkAnalyzeList is null !!!");
      }
    },
    onClickAnalyzePlayer() {
      if (this.analyzeListProp.switchList != null) {
        this.analyzeListProp.switchList();
        this.isEnableAnalyzePlayer = false;
        this.isEnableAnalyzeMatch = true;
      } else {
        console.log("this.analyzeListProp.switchList is null !!!");
      }
    },
    onClickAnalyzeMatch() {
      if (this.analyzeListProp.switchList != null) {
        this.analyzeListProp.switchList();
        this.isEnableAnalyzePlayer = true;
        this.isEnableAnalyzeMatch = false;
      } else {
        console.log("this.analyzeListProp.switchList is null !!!");
      }
    },
    setEnableUndo(flg) {
      // console.log("setEnableUndo " + flg);
      this.isEnableUndo = flg;
    },
    setEnableRedo(flg) {
      // console.log("setEnableRedo " + flg);
      this.isEnableRedo = flg;
    },
    routeScoreList() {
      this.title = "スコアリスト";
      this.target = "";
      this.isEnableBack = false;
      this.isShowUndo = false;
      this.isShowRedo = false;
      this.isShowSave = false;
      this.isShowMemberChange = false;
      this.isShowNewScore = true;
      this.isEnableSettings = true;
      this.isShowAnalyzePlayer = false;
      this.isShowAnalyzeMatch = false;
      this.isShowAnalyzeList = true;
      this.$router.push({ path: "/scorelist" });
    },
    routeAnalyzeListPlayer(items) {
      this.title = "分析一覧";
      this.target = "";
      if (items != null) {
        this.analyzeData = items;
      }
      this.isMatchProp = false;
      this.isEnableBack = true;
      this.isShowUndo = false;
      this.isShowRedo = false;
      this.isShowSave = false;
      this.isShowMemberChange = false;
      this.isShowNewScore = false;
      this.isEnableSettings = false;
      this.isShowAnalyzePlayer = true;
      this.isShowAnalyzeMatch = true;
      this.isEnableAnalyzePlayer = false;
      this.isEnableAnalyzeMatch = true;
      this.isShowAnalyzeList = false;
      this.$router.push({ path: "/analyzelist" });
    },
    routeAnalyzeListMatch(items) {
      this.title = "分析一覧";
      this.target = "";
      if (items != null) {
        this.analyzeData = items;
      }
      // this.$router.push({ path: "/analyzelistmatch" });
      this.isMatchProp = true;
      this.isEnableBack = true;
      this.isShowUndo = false;
      this.isShowRedo = false;
      this.isShowSave = false;
      this.isShowMemberChange = false;
      this.isShowNewScore = false;
      this.isEnableSettings = false;
      this.isShowAnalyzePlayer = true;
      this.isShowAnalyzeMatch = true;
      this.isEnableAnalyzePlayer = true;
      this.isEnableAnalyzeMatch = false;
      this.isShowAnalyzeList = false;
      this.$router.push({ path: "/analyzelist" });
    },
    routeScoreInput(scoreId) {
      this.title = "スコア入力";
      this.target = "";
      this.scoreId = scoreId;
      this.isNewScore = false;
      this.isEnableBack = true;
      this.isShowUndo = true;
      this.isShowRedo = true;
      this.isShowSave = true;
      this.isShowMemberChange = true;
      this.isShowNewScore = false;
      this.isEnableSettings = false;
      this.isShowAnalyzePlayer = false;
      this.isShowAnalyzeMatch = false;
      this.isShowAnalyzeList = false;
      this.$router.push({ path: "/scoreinput" });
    },
    routeScoreInputNew() {
      this.title = "スコア入力";
      this.target = "";
      this.isNewScore = true;
      this.isEnableBack = true;
      this.isShowUndo = true;
      this.isShowRedo = true;
      this.isShowSave = true;
      this.isShowMemberChange = true;
      this.isShowNewScore = false;
      this.isEnableSettings = false;
      this.isShowAnalyzePlayer = false;
      this.isShowAnalyzeMatch = false;
      this.isShowAnalyzeList = false;
      this.createDigest(this.digestCallback);
    },
    routeHome() {
      // this.$router.push({ path: "/home" });
      this.routeScoreList();
    },
    routeSettings() {
      this.title = "メンテナンス";
      this.target = "";
      this.isEnableBack = true;
      this.isShowUndo = false;
      this.isShowRedo = false;
      this.isShowSave = false;
      this.isShowMemberChange = false;
      this.isShowNewScore = false;
      this.isEnableSettings = false;
      this.isShowAnalyzePlayer = false;
      this.isShowAnalyzeMatch = false;
      this.isShowAnalyzeList = false;
      this.$router.push({ path: "/settings" });
    },
    routeAnalyzeDetail(analyzePlayerData, isMatchFrom) {
      this.title = "詳細分析";
      this.target = analyzePlayerData.name;
      this.isMatchFrom = isMatchFrom;
      this.analyzePlayerData = analyzePlayerData;
      this.isEnableBack = true;
      this.isShowUndo = false;
      this.isShowRedo = false;
      this.isShowSave = false;
      this.isShowMemberChange = false;
      this.isShowNewScore = false;
      this.isEnableSettings = false;
      this.isShowAnalyzePlayer = false;
      this.isShowAnalyzeMatch = false;
      this.isShowAnalyzeList = false;
      this.$router.push({ path: "/analyzedetail" });
    },
    digestCallback(hex) {
      this.scoreId = hex;
      this.$router.push({ path: "/scoreinput" });
    },
    createDigest(callback) {
      if (!crypto || !crypto.subtle) {
        throw Error("crypto.subtle is not supported."); // ブラウザ未対応
      }
      var d = new Date();
      console.log(d.toLocaleString());
      var str = d.toLocaleString();

      crypto.subtle.digest("SHA-256", new TextEncoder().encode(str)).then(x => {
        const hex = this.hexString(x); // convert to hex string.
        callback(hex);
      });
    },
    hexString(buffer) {
      const byteArray = new Uint8Array(buffer);
      const hexCodes = [...byteArray].map(value => {
        const hexCode = value.toString(16);
        const paddedHexCode = hexCode.padStart(2, "0");
        return paddedHexCode;
      });
      return hexCodes.join("");
    }
  },
  mounted() {
    // this.$router.push({ path: "/home" });
    this.routeHome();
  },
  data: function() {
    return {
      isMatchProp: true,
      isNewScore: true,
      isMatchFrom: false,
      scoreId: "",
      analyzeData: [],
      analyzePlayerData: {},
      isEnableSettings: true,
      isEnableUndo: true,
      isEnableRedo: true,
      isEnableBack: true,
      isEnableAnalyzePlayer: false,
      isEnableAnalyzeMatch: false,
      isEnabledAnalyzeList: false,
      isShowUndo: false,
      isShowRedo: false,
      isShowSave: false,
      isShowMemberChange: false,
      isShowNewScore: false,
      isShowAnalyzePlayer: false,
      isShowAnalyzeMatch: false,
      isShowAnalyzeList: false,
      scoreInputProp: {
        undo: null,
        redo: null,
        changeMember: null,
        setEnableUndo: this.setEnableUndo,
        setEnableRedo: this.setEnableRedo
      },
      scoreListProp: {
        linkAnalyzeList: null,
        checkChangedScoreList: this.checkChangedScoreList
      },
      analyzeListProp: {
        switchList: null
      },
      commonProp: {
        backView: null
      },
      title: "",
      target: ""
    };
  }
};
</script>

<style>
[v-cloak] {
  display: none;
}
#app {
  height: 100%;
  margin: 0;
}

.contents {
  display: grid;
  grid-area: contents;
}
</style>
