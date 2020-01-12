<template>
  <div class="main-area">
    <span id="page-top"></span>
    <div class="view-contents">
      <!-- <v-btn
        style="width:100%;margin-bottom:10px"
        v-on:click="linkAnalyzeList"
        color="primary"
        dark
      >選択した試合を対象に分析する</v-btn>-->

      <v-card style="width:100%;" class="d-inline-block mx-auto">
        <v-container>
          <v-data-table
            v-model="modelTarget"
            :headers="headers"
            :items="scoreList"
            item-key="id"
            show-select
            hide-default-footer
            :options.sync="options"
            multi-sort
          >
            <!-- <template slot="headers" slot-scope="props">
              <tr>
                <th style="width:5%">
                  <v-checkbox
                    :input-value="props.all"
                    :indeterminate="props.indeterminate"
                    primary
                    hide-details
                    @click="toggleAll"
                  ></v-checkbox>
                </th>
                <th
                  v-for="header in props.headers"
                  :key="header.text"
                  @click="changeSort(header.value)"
                >{{ header.text }}</th>
              </tr>
            </template>-->
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
            <template v-slot:item.title="{ item }">
              <!-- <a href="#" v-on:click="linkScoreInput(item.id)">{{ item.title }}</a> -->
              <div style="text-align:left;">{{ item.title }}</div>
            </template>
            <template v-slot:item.point="{ item }">
              <!-- <v-btn v-on:click="onClickTrash(item)" color="warning" dark>削除</v-btn> -->
              <!-- <v-chip  dark>{{ item.calories }}</v-chip> -->
              {{ item.teamAPoint + " － " + item.teamBPoint }}
            </template>
            <template v-slot:item.edit="{ item }">
              <v-btn
                v-on:click="linkScoreInput(item.id)"
                color="primary"
                style="margin-right:10px;"
                dark
              >編集</v-btn>
              <v-btn v-on:click="onClickTrash(item)" color="warning" dark>削除</v-btn>
            </template>
            <template v-slot:item.delete="{ item }">
              <v-btn v-on:click="onClickTrash(item)" color="warning" dark>削除</v-btn>
              <!-- <v-chip  dark>{{ item.calories }}</v-chip> -->
            </template>
          </v-data-table>
        </v-container>
      </v-card>
      <!-- <v-btn
        style="width:100%;margin-top:10px;margin-bottom:10px"
        v-on:click="linkAnalyzeList"
        color="primary"
        dark
      >選択した試合を対象に分析する</v-btn>-->
      <a
        data-scroll
        href="#page-top"
        style="position:fixed;bottom:10px;right:10px;filter: drop-shadow(3px 3px 3px rgba(0, 0, 0, 0.6));"
        v-smooth-scroll
      >
        <moveTop></moveTop>
      </a>
      <!-- <div class="menu" v-bind:style="styleNavi">
        <span>
          <span>ホーム</span>
          <svg
            v-on:click="onHome"
            xmlns="http://www.w3.org/2000/svg"
            width="70"
            height="70"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#000000"
            stroke-width="1"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path d="M20 9v11a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V9" />
            <path d="M9 22V12h6v10M2 10.6L12 2l10 8.6" />
          </svg>
        </span>
      </div>-->
    </div>

    <!-- <confirm
      v-if="showModalConfirm"
      v-on:dialogResult="result"
      :title="title"
      :msg="msg"
      :positive="positive"
      :negative="negative"
    ></confirm>-->
    <confirm ref="confirm"></confirm>
  </div>
</template>

<script>
import confirm from "./Material/Confirm";
import moveTop from "./SVG/MoveTopSVG";

// import { VueGoodTable } from "vue-good-table";

