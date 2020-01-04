const template = `
<div class="grid-scorelist">
    <div class="navi_a">
        <span>
            <div>
            <span>戻る</span>
            <svg v-on:click="onBack" xmlns="http://www.w3.org/2000/svg" width="70" height="70" viewBox="0 0 24 24" fill="none" stroke="#000000" stroke-width="1" stroke-linecap="round" stroke-linejoin="round"><path d="M19 12H6M12 5l-7 7 7 7"/></svg>
            <br>
            <br>
            </div>
            <span>ホーム</span>
            <svg v-on:click="onHome" xmlns="http://www.w3.org/2000/svg" width="70" height="70" viewBox="0 0 24 24" fill="none" stroke="#000000" stroke-width="1" stroke-linecap="round" stroke-linejoin="round">
                <path d="M20 9v11a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V9"/>
                <path d="M9 22V12h6v10M2 10.6L12 2l10 8.6"/>
            </svg>
        </span>
    </div>
    <div class="scorelist">
        <div>
            <chart></chart>
        </div>
    </div>
</div>
`;

import barChart from './BarChart.js';

export default {
    template,
    props: {
        analyzePlayerData: Object,
    },
    data() {
        return {
        };
    },
    components: {
        barChart,
    },
    computed: {
        // compMessage() {
        //     return this.modelA + this.modelB;
        // }
    },
    mounted() {
        // this.refresh();
    },
    methods: {
        onBack() {
            this.$emit("route-analyze-list-player");
        },
        onHome() {
            this.$emit("route-home");
        },
        createGraph() {
            var myBarChart = new Chart(ctx, {
                type: 'bar',
                data: data,
                options: options
            });
        },
        // refresh() {
        //     var scoreList = JSON.parse(localStorage.getItem("score"));
        //     if (scoreList == null) {
        //         return;
        //     }
        //     var filterData = scoreList.filter(function (data, index) {
        //         if (!data.isTrash) return true;
        //     });

        //     this.scoreList = filterData;
        // },
        // onCheckChange() {
        //     // console.log(this.modelTarget);
        //     if (this.modelTarget.length == this.scoreList.length) {
        //         // console.log("all checked");
        //         this.isCheckAll = true;
        //     } else {
        //         // console.log("piece checked");
        //         this.isCheckAll = false;
        //     }
        // },
        // linkAnalyzeList() {
        //     if (this.modelTarget.length == 0) {
        //         return;
        //     }

        //     this.$emit("route-analyze-list", this.extractTarget());
        // },
        // extractTarget() {
        //     var target = this.scoreList.filter(this.isTarget);
        //     if (target.length == 0) {
        //         target = [];
        //     }

        //     return target;
        // },
        // isTarget(data, index) {
        //     return this.modelTarget.includes(data.id);
        // },
        // linkScoreInput(scoreId) {
        //     this.$emit("route-score-input", scoreId);
        // },
        // onClickTrash(item) {
        //     this.deleteItem = item;
        //     this.title = "削除確認";
        //     this.msg = "削除しますか？";
        //     this.positive = "OK";
        //     this.negative = "Cancel";
        //     this.callbackConfirm = this.callback;

        //     this.showModalConfirm = true;
        // },
        // result(flg) {
        //     this.callbackConfirm(flg);
        //     this.showModalConfirm = false;
        // },
        // callback(result) {
        //     if (!result) {
        //         return;
        //     }

        //     var item = this.deleteItem;
        //     var scoreList = JSON.parse(localStorage.getItem("score"));
        //     var filterData = scoreList.filter(function (data, index) {
        //         if (data.id == item.id) return true;
        //     });
        //     filterData[0].isTrash = true;

        //     localStorage.setItem("score", JSON.stringify(scoreList));

        //     this.refresh();
        // },
        // onClickCheckAll() {
        //     // console.log("onClickCheckAll: " + this.isCheckAll);
        //     if (this.isCheckAll) {
        //         this.modelTarget = [];
        //     } else {
        //         this.scoreList.forEach(data => {
        //             this.modelTarget.push(data.id);
        //         });
        //     }
        //     this.isCheckAll = !this.isCheckAll;
        //     // console.log(this.modelTarget);
        // }
    }
};

