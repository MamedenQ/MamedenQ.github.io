<template>
  <div class="main-area">
    <span id="page-top"></span>
    <div class="view-contents">
      <!--
        <div class="fixed-view-contents">
      -->
      <!--
      <vue-good-table
        v-if="listType == 'serve'"
        :columns="columns"
        :rows="scoreAnalyze"
        styleClass=" analyze_sort vgt-table"
      >
        <template slot="table-row" slot-scope="props">
          <div v-if="props.column.field == 'no'">{{ props.row.no }}</div>
          <div v-else-if="props.column.field == 'name'">{{ props.row.name }}</div>
          <div v-else-if="props.column.field == 'total.point'">{{ props.row.total.point }}</div>
          <div v-else-if="props.column.field == 'total.miss'">{{ props.row.total.miss }}</div>
          <div v-else-if="props.column.field == 'serve.point'">{{ props.row.serve.point }}</div>
          <div v-else-if="props.column.field == 'serve.miss'">{{ props.row.serve.miss }}</div>
          <div v-else></div>
        </template>
      </vue-good-table>
      <vue-good-table
        v-else-if="listType == 'spike'"
        :columns="columns"
        :rows="scoreAnalyze"
        styleClass=" analyze_sort vgt-table"
      >
        <template slot="table-row" slot-scope="props">
          <div v-if="props.column.field == 'no'">{{ props.row.no }}</div>
          <div v-if="props.column.field == 'name'">{{ props.row.name }}</div>
          <div v-if="props.column.field == 'total.point'">{{ props.row.total.point }}</div>
          <div v-if="props.column.field == 'total.miss'">{{ props.row.total.miss }}</div>
          <div v-if="props.column.field == 'spike.total'">{{ props.row.spike.total }}</div>
          <div v-if="props.column.field == 'spike.point'">{{ props.row.spike.point }}</div>
          <div v-if="props.column.field == 'spike.miss'">{{ props.row.spike.miss }}</div>
          <div
            v-if="props.column.field == 'spike.effect'"
          >{{ props.row.spike.effect | filterPercent }}</div>
          <div
            v-if="props.column.field == 'spike.determined'"
          >{{ props.row.spike.determined | filterPercent }}</div>
        </template>
      </vue-good-table>
      <vue-good-table
        v-else-if="listType == 'block'"
        :columns="columns"
        :rows="scoreAnalyze"
        styleClass=" analyze_sort vgt-table"
      >
        <template slot="table-row" slot-scope="props">
          <div v-if="props.column.field == 'no'">{{ props.row.no }}</div>
          <div v-if="props.column.field == 'name'">{{ props.row.name }}</div>
          <div v-if="props.column.field == 'total.point'">{{ props.row.total.point }}</div>
          <div v-if="props.column.field == 'total.miss'">{{ props.row.total.miss }}</div>
          <div v-if="props.column.field == 'block.point'">{{ props.row.block.point }}</div>
          <div v-if="props.column.field == 'block.miss'">{{ props.row.block.miss }}</div>
        </template>
      </vue-good-table>
      <vue-good-table
        v-else-if="listType == 'receive'"
        :columns="columns"
        :rows="scoreAnalyze"
        styleClass=" analyze_sort vgt-table"
      >
        <template slot="table-row" slot-scope="props">
          <div v-if="props.column.field == 'no'">{{ props.row.no }}</div>
          <div v-if="props.column.field == 'name'">{{ props.row.name }}</div>
          <div v-if="props.column.field == 'total.point'">{{ props.row.total.point }}</div>
          <div v-if="props.column.field == 'total.miss'">{{ props.row.total.miss }}</div>
          <div v-if="props.column.field == 'receive.miss'">{{ props.row.receive.miss }}</div>
          <div v-if="props.column.field == 'other_miss'">{{ props.row.other_miss }}</div>
          <div v-if="props.column.field == 'faul'">{{ props.row.faul }}</div>
        </template>
      </vue-good-table>
      -->

      <table class="analyze">
        <thead class="analyze_head" style="text-align:center;">
          <tr>
            <th colspan="2">基本情報</th>
            <th colspan="2">総合</th>
            <th colspan="2" class="serve_cell">サーブ</th>
            <th colspan="5" class="spike_cell">スパイク</th>
            <th colspan="2" class="block_cell">ブロック</th>
            <th class="reception_cell">レシーブ</th>
            <th rowspan="2">
              そ
              <br />の
              <br />他
              <br />ミ
              <br />ス
            </th>
            <th rowspan="2">
              フ
              <br />ァ
              <br />ウ
              <br />ル
            </th>
          </tr>
          <tr>
            <th>#</th>
            <th>名前</th>
            <th>
              得
              <br />点
            </th>
            <th>
              失
              <br />点
            </th>

            <th class="serve_cell">
              得
              <br />点
            </th>
            <th class="serve_cell">
              失
              <br />点
            </th>

            <th class="spike_cell">
              総
              <br />数
              <br />①
            </th>
            <th class="spike_cell">
              得
              <br />点
              <br />②
            </th>
            <th class="spike_cell">
              失
              <br />点
              <br />③
            </th>
            <th class="spike_cell sort" data-sort="spike_effect">
              効
              <br />果
              <br />率
              <br />(②－③)／①
            </th>
            <th class="spike_cell sort" data-sort="spike_det">
              決
              <br />定
              <br />率
              <br />②／①
            </th>

            <th class="block_cell">
              得
              <br />点
            </th>
            <th class="block_cell">
              失
              <br />点
            </th>

            <th class="reception_cell">
              失
              <br />点
            </th>
          </tr>
        </thead>
        <tbody class="analyze_body" style="text-align:right;">
          <tr v-for="(item, idx) of scoreAnalyze" :key="idx">
            <td style="text-align:center;">{{item.no}}</td>
            <td style="text-align:left;">
              <a href="#" v-on:click="onPlayerDetail(item)">{{item.name}}</a>
            </td>
            <td>{{item.total.point}}</td>
            <td>{{item.total.miss}}</td>

            <td>{{item.serve.point}}</td>
            <td>{{item.serve.miss}}</td>

            <td>{{item.spike.total}}</td>
            <td>{{item.spike.point}}</td>
            <td>{{item.spike.miss}}</td>
            <td>{{item.spike.effect | filterPercent}}</td>
            <td>{{item.spike.determined | filterPercent}}</td>

            <td>{{item.block.point}}</td>
            <td>{{item.block.miss}}</td>

            <td>{{item.receive.miss}}</td>

            <td>{{item.other_miss}}</td>
            <td>{{item.faul}}</td>
          </tr>
        </tbody>
      </table>
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
        </div>
      -->
      <div class="menu" v-bind:style="styleNavi">
        <span>
          <div>戻る</div>
          <svg
            v-on:click="backScoreList"
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
            <path d="M19 12H6M12 5l-7 7 7 7" />
          </svg>
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
          <br />
          <br />
          <br />
          <br />
          <div>試合別</div>
          <svg
            v-on:click="switchMatchList"
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
            <path d="M19 12H6M12 5l-7 7 7 7" />
          </svg>
        </span>
      </div>
    </div>

    <span v-if="false">
      <div class="grid-analyzelist">
        <div class="navi_a" v-bind:style="styleNavi" style="position:fixed;top:0;left:5px;">
          <span>
            <div>戻る</div>
            <svg
              v-on:click="backScoreList"
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
              <path d="M19 12H6M12 5l-7 7 7 7" />
            </svg>
            <div>ホーム</div>
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
        </div>

        <div class="analyzelist">
          <span id="page-top"></span>
          <!--
        <input type="checkbox" v-model="isSimple" />
        <span class="filter_action">
            <input type="radio" id="simple" name="disp" value="simple" v-model="modelDisp">
            <label for="simple">simple</label>
        </span>
        <span class="filter_action">
            <input type="radio" id="detail" name="disp" value="detail" v-model="modelDisp">
            <label for="detail">detail</label>
        </span>
          -->
          <!--
        <br>
        <span class="filter_action">
            <input type="radio" id="serve" name="action" value="serve" v-model="modelFilter">
            <label for="serve">serve</label>
        </span>
        <span class="filter_action">
            <input type="radio" id="spike" name="action" value="spike" v-model="modelFilter">
            <label for="spike">spike</label>
        </span>
        <span class="filter_action">
            <input type="radio" id="block" name="action" value="block" v-model="modelFilter">
            <label for="block">block</label>
        </span>
        <span class="filter_action">
            <input type="radio" id="receive" name="action" value="receive" v-model="modelFilter">
            <label for="receive">receive</label>
        </span>
        <span class="filter_action">
            <input type="radio" id="etc" name="action" value="etc" v-model="modelFilter">
            <label for="etc">etc</label>
        </span>
        <br>
          -->
          <table class="analyze">
            <thead class="analyze_head" style="text-align:center;">
              <tr>
                <th colspan="2">基本情報</th>
                <th colspan="2">総合</th>
                <th colspan="2" class="serve_cell">サーブ</th>
                <th colspan="5" class="spike_cell">スパイク</th>
                <th colspan="2" class="block_cell">ブロック</th>
                <th class="reception_cell">レシーブ</th>
                <th rowspan="2">
                  そ
                  <br />の
                  <br />他
                  <br />ミ
                  <br />ス
                </th>
                <th rowspan="2">
                  フ
                  <br />ァ
                  <br />ウ
                  <br />ル
                </th>
              </tr>
              <tr>
                <th>#</th>
                <th>名前</th>
                <th>
                  得
                  <br />点
                </th>
                <th>
                  失
                  <br />点
                </th>

                <th class="serve_cell">
                  得
                  <br />点
                </th>
                <th class="serve_cell">
                  失
                  <br />点
                </th>

                <th class="spike_cell">
                  総
                  <br />数
                  <br />①
                </th>
                <th class="spike_cell">
                  得
                  <br />点
                  <br />②
                </th>
                <th class="spike_cell">
                  失
                  <br />点
                  <br />③
                </th>
                <th class="spike_cell sort" data-sort="spike_effect">
                  効
                  <br />果
                  <br />率
                  <br />(②－③)／①
                </th>
                <th class="spike_cell sort" data-sort="spike_det">
                  決
                  <br />定
                  <br />率
                  <br />②／①
                </th>

                <th class="block_cell">
                  得
                  <br />点
                </th>
                <th class="block_cell">
                  失
                  <br />点
                </th>

                <th class="reception_cell">
                  失
                  <br />点
                </th>
              </tr>
            </thead>
            <tbody class="analyze_body" style="text-align:right;">
              <tr v-for="(item, idx) of scoreAnalyze" :key="idx">
                <td style="text-align:center;">{{item.no}}</td>
                <td style="text-align:left;">
                  <a href="#" v-on:click="onPlayerDetail(item)">{{item.name}}</a>
                </td>
                <td>{{item.total.point}}</td>
                <td>{{item.total.miss}}</td>

                <td>{{item.serve.point}}</td>
                <td>{{item.serve.miss}}</td>

                <td>{{item.spike.total}}</td>
                <td>{{item.spike.point}}</td>
                <td>{{item.spike.miss}}</td>
                <td>{{item.spike.effect | filterPercent}}</td>
                <td>{{item.spike.determined | filterPercent}}</td>

                <td>{{item.block.point}}</td>
                <td>{{item.block.miss}}</td>

                <td>{{item.receive.miss}}</td>

                <td>{{item.other_miss}}</td>
                <td>{{item.faul}}</td>
              </tr>
            </tbody>
          </table>
          <!--
        <table class="analyze" v-else>
            <thead class="analyze_head">
                <tr>
                    <th colspan="2">基本情報</th>
                    <th colspan="6">総合</th>
                    <th colspan="5" class='serve_cell' v-show="showServe">サーブ</th>
                    <th colspan="5" class='spike_cell' v-show="showSpike">スパイク</th>
                    <th colspan="5" class='block_cell' v-show="showBlock">ブロック</th>
                    <th colspan="9" class='reception_cell' v-show="showReceive">レセプション</th>
                    <th rowspan="2" v-show="showEtc">そ<br>の<br>他<br>ミ<br>ス</th>
                    <th rowspan="2" v-show="showEtc">フ<br>ァ<br>ウ<br>ル</th>
                </tr>
                <tr>
                    <th>#</th>
                    <th>名前</th>
                    <th>総<br>数<br>①</th>
                    <th>得<br>点<br>②</th>
                    <th>失<br>点<br>③</th>
                    <th>効<br>果<br>率<br>(②－③)／①</th>
                    <th>決<br>定<br>率<br>②／①</th>
                    <th>開<br>き</th>

                    <th v-show="showServe" class='serve_cell'>総<br>数<br>①</th>
                    <th v-show="showServe" class='serve_cell'>得<br>点<br>②</th>
                    <th v-show="showServe" class='serve_cell'>失<br>点<br>③</th>
                    <th v-show="showServe" class='serve_cell sort' data-sort="serve_effect">効<br>果<br>率<br>(②－③)／①</th>
                    <th v-show="showServe" class='serve_cell sort' data-sort="serve_det">決<br>定<br>率<br>②／①</th>

                    <th v-show="showSpike" class='spike_cell'>総<br>数<br>①</th>
                    <th v-show="showSpike" class='spike_cell'>得<br>点<br>②</th>
                    <th v-show="showSpike" class='spike_cell'>失<br>点<br>③</th>
                    <th v-show="showSpike" class='spike_cell sort' data-sort="spike_effect">効<br>果<br>率<br>(②－③)／①</th>
                    <th v-show="showSpike" class='spike_cell sort' data-sort="spike_det">決<br>定<br>率<br>②／①</th>

                    <th v-show="showBlock" class='block_cell'>総<br>数<br>①</th>
                    <th v-show="showBlock" class='block_cell'>得<br>点<br>②</th>
                    <th v-show="showBlock" class='block_cell'>失<br>点<br>③</th>
                    <th v-show="showBlock" class='block_cell sort' data-sort="block_effect">効<br>果<br>率<br>(②－③)／①</th>
                    <th v-show="showBlock" class='block_cell sort' data-sort="block_det">決<br>定<br>率<br>②／①</th>

                    <th v-show="showReceive" class='reception_cell'>総<br>数</th>
                    <th v-show="showReceive" class='reception_cell'>A</th>
                    <th v-show="showReceive" class='reception_cell'>B</th>
                    <th v-show="showReceive" class='reception_cell'>C</th>
                    <th v-show="showReceive" class='reception_cell'>失<br>点</th>
                    <th v-show="showReceive" class='reception_cell'>A<br>率</th>
                    <th v-show="showReceive" class='reception_cell'>B<br>率</th>
                    <th v-show="showReceive" class='reception_cell'>C<br>率</th>
                    <th v-show="showReceive" class='reception_cell'>失<br>点<br>率</th>
                </tr>
            </thead>
            <tbody class="analyze_body">
                <tr v-for="item, idx of scoreAnalyze">
                    <td>{{item.no}}</td>
                    <td><a href='#' v-on:click="onPlayerDetail(item)">{{item.name}}</a></td>
                    <td>{{item.total.total}}</td>
                    <td>{{item.total.point}}</td>
                    <td>{{item.total.miss}}</td>
                    <td>{{item.total.effect | filterPercent}}</td>
                    <td>{{item.total.determined | filterPercent}}</td>
                    <td>{{(-1 * (item.total.effect - item.total.determined)) | filterPercent}}</td>
                    <td v-show="showServe">{{item.serve.total}}</td>
                    <td v-show="showServe">{{item.serve.point}}</td>
                    <td v-show="showServe">{{item.serve.miss}}</td>
                    <td v-show="showServe">{{item.serve.effect | filterPercent}}</td>
                    <td v-show="showServe">{{item.serve.determined | filterPercent}}</td>
                    <td v-show="showSpike">{{item.spike.total}}</td>
                    <td v-show="showSpike">{{item.spike.point}}</td>
                    <td v-show="showSpike">{{item.spike.miss}}</td>
                    <td v-show="showSpike">{{item.spike.effect | filterPercent}}</td>
                    <td v-show="showSpike">{{item.spike.determined | filterPercent}}</td>
                    <td v-show="showBlock">{{item.block.total}}</td>
                    <td v-show="showBlock">{{item.block.point}}</td>
                    <td v-show="showBlock">{{item.block.miss}}</td>
                    <td v-show="showBlock">{{item.block.effect | filterPercent}}</td>
                    <td v-show="showBlock">{{item.block.determined | filterPercent}}</td>
                    <td v-show="showReceive">{{item.receive.total}}</td>
                    <td v-show="showReceive">{{item.receive.a}}</td>
                    <td v-show="showReceive">{{item.receive.b}}</td>
                    <td v-show="showReceive">{{item.receive.c}}</td>
                    <td v-show="showReceive">{{item.receive.miss}}</td>
                    <td v-show="showReceive">{{item.receive.a_rate | filterPercent}}</td>
                    <td v-show="showReceive">{{item.receive.b_rate | filterPercent}}</td>
                    <td v-show="showReceive">{{item.receive.c_rate | filterPercent}}</td>
                    <td v-show="showReceive">{{item.receive.miss_rate | filterPercent}}</td>
                    <td v-show="showEtc">{{item.other_miss}}</td>
                    <td v-show="showEtc">{{item.faul}}</td>
                </tr>
            </tbody>
        </table>
          -->
          <a
            data-scroll
            href="#page-top"
            style="position:fixed;bottom:10px;right:10px;filter: drop-shadow(3px 3px 3px rgba(0, 0, 0, 0.6));"
          >
            <movetop></movetop>
          </a>
        </div>
      </div>
    </span>
  </div>
