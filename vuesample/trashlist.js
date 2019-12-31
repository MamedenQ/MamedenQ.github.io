const template = `
<div class="grid-scorelist">
    <div class="navi_a grid_style">
        <div class="menu1">
            <svg xmlns="http://www.w3.org/2000/svg" width="70" height="70" viewBox="0 0 24 24" fill="none" stroke="#000000" stroke-width="1" stroke-linecap="round" stroke-linejoin="round">
                <path d="M20 9v11a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V9"/>
                <path d="M9 22V12h6v10M2 10.6L12 2l10 8.6"/>
            </svg>
        </div>
        <div class="menu2">
            <svg v-on:click="backScoreList()" xmlns="http://www.w3.org/2000/svg" width="70" height="70" viewBox="0 0 24 24" fill="none" stroke="#000000" stroke-width="1" stroke-linecap="round" stroke-linejoin="round"><path d="M19 12H6M12 5l-7 7 7 7"/></svg>
        </div>
        <div class="menu7">
        <svg xmlns="http://www.w3.org/2000/svg" width="70" height="70" viewBox="0 0 24 24" fill="none" stroke="#000000" stroke-width="1" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg>
        </div>
    </div>
    <div class="scorelist">
        <table class="analyze">
            <thead class="analyze_head">
                <tr>
                    <th>#</th>
                    <th>タイトル</th>
                    <th>日付</th>
                    <th>得点</th>
                    <th>復元</th>
                    <th>完全削除</th>
                </tr>
            </thead>
            <tbody class="analyze_body">
                <tr v-for="item, idx of trashList">
                    <td>{{ idx + 1 }}</td>
                    <td>{{ item.title }}</td>
                    <td>{{ item.date }}</td>
                    <td>{{ item.teamAPoint + " － " + item.teamBPoint }}</td>
                    <td><button v-on:click="onClickRestore(item)">復元</button></td>
                    <td><button v-on:click="onClickDelete(item)">完全削除</button></td>
                </tr>
            </tbody>
        </table>
    </div>
    <confirm v-if="showModalConfirm" v-on:dialogResult="result" :title="title" :msg="msg" :positive="positive" :negative="negative"></confirm>
</div>
`;

import confirm from './confirm.js'

export default {
    template,
    props: {
        score: String,
    },
    components: {
        confirm,
    },
    data() {
        return {
            trashList: [],
            showModalConfirm: false,
            callbackConfirm: null,
            restoreItem: {},
            deleteItem: {},
        };
    },
    computed: {
        // compMessage() {
        //     return this.modelA + this.modelB;
        // }
    },
    mounted() {
        this.refresh();
    },
    methods: {
        refresh() {
            var scoreList = JSON.parse(localStorage.getItem("score"));
            if (scoreList == null) {
                return;
            }
            var filterData = scoreList.filter(function (data, index) {
                if (data.isTrash) return true;
            });

            this.trashList = filterData;
        },
        onCheckChange() {
            console.log(this.modelTarget);
        },
        linkAnalyzeList() {
            this.$emit("route-analyze-list", this.modelTarget);
        },
        // linkScoreInput(scoreId) {
        //     this.$emit("route-score-input", scoreId);
        // },
        onClickRestore(item) {
            this.restoreItem = item;
            this.title = "復元確認";
            this.msg = "復元しますか？";
            this.positive = "OK";
            this.negative = "Cancel";
            this.callbackConfirm = this.callbackRestore;

            this.showModalConfirm = true;
        },
        result(flg) {
            this.callbackConfirm(flg);
            this.showModalConfirm = false;
        },
        callbackRestore(result) {
            if (!result) {
                return;
            }

            var item = this.restoreItem;
            var scoreData = JSON.parse(localStorage.getItem("score"));
            var filterData = scoreData.filter(function (data, index) {
                if (data.id == item.id) return true;
            });
            filterData[0].isTrash = false;
            localStorage.setItem("score", JSON.stringify(scoreData));

            this.refresh();
        },
        onClickDelete(item) {
            this.deleteItem = item;
            this.title = "削除確認";
            this.msg = "削除しますか？このスコアは完全に削除されます。";
            this.positive = "OK";
            this.negative = "Cancel";
            this.callbackConfirm = this.callbackDelete;

            this.showModalConfirm = true;
        },
        callbackDelete(result) {
            if (!result) {
                return;
            }

            var item = this.deleteItem;
            var scoreData = JSON.parse(localStorage.getItem("score"));
            var filterData = scoreData.filter(function (data, index) {
                if (data.id != item.id) return true;
            });
            localStorage.setItem("score", JSON.stringify(filterData));

            this.refresh();
        },
    }
};

