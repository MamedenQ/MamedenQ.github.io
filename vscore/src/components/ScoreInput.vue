<template>
    <div class="main-area">
        <div class="grid-scoreinput view-contents" v-bind:style="styleGrid">
            <div class="grid-action">
                <div v-bind:class="item.classGrid" v-for="item of itemAction" :key="item.id">
                    <input type="radio" v-bind:id="item.id" name="action" v-bind:value="item.name" v-model="modelAction" />
                    <label v-bind:for="item.id">
                        <v-btn v-show="modelAction == item.name" style="width:100%;height:100%;" color="primary" dark></v-btn>
                        <v-btn
                            v-on:click="
                                modelAction = item.name;
                                onChangeAction();
                            "
                            v-show="modelAction != item.name"
                            style="width:100%;height:100%;"
                        ></v-btn>
                        <span v-bind:style="styleLabel">{{ item.label }}</span>
                        <actionSvg :id="item.id"></actionSvg>
                    </label>
                </div>
            </div>

            <div class="grid-kind">
                <div v-bind:class="item.classGrid" v-for="item of itemKind" :key="item.id">
                    <input
                        type="radio"
                        v-bind:id="item.id"
                        name="kind"
                        v-bind:value="item.name"
                        v-model="modelKind"
                        v-bind:disabled="!item.isEnabled"
                    />
                    <label v-bind:for="item.id">
                        <v-btn v-show="modelKind == item.name" style="width:100%;height:100%;" color="primary" dark></v-btn>
                        <v-btn
                            v-bind:disabled="!item.isEnabled"
                            v-on:click="
                                modelKind = item.name;
                                onChangeKind();
                            "
                            v-show="modelKind != item.name"
                            style="width:100%;height:100%;"
                        ></v-btn>
                        <span v-bind:style="styleLabel">{{ item.label }}</span>
                        <kindSvg :name="item.name"></kindSvg>
                    </label>
                </div>
            </div>

            <div class="grid-detail">
                <div v-bind:class="item.classGrid" v-for="item of itemDetail" :key="item.id">
                    <input
                        type="radio"
                        v-bind:id="item.id"
                        name="detail"
                        v-bind:value="item.name"
                        v-model="modelDetail"
                        v-bind:disabled="!item.isEnabled"
                    />
                    <label v-bind:for="item.id">
                        <v-btn v-show="modelDetail == item.name" style="width:100%;height:100%;" color="primary" dark></v-btn>
                        <v-btn
                            v-bind:disabled="!item.isEnabled"
                            v-on:click="modelDetail = item.name"
                            v-show="modelDetail != item.name"
                            style="width:100%;height:100%;"
                        ></v-btn>
                        <span v-bind:style="styleLabel">{{ item.label }}</span>
                        <detailSvg :name="item.name"></detailSvg>
                    </label>
                </div>
            </div>

            <div class="coat" v-bind:style="styleGridCoat">
                <player
                    v-on:on-click-player="addScore(item)"
                    v-bind:item="item"
                    v-bind:class="item.classGrid"
                    v-for="item of itemTeamA"
                    :key="item.key"
                ></player>
                <rotate class="rotate-a" v-on:on-click-rotate="rotateA"></rotate>

                <player
                    v-on:on-click-player="addScore(item)"
                    v-bind:item="item"
                    v-bind:class="item.classGrid"
                    v-for="item of itemTeamB"
                    :key="item.key"
                ></player>
                <rotate class="rotate-b" v-on:on-click-rotate="rotateB"></rotate>
            </div>
            <hooper ref="scoreCarousel" :center-mode="true" :itemsToShow="10" class="score" style="height:150px;">
                <slide v-for="(item, idx) of score" :key="idx">
                    <scoreObjSvg v-on:click-score="onClickScore(idx, item)" :item="item" :idx="0"></scoreObjSvg>
                </slide>
            </hooper>
            <confirm ref="confirm"></confirm>
            <memberChange ref="memberChange"></memberChange>
            <scoreSave ref="save"></scoreSave>
        </div>
    </div>
</template>

