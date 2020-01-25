<template>
  <div class="main-area">
    <div class="view-contents">
      <v-tabs v-model="tab" background-color="primary accent-4" centered dark>
        <v-tabs-slider></v-tabs-slider>
        <v-tab href="#tab-total">トータル</v-tab>
        <v-tab href="#tab-serve">サーブ</v-tab>
        <v-tab href="#tab-spike">スパイク</v-tab>
        <v-tab href="#tab-block">ブロック</v-tab>
        <v-tab href="#tab-receive-etc">レシーブ他</v-tab>
      </v-tabs>

      <v-tabs-items v-model="tab">
        <v-tab-item value="tab-total">
          <v-data-table
            :headers="headersTotal"
            :items="scoreAnalyze"
            item-key="id"
            hide-default-footer
            :options.sync="options"
            multi-sort
          >
            <template v-slot:item.name="{ item }">
              <a v-on:click="onPlayerDetail(item)"><u>{{item.name}}</u></a>
            </template>
            <template v-slot:item.sex="{ item }">
              <span v-if="item.sex == 0">男</span>
              <span v-else>女</span>
            </template>
          </v-data-table>
        </v-tab-item>
        <v-tab-item value="tab-serve">
          <v-data-table
            :headers="headersServe"
            :items="scoreAnalyze"
            item-key="id"
            hide-default-footer
            :options.sync="options"
            multi-sort
          >
            <template v-slot:item.name="{ item }">
              <a v-on:click="onPlayerDetail(item)"><u>{{item.name}}</u></a>
            </template>
            <template v-slot:item.sex="{ item }">
              <span v-if="item.sex == 0">男</span>
              <span v-else>女</span>
            </template>
          </v-data-table>
        </v-tab-item>
        <v-tab-item value="tab-spike">
          <v-data-table
            :headers="headersSpike"
            :items="scoreAnalyze"
            item-key="id"
            hide-default-footer
            :options.sync="options"
            multi-sort
          >
            <template v-slot:header.name="{ header }">
              名
              <br />前
              <br />
            </template>
            <template v-slot:header.sex="{ header }">
              性
              <br />別
              <br />
            </template>
            <template v-slot:header.date="{ header }">
              日
              <br />付
              <br />
            </template>
            <template v-slot:header.spike.total="{ header }">
              総
              <br />数
              <br />
            </template>
            <template v-slot:header.spike.point="{ header }">
              総
              <br />得
              <br />点
              <br />
            </template>
            <template v-slot:header.spike.point_detail.in="{ header }">
              イ
              <br />ン
              <br />
            </template>
            <template v-slot:header.spike.point_detail.fake="{ header }">
              フ
              <br />ェ
              <br />イ
              <br />ン
              <br />ト
              <br />
            </template>
            <template v-slot:header.spike.point_detail.blockout="{ header }">
              ブ
              <br />ロ
              <br />ッ
              <br />ク
              <br />ア
              <br />ウ
              <br />ト
              <br />
            </template>
            <template v-slot:header.spike.miss="{ header }">
              総
              <br />失
              <br />点
              <br />
            </template>
            <template v-slot:header.spike.miss_detail.out="{ header }">
              ア
              <br />ウ
              <br />ト
              <br />
            </template>
            <template v-slot:header.spike.miss_detail.net="{ header }">
              ネ
              <br />ッ
              <br />ト
              <br />
            </template>
            <template v-slot:header.spike.miss_detail.block="{ header }">
              ブ
              <br />ロ
              <br />ッ
              <br />ク
              <br />
            </template>
            <template v-slot:header.spike.determined="{ header }">
              決
              <br />定
              <br />率
              <br />
            </template>
            <template v-slot:header.spike.effect="{ header }">
              効
              <br />果
              <br />率
              <br />
            </template>
            <template v-slot:item.name="{ item }">
              <a v-on:click="onPlayerDetail(item)"><u>{{item.name}}</u></a>
            </template>
            <template v-slot:item.sex="{ item }">
              <span v-if="item.sex == 0">男</span>
              <span v-else>女</span>
            </template>
            <template
              v-slot:item.spike.determined="{ item }"
            >{{item.spike.determined | filterPercent}}</template>
            <template v-slot:item.spike.effect="{ item }">{{item.spike.effect | filterPercent}}</template>
          </v-data-table>
        </v-tab-item>
        <v-tab-item value="tab-block">
          <v-data-table
            :headers="headersBlock"
            :items="scoreAnalyze"
            item-key="id"
            hide-default-footer
            :options.sync="options"
            multi-sort
          >
            <template v-slot:item.name="{ item }">
              <a v-on:click="onPlayerDetail(item)"><u>{{item.name}}</u></a>
            </template>
            <template v-slot:item.sex="{ item }">
              <span v-if="item.sex == 0">男</span>
              <span v-else>女</span>
            </template>
          </v-data-table>
        </v-tab-item>
        <v-tab-item value="tab-receive-etc">
          <v-data-table
            :headers="headersReceiveEtc"
            :items="scoreAnalyze"
            item-key="id"
            hide-default-footer
            :options.sync="options"
            multi-sort
          >
            <template v-slot:item.name="{ item }">
              <a v-on:click="onPlayerDetail(item)"><u>{{item.name}}</u></a>
            </template>
            <template v-slot:item.sex="{ item }">
              <span v-if="item.sex == 0">男</span>
              <span v-else>女</span>
            </template>
          </v-data-table>
        </v-tab-item>
      </v-tabs-items>
    </div>
  </div>
