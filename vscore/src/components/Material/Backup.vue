<template>
  <div>
    <v-container>
      <v-row>
        <v-col cols="auto">
          <v-btn v-on:click="onClickBackupDB" color="primary" dark>DBバックアップ</v-btn>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="auto">前回バックアップ日時 : {{ bkDate }}</v-col>
      </v-row>
      <v-row>
        <v-col cols="auto">
          <v-btn v-on:click="onClickRestoreDB" color="warning" dark>DBリストア</v-btn>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="auto"></v-col>
      </v-row>
      <v-row>
        <v-col cols="auto">
          <v-btn v-on:click="outputDB" color="primary" dark>DB内容JSON出力</v-btn>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12">
          <v-textarea outlined label="JSON" v-model="output" :no-resize="true"></v-textarea>
        </v-col>
      </v-row>
      <v-form v-model="isFormValid" ref="score_json_input_form">
        <v-row>
          <v-col cols="auto">
            <v-btn v-on:click="onClickInputDB" color="warning" dark>DB内容JSON入力</v-btn>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12">
            <v-textarea
              outlined
              label="JSON"
              v-model="modelInput"
              v-bind:rules="[required]"
              :no-resize="true"
            ></v-textarea>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="auto">
            <v-btn v-on:click="onClickClear" color="warning" dark>DB消去</v-btn>
          </v-col>
        </v-row>
      </v-form>
    </v-container>
    <confirm ref="confirm"></confirm>
  </div>
</template>

<script>
import confirm from "./Confirm";

export default {
  name: "backup",
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
      isFormValid: true,
      required: value => !!value || "必須入力",
      output: "",
      modelInput: "",
      bkDate: ""
    };
  },
  mounted() {
    this.bkDate = this.getBkDateData();
  },
  methods: {
    outputDB() {
      var score = this.getScoreData();
      var members = this.getMembersData();
      var teams = this.getTeamsData();
      var score_settings = this.getScoreSettingsData();
      var outputJson = {
        score: score,
        members: members,
        teams: teams,
        score_settings: score_settings
      };
      this.output = JSON.stringify(outputJson);
    },
    onClickInputDB() {
      this.isFormValid = this.$refs.score_json_input_form.validate();
      if (!this.isFormValid) {
        return;
      }

      this.dialogProp = {
        title: "入力確認",
        msg: "DBへ入力しますか？",
        positive: "OK",
        negative: "キャンセル",
        callback: this.callbackInputDB
      };
      this.$refs.confirm.open(this.dialogProp);
    },
    callbackInputDB(result) {
      if (!result) {
        return;
      }
      var inputJson = JSON.parse(this.modelInput);
      this.setScoreData(inputJson.score);
      this.setMembersData(inputJson.members);
      this.setTeamsData(inputJson.teams);
      this.setScoreSettingsData(inputJson.score_settings);

      this.$emit("route-home");
    },
    onClickBackupDB() {
      this.dialogProp = {
        title: "DBバックアップ確認",
        msg: "DBをバックアップしますか？",
        positive: "OK",
        negative: "キャンセル",
        callback: this.callbackBackupDB
      };
      this.$refs.confirm.open(this.dialogProp);
    },
    callbackBackupDB(result) {
      if (!result) {
        return;
      }

      var d = new Date();
      console.log("バックアップ日時:" + d.toLocaleString());
      var bkDate = d.toLocaleString();
      this.bkDate = bkDate;

      var score = this.getScoreData();
      var members = this.getMembersData();
      var teams = this.getTeamsData();
      var score_settings = this.getScoreSettingsData();
      this.setBkDateData(bkDate);

      this.setScoreBkData(score);
      this.setMembersBkData(members);
      this.setTeamsBkData(teams);
      this.setScoreSettingsBkData(score_settings);
    },
    onClickRestoreDB() {
      this.dialogProp = {
        title: "DBリストア確認",
        msg: "DBをリストアしますか？",
        positive: "OK",
        negative: "キャンセル",
        callback: this.callbackRestoreDB
      };
      this.$refs.confirm.open(this.dialogProp);
    },
    callbackRestoreDB(result) {
      if (!result) {
        return;
      }

      var score = this.getScoreBkData();
      var members = this.getMembersBkData();
      var teams = this.getTeamsBkData();
      var score_settings = this.getScoreSettingsBkData();

      this.setScoreData(score);
      this.setMembersData(members);
      this.setTeamsData(teams);
      this.setScoreSettingsData(score_settings);

      this.$emit("route-home");
    },
    onClickClear() {
      this.dialogProp = {
        title: "DB消去確認",
        msg: "DBのデータを消去しますか？",
        positive: "OK",
        negative: "キャンセル",
        callback: this.callbackClear
      };
      this.$refs.confirm.open(this.dialogProp);
    },
    callbackClear(result) {
      if (!result) {
        return;
      }

      this.setScoreData([]);
      this.setMembersData([]);
      var defaultTeams = this.getDefaultDataTeams();
      this.setTeamsData(defaultTeams);
      var defaultScoreSettings = this.getDefaultDataScoreSettings();
      this.setScoreSettingsData(defaultScoreSettings);

      this.$emit("route-home");
    }
  }
};
</script>

<style lang='scss'>
@import "../../style/common.scss";
</style>
