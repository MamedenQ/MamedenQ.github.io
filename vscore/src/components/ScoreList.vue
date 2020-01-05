<template>
  <div class="main-area">
    <span id="page-top"></span>
    <div class="view-contents">
      <button
        v-on:click="linkAnalyzeList"
        class="btn btn-primary"
        style="width:100%;margin-bottom:10px"
      >選択した試合を対象に分析する</button>
      <!--
      <table class="analyze">
        <thead class="analyze_head">
          <tr>
            <th>
              <input type="checkbox" v-bind:checked="isCheckAll" v-on:click="onClickCheckAll" /> 選択
            </th>
            <th>タイトル</th>
            <th>日付</th>
            <th>得点</th>
            <th>削除</th>
          </tr>
        </thead>
        <tbody class="analyze_body">
          <tr v-for="(item, idx) of scoreList" :key="idx">
            <td>
              <input
                type="checkbox"
                v-model="modelTarget"
                :value="item.id"
                v-on:change="onCheckChange()"
              />
            </td>
            <td>
              <a href="#" v-on:click="linkScoreInput(item.id)">{{ item.title }}</a>
            </td>
            <td>{{ item.date }}</td>
            <td>{{ item.teamAPoint + " － " + item.teamBPoint }}</td>
            <td style="text-align:center;">
              <button v-on:click="onClickTrash(item)" class="btn btn-warning">削除</button>
            </td>
          </tr>
        </tbody>
      </table>
      -->
      <vue-good-table
        :columns="columns"
        :rows="scoreList"
        :select-options="{ enabled: true }"
        styleClass=" analyze_sort vgt-table"
        @on-selected-rows-change="onChangeChecked"
      >
        <template slot="table-row" slot-scope="props">
          <div v-if="props.column.field == 'delete'" style="text-align:center;">
            <button v-on:click="onClickTrash(props.row)" class="btn btn-warning">削除</button>
          </div>
          <div v-else-if="props.column.field == 'title'">
            <a
              href="#"
              v-on:click="linkScoreInput(props.row.id)"
            >{{ props.formattedRow[props.column.field] }}</a>
          </div>
          <div v-else-if="props.column.field == 'date'">{{ props.row.date }}</div>
          <div
            v-if="props.column.field == 'point'"
            style="text-align:center;"
          >{{ props.row.teamAPoint + " － " + props.row.teamBPoint }}</div>
        </template>
      </vue-good-table>
      <button
        v-on:click="linkAnalyzeList"
        class="btn btn-primary"
        style="width:100%;margin-top:10px;margin-bottom:10px"
      >選択した試合を対象に分析する</button>
      <a
        data-scroll
        href="#page-top"
        style="position:fixed;bottom:10px;right:10px;filter: drop-shadow(3px 3px 3px rgba(0, 0, 0, 0.6));"
        v-smooth-scroll
      >
        <moveTop></moveTop>
      </a>
      <!--
        </div>
        <div class="fixed-header" data-scroll-header>
            <input type="date" v-model="modelDateStart" />〜<input type="date" v-model="modelDateEnd" />
            <button v-on:click="searchScore" class="btn btn-primary">絞り込み</button><br>
            <button v-on:click="linkAnalyzeList" class="btn btn-primary">分析</button>
        </div>
      -->
      <div class="menu" v-bind:style="styleNavi">
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
          <!--
                <br><br><br><br>
                <span>分析へ</span>
                <svg v-on:click="linkAnalyzeList" xmlns="http://www.w3.org/2000/svg" width="70" height="70" viewBox="0 0 24 24" fill="none" stroke="#000000" stroke-width="1" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M20 9v11a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V9"/>
                    <path d="M9 22V12h6v10M2 10.6L12 2l10 8.6"/>
                </svg>
          -->
        </span>
      </div>
    </div>

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
import confirm from "./Material/Confirm";
import moveTop from "./SVG/MoveTopSVG";

import { VueGoodTable } from "vue-good-table";

export default {
  name: "score_list",
  props: {
    score: String
  },
  components: {
    confirm,
    moveTop,
    VueGoodTable
  },
  data() {
    return {
      scoreList: [],
      modelTarget: [],
      showModalConfirm: false,
      callbackConfirm: null,
      deleteItem: {},
      isCheckAll: false,
      modelDateStart: "2000-01-01",
      modelDateEnd: "2030-12-31",
      dStart: null,
      dEnd: null,
      styleNavi: {
        "line-height": "700px"
      },
      columns: [
        {
          label: "タイトル",
          field: "title"
        },
        {
          label: "日付",
          field: "date"
          // type: "date",
          // dateInputFormat: "yyyy-MM-dd",
          // dateOutputFormat: "yy-MM-dd"
        },
        {
          label: "得点",
          field: "point",
          type: "number"
        },
        {
          label: "削除",
          field: "delete"
        }
      ],
      rows: [],
      targetScore: []
    };
  },
  computed: {
    // compMessage() {
    //     return this.modelA + this.modelB;
    // }
  },
  mounted() {
    var gridHeight = window.innerHeight - 10;
    this.styleNavi = {
      "line-height": gridHeight + "px"
    };

    this.refresh();
    this.onClickCheckAll();
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
      // if (this.modelTarget.length == 0) {
      //   return;
      // }
      if (this.targetScore.length == 0) {
        return;
      }

      this.$emit("route-analyze-list-player", this.targetScore);
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
      this.deleteItem = item;
      this.title = "削除確認";
      this.msg = "削除しますか？";
      this.positive = "OK";
      this.negative = "キャンセル";
      this.callbackConfirm = this.callback;

      this.showModalConfirm = true;
    },
    result(flg) {
      this.callbackConfirm(flg);
      this.showModalConfirm = false;
    },
    callback(result) {
      if (!result) {
        return;
      }

      var item = this.deleteItem;
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
    },
    onClickCheckAll() {
      // console.log("onClickCheckAll: " + this.isCheckAll);
      if (this.isCheckAll) {
        this.modelTarget = [];
      } else {
        this.scoreList.forEach(data => {
          this.modelTarget.push(data.id);
        });
      }
      this.isCheckAll = !this.isCheckAll;
      // console.log(this.modelTarget);
    },
    onChangeChecked(params) {
      // console.log("params:" + JSON.stringify(params, null, "    "));
      this.targetScore = params.selectedRows;
    }
  }
};
</script>

<style src="../style/style.css" lang="css">
</style>