</template>

<script>
export default {
  name: "analyze_list_player",
  props: {
    isMatchProp: Boolean,
    analyzeData: Array,
    commonProp: Object,
    analyzeListProp: Object
  },
  data() {
    return {
      options: {
        itemsPerPage: -1
      },
      isMatch: false,
      tab: "tab-total",
      scoreAnalyze: [],
      matchTotalScore: {},
      members: [],
      styleNavi: {
        "line-height": "700px"
      },
      headersTotal: [],
      headersTotalPlayer: [
        { text: "名前", align: "left", value: "name" },
        { text: "性別", align: "left", value: "sex" },
        { text: "得点", align: "right", value: "total.point" },
        { text: "失点", align: "right", value: "total.miss" }
      ],
      headersTotalMatch: [
        { text: "試合", align: "left", value: "name" },
        { text: "日付", align: "left", value: "date" },
        { text: "得点", align: "right", value: "total.point" },
        { text: "失点", align: "right", value: "total.miss" }
      ],
      headersServe: [],
      headersServePlayer: [
        { text: "名前", align: "left", value: "name" },
        { text: "性別", align: "left", value: "sex" },
        { text: "得点", align: "right", value: "serve.point" },
        { text: "総失点", align: "right", value: "serve.miss" },
        { text: "アウト", align: "right", value: "serve.miss_detail.out" },
        { text: "ネット", align: "right", value: "serve.miss_detail.net" }
      ],
      headersServeMatch: [
        { text: "試合", align: "left", value: "name" },
        { text: "日付", align: "left", value: "date" },
        { text: "得点", align: "right", value: "serve.point" },
        { text: "総失点", align: "right", value: "serve.miss" },
        { text: "アウト", align: "right", value: "serve.miss_detail.out" },
        { text: "ネット", align: "right", value: "serve.miss_detail.net" }
      ],
      headersSpike: [],
      headersSpikePlayer: [
        // { text: "名前", align: "left", value: "name" },
        // { text: "性別", align: "left", value: "sex" },
        // { text: "総数", align: "right", value: "spike.total" },
        // { text: "得点", align: "right", value: "spike.point" },
        // { text: "失点", align: "right", value: "spike.miss" },
        // { text: "決定率", align: "right", value: "spike.determined" },
        // { text: "効果率", align: "right", value: "spike.effect" }
        { text: "名前", align: "left", value: "name" },
        { text: "性別", align: "left", value: "sex" },
        { text: "総数", align: "right", value: "spike.total" },
        { text: "総得点", align: "right", value: "spike.point" },
        { text: "in", align: "right", value: "spike.point_detail.in" },
        { text: "fake", align: "right", value: "spike.point_detail.fake" },
        { text: "bout", align: "right", value: "spike.point_detail.blockout" },
        { text: "総失点", align: "right", value: "spike.miss" },
        { text: "out", align: "right", value: "spike.miss_detail.out" },
        { text: "net", align: "right", value: "spike.miss_detail.net" },
        { text: "blo", align: "right", value: "spike.miss_detail.block" },
        { text: "決定率", align: "right", value: "spike.determined" },
        { text: "効果率", align: "right", value: "spike.effect" }
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
      ],
      headersSpikeMatch: [
        { text: "試合", align: "left", value: "name" },
        { text: "日付", align: "left", value: "date" },
        // { text: "総数", align: "right", value: "spike.total" },
        // { text: "得点", align: "right", value: "spike.point" },
        // { text: "失点", align: "right", value: "spike.miss" },
        // { text: "決定率", align: "right", value: "spike.determined" },
        // { text: "効果率", align: "right", value: "spike.effect" }
        { text: "総数", align: "right", value: "spike.total" },
        { text: "総得", align: "right", value: "spike.point" },
        { text: "イ", align: "right", value: "spike.point_detail.in" },
        { text: "フ", align: "right", value: "spike.point_detail.fake" },
        { text: "ブア", align: "right", value: "spike.point_detail.blockout" },
        { text: "総失", align: "right", value: "spike.miss" },
        { text: "ア", align: "right", value: "spike.miss_detail.out" },
        { text: "ネ", align: "right", value: "spike.miss_detail.net" },
        { text: "ブ", align: "right", value: "spike.miss_detail.block" },
        { text: "決", align: "right", value: "spike.determined" },
        { text: "効", align: "right", value: "spike.effect" }
      ],
      headersBlock: [],
      headersBlockPlayer: [
        { text: "名前", align: "left", value: "name" },
        { text: "性別", align: "left", value: "sex" },
        { text: "得点", align: "right", value: "block.point" },
        { text: "総失点", align: "right", value: "block.miss" },
        { text: "アウト", align: "right", value: "block.miss_detail.out" },
        { text: "吸い込み", align: "right", value: "block.miss_detail.suikomi" }
      ],
      headersBlockMatch: [
        { text: "試合", align: "left", value: "name" },
        { text: "日付", align: "left", value: "date" },
        { text: "得点", align: "right", value: "block.point" },
        { text: "総失点", align: "right", value: "block.miss" },
        { text: "アウト", align: "right", value: "block.miss_detail.out" },
        { text: "吸い込み", align: "right", value: "block.miss_detail.suikomi" }
      ],
      headersReceiveEtc: [],
      headersReceiveEtcPlayer: [
        { text: "名前", align: "left", value: "name" },
        { text: "性別", align: "left", value: "sex" },
        // { text: "失点", align: "left", value: "receive.miss" },
        // { text: "失点", align: "left", value: "other_miss" },
        // { text: "失点", align: "left", value: "faul" }
        { text: "レシーブ失点", align: "right", value: "receive.miss" },
        { text: "その他総失点", align: "right", value: "other_miss" },
        { text: "ジャッジ", align: "right", value: "other_miss_detail.judge" },
        { text: "お見合い", align: "right", value: "other_miss_detail.omiai" },
        { text: "ファウル", align: "right", value: "faul" }
      ],
      headersReceiveEtcMatch: [
        { text: "試合", align: "left", value: "name" },
        { text: "日付", align: "left", value: "date" },
        // { text: "失点", align: "left", value: "receive.miss" },
        // { text: "失点", align: "left", value: "other_miss" },
        // { text: "失点", align: "left", value: "faul" }
        { text: "レシーブ失点", align: "right", value: "receive.miss" },
        { text: "その他総失点", align: "right", value: "other_miss" },
        { text: "ジャッジ", align: "right", value: "other_miss_detail.judge" },
        { text: "お見合い", align: "right", value: "other_miss_detail.omiai" },
        { text: "ファウル", align: "right", value: "faul" }
      ]
    };
  },
  filters: {
    filterPercent(n) {
      return (n * 100).toFixed(1) + "%";
    }
    // lineBrakeEachCharacter(s) {
    //   var strs = s.split("");
    //   console.log(strs.join("<br>"));
    //   return strs.join("<br>");
    // }
  },
  mounted() {
    this.commonProp.back = this.backScoreList;
    this.analyzeListProp.switchList = this.switchList;

    var gridHeight = window.innerHeight - 10;
    this.styleNavi = {
      "line-height": gridHeight + "px"
    };

    this.members = this.getMembersData();

    this.isMatch = this.isMatchProp;

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
    switchList() {
      this.isMatch = !this.isMatch;
      this.formatScoreData();

      // if (this.isMatch) {
      //   // this.$emit("route-analyze-list-player", this.analyzeData);
      // } else {
      //   // this.$emit("route-analyze-list-match", this.analyzeData);
      // }
    },
    onPlayerDetail(item) {
      console.log(item);
      this.$emit("route-analyze-detail", item, this.isMatch);
    },
    formatScoreData() {
      if (this.isMatch) {
        this.headersTotal = this.headersTotalMatch;
        this.headersServe = this.headersServeMatch;
        this.headersSpike = this.headersSpikeMatch;
        this.headersBlock = this.headersBlockMatch;
        this.headersReceiveEtc = this.headersReceiveEtcMatch;
      } else {
        this.headersTotal = this.headersTotalPlayer;
        this.headersServe = this.headersServePlayer;
        this.headersSpike = this.headersSpikePlayer;
        this.headersBlock = this.headersBlockPlayer;
        this.headersReceiveEtc = this.headersReceiveEtcPlayer;
      }

      this.scoreAnalyze = [];
      if (this.isMatch) {
        this.matchTotalScore = this.getPlayerTemplate(
          0,
          0,
          "全試合",
          0,
          "2000-01-01"
        );
        this.scoreAnalyze.push(this.matchTotalScore);
      }
      this.analyzeData.forEach(this.totalScore);
      this.scoreAnalyze.forEach(this.calcScore);
      if (!this.isMatch) {
        this.scoreAnalyze.sort(this.compare);
      }
    },
    compare(a, b) {
      var r = 0;
      if (a.playerid < b.playerid) {
        r = -1;
      } else if (a.playerid > b.playerid) {
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
      if (this.isMatch) {
        var matchScore = this.getPlayerTemplate(
          0,
          0,
          score.title,
          0,
          score.date
        );
        matchScore.date = score.date;
        matchScore.point = score.teamAPoint + "-" + score.teamBPoint;
        for (var i = 0; i < score.score.length; i++) {
          this.addScore(matchScore, score.score[i]);
          this.addScore(this.matchTotalScore, score.score[i]);
        }
        this.scoreAnalyze.push(matchScore);
      } else {
        score.score.forEach(this.forEachScore);
      }
    },
    forEachScore(data) {
      var analyzeData = this.scoreAnalyze.filter(function(d) {
        if (d.playerid == data.playerid) return true;
      });

      if (analyzeData.length == 0) {
        var playerid = data.playerid;
        var member = this.members.filter(function(s) {
          if (s.playerid == playerid) return true;
        });
        var name;
        var sex;
        var no;
        if (member.length == 0) {
          name = "（不明なプレーヤ）";
          sex = 0;
          no = 0;
        } else {
          name = member[0].name;
          sex = member[0].sex;
          no = member[0].no;
        }
        analyzeData = this.getPlayerTemplate(data.playerid, no, name, sex, "");
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
    getPlayerTemplate(playerid, no, name, sex, date) {
      return {
        playerid: playerid,
        no: no,
        name: name,
        date: date,
        sex: sex,
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
            blockout: 0,
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

<style lang='scss'>
@import "../style/common.scss";
</style>

