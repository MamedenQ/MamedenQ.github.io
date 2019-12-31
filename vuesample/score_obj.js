const template = `
<svg v-on:click="onClickScore(item)" v-bind:y="originY">
  <circle v-bind:stroke="scoreColor(item.team)" stroke-width="2" fill="white" r="40" v-bind:cx="50 + 90 * idx" cy="50"></circle>

  <serve v-if="item.action == 'serve'" v-bind:x="90 * idx + 20" v-bind:y="10"></serve>
  <spike v-else-if="item.action == 'spike'" v-bind:x="90 * idx + 20" v-bind:y="10"></spike>
  <block v-else-if="item.action == 'block'" v-bind:x="90 * idx + 20" v-bind:y="10"></block>
  <receive v-else-if="item.action == 'receive'" v-bind:x="90 * idx + 20" v-bind:y="10"></receive>
  <faul v-if="item.action == 'faul'" v-bind:x="90 * idx + 20" v-bind:y="10"></faul>
  <other_miss v-else-if="item.action == 'other_miss'" v-bind:x="90 * idx + 20" v-bind:y="10"></other_miss>

  <text text-anchor="middle" v-bind:x="10 + 90 * idx + 40" v-bind:y="110">{{item.no + ":" + item.name}}</text>
  <text text-anchor="middle" v-bind:x="10 + 90 * idx + 40" v-bind:y="130">{{item.kind}}</text>
  <text text-anchor="middle" v-bind:x="10 + 90 * idx + 40" v-bind:y="75">{{item.action}}</text>
</svg>
`;

import faul from './faul.js'
import other_miss from './other_miss.js'
import block from './block.js'
import receive from './receive.js'
import spike from './spike.js'
import serve from './serve.js'

export default {
  template,
  components: {
    faul,
    other_miss,
    block,
    receive,
    spike,
    serve,
  },
  props: {
    item: Object,
    idx: Number,
  },
  data() {
    return {
      scoreColor: color,
      originY: 0,
    }
  },
  mounted() {
    // console.log("score_obj[" + JSON.stringify(this.item, null, "    ") + "]");
    if (this.item.team == 0) {
      this.originY = 0;
    } else {
      this.originY = 70;
    }
  },
  methods: {
    onClickScore(item) {
      this.$emit("click-score", item);
    }
  },
};