<script>
import itemJson from "./js/ItemJson";
import confirm from "./Material/Confirm";
import actionSvg from "./SVG/ActionSVG";
import kindSvg from "./SVG/KindSVG";
import detailSvg from "./SVG/DetailSVG";
import scoreObjSvg from "./SVG/ScoreObjSVG";
import memberSvg from "./SVG/MemberSVG";
import player from "./Material/Player";
import rotate from "./Material/Rotate";
import memberChange from "./Material/MemberChange";
import scoreSave from "./Material/ScoreSave";

import { Hooper, Slide } from "hooper";
import "hooper/dist/hooper.css";

export default {
    name: "score_input",
    components: {
        confirm,
        actionSvg,
        kindSvg,
        detailSvg,
        scoreObjSvg,
        memberSvg,
        player,
        rotate,
        memberChange,
        scoreSave,
        Hooper,
        Slide
    },
    props: {
        scoreId: String,
        isNewScore: Boolean,
        scoreInputProp: Object,
        commonProp: Object
    },
    watch: {
        score: function(val) {
            this.isDirty = true;
        },
        undoList: function(val) {
            if (this.undoList.length < 1) {
                this.scoreInputProp.setEnableUndo(false);
            } else {
                this.scoreInputProp.setEnableUndo(true);
            }
        },
        redoList: function(val) {
            if (this.redoList.length < 1) {
                this.scoreInputProp.setEnableRedo(false);
            } else {
                this.scoreInputProp.setEnableRedo(true);
            }
        }
    },
    data: function() {
        return {
            isSimple: true,
            score: [],
            undoList: [],
            redoList: [],
            modelAction: "",
            modelKind: "",
            modelDetail: "",
            modelTitle: "",
            modelDate: "",
            modelAPoint: 0,
            modelBPoint: 0,
            dialogProp: {
                title: "",
                msg: "",
                positive: "",
                negative: "",
                callback: null
            },
            isCancel: false,
            isDirty: false,
            showChangeArea: false,
            scoreSettings: {},
            styleGrid: {
                "grid-template-rows": "1fr 1fr 1fr 1fr 1fr 1fr 220px"
            },
            styleGridCoat: {
                "grid-template-rows": "1fr 1fr 1fr 1fr 1fr 1fr"
            },
            styleNavi: {
                "line-height": "700px"
            },
            styleLabel: {
                "line-height": "50px"
            },
            // アクション項目
            itemAction: itemJson.itemAction,
            // 種別項目
            itemKind: [],
            itemKindDict: {
                serve: { kind: itemJson.itemKindServe, name: "point", detail: "D1" },
                spike: { kind: itemJson.itemKindSpike, name: "rally", detail: "" },
                block: { kind: itemJson.itemKindServe, name: "point", detail: "D1" },
                receive: { kind: itemJson.itemKindReceive, name: "miss", detail: "" },
                other_miss: { kind: itemJson.itemKindReceive, name: "miss", detail: "D1" },
                faul: { kind: itemJson.itemKindReceive, name: "miss", detail: "" }
            },
            // 詳細項目
            itemDetail: [],
            itemTeamA: itemJson.itemTeamA,
            itemTeamB: itemJson.itemTeamB,
            members: []
        };
    },
    beforeCreate() {
        console.log("beforeCreate");
    },
    created() {
        console.log("created");
    },
    beforeMount() {
        console.log("beforeMount");
    },
    mounted() {
        console.log("mounted");
        this.init();
        this.$nextTick(() => {
            console.log("nextTick");
            this.isDirty = false;
        });
    },
    methods: {
        init() {
            this.scoreInputProp.undo = this.undo;
            this.scoreInputProp.redo = this.redo;
            this.scoreInputProp.save = this.save;
            this.scoreInputProp.changeMember = this.changeMember;
            this.commonProp.back = this.onBack;

            this.modelDate = this.getNowDateStr();

            this.members = this.getMembersData();
            this.scoreSettings = this.getScoreSettingsData();

            this.itemTeamA[6].isLibero = this.scoreSettings.isLibero;
            this.itemTeamA[7].isLibero = this.scoreSettings.isLibero;
            this.itemTeamB[6].isLibero = this.scoreSettings.isLibero;
            this.itemTeamB[7].isLibero = this.scoreSettings.isLibero;

            this.loadScore();
            this.modelAction = "serve";
            this.onChangeAction();

            var itemHeight = (window.innerHeight - (180 + 64)) / 6;
            this.styleGrid = {
                "grid-template-rows":
                    itemHeight + "px " + itemHeight + "px " + itemHeight + "px " + itemHeight + "px " + itemHeight + "px " + itemHeight + "px 150px"
            };
            var itemHeightCoat = (window.innerHeight - (230 + 64)) / 6;
            this.styleGridCoat = {
                "grid-template-rows":
                    itemHeightCoat +
                    "px " +
                    itemHeightCoat +
                    "px " +
                    itemHeightCoat +
                    "px " +
                    itemHeightCoat +
                    "px " +
                    itemHeightCoat +
                    "px " +
                    itemHeightCoat +
                    "px"
            };
            this.styleNavi = {
                "line-height": window.innerHeight + "px"
            };
            this.styleLabel = {
                "line-height": itemHeight - 10 + "px"
            };
        },
        getNowDateStr() {
            var twoDigit = function(value) {
                return ("0" + value).slice(-2);
            };
            var d = new Date();
            return [d.getFullYear(), twoDigit(d.getMonth() + 1), twoDigit(d.getDate())].join("-");
        },
        outputlog() {
            // console.log(JSON.stringify(this.score, null, "    "));
        },
        undo() {
            if (this.undoList.length < 1) {
                return;
            }
            console.log(JSON.stringify(this.undoList, null, "    "));
            var undoItem = this.undoList.pop();
            if (undoItem.undoKind == "add") {
                console.log("undo add");
                this.redoList.push({
                    redoKind: "add",
                    addItem: this.score.pop()
                });
                this.$refs.scoreCarousel.slideTo(this.score.length - 1);
            } else if (undoItem.undoKind == "del") {
                console.log("undo del");
                undoItem.delItem.index = this.getMaxIndex() + 1;
                this.score.splice(undoItem.delListIndex, 0, undoItem.delItem);
                this.redoList.push({
                    redoKind: "del",
                    delListIndex: undoItem.delListIndex,
                    delItem: undoItem.delItem
                });
                this.$refs.scoreCarousel.slideTo(undoItem.delListIndex);
            }

            console.log(JSON.stringify(this.undoList, null, "    "));
            this.outputlog();
        },
        redo() {
            if (this.redoList.length < 1) {
                return;
            }
            console.log(JSON.stringify(this.redoList, null, "    "));
            var redoItem = this.redoList.pop();
            if (redoItem.redoKind == "add") {
                console.log("redo add");
                redoItem.addItem.index = this.getMaxIndex() + 1;
                this.score.push(redoItem.addItem);
                this.undoList.push({
                    undoKind: "add"
                });
                this.$refs.scoreCarousel.slideTo(this.score.length - 1);
            } else if (redoItem.redoKind == "del") {
                console.log("redo del");
                this.undoList.push({
                    undoKind: "del",
                    delListIndex: redoItem.delListIndex,
                    delItem: redoItem.delItem
                });
                this.deleteScoreItem(redoItem.delListIndex, redoItem.delItem, true);
                this.$refs.scoreCarousel.slideTo(redoItem.delListIndex);
            }
            this.outputlog();
        },
        save() {
            this.dialogProp = {
                modelTitle: this.modelTitle,
                modelDate: this.modelDate,
                modelAPoint: this.modelAPoint,
                modelBPoint: this.modelBPoint,
                callback: this.callbackSave
            };
            this.$refs.save.open(this.dialogProp);
        },
        callbackSave(flg) {
            if (!flg) {
                return;
            }
            this.modelTitle = this.dialogProp.modelTitle;
            this.modelDate = this.dialogProp.modelDate;
            this.modelAPoint = Number(this.dialogProp.modelAPoint);
            this.modelBPoint = Number(this.dialogProp.modelBPoint);

            var data = {
                id: this.scoreId,
                title: this.modelTitle,
                date: this.modelDate,
                score: this.score,
                teamA: this.itemTeamA,
                teamB: this.itemTeamB,
                teamAPoint: this.modelAPoint,
                teamBPoint: this.modelBPoint,
                isTrash: false
            };

            var saveDatas = this.getScoreData();

            var existsData = false;
            var tmpScoreId = this.scoreId;
            saveDatas.forEach(function(saveData) {
                if (saveData.id == tmpScoreId) {
                    saveData.title = data.title;
                    saveData.date = data.date;
                    saveData.score = data.score;

                    saveData.teamA = data.teamA;
                    saveData.teamB = data.teamB;
                    saveData.teamAPoint = data.teamAPoint;
                    saveData.teamBPoint = data.teamBPoint;
                    existsData = true;
                }
            });

            if (!existsData) {
                saveDatas.push(data);
            }

            this.setScoreData(saveDatas);
            this.isDirty = false;
        },
        loadScore() {
            if (this.scoreId == "") {
                return;
            }

            this.modelAction = "serve";
            var saveData = this.getScoreData();

            var tmpScoreId = this.scoreId;
            var filterData = saveData.filter(function(data, index) {
                if (data.id == tmpScoreId) return true;
            });

            if (filterData.length == 0) {
                return;
            }
            this.score = filterData[0].score;
            this.modelTitle = filterData[0].title;
            this.modelDate = filterData[0].date;
            this.updateTeam(filterData[0].teamA, filterData[0].teamB);
            this.modelAPoint = filterData[0].teamAPoint;
            this.modelBPoint = filterData[0].teamBPoint;
            this.onChangeAction();
            this.outputlog();
            this.isDirty = false;
        },
        updateTeam(teamA, teamB) {
            for (var i = 0; i < 8; i++) {
                this.itemTeamA[i].key = teamA[i].key;
                this.itemTeamA[i].playerid = teamA[i].playerid;
                this.itemTeamA[i].no = teamA[i].no;
                this.itemTeamA[i].name = teamA[i].name;
                this.itemTeamA[i].sex = teamA[i].sex;
                this.itemTeamA[i].isEmpty = teamA[i].isEmpty;

                this.itemTeamB[i].key = teamB[i].key;
                this.itemTeamB[i].playerid = teamB[i].playerid;
                this.itemTeamB[i].no = teamB[i].no;
                this.itemTeamB[i].name = teamB[i].name;
                this.itemTeamB[i].sex = teamB[i].sex;
                this.itemTeamB[i].isEmpty = teamB[i].isEmpty;
            }
        },
        closeScore(callback) {
            if (this.isDirty) {
                this.dialogProp = {
                    title: "スコア入力の終了",
                    msg: "スコアが保存されていません。入力内容を破棄してスコア入力を終了しますか？",
                    positive: "終了",
                    negative: "キャンセル",
                    callback: function(result) {
                        if (result) {
                            callback();
                        }
                    }
                };
                this.$refs.confirm.open(this.dialogProp);
                return;
            }

            callback();
        },
        checkSaved() {
            if (this.isDirty) {
                this.showModalWarn = true;
            }
        },
        onClickScore(listIdx, item) {
            this.deleteScore(listIdx, item);
        },
        addScore(item) {
            if (item.isEmpty) {
                return;
            }
            this.pushScore(item.team, item.playerid, item.no, item.name, this.modelAction, this.getKind(), this.modelDetail);
            this.$refs.scoreCarousel.slideTo(this.score.length - 1);
            this.outputlog();
        },
        deleteScore(listIdx, deleteItem) {
            this.dialogProp = {
                title: "削除確認",
                msg: "削除しますか？",
                positive: "OK",
                negative: "キャンセル",
                listIndex: listIdx,
                deleteItem: deleteItem,
                callback: this.callbackDelete
            };
            this.$refs.confirm.open(this.dialogProp);
        },
        callbackDelete(result) {
            if (!result) {
                return;
            }
            this.deleteScoreItem(this.dialogProp.listIndex, this.dialogProp.deleteItem, false);
        },
        deleteScoreItem(listIndex, deleteItem, isRedo) {
            var tmpDeleteIdx = deleteItem.index;
            var newData = this.score.filter(function(s, index) {
                if (s.index != tmpDeleteIdx) return true;
            });
            this.score = newData;
            if (!isRedo) {
                this.undoList.push({
                    undoKind: "del",
                    delListIndex: listIndex,
                    delItem: deleteItem
                });
            }

            this.outputlog();
        },
        getMaxIndex() {
            if (this.score.length == 0) {
                return 0;
            }

            return Math.max.apply(
                null,
                this.score.map(function(s) {
                    return s.index;
                })
            );
        },
        onChangeAction() {
            console.log("onChangeAction");
            this.toggleKind();
            this.toggleDetail();
        },
        onChangeKind() {
            console.log("onChangeKind");
            this.toggleDetail();
        },
        toggleKind() {
            this.itemKind = this.itemKindDict[this.modelAction].kind;
            this.modelKind = this.itemKindDict[this.modelAction].name;
            this.modelDetail = this.itemKindDict[this.modelAction].detail;
        },
        toggleDetail() {
            this.itemDetail = itemJson.itemDetailDefault;
            this.modelDetail = "";

            if (this.modelAction == "serve") {
                if (this.modelKind == "point") {
                    this.itemDetail = itemJson.itemDetailServePoint;
                    this.modelDetail = this.itemDetail[0].name;
                } else if (this.modelKind == "miss") {
                    this.itemDetail = itemJson.itemDetailServeMiss;
                    this.modelDetail = this.itemDetail[0].name;
                }
            } else if (this.modelAction == "spike") {
                if (this.modelKind == "point") {
                    this.itemDetail = itemJson.itemDetailSpikePoint;
                    this.modelDetail = this.itemDetail[0].name;
                } else if (this.modelKind == "miss") {
                    this.itemDetail = itemJson.itemDetailSpikeMiss;
                    this.modelDetail = this.itemDetail[0].name;
                }
            } else if (this.modelAction == "receive") {
            } else if (this.modelAction == "block") {
                if (this.modelKind == "miss") {
                    this.itemDetail = itemJson.itemDetailBlockMiss;
                    this.modelDetail = this.itemDetail[0].name;
                }
            } else if (this.modelAction == "other_miss") {
                if (this.modelKind == "miss") {
                    this.itemDetail = itemJson.itemDetailOtherMiss;
                    this.modelDetail = this.itemDetail[0].name;
                }
            }
        },
        getKind() {
            if (this.modelKind == "other_miss" || this.modelKind == "faul") {
                return "";
            }
            return this.modelKind;
        },
        pushScore(team, playerid, no, name, action, kind, detail) {
            var teamcode;
            if (team == "a") {
                teamcode = 0;
            } else {
                teamcode = 1;
            }

            this.score.push({
                index: this.getMaxIndex() + 1,
                team: teamcode,
                playerid: playerid,
                no: no,
                name: name,
                action: action,
                kind: kind,
                detail: detail
            });

            this.undoList.push({
                undoKind: "add"
            });
        },
        rotateA() {
            this.rotate(this.itemTeamA);
        },
        rotateB() {
            this.rotate(this.itemTeamB);
        },
        rotate(team) {
            // jsonの順番を変えるようにしないとだめ
            var tempPlayerId = -1;
            var tempNo = -1;
            var tempName = "";
            var tempSex = 0;
            var first = true;
            var lastIdx;
            if (this.scoreSettings.isLibero) {
                lastIdx = 5;
            } else {
                lastIdx = 7;
            }
            for (var i = lastIdx; i > 0; i--) {
                if (team[i].isEmpty) {
                    continue;
                }
                if (first) {
                    tempPlayerId = team[i].playerid;
                    tempNo = team[i].no;
                    tempName = team[i].name;
                    tempSex = team[i].sex;
                    first = !first;
                }
                for (var j = i - 1; j >= 0; j--) {
                    if (!team[j].isEmpty) {
                        team[i].playerid = team[j].playerid;
                        team[i].no = team[j].no;
                        team[i].name = team[j].name;
                        team[i].sex = team[j].sex;
                        break;
                    }
                }
            }

            team[0].playerid = tempPlayerId;
            team[0].no = tempNo;
            team[0].name = tempName;
            team[0].sex = tempSex;
        },
        changeMember() {
            this.dialogProp = {
                itemTeamA: this.itemTeamA,
                itemTeamB: this.itemTeamB,
                members: this.members,
                callback: this.memberChangeResult
            };
            this.$refs.memberChange.open(this.dialogProp);
        },
        memberChangeResult(flg) {
            if (flg) {
                this.itemTeamA = this.dialogProp.itemTeamA;
                this.itemTeamB = this.dialogProp.itemTeamB;
            }
        },
        onHome() {
            this.closeScore(this.callbackHome);
        },
        callbackHome() {
            this.$emit("route-home");
        },
        onBack() {
            this.closeScore(this.callbackBack);
        },
        callbackBack() {
            this.$emit("route-score-list");
        }
    }
};
</script>

<style lang="scss">
@import "../style/common.scss";
@import "../style/score_input.scss";
</style>
