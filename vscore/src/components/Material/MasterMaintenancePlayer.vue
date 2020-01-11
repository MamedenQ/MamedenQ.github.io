<template>
  <div>
    <!-- <v-card style="width:100%;" class="d-inline-block mx-auto"> -->
    <!-- <v-container> -->
    <div style="margin-bottom:10px;">プレーヤマスタ編集</div>
    <v-data-table
      :headers="headersPlayer"
      :items="members"
      item-key="id"
      disable-sort
      hide-default-footer
      style="margin-bottom:10px;"
    >
      <!-- <template v-slot:header="{ props }">
          <thead>
            <tr>
              <th
                style="width:20%;background-color: #005ab3;color: #fff;"
                v-for="h in props.headers"
                class="text-center"
                :key="h.text"
              >{{ h.text }}</th>
            </tr>
          </thead>
      </template>-->
      <template style="width:25%;" v-slot:item.no="{ item }">
        <v-text-field color="primary" v-model="item.no"></v-text-field>
      </template>
      <template v-slot:item.name="{ item }">
        <v-text-field color="primary" v-model="item.name"></v-text-field>
      </template>
      <template v-slot:item.sex="{ item }">
        <v-radio-group v-model="item.sex" row>
          <v-radio color="primary" label="男" value="0"></v-radio>
          <v-radio color="red" label="女" value="1"></v-radio>
        </v-radio-group>
      </template>
      <template v-slot:item.team="{ item }">
        <v-select v-model="item.team" :items="teams" item-text="name" item-value="no"></v-select>
      </template>
      <template v-slot:item.delete="{ item }">
        <v-btn v-on:click="onClickDelete(item)" color="warning" dark>削除</v-btn>
      </template>
    </v-data-table>
    <div>
      <v-btn
        style="float:right;margin-left:10px;margin-bottom:10px;"
        v-on:click="onClickSaveMember"
        color="primary"
        dark
      >保存</v-btn>
      <v-btn style="float:right;" v-on:click="onClickAddMember" color="primary" dark>追加</v-btn>
    </div>
    <confirm
      v-if="showModalConfirm"
      v-on:dialogResult="result"
      :title="title"
      :msg="msg"
      :positive="positive"
      :negative="negative"
    ></confirm>
    <!-- </v-container> -->
    <!-- </v-card> -->
  </div>
</template>

<script>
import confirm from "./Confirm";

export default {
  name: "master_maintenance_player",
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
      headersPlayer: [
        {
          text: "番号",
          align: "center",
          value: "no",
          width: "20%"
        },
        {
          text: "名前",
          align: "center",
          value: "name",
          width: "20%"
        },
        {
          text: "性別",
          align: "center",
          value: "sex",
          width: "20%"
        },
        {
          text: "所属",
          align: "center",
          value: "team",
          width: "20%"
        },
        {
          text: "削除",
          align: "center",
          value: "delete",
          width: "20%"
        }
      ],
      teams: []
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
    }
  }
};
</script>

<style src="../../style/style.css" lang="css">
</style>

