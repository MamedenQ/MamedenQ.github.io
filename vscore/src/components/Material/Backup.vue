<template>
  <div>
    <!-- <v-card style="width:100%;" class="d-inline-block mx-auto"> -->
    <!-- <v-container> -->
    <!-- <div style="margin-bottom:10px;">バックアップ・リストア</div> -->
    <!-- <div>DBバックアップ</div> -->
    <!-- <button v-on:click="onClickBackupDB" class="btn btn-primary">DBバックアップ</button> -->
    <v-btn v-on:click="onClickBackupDB" color="primary" dark>DBバックアップ</v-btn>
    <!-- <br /> -->
    <div style="margin-bottom:30px;">前回バックアップ日時 : {{ bkDate }}</div>
    <!-- <div>DBリストア</div> -->
    <!-- <button v-on:click="onClickRestoreDB" class="btn btn-warning">DBリストア</button> -->
    <v-btn style="margin-bottom:30px;" v-on:click="onClickRestoreDB" color="warning" dark>DBリストア</v-btn>
    <br />

    <!-- <div>DB内容JSON出力</div> -->
    <!-- <button v-on:click="outputDB" class="btn btn-primary">出力</button> -->
    <v-btn v-on:click="outputDB" color="primary" dark>DB内容JSON出力</v-btn>
    <!-- <textarea style="margin-bottom:30px;width:100%;height:300px;" v-model="output"></textarea> -->
    <v-textarea style="margin-top:10px;" outlined label="JSON" v-model="output"></v-textarea>
    <!-- <button v-on:click="onClickInputDB" class="btn btn-warning">入力</button> -->
    <!-- <div>DB内容JSON入力</div> -->
    <v-form v-model="isFormValid" ref="score_json_input_form">
      <v-btn v-on:click="onClickInputDB" color="warning" dark>DB内容JSON入力</v-btn>
      <!-- <textarea style="width:100%;height:300px;" v-model="modelInput"></textarea> -->
      <v-textarea
        style="margin:10px 0;"
        outlined
        label="JSON"
        v-model="modelInput"
        v-bind:rules="[required]"
      ></v-textarea>
    </v-form>

    <v-btn v-on:click="onClickClear" color="warning" dark>DB消去</v-btn>

    <confirm ref="confirm"></confirm>
    <!-- </v-container> -->
    <!-- </v-card> -->
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
      // showModalConfirm: false,
      // title: "",
      // msg: "",
      // positive: "OK",
      // negative: "キャンセル",
      // callbackConfirm: null,
      bkDate: ""
    };
  },
  computed: {
    // compMessage() {
    //     return this.modelA + this.modelB;
    // }
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
      var defaultMembers = this.getDefaultDataTeams();
      this.setMembersData(defaultMembers);
      this.setTeamsData([]);
      var defaultScoreSettings = this.getDefaultDataScoreSettings();
      this.setScoreSettingsData(defaultScoreSettings);

      this.$emit("route-home");
    }
  }
};
</script>

<style src="../../style/style.css" lang="css">
</style>