</template>

<script>
import moveTop from "./SVG/MoveTopSVG";

export default {
  name: "analyze_list_player",
  props: {
    analyzeData: Array
  },
  components: {
    moveTop
  },
  data() {
    return {
      scoreAnalyze: [],
      // modelFilter: "serve",
      // modelDisp: "simple",
      // isSimple: true,
      members: [],
      styleNavi: {
        "line-height": "700px"
      }
      // columns: [
      //   {
      //     label: "#",
      //     field: "no"
      //   },
      //   {
      //     label: "名前",
      //     field: "name"
      //   },
      //   {
      //     label: "総合得点",
      //     field: "total.point",
      //     type: "number"
      //   },
      //   {
      //     label: "総合失点",
      //     field: "total.miss",
      //     type: "number"
      //   },
      //   {
      //     label: "サーブ得点",
      //     field: "serve.point",
      //     type: "number"
      //   },
      //   {
      //     label: "サーブ失点",
      //     field: "serve.miss",
      //     type: "number"
      //   },
      //   {
      //     label: "スパイク総数①",
      //     field: "spike.total",
      //     type: "number"
      //   },
      //   {
      //     label: "スパイク得点②",
      //     field: "spike.point",
      //     type: "number"
      //   },
      //   {
      //     label: "スパイク失点③",
      //     field: "spike.miss",
      //     type: "number"
      //   },
      //   {
      //     label: "スパイク効果率(②－③)／①",
      //     field: "spike.effect",
      //     type: "number"
      //   },
      //   {
      //     label: "スパイク決定率②／①",
      //     field: "spike.determined",
      //     type: "number"
      //   },
      //   {
      //     label: "ブロック得点",
      //     field: "block.point",
      //     type: "number"
      //   },
      //   {
      //     label: "ブロック失点",
      //     field: "block.miss",
      //     type: "number"
      //   },
      //   {
      //     label: "レシーブ失点",
      //     field: "receive.miss",
      //     type: "number"
      //   }
      //   {
      //     label: "その他ミス",
      //     field: "other_miss",
      //     type: "number"
      //   },
      //   {
      //     label: "ファウル",
      //     field: "faul",
      //     type: "number"
      //   }
      // ],
      // listType: "serve",
    };
  },
  filters: {
    filterPercent(n) {
      return (n * 100).toFixed(1) + "%";
    }
  },
  mounted() {
    var gridHeight = window.innerHeight - 10;
    this.styleNavi = {
      "line-height": gridHeight + "px"
    };

    this.members = JSON.parse(localStorage.getItem("members"));
    if (this.members == null) {
      this.members = [];
    }

    this.formatScoreData();
  },
  computed: {
    showServe() {
      return "serve" == this.modelFilter;
    },
    showSpike() {
      return "spike" == this.modelFilter;
    },
    showBlock() {
      return "block" == this.modelFilter;
    },
    showReceive() {
      return "receive" == this.modelFilter;
    },
    showEtc() {
      return "etc" == this.modelFilter;
    }
  },
  methods: {
    backScoreList() {
      this.$emit("route-score-list");
    },
    onHome() {
      this.$emit("route-home");
    },
    switchMatchList() {
      this.$emit("route-analyze-list-match", this.analyzeData);
    },
    onPlayerDetail(item) {
      this.$emit("route-analyze-detail", item);
    },
    formatScoreData() {
      this.analyzeData.forEach(this.totalScore);
      this.scoreAnalyze.forEach(this.calcScore);
      this.scoreAnalyze.sort(this.compare);
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
    calcScore(score) {
      this.calcEffectAndDetermined(score.total);
      this.calcEffectAndDetermined(score.serve);
      this.calcEffectAndDetermined(score.spike);
      this.calcEffectAndDetermined(score.block);
      this.calcReceive(score.receive);
    },
    calcEffectAndDetermined(action) {
      if (action.total == 0) {
        return;
      }
      action.effect = (action.point - action.miss) / action.total;
      action.determined = action.point / action.total;
    },
    calcReceive(receive) {
      if (receive.total == 0) {
        return;
      }
      receive.a_rate = receive.a / receive.total;
      receive.b_rate = receive.b / receive.total;
      receive.c_rate = receive.c / receive.total;
      receive.miss_rate = receive.miss / receive.total;
    },
    totalScore(score) {
      score.score.forEach(this.forEachScore);
    },
    forEachScore(data) {
      var analyzeData = this.scoreAnalyze.filter(function(d) {
        if (d.no == data.no) return true;
      });

      if (analyzeData.length == 0) {
        analyzeData = this.getPlayerTemplate(data.no);
        this.scoreAnalyze.push(analyzeData);
      } else {
        analyzeData = analyzeData[0];
      }

      this.addScore(analyzeData, data);
    },
    addScore(analyzeData, data) {
      if (data.action == "serve") {
        if (data.kind == "point") {
          analyzeData.serve.point_detail[data.detail]++;
          analyzeData.total.point++;
        } else if (data.kind == "miss") {
          analyzeData.serve.miss_detail[data.detail]++;
          analyzeData.total.miss++;
        } else {
          analyzeData.total.rally++;
        }
        analyzeData.total.total++;
        analyzeData.serve[data.kind]++;
        analyzeData.serve.total++;
      } else if (data.action == "spike") {
        if (data.kind == "point") {
          analyzeData.spike.point_detail[data.detail]++;
          analyzeData.total.point++;
        } else if (data.kind == "miss") {
          analyzeData.spike.miss_detail[data.detail]++;
          analyzeData.total.miss++;
        } else {
          analyzeData.total.rally++;
        }
        analyzeData.total.total++;
        analyzeData.spike[data.kind]++;
        analyzeData.spike.total++;
      } else if (data.action == "block") {
        if (data.kind == "point") {
          analyzeData.total.point++;
        } else if (data.kind == "miss") {
          analyzeData.block.miss_detail[data.detail]++;
          analyzeData.total.miss++;
        } else {
          analyzeData.total.rally++;
        }
        analyzeData.total.total++;
        analyzeData.block[data.kind]++;
        analyzeData.block.total++;
      } else if (data.action == "receive") {
        if (data.kind == "miss") {
          // analyzeData.receive.miss_detail[data.detail]++;
          analyzeData.total.miss++;
        } else {
          analyzeData.total.rally++;
        }
        analyzeData.total.total++;
        analyzeData.receive[data.kind]++;
        analyzeData.receive.total++;
      } else if (data.action == "other_miss") {
        analyzeData.other_miss_detail[data.detail]++;
        analyzeData.other_miss++;
        analyzeData.total.miss++;
        analyzeData.total.total++;
      } else if (data.action == "faul") {
        analyzeData.faul++;
        analyzeData.total.miss++;
        analyzeData.total.total++;
      }
    },
    getPlayerTemplate(no) {
      var member = this.members.filter(function(s) {
        if (s.no == no) return true;
      });
      var name;
      if (member.length == 0) {
        name = "（不明なプレーヤ）";
      } else {
        name = member[0].name;
      }
      return {
        no: no,
        name: name,
        total: {
          point: 0,
          miss: 0,
          rally: 0,
          effect: 0,
          determined: 0,
          total: 0
        },
        serve: {
          point: 0,
          point_detail: {
            ace: 0
          },
          miss: 0,
          miss_detail: {
            net: 0,
            out: 0
          },
          rally: 0,
          total: 0,
          effect: 0,
          determined: 0
        },
        spike: {
          point: 0,
          point_detail: {
            in: 0,
            block_out: 0,
            fake: 0
          },
          miss: 0,
          miss_detail: {
            net: 0,
            out: 0,
            block: 0
          },
          rally: 0,
          total: 0,
          effect: 0,
          determined: 0
        },
        block: {
          point: 0,
          miss: 0,
          miss_detail: {
            out: 0,
            suikomi: 0
          },
          rally: 0,
          total: 0,
          effect: 0,
          determined: 0
        },
        receive: {
          // a: 0,
          // b: 0,
          // c: 0,
          miss: 0,
          // miss_detail: {
          //     out: 0,
          //     judge: 0,
          //     omiai: 0,
          //     tsunagi: 0,
          // },
          total: 0,
          // a_rate: 0,
          // b_rate: 0,
          // c_rate: 0,
          miss_rate: 0
        },
        other_miss: 0,
        other_miss_detail: {
          judge: 0,
          omiai: 0
        },
        faul: 0
      };
    }
  }
};
</script>

<style src="../style/style.css" lang="css">
</style>

