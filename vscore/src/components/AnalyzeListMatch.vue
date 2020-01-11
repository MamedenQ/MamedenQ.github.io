<template>
  <div class="main-area">
    <span id="page-top"></span>
    <div class="view-contents">
      <v-card>
        <v-tabs v-model="tab" background-color="primary accent-4" centered dark>
          <v-tabs-slider></v-tabs-slider>

          <v-tab href="#tab-serve">
            サーブ
            <!-- <serveSvg></serveSvg> -->
            <!-- <v-icon>mdi-phone</v-icon> -->
          </v-tab>

          <v-tab href="#tab-spike">
            スパイク
            <!-- <v-icon>mdi-heart</v-icon> -->
          </v-tab>

          <v-tab href="#tab-block">
            ブロック
            <!-- <v-icon>mdi-account-box</v-icon> -->
          </v-tab>

          <v-tab href="#tab-receive-etc">
            レシーブ他
            <!-- <v-icon>mdi-account-box</v-icon> -->
          </v-tab>
        </v-tabs>

        <v-tabs-items v-model="tab">
          <v-tab-item value="tab-serve">
            <!-- <v-card flat>
              <v-card-text>{{ text }}</v-card-text>
            </v-card>-->

            <v-data-table
              :headers="headersServe"
              :items="scoreAnalyze"
              item-key="id"
              hide-default-footer
              multi-sort
            >
              <template v-slot:header="{ props }">
                <thead>
                  <tr>
                    <th style="border-bottom:none;text-align:left;">基本情報</th>
                    <th style="border-bottom:none;"></th>
                    <th style="border-bottom:none;text-align:left;">総合</th>
                    <th style="border-bottom:none;"></th>
                    <th style="border-bottom:none;text-align:left;">サーブ</th>
                    <th style="border-bottom:none;"></th>
                    <!-- <th colspan="5">スパイク</th>
                  <th colspan="2">ブロック</th>
                  <th>レシーブ</th>
                  <th></th>
                    <th></th>-->
                  </tr>
                </thead>
              </template>

              <!-- <template v-slot:headerCell="{ props }">{{ props.header.text + "aa" }}</template> -->
              <template v-slot:items="{ props }">
                <tbody style="text-align:right;">
                  <tr v-for="(item, idx) in props" :key="idx">
                    <td style="text-align:center;">{{idx}}</td>
                    <td style="text-align:left;">
                      <a href="#" v-on:click="onPlayerDetail(item)">{{item.name}}</a>
                    </td>
                    <td style="background:#e6f2ff;">{{item.total.point}}</td>
                    <td class="analyze-table-background">{{item.total.miss}}</td>

                    <td>{{item.serve.point}}</td>
                    <td>{{item.serve.miss}}</td>

                    <!-- <td class="analyze-table-background">{{item.spike.total}}</td>
                  <td class="analyze-table-background">{{item.spike.point}}</td>
                  <td class="analyze-table-background">{{item.spike.miss}}</td>
                  <td class="analyze-table-background">{{item.spike.effect | filterPercent}}</td>
                  <td class="analyze-table-background">{{item.spike.determined | filterPercent}}</td>

                  <td>{{item.block.point}}</td>
                  <td>{{item.block.miss}}</td>

                  <td class="analyze-table-background">{{item.receive.miss}}</td>

                  <td>{{item.other_miss}}</td>
                    <td>{{item.faul}}</td>-->
                  </tr>
                </tbody>
              </template>
            </v-data-table>
          </v-tab-item>
          <v-tab-item value="tab-spike">
            <v-data-table
              :headers="headersSpike"
              :items="scoreAnalyze"
              item-key="id"
              hide-default-footer
              multi-sort
            >
              <template v-slot:header="{ props }">
                <thead>
                  <tr>
                    <th style="border-bottom:none;text-align:left;">基本情報</th>
                    <th style="border-bottom:none;"></th>
                    <th style="border-bottom:none;text-align:left;">総合</th>
                    <th style="border-bottom:none;"></th>
                    <th style="border-bottom:none;text-align:left;">スパイク</th>
                    <th style="border-bottom:none;"></th>
                    <th style="border-bottom:none;"></th>
                    <th style="border-bottom:none;"></th>
                    <th style="border-bottom:none;"></th>
                    <!-- <th colspan="2">ブロック</th>
                  <th>レシーブ</th>
                  <th></th>
                    <th></th>-->
                  </tr>
                </thead>
              </template>

              <!-- <template v-slot:headerCell="{ props }">{{ props.header.text + "aa" }}</template> -->
              <template v-slot:items="{ props }">
                <tbody style="text-align:right;">
                  <tr v-for="(item, idx) in props" :key="idx">
                    <td style="text-align:center;">{{idx}}</td>
                    <td style="text-align:left;">
                      <a href="#" v-on:click="onPlayerDetail(item)">{{item.name}}</a>
                    </td>
                    <td style="background:#e6f2ff;">{{item.total.point}}</td>
                    <td class="analyze-table-background">{{item.total.miss}}</td>

                    <td class="analyze-table-background">{{item.spike.total}}</td>
                    <td class="analyze-table-background">{{item.spike.point}}</td>
                    <td class="analyze-table-background">{{item.spike.miss}}</td>
                    <td class="analyze-table-background">{{Number(item.spike.determined * 100)}}</td>
                    <td class="analyze-table-background">{{(item.spike.effect * 100).toFixed(1)}}</td>
                    <!-- <td>{{(item.spike.effect * 100).toFixed(1)}}%</td>
                    <td>{{(item.spike.determined * 100).toFixed(1) + "%"}}</td>-->

                    <!-- <td>{{item.block.point}}</td>
                  <td>{{item.block.miss}}</td>

                  <td class="analyze-table-background">{{item.receive.miss}}</td>

                  <td>{{item.other_miss}}</td>
                    <td>{{item.faul}}</td>-->
                  </tr>
                </tbody>
              </template>
            </v-data-table>
          </v-tab-item>
          <v-tab-item value="tab-block">
            <v-data-table
              :headers="headersBlock"
              :items="scoreAnalyze"
              item-key="id"
              hide-default-footer
              multi-sort
            >
              <template v-slot:header="{ props }">
                <thead>
                  <tr>
                    <th style="border-bottom:none;text-align:left;">基本情報</th>
                    <th style="border-bottom:none;"></th>
                    <th style="border-bottom:none;text-align:left;">総合</th>
                    <th style="border-bottom:none;"></th>
                    <th style="border-bottom:none;text-align:left;">ブロック</th>
                    <th style="border-bottom:none;"></th>
                    <!-- <th colspan="2">ブロック</th>
                  <th>レシーブ</th>
                  <th></th>
                    <th></th>-->
                  </tr>
                </thead>
              </template>

              <!-- <template v-slot:headerCell="{ props }">{{ props.header.text + "aa" }}</template> -->
              <template v-slot:items="{ props }">
                <tbody style="text-align:right;">
                  <tr v-for="(item, idx) in props" :key="idx">
                    <td style="text-align:center;">{{idx}}</td>
                    <td style="text-align:left;">
                      <a href="#" v-on:click="onPlayerDetail(item)">{{item.name}}</a>
                    </td>
                    <td style="background:#e6f2ff;">{{item.total.point}}</td>
                    <td class="analyze-table-background">{{item.total.miss}}</td>

                    <td>{{item.block.point}}</td>
                    <td>{{item.block.miss}}</td>

                    <!-- <td class="analyze-table-background">{{item.receive.miss}}</td>

                  <td>{{item.other_miss}}</td>
                    <td>{{item.faul}}</td>-->
                  </tr>
                </tbody>
              </template>
            </v-data-table>
          </v-tab-item>
          <v-tab-item value="tab-receive-etc">
            <v-data-table
              :headers="headersReceiveEtc"
              :items="scoreAnalyze"
              item-key="id"
              hide-default-footer
              multi-sort
            >
              <template v-slot:header="{ props }">
                <thead>
                  <tr>
                    <th style="border-bottom:none;text-align:left;">基本情報</th>
                    <th style="border-bottom:none;"></th>
                    <th style="border-bottom:none;text-align:left;">総合</th>
                    <th style="border-bottom:none;"></th>
                    <th style="border-bottom:none;text-align:left;">レシーブ</th>
                    <th style="border-bottom:none;">その他ミス</th>
                    <th style="border-bottom:none;">ファウル</th>
                  </tr>
                </thead>
              </template>

              <!-- <template v-slot:headerCell="{ props }">{{ props.header.text + "aa" }}</template> -->
              <template v-slot:items="{ props }">
                <tbody style="text-align:right;">
                  <tr v-for="(item, idx) in props" :key="idx">
                    <td style="text-align:center;">{{idx}}</td>
                    <td style="text-align:left;">
                      <a href="#" v-on:click="onPlayerDetail(item)">{{item.name}}</a>
                    </td>
                    <td>{{item.total.point}}</td>
                    <td>{{item.total.miss}}</td>

                    <td>{{item.receive.miss}}</td>

                    <td>{{item.other_miss}}</td>
                    <td>{{item.faul}}</td>
                  </tr>
                </tbody>
              </template>
            </v-data-table>
          </v-tab-item>
        </v-tabs-items>
      </v-card>
      <a
        data-scroll
        href="#page-top"
        style="position:fixed;bottom:10px;right:10px;filter: drop-shadow(3px 3px 3px rgba(0, 0, 0, 0.6));"
        v-smooth-scroll
      >
        <moveTop></moveTop>
      </a>
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
          <div>人別</div>
          <svg
            v-on:click="switchMatchPlayer"
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
  </div>
