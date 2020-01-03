const template = `
<div class="grid-scorelist">
    <div class="navi_a"  v-bind:style="styleNavi" style="position:fixed;top:0;left:5px;">
        <span>
            <div>ホーム</div>
            <svg v-on:click="onHome" xmlns="http://www.w3.org/2000/svg" width="70" height="70" viewBox="0 0 24 24" fill="none" stroke="#000000" stroke-width="1" stroke-linecap="round" stroke-linejoin="round">
                <path d="M20 9v11a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V9"/>
                <path d="M9 22V12h6v10M2 10.6L12 2l10 8.6"/>
            </svg>
        </span>
    </div>
    <div class="scorelist">
        <span id="page-top"></span>
        <input type="date" v-model="modelDateStart" />〜<input type="date" v-model="modelDateEnd" />
        <button v-on:click="searchScore" class="btn btn-primary">絞り込み</button><br><br>
        <button v-on:click="linkAnalyzeList" class="btn btn-primary">分析</button>
        <table class="analyze">
            <thead class="analyze_head">
                <tr>
                    <th><input type="checkbox" v-bind:checked="isCheckAll" v-on:click="onClickCheckAll">　選択</th>
                    <th>#</th>
                    <th>タイトル</th>
                    <th>日付</th>
                    <th>得点</th>
                    <!--
                    <th>スコアリンク</th>
                    -->
                    <th>削除</th>
                </tr>
            </thead>
            <tbody class="analyze_body">
                <tr v-for="item, idx of scoreList">
                    <!--
                    <td><input type="checkbox" v-model="modelTarget" :value="item" v-on:change="onCheckChange()" /></td>
                    -->
                    <td><input type="checkbox" v-model="modelTarget" :value="item.id" v-on:change="onCheckChange()" /></td>
                    <td>{{ idx + 1 }}</td>
                    <td><a href="#" v-on:click="linkScoreInput(item.id)">{{ item.title }}</a></td>
                    <td>{{ item.date }}</td>
                    <td>{{ item.teamAPoint + " － " + item.teamBPoint }}</td>
                    <!--
                    <td><a href="#" v-on:click="linkScoreInput(item.id)">リンク</a></td>
                    -->
                    <td style="text-align:center;"><button v-on:click="onClickTrash(item)" class="btn btn-warning">削除</button></td>
                </tr>
            </tbody>
        </table>
        <button v-on:click="linkAnalyzeList" class="btn btn-primary">分析</button>
        <a data-scroll href="#page-top" style="position:fixed;bottom:10px;right:10px;"><movetop></movetop></a>
    </div>
    <confirm v-if="showModalConfirm" v-on:dialogResult="result" :title="title" :msg="msg" :positive="positive" :negative="negative"></confirm>
</div>
`;

import confirm from './confirm.js'
import movetop from './movetop.js'

export default {
    template,
    props: {
        score: String,
    },
    components: {
        confirm,
        movetop,
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
                "line-height": "700px",
            },
        };
    },
    computed: {
        // compMessage() {
        //     return this.modelA + this.modelB;
        // }
    },
    mounted() {
        var gridHeight = (window.innerHeight - 10);
        this.styleNavi = {
            "line-height": gridHeight + "px",
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

            this.scoreList = filterData;
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
        onCheckChange() {
            // console.log(this.modelTarget);
            if (this.modelTarget.length == this.scoreList.length) {
                // console.log("all checked");
                this.isCheckAll = true;
            } else {
                // console.log("piece checked");
                this.isCheckAll = false;
            }
        },
        linkAnalyzeList() {
            if (this.modelTarget.length == 0) {
                return;
            }

            this.$emit("route-analyze-list", this.extractTarget());
        },
        extractTarget() {
            var target = this.scoreList.filter(this.isTarget);
            if (target.length == 0) {
                target = [];
            }

            return target;
        },
        isTarget(data, index) {
            return this.modelTarget.includes(data.id);
        },
        linkScoreInput(scoreId) {
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
            var filterData = scoreList.filter(function (data, index) {
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
        }
    }
};

