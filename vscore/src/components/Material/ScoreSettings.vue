<template>
  <div>
    <confirm ref="confirm"></confirm>
    <v-container>
      <v-row>
        <v-col cols="auto">
          <v-switch v-model="scoreSettings.isLibero" class="ma-2" label="リベロ" color="primary"></v-switch>
        </v-col>
      </v-row>
      <v-row>
        <v-spacer></v-spacer>
        <v-col cols="auto">
          <v-btn v-on:click="onSaveSettings" color="primary">保存</v-btn>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import confirm from "./Confirm";

export default {
  name: "score_settings",
  components: {
    confirm
  },
  data() {
    return {
      dialogProp: {
        title: "",
        msg: "",
        positive: "",
        negative: "",
        callback: null
      },
      scoreSettings: {}
    };
  },
  mounted() {
    this.scoreSettings = this.getScoreSettingsData();
  },
  methods: {
    onSaveSettings() {
      this.dialogProp = {
        title: "保存確認",
        msg: "保存しますか？",
        positive: "OK",
        negative: "キャンセル",
        callback: this.callbackSaveSettings
      };
      this.$refs.confirm.open(this.dialogProp);
    },
    callbackSaveSettings(result) {
      if (!result) {
        return;
      }
      this.setScoreSettingsData(this.scoreSettings);
    }
  }
};
</script>

<style lang='scss'>
@import "../../style/common.scss";
</style>
