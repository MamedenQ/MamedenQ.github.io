<template>
  <div>
    <div>DBバックアップ</div>
    <!-- <button v-on:click="onClickBackupDB" class="btn btn-primary">DBバックアップ</button> -->
    <v-btn v-on:click="onClickBackupDB" color="primary" dark>DBバックアップ</v-btn>
    <!-- <br /> -->
    <div style="margin-bottom:30px;">前回バックアップ日時 : {{ bkDate }}</div>
    <div>DBリストア</div>
    <!-- <button v-on:click="onClickRestoreDB" class="btn btn-warning">DBリストア</button> -->
    <v-btn style="margin-bottom:30px;" v-on:click="onClickRestoreDB" color="warning" dark>DBリストア</v-btn>

    <div>DB内容JSON出力</div>
    <!-- <button v-on:click="outputDB" class="btn btn-primary">出力</button> -->
    <v-btn v-on:click="outputDB" color="primary" dark>出力</v-btn>
    <!-- <textarea style="margin-bottom:30px;width:100%;height:300px;" v-model="output"></textarea> -->
    <v-textarea style="margin-top:10px;" outlined label="JSON" v-model="output"></v-textarea>
    <!-- <button v-on:click="onClickInputDB" class="btn btn-warning">入力</button> -->
    <div>DB内容JSON入力</div>
    <v-btn v-on:click="onClickInputDB" color="warning" dark>入力</v-btn>
    <!-- <textarea style="width:100%;height:300px;" v-model="modelInput"></textarea> -->
    <v-textarea style="margin:10px 0;" outlined label="JSON" v-model="modelInput"></v-textarea>

    <confirm
      v-if="showModalConfirm"
      v-on:dialogResult="result"
      :title="title"
      :msg="msg"
      :positive="positive"
      :negative="negative"
    ></confirm>
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
      output: "",
      modelInput: "",
      showModalConfirm: false,
      title: "",
      msg: "",
      positive: "OK",
      negative: "キャンセル",
      callbackConfirm: null,
      bkDate: ""
    };
  },
  computed: {
    // compMessage() {
    //     return this.modelA + this.modelB;
    // }
  },
  mounted() {
    var bkDate = localStorage.getItem("bk_date");
    if (bkDate == null) {
      bkDate = "";
    }
    this.bkDate = bkDate;
  },
  methods: {
    outputDB() {
      var score = JSON.parse(localStorage.getItem("score"));
      var members = JSON.parse(localStorage.getItem("members"));
      var teams = JSON.parse(localStorage.getItem("teams"));
      var outputJson = {
        score: score,
        members: members,
        teams: teams
      };
      this.output = JSON.stringify(outputJson);
    },
    onClickInputDB() {
      this.title = "入力確認";
      this.msg = " DBへ入力しますか？";
      this.callbackConfirm = this.callbackInputDB;

      this.showModalConfirm = true;
    },
    callbackInputDB(result) {
      if (!result) {
        return;
      }
      var inputJson = JSON.parse(this.modelInput);
      localStorage.setItem("score", JSON.stringify(inputJson.score));
      localStorage.setItem("members", JSON.stringify(inputJson.members));
      localStorage.setItem("teams", JSON.stringify(inputJson.teams));
      // this.$emit("route-home");
    },
    onClickBackupDB() {
      this.title = "DBバックアップ確認";
      this.msg = " DBをバックアップしますか？";
      this.callbackConfirm = this.callbackBackupDB;

      this.showModalConfirm = true;
    },
    callbackBackupDB(result) {
      if (!result) {
        return;
      }

      var d = new Date();
      console.log("バックアップ日時:" + d.toLocaleString());
      var bkDate = d.toLocaleString();
      this.bkDate = bkDate;

      var score = JSON.parse(localStorage.getItem("score"));
      var members = JSON.parse(localStorage.getItem("members"));
      var teams = JSON.parse(localStorage.getItem("teams"));
      localStorage.setItem("bk_date", bkDate);
      localStorage.setItem("score_bk", JSON.stringify(score));
      localStorage.setItem("members_bk", JSON.stringify(members));
      localStorage.setItem("teams_bk", JSON.stringify(teams));
    },
    onClickRestoreDB() {
      this.title = "DBリストア確認";
      this.msg = " DBをリストアしますか？";
      this.callbackConfirm = this.callbackRestoreDB;

      this.showModalConfirm = true;
    },
    callbackRestoreDB(result) {
      if (!result) {
        return;
      }

      var score = JSON.parse(localStorage.getItem("score_bk"));
      var members = JSON.parse(localStorage.getItem("members_bk"));
      var teams = JSON.parse(localStorage.getItem("teams_bk"));
      localStorage.setItem("score", JSON.stringify(score));
      localStorage.setItem("members", JSON.stringify(members));
      localStorage.setItem("teams", JSON.stringify(teams));
    },
    result(flg) {
      this.callbackConfirm(flg);
      this.showModalConfirm = false;
    }
  }
};
</script>

<style src="../../style/style.css" lang="css">
</style>
