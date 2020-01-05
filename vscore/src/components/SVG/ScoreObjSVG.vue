<template>
  <svg v-on:click="onClickScore(item)" v-bind:y="originY">
    <circle
      v-if="item.kind == 'point'"
      v-bind:stroke="scoreColor[item.team]"
      stroke-width="4"
      fill="white"
      r="40"
      v-bind:cx="50 + 90 * idx"
      cy="50"
    />
    <line
      v-if="item.kind == 'miss'"
      v-bind:x1="10 + 90 * idx + 5"
      y1="15"
      v-bind:x2="10 + 90 * idx + 75"
      y2="85"
      v-bind:stroke="scoreColor[item.team]"
      stroke-width="4"
    />
    <line
      v-if="item.kind == 'miss'"
      v-bind:x1="10 + 90 * idx + 5"
      y1="85"
      v-bind:x2="10 + 90 * idx + 75"
      y2="15"
      v-bind:stroke="scoreColor[item.team]"
      stroke-width="4"
    />
    <line
      v-if="item.kind == 'rally'"
      v-bind:x1="10 + 90 * idx"
      y1="50"
      v-bind:x2="10 + 90 * idx + 80"
      y2="50"
      v-bind:stroke="scoreColor[item.team]"
      stroke-width="4"
    />

    <serveSvg v-if="item.action == 'serve'" v-bind:x="90 * idx + 20" v-bind:y="10" />
    <spikeSvg v-else-if="item.action == 'spike'" v-bind:x="90 * idx + 20" v-bind:y="8" />
    <blockSvg v-else-if="item.action == 'block'" v-bind:x="90 * idx + 20" v-bind:y="8" />
    <receiveSvg v-else-if="item.action == 'receive'" v-bind:x="90 * idx + 20" v-bind:y="10" />
    <faulSvg v-else-if="item.action == 'faul'" v-bind:x="90 * idx + 20" v-bind:y="8" />
    <otherMissSvg v-else-if="item.action == 'other_miss'" v-bind:x="90 * idx + 20" v-bind:y="10" />

    <text text-anchor="middle" v-bind:x="10 + 90 * idx + 40" v-bind:y="75">{{labelAction}}</text>
    <text
      text-anchor="middle"
      v-bind:x="10 + 90 * idx + 40"
      v-bind:y="110"
    >{{item.no + ":" + item.name}}</text>
    <!--
  <text text-anchor="middle" v-bind:x="10 + 90 * idx + 40" v-bind:y="130">{{labelKind}}</text>
  <text text-anchor="middle" v-bind:x="10 + 90 * idx + 40" v-bind:y="150">{{labelDetail}}</text>
    -->
    <text text-anchor="middle" v-bind:x="10 + 90 * idx + 40" v-bind:y="130">{{labelDetail}}</text>
  </svg>
</template>

<script>
import faulSvg from "./FaulSVG";
import otherMissSvg from "./OtherMissSVG";
import blockSvg from "./BlockSVG";
import receiveSvg from "./ReceiveSVG";
import spikeSvg from "./SpikeSVG";
import serveSvg from "./ServeSVG";
export default {
  name: "score_obj",
  components: {
    faulSvg,
    otherMissSvg,
    blockSvg,
    receiveSvg,
    spikeSvg,
    serveSvg
  },
  props: {
    item: Object,
    idx: Number
  },
  data() {
    return {
      scoreColor: ["#005ab3", "#fdb86d"],
      originY: 0,
      // item: {},
      labelAction: "",
      labelKind: "",
      labelDetail: "",
      convTableAction: {
        serve: "サーブ",
        spike: "スパイク",
        block: "ブロック",
        receive: "レシーブ",
        other_miss: "他ミス",
        faul: "ファウル"
      },
      convTableKind: {
        rally: "ラリー",
        point: "ポイント",
        miss: "ミス",
        a: "A",
        b: "B",
        c: "C"
      },
      convTableDetail: {
        ace: "エース",
        in: "イン",
        out: "アウト",
        net: "ネット",
        fake: "フェイント",
        blockout: "ブロックアウト",
        block: "ブロック",
        suikomi: "吸い込み",
        judge: "ジャッジ",
        omiai: "お見合い"
      }
    };
  },
  mounted() {
    // this.dispItem = this.item;
    this.convertDispLabel();

    // console.log("score_obj[" + JSON.stringify(this.dispItem, null, "    ") + "]");
    if (this.item.team == 0) {
      this.originY = 0;
    } else {
      this.originY = 50;
    }
  },
  methods: {
    convertDispLabel() {
      this.labelAction = this.convTableAction[this.item.action];
      this.labelKind = this.convTableKind[this.item.kind];
      this.labelDetail = this.convTableDetail[this.item.detail];
    },
    onClickScore(item) {
      this.$emit("click-score", item);
    }
  }
};
</script>

<style>
</style>
