<template>
  <div>
    <span>削除済みリスト</span>
    <br />
    <table class="analyze">
      <thead class="analyze_head">
        <tr>
          <th>#</th>
          <th>タイトル</th>
          <th>日付</th>
          <th>得点</th>
          <th>復元</th>
          <th>完全削除</th>
        </tr>
      </thead>
      <tbody class="analyze_body">
        <tr v-for="(item, idx) of trashList" :key="item.id">
          <td>{{ idx + 1 }}</td>
          <td>{{ item.title }}</td>
          <td>{{ item.date }}</td>
          <td>{{ item.teamAPoint + " － " + item.teamBPoint }}</td>
          <td style="text-align:center;">
            <button v-on:click="onClickRestore(item)" class="btn btn-warning">復元</button>
          </td>
          <td style="text-align:center;">
            <button v-on:click="onClickDelete(item)" class="btn btn-warning">完全削除</button>
          </td>
        </tr>
      </tbody>
    </table>
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
  name: "trash_list",
  components: {
    confirm
  },
  data() {
    return {
      trashList: [],
      showModalConfirm: false,
      callbackConfirm: null,
      restoreItem: {},
      deleteItem: {}
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
      var scoreList = JSON.parse(localStorage.getItem("score"));
      if (scoreList == null) {
        return;
      }
      var filterData = scoreList.filter(function(data, index) {
        if (data.isTrash) return true;
      });

      this.trashList = filterData;
    },
    onCheckChange() {
      console.log(this.modelTarget);
    },
    // linkAnalyzeList() {
    //     this.$emit("route-analyze-list", this.modelTarget);
    // },
    // linkScoreInput(scoreId) {
    //     this.$emit("route-score-input", scoreId);
    // },
    onClickRestore(item) {
      this.restoreItem = item;
      this.title = "復元確認";
      this.msg = "復元しますか？";
      this.positive = "OK";
      this.negative = "キャンセル";
      this.callbackConfirm = this.callbackRestore;

      this.showModalConfirm = true;
    },
    result(flg) {
      this.callbackConfirm(flg);
      this.showModalConfirm = false;
    },
    callbackRestore(result) {
      if (!result) {
        return;
      }

      var item = this.restoreItem;
      var scoreData = JSON.parse(localStorage.getItem("score"));
      var filterData = scoreData.filter(function(data, index) {
        if (data.id == item.id) return true;
      });
      filterData[0].isTrash = false;
      localStorage.setItem("score", JSON.stringify(scoreData));

      this.refresh();
    },
    onClickDelete(item) {
      this.deleteItem = item;
      this.title = "削除確認";
      this.msg = "完全に削除しますか？";
      this.positive = "OK";
      this.negative = "キャンセル";
      this.callbackConfirm = this.callbackDelete;

      this.showModalConfirm = true;
    },
    callbackDelete(result) {
      if (!result) {
        return;
      }

      var item = this.deleteItem;
      var scoreData = JSON.parse(localStorage.getItem("score"));
      var filterData = scoreData.filter(function(data, index) {
        if (data.id != item.id) return true;
      });
      localStorage.setItem("score", JSON.stringify(filterData));

      this.refresh();
    }
  }
};
</script>

<style src="../../style/style.css" lang="css">
</style>

