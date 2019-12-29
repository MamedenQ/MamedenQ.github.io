const template = `
<div>
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
    <table class="analyze">
        <thead class="analyze_head">
            <tr>
                <th colspan="2">基本情報</th>
                <th colspan="6">総合</th>
                <th colspan="5" class='serve_cell' v-show="showServe">サーブ</th>
                <th colspan="5" class='spike_cell' v-show="showSpike">スパイク</th>
                <th colspan="5" class='block_cell' v-show="showBlock">ブロック</th>
                <th colspan="9" class='reception_cell' v-show="showReceive">レセプション</th>
                <th rowspan="2" v-show="showEtc">そ<br>の<br>他<br>ミ<br>ス</th>
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
                <!--
                <th>勝<br>率</th>
                <th>勝<br>セ<br>ッ<br>ト</th>
                <th>総<br>セ<br>ッ<br>ト</th>
                -->

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
                <th v-show="showReceive" class='reception_cell'>A<br>カ<br>ッ<br>ト</th>
                <th v-show="showReceive" class='reception_cell'>B<br>カ<br>ッ<br>ト</th>
                <th v-show="showReceive" class='reception_cell'>C<br>カ<br>ッ<br>ト</th>
                <th v-show="showReceive" class='reception_cell'>失<br>点</th>
                <th v-show="showReceive" class='reception_cell'>A<br>率</th>
                <th v-show="showReceive" class='reception_cell'>B<br>率</th>
                <th v-show="showReceive" class='reception_cell'>C<br>率</th>
                <th v-show="showReceive" class='reception_cell'>失<br>点<br>率</th>
            </tr>
        </thead>
        <draggable element="tbody" class="analyze_body">
            <tr v-for="item, idx of scoreAnalyze">
                <td>{{item.no}}</td>
                <td><a href='#'>{{item.name}}</a></td>
                <td>{{item.total.total}}</td>
                <td>{{item.total.point}}</td>
                <td>{{item.total.miss}}</td>
                <td>{{item.total.effect | filterPercent}}</td>
                <td>{{item.total.determined | filterPercent}}</td>
                <td>{{(-1 * (item.total.effect - item.total.determined)) | filterPercent}}</td>
                <!--
                <td>winper</td>
                <td>win</td>
                <td>set</td>
                -->
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
            </tr>
        </draggable>
    </table>
</div>
`;

export default {
    template,
    props: {
        analyzeData: Array,
    },
    data() {
        return {
            scoreColor: color,
            scoreAnalyze: [],
            modelFilter: "",
        }
    },
    filters: {
        filterPercent(n) {
            return (n * 100).toFixed(1) + "%";
        }
    },
    mounted() {
        // console.log("analyzeData[" + this.analyzeData + "]");
        this.formatScoreData();
        this.modelFilter = "serve";
    },
    computed: {
        showServe() {
            return ("serve" == this.modelFilter);
        },
        showSpike() {
            return ("spike" == this.modelFilter);
        },
        showBlock() {
            return ("block" == this.modelFilter);
        },
        showReceive() {
            return ("receive" == this.modelFilter);
        },
        showEtc() {
            return ("etc" == this.modelFilter);
        },
    },
    methods: {
        formatScoreData() {
            // 性能次第で改善必要
            // this.scoreAnalyze = [];
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
            // user.hasOwnProperty('name')
            // scoreAnalyze
            score.score.forEach(this.forEachScore);
        },
        forEachScore(data) {
            var analyzeData = this.scoreAnalyze.filter(function (d, i) {
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
                    analyzeData.total.miss++;
                } else {
                    analyzeData.total.rally++;
                }
                analyzeData.total.total++;
                analyzeData.block[data.kind]++;
                analyzeData.block.total++;
            } else if (data.action == "receive") {
                if (data.kind == "point") {
                    analyzeData.total.point++;
                } else if (data.kind == "miss") {
                    analyzeData.total.miss++;
                } else {
                    analyzeData.total.rally++;
                }
                analyzeData.total.total++;
                analyzeData.receive[data.kind]++;
                analyzeData.receive.total++;
            } else if (data.action == "other_miss") {
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
            var member = members.filter(function (s, index) {
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
                    total: 0,
                },
                serve: {
                    point: 0,
                    point_detail: {
                        ace: 0,
                    },
                    miss: 0,
                    miss_detail: {
                        net: 0,
                        out: 0,
                    },
                    rally: 0,
                    total: 0,
                    effect: 0,
                    determined: 0,
                },
                spike: {
                    point: 0,
                    point_detail: {
                        in: 0,
                        block_out: 0,
                        fake: 0,
                    },
                    miss: 0,
                    miss_detail: {
                        net: 0,
                        out: 0,
                        block: 0,
                    },
                    rally: 0,
                    total: 0,
                    effect: 0,
                    determined: 0,
                },
                block: {
                    point: 0,
                    miss: 0,
                    rally: 0,
                    total: 0,
                    effect: 0,
                    determined: 0,
                },
                receive: {
                    a: 0,
                    b: 0,
                    c: 0,
                    // point: 0,
                    miss: 0,
                    total: 0,
                    a_rate: 0,
                    b_rate: 0,
                    c_rate: 0,
                    miss_rate: 0,
                },
                other_miss: 0,
                // miss_judge: 0,
                faul: 0,
            };
        }
    },
}