<template>
  <div>
    <!-- <v-card style="width:100%;" class="d-inline-block mx-auto"> -->
    <!-- <v-container> -->
    <div style="margin-bottom:10px;">チームマスタ編集</div>
    <v-data-table
      :headers="headersTeam"
      :items="teams"
      item-key="id"
      disable-sort
      hide-default-footer
      style="margin-bottom:10px;"
    >
      <!-- <template v-slot:header="{ props }">
          <thead>
            <tr>
              <th
                style="background-color: #005ab3;color: #fff;"
                v-for="h in props.headers"
                class="text-center"
                :key="h.text"
              >{{ h.text }}</th>
            </tr>
          </thead>
      </template>-->
      <template v-slot:item.no="{ item }">{{ item.no }}</template>
      <template v-slot:item.name="{ item }">
        <v-text-field color="primary" v-model="item.name"></v-text-field>
      </template>
    </v-data-table>
    <div>
      <!-- <button v-on:click="onClickSaveTeam" class="btn btn-primary">保存</button> -->
      <v-btn
        style="float:right;margin-bottom:10px;"
        v-on:click="onClickSaveTeam"
        color="primary"
        dark
      >保存</v-btn>
    </div>

    <confirm ref="confirm"></confirm>
    <!-- </v-container> -->
    <!-- </v-card> -->
  </div>
</template>

<script>
import confirm from "./Confirm";

export default {
  name: "master_maintenance_team",
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
      ],
      headersTeam: [
        {
          text: "番号",
          align: "center",
          value: "no",
          width: "20%"
        },
        {
          text: "チーム名",
          align: "center",
          value: "name",
          width: "80%"
        }
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
      // this.members = JSON.parse(localStorage.getItem("members"));
      // if (this.members == null) {
      //   this.members = [];
      // }
      this.teams = JSON.parse(localStorage.getItem("teams"));
      if (this.teams == null || this.teams.length == 0) {
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
    // result(flg) {
    //   this.callbackConfirm(flg);
    //   this.showModalConfirm = false;
    // },
    onClickSaveTeam() {
      this.dialogProp = {
        title: "保存確認",
        msg: "保存しますか？",
        positive: "OK",
        negative: "キャンセル",
        callback: this.callbackSaveTeam
      };
      this.$refs.confirm.open(this.dialogProp);
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

