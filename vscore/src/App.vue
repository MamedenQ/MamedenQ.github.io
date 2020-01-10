<template>
  <v-app>
    <!-- <v-app-bar app color="primary" dark> -->
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
          v-bind:analyze-player-score="analyzePlayerData"
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
    routeScoreList() {
      this.$router.push({ path: "/scorelist" });
    },
    routeAnalyzeListPlayer(items) {
      this.analyzeData = items;
      this.$router.push({ path: "/analyzelistplayer" });
    },
    routeAnalyzeListMatch(items) {
      this.analyzeData = items;
      this.$router.push({ path: "/analyzelistmatch" });
    },
    routeScoreInput(scoreId) {
      this.scoreId = scoreId;
      this.isNewScore = false;
      this.$router.push({ path: "/scoreinput" });
    },
    routeScoreInputNew() {
      this.isNewScore = true;
      this.createDigest(this.digestCallback);
    },
    routeHome() {
      this.$router.push({ path: "/home" });
    },
    routeSettings() {
      this.$router.push({ path: "/settings" });
    },
    routeAnalyzeDetail(analyzePlayerData) {
      this.analyzePlayerData = analyzePlayerData;
      this.$router.push({ path: "/AnalyzeDetail" });
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
    this.$router.push({ path: "/home" });
  },
  data: function() {
    return {
      isNewScore: true,
      scoreId: "",
      analyzeData: [],
      analyzePlayerData: {}
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
