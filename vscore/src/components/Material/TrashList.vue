<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <v-data-table
          :headers="headers"
          :items="trashList"
          item-key="id"
          hide-default-footer
          disable-sort
        >
          <template v-slot:item.title="{ item }">
            <div style="text-align:left;">{{ item.title }}</div>
          </template>
          <template v-slot:item.point="{ item }">{{ item.teamAPoint + " － " + item.teamBPoint }}</template>
          <template v-slot:item.edit="{ item }">
            <v-btn
              v-on:click="onClickRestore(item)"
              color="primary"
              style="margin-right:10px;"
              dark
            >復元</v-btn>
            <v-btn v-on:click="onClickDelete(item)" color="warning" dark>完全削除</v-btn>
          </template>
        </v-data-table>
        <confirm ref="confirm"></confirm>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import confirm from "./Confirm";

export default {
  name: "trash_list",
  components: {
    confirm
  },
  data() {
    return {
      trashList: [],
      dialogProp: {
        title: "",
        msg: "",
        positive: "",
        negative: "",
        callback: null
      },
      headers: [
        {
          text: "タイトル",
          align: "center",
          value: "title",
          width: "25%",
          class: "test"
        },
        {
          text: "日付",
          align: "center",
          value: "date",
          width: "25%"
        },
        {
          text: "得点",
          align: "center",
          sortable: false,
          value: "point",
          width: "25%"
        },
        {
          text: "編集",
          align: "center",
          sortable: false,
          value: "edit",
          width: "25%"
        }
      ]
    };
  },
  mounted() {
    this.refresh();
  },
  methods: {
    refresh() {
      this.trashList = this.getTrashScoreData();
    },
    onClickRestore(item) {
      this.dialogProp = {
        title: "復元確認",
        msg: "復元しますか？",
        positive: "OK",
        negative: "キャンセル",
        restoreItem: item,
        callback: this.callbackRestore
      };
      this.$refs.confirm.open(this.dialogProp);
    },
    callbackRestore(result) {
      if (!result) {
        return;
      }

      var item = this.dialogProp.restoreItem;
      this.restoreScoreData(item.id);

      this.refresh();
    },
    onClickDelete(item) {
      this.dialogProp = {
        title: "削除確認",
        msg: "完全に削除しますか？",
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
      this.deleteScoreData(item.id);

      this.refresh();
    }
  }
};
</script>

<style lang='scss'>
@import "../../style/common.scss";
</style>