</template>

<script>
import moveTop from "./SVG/MoveTopSVG";

export default {
  name: "analyze_list_match",
  props: {
    analyzeData: Array
  },
  components: {
    moveTop
  },
  data() {
    return {
      tab: "tab-serve",
      scoreAnalyze: [],
      // modelFilter: "serve",
      // modelDisp: "simple",
      // isSimple: true,
      members: [],
      styleNavi: {
        "line-height": "700px"
      },
      tempScore: {},

      headersServe: [
        {
          text: "#",
          align: "left",
          value: "no",
          sortable: true
        },
        {
          text: "名前",
          align: "left",
          value: "name"
        },
        {
          text: "得点",
          align: "left",
          value: "total.point"
        },
        {
          text: "失点",
          align: "left",
          value: "total.miss"
        },
        {
          text: "得点",
          align: "left",
          value: "serve.point"
        },
        {
          text: "失点",
          align: "left",
          value: "serve.miss"
        }
      ],
      headersSpike: [
        {
          text: "#",
          align: "left",
          value: "no",
          sortable: true
        },
        {
          text: "名前",
          align: "left",
          value: "name"
        },
        {
          text: "得点",
          align: "left",
          value: "total.point"
        },
        {
          text: "失点",
          align: "left",
          value: "total.miss"
        },
        // {
        //   text: "総数①",
        //   align: "center",
        //   value: "spike.total"
        // },
        // {
        //   text: "得点②",
        //   align: "center",
        //   value: "spike.point"
        // },
        // {
        //   text: "失点③",
        //   align: "center",
        //   value: "spike.miss"
        // },
        // {
        //   text: "決定率②／①",
        //   align: "center",
        //   value: "spike.determined"
        // },
        // {
        //   text: "効果率(②－③)／①",
        //   align: "center",
        //   value: "spike.effect"
        // }

        {
          text: "総数",
          align: "center",
          value: "spike.total"
        },
        {
          text: "得点",
          align: "center",
          value: "spike.point"
        },
        {
          text: "失点",
          align: "center",
          value: "spike.miss"
        },
        {
          text: "決定率",
          align: "center",
          value: "spike.determined"
        },
        {
          text: "効果率",
          align: "center",
          value: "spike.effect"
        }
        // {
        //   text: "得点",
        //   align: "center",
        //   value: "block.point"
        // },
        // {
        //   text: "失点",
        //   align: "center",
        //   value: "block.miss"
        // },
        // {
        //   text: "失点",
        //   align: "center",
        //   value: "receive.miss"
        // },
        // {
        //   text: "その他ミス",
        //   align: "center",
        //   value: "other_miss"
        // },
        // {
        //   text: "ファウル",
        //   align: "center",
        //   value: "faul"
        // }
      ],
      headersBlock: [
        {
          text: "#",
          align: "left",
          value: "no",
          sortable: true
        },
        {
          text: "名前",
          align: "left",
          value: "name"
        },
        {
          text: "得点",
          align: "left",
          value: "total.point"
        },
        {
          text: "失点",
          align: "left",
          value: "total.miss"
        },
        {
          text: "得点",
          align: "left",
          value: "block.point"
        },
        {
          text: "失点",
          align: "left",
          value: "block.miss"
        }
        // {
        //   text: "失点",
        //   align: "left",
        //   value: "receive.miss"
        // },
        // {
        //   text: "その他ミス",
        //   align: "left",
        //   value: "other_miss"
        // },
        // {
        //   text: "ファウル",
        //   align: "left",
        //   value: "faul"
        // }
      ],
      headersReceiveEtc: [
        {
          text: "#",
          align: "left",
          value: "no",
          sortable: true
        },
        {
          text: "名前",
          align: "left",
          value: "name"
        },
        {
          text: "得点",
          align: "left",
          value: "total.point"
        },
        {
          text: "失点",
          align: "left",
          value: "total.miss"
        },
        {
          text: "失点",
          align: "left",
          value: "receive.miss"
        },
        {
          text: "失点",
          align: "left",
          value: "other_miss"
        },
        {
          text: "失点",
          align: "left",
          value: "faul"
        }
      ]
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
    switchMatchPlayer() {
      this.$emit("route-analyze-list-player", this.analyzeData);
    },
    onPlayerDetail(item) {
      this.$emit("route-analyze-detail", item);
    },
    formatScoreData() {
      this.analyzeData.forEach(this.totalScore);
      this.scoreAnalyze.forEach(this.calcScore);
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
      var matchScore = this.getPlayerTemplate();
      matchScore.name = score.title;
      matchScore.date = score.date;
      matchScore.point = score.teamAPoint + "-" + score.teamBPoint;
      for (var i = 0; i < score.score.length; i++) {
        this.addScore(matchScore, score.score[i]);
      }
      this.scoreAnalyze.push(matchScore);
    },
    // forEachScore(data) {
    //     var analyzeData = this.scoreAnalyze.filter(function (d, i) {
    //         if (d.no == data.no) return true;
    //     });

    //     if (analyzeData.length == 0) {
    //         analyzeData = this.getPlayerTemplate(data.no);
    //         this.scoreAnalyze.push(analyzeData);
    //     } else {
    //         analyzeData = analyzeData[0];
    //     }

    //     this.addScore(analyzeData, data);
    // },
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
    getPlayerTemplate() {
      // var member = this.members.filter(function (s, index) {
      //     if (s.no == no) return true;
      // });
      // var name;
      // if (member.length == 0) {
      //     name = "（不明なプレーヤ）";
      // } else {
      //     name = member[0].name;
      // }
      return {
        no: "",
        name: "",
        date: "",
        point: "",
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

