<template>
  <div>
    <v-switch v-model="scoreSettings.isLibero" class="ma-2" label="リベロ"></v-switch>
    <confirm ref="confirm"></confirm>
    <v-spacer></v-spacer>
    <v-btn v-on:click="onSaveSettings" color="primary">保存</v-btn>
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
    this.scoreSettings = JSON.parse(localStorage.getItem("score_settings"));
    if (this.scoreSettings == null) {
      this.scoreSettings = {
        isLibero: false
      };
    }
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
      localStorage.setItem(
        "score_settings",
        JSON.stringify(this.scoreSettings)
      );
    }
  }
};
</script>

<style src="../../style/style.css" lang="css">
</style>
