<template>
    <div class="main-area">
        <div class="view-contents">
            <v-card style="width:100%;" class="d-inline-block mx-auto">
                <v-container>
                    <v-data-table
                        v-model="modelTarget"
                        :headers="headers"
                        :items="scoreList"
                        item-key="id"
                        show-select
                        hide-default-footer
                        :options.sync="options"
                        multi-sort
                    >
                        <template v-slot:item.title="{ item }">
                            <div style="text-align:left;">{{ item.title }}</div>
                        </template>
                        <template v-slot:item.point="{ item }">{{ item.teamAPoint + " － " + item.teamBPoint }}</template>
                        <template v-slot:item.edit="{ item }">
                            <v-btn v-on:click="linkScoreInput(item.id)" color="primary" style="margin-right:10px;" dark>編集</v-btn>
                            <v-btn v-on:click="onClickTrash(item)" color="warning" dark>削除</v-btn>
                        </template>
                        <template v-slot:item.delete="{ item }">
                            <v-btn v-on:click="onClickTrash(item)" color="warning" dark>削除</v-btn>
                        </template>
                    </v-data-table>
                </v-container>
            </v-card>
        </div>
        <confirm ref="confirm"></confirm>
    </div>
</template>

<script>
import confirm from "./Material/Confirm";

export default {
    name: "score_list",
    props: {
        score: String,
        scoreListProp: Object
    },
    components: {
        confirm
    },
    data() {
        return {
            options: {
                itemsPerPage: -1
            },
            dialogProp: {
                title: "",
                msg: "",
                positive: "",
                negative: "",
                callback: null
            },
            scoreList: [],
            modelTarget: [],
            headers: [
                { text: "タイトル", align: "center", value: "title" },
                { text: "日付", align: "center", value: "date" },
                { text: "得点", align: "center", sortable: false, value: "point" },
                { text: "編集", align: "center", sortable: false, value: "edit" }
            ],
            isCheckAll: false,
            modelDateStart: "2000-01-01",
            modelDateEnd: "2030-12-31",
            dStart: null,
            dEnd: null,
            styleNavi: {
                "line-height": "700px"
            }
        };
    },
    watch: {
        modelTarget: function(val) {
            this.scoreListProp.checkChangedScoreList(this.modelTarget.length);
        }
    },
    mounted() {
        this.scoreListProp.linkAnalyzeList = this.linkAnalyzeList;

        var gridHeight = window.innerHeight - 10;
        this.styleNavi = {
            "line-height": gridHeight + "px"
        };

        this.refresh();
    },
    methods: {
        searchScore() {
            this.refresh();
        },
        refresh() {
            this.setDateStartEnd();

            var scoreList = this.getScoreData();
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
                return false;
            }

            var d = new Date(data.date);
            if (d < this.dStart || d > this.dEnd) {
                return false;
            }

            return true;
        },
        linkAnalyzeList() {
            if (this.modelTarget.length == 0) {
                return;
            }
            console.log(this.modelTarget);

            this.$emit("route-analyze-list-player", this.modelTarget);
        },
        linkScoreInput(scoreId) {
            console.log("params:" + JSON.stringify(scoreId, null, "    "));
            this.$emit("route-score-input", scoreId);
        },
        onClickTrash(item) {
            this.dialogProp = {
                title: "削除確認",
                msg: "削除しますか？",
                positive: "OK",
                negative: "キャンセル",
                deleteItem: item,
                callback: this.callback
            };
            this.$refs.confirm.open(this.dialogProp);
        },
        callback(result) {
            if (!result) {
                return;
            }

            var item = this.dialogProp.deleteItem;
            this.trashScoreData(item.id);

            this.refresh();
        },
        onHome() {
            this.$emit("route-home");
        }
    }
};
</script>

<style lang="scss">
@import "../style/common.scss";
</style>