export default {
  name: "score_list",
  props: {
    score: String,
    scoreListProp: Object
  },
  components: {
    confirm,
    moveTop
    // VueGoodTable
  },
  data() {
    return {
      options: {
        itemsPerPage: -1
      },
      dialogProp: {
        title: "",
        msg: "",
        positive: "",
        negative: "",
        callback: null
      },
      scoreList: [],
      modelTarget: [],
      headers: [
        { text: "タイトル", align: "center", value: "title" },
        { text: "日付", align: "center", value: "date" },
        { text: "得点", align: "center", sortable: false, value: "point" },
        { text: "編集", align: "center", sortable: false, value: "edit" }
      ],
      // showModalConfirm: false,
      // callbackConfirm: null,
      // deleteItem: {},
      isCheckAll: false,
      modelDateStart: "2000-01-01",
      modelDateEnd: "2030-12-31",
      dStart: null,
      dEnd: null,
      styleNavi: {
        "line-height": "700px"
      }
    };
  },
  computed: {
    // compMessage() {
    //     return this.modelA + this.modelB;
    // }
  },
  mounted() {
    this.scoreListProp.linkAnalyzeList = this.linkAnalyzeList;

    var gridHeight = window.innerHeight - 10;
    this.styleNavi = {
      "line-height": gridHeight + "px"
    };

    this.refresh();
    // this.onClickCheckAll();
  },
  methods: {
    // getDateStr(d) {
    //     var twoDigit = function (value) {
    //         return ('0' + value).slice(-2);
    //     };
    //     return [
    //         d.getFullYear(),
    //         twoDigit(d.getMonth() + 1),
    //         twoDigit(d.getDate())
    //     ].join('-');
    // },
    searchScore() {
      // console.log(this.modelDateStart + "〜" + this.modelDateEnd);
      this.refresh();
    },
    refresh() {
      var scoreList = JSON.parse(localStorage.getItem("score"));
      if (scoreList == null) {
        return;
      }

      this.setDateStartEnd();

      var filterData = scoreList.filter(this.filterDispData);

      filterData.sort(this.compare);
      this.scoreList = filterData;
    },
    compare(a, b) {
      var r = 0;

      var da = new Date(a.date);
      var db = new Date(b.date);
      if (da < db) {
        r = -1;
      } else if (da > db) {
        r = 1;
      } else {
        r = this.compareTitle(a, b);
      }

      return r;
    },
    compareTitle(a, b) {
      var r = 0;
      if (a.title.toUpperCase() < b.title.toUpperCase()) {
        r = -1;
      } else if (a.title.toUpperCase() > b.title.toUpperCase()) {
        r = 1;
      }

      return r;
    },
    setDateStartEnd() {
      if (this.modelDateStart != "") {
        this.dStart = new Date(this.modelDateStart);
      } else {
        this.dStart = new Date("1990-01-01");
      }
      if (this.modelDateEnd != "") {
        this.dEnd = new Date(this.modelDateEnd);
      } else {
        this.dEnd = new Date("2030-01-01");
      }
    },
    filterDispData(data, index) {
      if (data.isTrash) {
        // console.log("trash");
        return false;
      }

      var d = new Date(data.date);
      if (d < this.dStart || d > this.dEnd) {
        // console.log("date out");
        return false;
      }

      // console.log("disp data");
      return true;
    },
    // onCheckChange() {
    //   // console.log(this.modelTarget);
    //   if (this.modelTarget.length == this.scoreList.length) {
    //     // console.log("all checked");
    //     this.isCheckAll = true;
    //   } else {
    //     // console.log("piece checked");
    //     this.isCheckAll = false;
    //   }
    // },
    linkAnalyzeList() {
      if (this.modelTarget.length == 0) {
        return;
      }
      console.log(this.modelTarget);
      // if (this.targetScore.length == 0) {
      //   return;
      // }

      this.$emit("route-analyze-list-player", this.modelTarget);
      // this.$emit("route-analyze-list-match", this.modelTarget);
    },
    // extractTarget() {
    //   var target = this.scoreList.filter(this.isTarget);
    //   if (target.length == 0) {
    //     target = [];
    //   }

    //   return target;
    // },
    // isTarget(data, index) {
    //   return this.modelTarget.includes(data.id);
    // },
    linkScoreInput(scoreId) {
      console.log("params:" + JSON.stringify(scoreId, null, "    "));
      this.$emit("route-score-input", scoreId);
    },
    onClickTrash(item) {
      this.dialogProp = {
        title: "削除確認",
        msg: "削除しますか？",
        positive: "OK",
        negative: "キャンセル",
        deleteItem: item,
        callback: this.callback
      };
      this.$refs.confirm.open(this.dialogProp);
    },
    // result(flg) {
    //   this.callbackConfirm(flg);
    //   this.showModalConfirm = false;
    // },
    callback(result) {
      if (!result) {
        return;
      }

      var item = this.dialogProp.deleteItem;
      var scoreList = JSON.parse(localStorage.getItem("score"));
      var filterData = scoreList.filter(function(data, index) {
        if (data.id == item.id) return true;
      });
      filterData[0].isTrash = true;

      localStorage.setItem("score", JSON.stringify(scoreList));

      this.refresh();
    },
    onHome() {
      this.$emit("route-home");
    }
    // onClickCheckAll() {
    //   // console.log("onClickCheckAll: " + this.isCheckAll);
    //   if (this.isCheckAll) {
    //     this.modelTarget = [];
    //   } else {
    //     this.scoreList.forEach(data => {
    //       this.modelTarget.push(data.id);
    //     });
    //   }
    //   this.isCheckAll = !this.isCheckAll;
    //   // console.log(this.modelTarget);
    // },
    // onChangeChecked(params) {
    //   // console.log("params:" + JSON.stringify(params, null, "    "));
    //   this.targetScore = params.selectedRows;
    // }
  }
};
</script>

<style src="../style/style.css" lang="css">
</style>

