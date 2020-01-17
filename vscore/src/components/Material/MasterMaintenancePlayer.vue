<template>
  <div>
    <!-- <v-card style="width:100%;" class="d-inline-block mx-auto"> -->
    <!-- <v-container> -->
    <div style="margin-bottom:10px;">プレーヤマスタ編集</div>
    <v-form v-model="isFormValid" ref="master_player_form">
      <v-data-table
        :headers="headersPlayer"
        :items="members"
        item-key="id"
        disable-sort
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
          <v-text-field
            color="primary"
            v-model="item.no"
            v-bind:rules="[required, limit_value, duplicate_no]"
            :error="item.isError"
            :error-messages="item.errorMsg"
            type="number"
          ></v-text-field>
        </template>
        <template v-slot:item.name="{ item }">
          <v-text-field color="primary" v-model="item.name" v-bind:rules="[required]"></v-text-field>
        </template>
        <template v-slot:item.sex="{ item }">
          <v-radio-group v-model="item.sex" v-bind:rules="[required]" row>
            <v-radio color="primary" label="男" value="0"></v-radio>
            <v-radio color="red" label="女" value="1"></v-radio>
          </v-radio-group>
        </template>
        <template v-slot:item.team="{ item }">
          <v-select
            v-model="item.team"
            :items="teams"
            item-text="name"
            item-value="no"
            v-bind:rules="[required]"
          ></v-select>
        </template>
        <template v-slot:item.delete="{ item }">
          <v-btn v-on:click="onClickDelete(item)" color="warning" dark>削除</v-btn>
        </template>
      </v-data-table>
    </v-form>
    <div>
      <v-btn
        style="float:right;margin-left:10px;margin-bottom:10px;"
        v-on:click="onClickSaveMember"
        color="primary"
        dark
      >保存</v-btn>
      <v-btn style="float:right;" v-on:click="onClickAddMember" color="primary" dark>追加</v-btn>
    </div>
    <confirm ref="confirm"></confirm>
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
      isFormValid: false,
      required: value => !!value || "必須入力",
      // limit_length: value => value.length <= 2 || "2文字以内",
      limit_value: value => (value >= 0 && value <= 999) || "0-999の整数",
      duplicate_no: value => this.checkDuplicateNo(value) || "重複しています",
      options: {
        itemsPerPage: -1
      },
      deleteItem: [],
      members: [],
      modelDeleteTarget: [],
      dialogProp: {
        title: "",
        msg: "",
        positive: "",
        negative: "",
        callback: null
      },
      headersPlayer: [
        { text: "番号", align: "center", value: "no", width: "20%" },
        { text: "名前", align: "center", value: "name", width: "20%" },
        { text: "性別", align: "center", value: "sex", width: "20%" },
        { text: "所属", align: "center", value: "team", width: "20%" },
        { text: "削除", align: "center", value: "delete", width: "20%" }
      ],
      teams: []
    };
  },
  computed: {},
  mounted() {
    this.refresh();
  },
  methods: {
    refresh() {
      this.members = JSON.parse(localStorage.getItem("members"));
      if (this.members == null) {
        this.members = [];
      }

      this.members = this.members.sort(this.compare);

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
    compare(a, b) {
      var r = 0;

      if (a.no < b.no) {
        r = -1;
      } else if (a.no > b.no) {
        r = 1;
      }

      return r;
    },
    onClickDelete(item) {
      console.log(this.options);

      this.dialogProp = {
        title: "削除確認",
        msg: "削除しますか？",
        positive: "OK",
        negative: "キャンセル",
        deleteItem: item,
        callback: this.callbackDelete
      };
      this.$refs.confirm.open(this.dialogProp);
    },
    callbackDelete(result) {
      if (!result) {
        return;
      }

      var item = this.dialogProp.deleteItem;
      var filterData = this.members.filter(function(data) {
        if (data.no != item.no) return true;
      });

      this.members = filterData;
    },
    onClickAddMember() {
      this.members.push({
        no: "",
        name: "",
        sex: 0
      });
    },
    onClickSaveMember() {
      this.isFormValid = this.$refs.master_player_form.validate();
      if (!this.isFormValid) {
        return;
      }
      this.dialogProp = {
        title: "保存確認",
        msg: "保存しますか？",
        positive: "OK",
        negative: "キャンセル",
        callback: this.callbackSaveMember
      };
      this.$refs.confirm.open(this.dialogProp);
    },
    callbackSaveMember(result) {
      if (!result) {
        return;
      }
      localStorage.setItem("members", JSON.stringify(this.members));
    },
    checkDuplicateNo(value) {
      var cnt = 0;
      this.members.forEach(function(d) {
        if (d.no == value) {
          cnt++;
        }
      });

      if (cnt > 1) {
        return false;
      }

      return true;
    }
  }
};
</script>

<style src="../../style/style.css" lang="css">
</style>

