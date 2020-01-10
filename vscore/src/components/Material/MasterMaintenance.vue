<template>
  <div>
    <span>プレーヤマスタ</span>
    <br />
    <table class="analyze" style="margin-bottom:10px;">
      <thead class="analyze_head">
        <tr>
          <th style="width:20%">番号</th>
          <th style="width:20%">名前</th>
          <th style="width:20%">性別</th>
          <th style="width:20%">所属</th>
          <th style="width:20%">削除</th>
        </tr>
      </thead>
      <tbody class="analyze_body">
        <tr v-for="(item, idx) of members" :key="idx" class="include-text">
          <td>
            <!-- <input style="width:100%" type="text" v-model="members[idx].no" /> -->
            <v-text-field color="primary" v-model="members[idx].no"></v-text-field>
          </td>
          <td>
            <!-- <input style="width:100%" type="text" v-model="members[idx].name" /> -->
            <v-text-field color="primary" v-model="members[idx].name"></v-text-field>
          </td>
          <td style="text-align:center;">
            <v-radio-group v-model="members[idx].sex" row>
              <v-radio color="primary" label="男" value="0"></v-radio>
              <v-radio color="red" label="女" value="1"></v-radio>
            </v-radio-group>
          </td>
          <td>
            <!-- <select v-model="members[idx].team" style="width:100%">
              <option v-for="team in teams" v-bind:value="team.no" :key="team.key">{{ team.name }}</option>
            </select>-->
            <v-select v-model="members[idx].team" :items="teams" item-text="name" item-value="no"></v-select>
          </td>
          <td style="text-align:center;">
            <!-- <button v-on:click="onClickDelete(item)" class="btn btn-warning">削除</button> -->
            <v-btn v-on:click="onClickDelete(item)" color="warning" dark>削除</v-btn>
          </td>
        </tr>
      </tbody>
    </table>
    <!-- <button v-on:click="onClickAddMember" class="btn btn-primary">追加</button>
    <button v-on:click="onClickSaveMember" class="btn btn-primary">保存</button>-->
    <v-btn v-on:click="onClickAddMember" color="primary" dark>追加</v-btn>
    <v-btn style="margin-left:10px" v-on:click="onClickSaveMember" color="primary" dark>保存</v-btn>
    <div style="margin-top:30px">チームマスタ</div>
    <table class="analyze" style="margin-bottom:10px;">
      <thead class="analyze_head">
        <tr>
          <th style="width:50%">番号</th>
          <th style="width:50%">チーム名前</th>
        </tr>
      </thead>
      <tbody class="analyze_body">
        <tr v-for="(item, idx) of teams" :key="idx" class="include-text">
          <td>{{ item.no }}</td>
          <td>
            <!-- <input style="width:100%" type="text" v-model="teams[idx].name" /> -->
            <v-text-field color="primary" v-model="teams[idx].name"></v-text-field>
          </td>
        </tr>
      </tbody>
    </table>
    <!-- <button v-on:click="onClickSaveTeam" class="btn btn-primary">保存</button> -->
    <v-btn v-on:click="onClickSaveTeam" color="primary" dark>保存</v-btn>
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
  name: "master_maintenance",
  components: {
    confirm
  },
  data() {
    return {
      deleteItem: [],
      members: [],
      showModalConfirm: false,
      modelDeleteTarget: [],
      title: "",
      msg: "",
      positive: "OK",
      negative: "キャンセル",
      callbackConfirm: null,
      teams: [
        { no: 1, name: "" },
        { no: 2, name: "" },
        { no: 3, name: "" },
        { no: 4, name: "" },
        { no: 5, name: "" },
        { no: 6, name: "" },
        { no: 7, name: "" },
        { no: 8, name: "" },
        { no: 9, name: "" },
        { no: 10, name: "" }
      ]
    };
  },
  computed: {
    // compMessage() {
    //     return this.modelA + this.modelB;
    // }
  },
  mounted() {
    this.refresh();
  },
  methods: {
    refresh() {
      this.members = JSON.parse(localStorage.getItem("members"));
      if (this.members == null) {
        this.members = [];
      }
      this.teams = JSON.parse(localStorage.getItem("teams"));
      if (this.teams == null) {
        this.teams = [
          { no: 1, name: "" },
          { no: 2, name: "" },
          { no: 3, name: "" },
          { no: 4, name: "" },
          { no: 5, name: "" },
          { no: 6, name: "" },
          { no: 7, name: "" },
          { no: 8, name: "" },
          { no: 9, name: "" },
          { no: 10, name: "" }
        ];
      }
    },
    onClickDelete(item) {
      this.deleteItem = item;
      this.title = "削除確認";
      this.msg = "削除しますか？";
      this.callbackConfirm = this.callbackDelete;

      this.showModalConfirm = true;
    },
    result(flg) {
      this.callbackConfirm(flg);
      this.showModalConfirm = false;
    },
    callbackDelete(result) {
      if (!result) {
        return;
      }

      var item = this.deleteItem;
      // var scoreList = JSON.parse(localStorage.getItem("score"));
      var filterData = this.members.filter(function(data) {
        if (data.no != item.no) return true;
      });
      // filterData[0].isTrash = true;

      // localStorage.setItem("score", JSON.stringify(scoreList));

      this.members = filterData;
      // this.refresh();
    },
    onClickAddMember() {
      this.members.push({
        no: "",
        name: "",
        sex: 0
      });
    },
    onClickSaveMember() {
      this.title = "保存確認";
      this.msg = "保存しますか？";
      this.callbackConfirm = this.callbackSaveMember;

      this.showModalConfirm = true;
    },
    callbackSaveMember(result) {
      if (!result) {
        return;
      }
      localStorage.setItem("members", JSON.stringify(this.members));
    },
    onClickSaveTeam() {
      this.title = "保存確認";
      this.msg = "保存しますか？";
      this.callbackConfirm = this.callbackSaveTeam;

      this.showModalConfirm = true;
    },
    callbackSaveTeam(result) {
      if (!result) {
        return;
      }
      localStorage.setItem("teams", JSON.stringify(this.teams));
    }
  }
};
</script>

<style src="../../style/style.css" lang="css">
</style>

