<template>
<div class="main-area">
    <div class="grid-scoreinput view-contents" v-bind:style="styleGrid">
        <div class="grid-action">
            <div v-bind:class="item.classGrid" v-for="item of itemAction" :key="item.id">
                <input type="radio" v-bind:id="item.id" name="action" v-bind:value="item.name" v-on:change="onChangeAction" v-model="modelAction">
                <label v-bind:for="item.id">
                    <v-btn v-show="modelAction == item.name" style="width:100%;height:100%;" color="primary" dark></v-btn>
                    <v-btn v-on:click="modelAction = item.name;onChangeAction();" v-show="modelAction != item.name" style="width:100%;height:100%;"></v-btn>
                    <span v-bind:style="styleLabel">{{item.label}}</span>
                    <serveSvg v-if="item.id == 'action_serve'"></serveSvg>
                    <spikeSvg v-else-if="item.id == 'action_spike'"></spikeSvg>
                    <blockSvg v-else-if="item.id == 'action_block'"></blockSvg>
                    <receiveSvg v-else-if="item.id == 'action_receive'"></receiveSvg>
                    <faulSvg v-else-if="item.id == 'action_faul'"></faulSvg>
                    <otherMissSvg v-else-if="item.id == 'action_other_miss'"></otherMissSvg>
                </label>
            </div>
        </div>

        <div class="grid-kind">
            <div v-bind:class="item.classGrid" v-for="item of itemKind" :key="item.id">
                <input type="radio" v-bind:id="item.id" name="kind" v-bind:value="item.name" v-on:change="onChangeKind" v-model="modelKind" v-bind:disabled="!item.isEnabled">
                <label v-bind:for="item.id">
                    <v-btn v-show="modelKind == item.name" style="width:100%;height:100%;" color="primary" dark></v-btn>
                    <v-btn v-bind:disabled="!item.isEnabled" v-on:click="modelKind = item.name;onChangeKind();" v-show="modelKind != item.name" style="width:100%;height:100%;"></v-btn>
                    <span v-bind:style="styleLabel">{{item.label}}</span>
                    <pointSvg v-if="item.name == 'point'"></pointSvg>
                    <otherMissSvg v-else-if="item.name == 'miss'"></otherMissSvg>
                    <rallySvg v-else-if="item.name == 'rally'"></rallySvg>
                </label>
            </div>
        </div>
        
        <div class="grid-detail">
            <div v-bind:class="item.classGrid" v-for="item of itemDetail" :key="item.id">
                <input type="radio" v-bind:id="item.id" name="detail" v-bind:value="item.name" v-model="modelDetail" v-bind:disabled="!item.isEnabled">
                <label v-bind:for="item.id">
                    <v-btn v-show="modelDetail == item.name" style="width:100%;height:100%;" color="primary" dark></v-btn>
                    <v-btn v-bind:disabled="!item.isEnabled" v-on:click="modelDetail = item.name;" v-show="modelDetail != item.name" style="width:100%;height:100%;"></v-btn>
                    <span v-bind:style="styleLabel">{{item.label}}</span>
                    <netSvg v-if="item.name == 'net'"></netSvg>
                    <inSvg v-else-if="item.name == 'in' || item.name == 'ace'"></inSvg>
                    <fakeSvg v-else-if="item.name == 'fake'"></fakeSvg>
                    <judgeSvg v-else-if="item.name == 'judge'"></judgeSvg>
                    <outSvg v-else-if="item.name == 'out'"></outSvg>
                    <blockSvg v-else-if="item.name == 'block' || item.name == 'blockout'"></blockSvg>
                    <suikomiSvg v-else-if="item.name == 'suikomi'"></suikomiSvg>
                    <omiaiSvg v-else-if="item.name == 'omiai'"></omiaiSvg>
                </label>
            </div>
        </div>
        
        <div class="coat" v-bind:style="styleGridCoat">
            <player v-on:on-click-player="addScore(item)" v-bind:item="item" v-bind:class="item.classGrid" v-for="item of itemTeamA" :key="item.key"></player>
            <rotate class="rotate-a" v-on:on-click-rotate="rotateA"></rotate>

            <player v-on:on-click-player="addScore(item)" v-bind:item="item" v-bind:class="item.classGrid" v-for="item of itemTeamB" :key="item.key"></player>
            <rotate class="rotate-b" v-on:on-click-rotate="rotateB"></rotate>
        </div>
        <hooper ref="scoreCarousel" :center-mode="true" :itemsToShow="10" class="score" style="height:150px;">
            <slide v-for="item of score" :key="item.index">
                <scoreObjSvg v-on:click-score="onClickScore(item)" :item="item" :idx="0"></scoreObjSvg>
            </slide>
        </hooper>
        <confirm ref="confirm"></confirm>
        <memberChange ref="memberChange"></memberChange>
        <scoreSave ref="save"></scoreSave>
    </div>
</div>
</template>

<script>
import confirm from './Material/Confirm'
import faulSvg from './SVG/FaulSVG'
import otherMissSvg from './SVG/OtherMissSVG'
import blockSvg from './SVG/BlockSVG'
import receiveSvg from './SVG/ReceiveSVG'
import spikeSvg from './SVG/SpikeSVG'
import serveSvg from './SVG/ServeSVG'
import scoreObjSvg from './SVG/ScoreObjSVG'
import memberSvg from './SVG/MemberSVG'
import player from './Material/Player'
import rotate from './Material/Rotate'
import memberChange from './Material/MemberChange'
import pointSvg from './SVG/PointSVG'
import netSvg from './SVG/NetSVG'
import outSvg from './SVG/OutSVG'
import inSvg from './SVG/InSVG'
import fakeSvg from './SVG/FakeSVG'
import judgeSvg from './SVG/JudgeSVG'
import suikomiSvg from './SVG/SuikomiSVG'
import omiaiSvg from './SVG/OmiaiSVG'
import rallySvg from './SVG/RallySVG'
import scoreSave from './Material/ScoreSave'

import { Hooper, Slide } from "hooper";
import "hooper/dist/hooper.css";


export default {
    name: 'score_input',
    components: {
        confirm,
        faulSvg,
        otherMissSvg,
        blockSvg,
        receiveSvg,
        spikeSvg,
        serveSvg,
        scoreObjSvg,
        memberSvg,
        player,
        rotate,
        memberChange,
        pointSvg,
        netSvg,
        outSvg,
        inSvg,
        fakeSvg,
        judgeSvg,
        suikomiSvg,
        omiaiSvg,
        rallySvg,
        scoreSave,
        Hooper,
        Slide,
    },
    props: {
        scoreId: String,
        isNewScore: Boolean,
        scoreInputProp: Object,
        commonProp: Object,
    },
    filters: {
        memberDisp(str) {

        },
    },
    data: function () {
        return {
            isSimple: true,
            scoreColor: [
                "#5acbc0",
                "#a8a093",
            ],
            score: [],
            scoreBk: [],
            scoreTempSave: [],
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
                callback: null,
            },
            isCancel: false,
            isDirty: false,
            showChangeArea: false,
            scoreSettings: {},
            styleGrid: {
                "grid-template-rows": "1fr 1fr 1fr 1fr 1fr 1fr 220px",
            },
            styleGridCoat: {
                "grid-template-rows": "1fr 1fr 1fr 1fr 1fr 1fr",
            },
            styleNavi: {
                "line-height": "700px",
            },
            styleLabel: {
                "line-height": "50px",
            },
            itemAction: [
                { label: "サーブ", name: "serve", id: "action_serve", classGrid: "select-item serve" },
                { label: "スパイク", name: "spike", id: "action_spike", classGrid: "select-item spike" },
                { label: "ブロック", name: "block", id: "action_block", classGrid: "select-item block" },
                { label: "レシーブ ", name: "receive", id: "action_receive", classGrid: "select-item receive" },
                { label: "他ミス", name: "other_miss", id: "action_other_miss", classGrid: "select-item other_miss" },
                { label: "ファウル", name: "faul", id: "action_faul", classGrid: "select-item faul" },
            ],
            itemKind: [
                { label: "ラリー", name: "rally", id: "kind_1", classGrid: "select-item rally", isEnabled: true, },
                { label: "ポイント", name: "point", id: "kind_2", classGrid: "select-item point", isEnabled: true, },
                { label: "ミス", name: "miss", id: "kind_3", classGrid: "select-item miss", isEnabled: true, },
                { label: "A", name: "a", id: "kind_4", classGrid: "select-item a", isEnabled: true, },
                { label: "B", name: "b", id: "kind_5", classGrid: "select-item b", isEnabled: true, },
                { label: "C", name: "c", id: "kind_6", classGrid: "select-item c", isEnabled: true, },
            ],
            itemDetail: [
                { label: "D1", name: "D1", id: "detail_1", classGrid: "select-item detail1 detail_1_label", isEnabled: true, },
                { label: "D2", name: "D2", id: "detail_2", classGrid: "select-item detail2 detail_2_label", isEnabled: true, },
                { label: "D3", name: "D3", id: "detail_3", classGrid: "select-item detail3 detail_3_label", isEnabled: true, },
                { label: "D4", name: "D4", id: "detail_4", classGrid: "select-item detail4 detail_4_label", isEnabled: true, },
                { label: "D5", name: "D5", id: "detail_5", classGrid: "select-item detail5 detail_5_label", isEnabled: true, },
                { label: "D6", name: "D6", id: "detail_6", classGrid: "select-item detail6 detail_6_label", isEnabled: true, },
            ],
            itemTeamA: [
                { key: "a1", team: "a", playerid:"", no: "", name: "", sex: 0, classGrid: "a1", isEmpty: true, isLibero: false, isFront: true},
                { key: "a2", team: "a", playerid:"", no: "", name: "", sex: 0, classGrid: "a2", isEmpty: true, isLibero: false, isFront: true},
                { key: "a3", team: "a", playerid:"", no: "", name: "", sex: 0, classGrid: "a3", isEmpty: true, isLibero: false, isFront: true},
                { key: "a4", team: "a", playerid:"", no: "", name: "", sex: 0, classGrid: "a4", isEmpty: true, isLibero: false, isFront: false},
                { key: "a5", team: "a", playerid:"", no: "", name: "", sex: 0, classGrid: "a5", isEmpty: true, isLibero: false, isFront: false},
                { key: "a6", team: "a", playerid:"", no: "", name: "", sex: 0, classGrid: "a6", isEmpty: true, isLibero: false, isFront: false},
                { key: "a7", team: "a", playerid:"", no: "", name: "", sex: 0, classGrid: "a7", isEmpty: true, isLibero: true, isFront: false},
                { key: "a8", team: "a", playerid:"", no: "", name: "", sex: 0, classGrid: "a8", isEmpty: true, isLibero: true, isFront: false},
            ],
            itemTeamB: [
                { key: "b1", team: "b", playerid:"", no: "", name: "", sex: 0, classGrid: "b1", isEmpty: true, isLibero: false, isFront: true},
                { key: "b2", team: "b", playerid:"", no: "", name: "", sex: 0, classGrid: "b2", isEmpty: true, isLibero: false, isFront: true},
                { key: "b3", team: "b", playerid:"", no: "", name: "", sex: 0, classGrid: "b3", isEmpty: true, isLibero: false, isFront: true},
                { key: "b4", team: "b", playerid:"", no: "", name: "", sex: 0, classGrid: "b4", isEmpty: true, isLibero: false, isFront: false},
                { key: "b5", team: "b", playerid:"", no: "", name: "", sex: 0, classGrid: "b5", isEmpty: true, isLibero: false, isFront: false},
                { key: "b6", team: "b", playerid:"", no: "", name: "", sex: 0, classGrid: "b6", isEmpty: true, isLibero: false, isFront: false},
                { key: "b7", team: "b", playerid:"", no: "", name: "", sex: 0, classGrid: "b7", isEmpty: true, isLibero: true, isFront: false},
                { key: "b8", team: "b", playerid:"", no: "", name: "", sex: 0, classGrid: "b8", isEmpty: true, isLibero: true, isFront: false},
            ],
            members: [],
        }
    },
    mounted() {
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

        this.loadMain();
        this.modelAction = "serve";
        this.updateUndoRedoButton();
        this.toggleKind();
        this.onChangeKind();

        var itemHeight = (window.innerHeight - (180 + 64)) / 6;
        this.styleGrid = {
            "grid-template-rows": itemHeight + "px " + itemHeight + "px " + itemHeight + "px " + itemHeight + "px " + itemHeight + "px " + itemHeight + "px 150px",
        };
        var itemHeightCoat = (window.innerHeight - (230 + 64)) / 6;
        this.styleGridCoat = {
            "grid-template-rows": itemHeightCoat + "px " + itemHeightCoat + "px " + itemHeightCoat + "px " + itemHeightCoat + "px " + itemHeightCoat + "px " + itemHeightCoat + "px",
        };
        this.styleNavi = {
            "line-height": window.innerHeight + "px",
        };
        this.styleLabel = {
            "line-height": (itemHeight - 10) + "px",
        };
    },
    methods: {
        getNowDateStr() {
            var twoDigit = function (value) {
                return ('0' + value).slice(-2);
            };
            var d = new Date();
            return [
                d.getFullYear(),
                twoDigit(d.getMonth() + 1),
                twoDigit(d.getDate())
            ].join('-');
        },
        outputlog() {
            // console.log(JSON.stringify(this.score, null, "    "));
        },
        undo() {
            if (this.score.length < 1) {
                return;
            }
            this.scoreBk.push(this.score.pop());
            this.updateUndoRedoButton();
            this.outputlog();

            this.isDirty = true;
            this.$refs.scoreCarousel.slideTo(this.score.length - 1);
        },
        getScoreLength() {
            return this.score.length;
        },
        getScoreRedoLength() {
            return this.scoreBk.length;
        },
        redo() {
            if (this.scoreBk.length < 1) {
                return;
            }
            var popdata = this.scoreBk.pop();
            popdata.index = this.score.length + 1;
            this.score.push(popdata);
            this.updateUndoRedoButton();
            this.outputlog();
            this.isDirty = true;
            this.$refs.scoreCarousel.slideTo(this.score.length - 1);
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
            if(!flg) {
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
                isTrash: false,
            };

            var saveDatas = this.getScoreData();

            var existsData = false;
            var tmpScoreId = this.scoreId;
            saveDatas.forEach(function (saveData) {
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
        load() {
            if (!this.isDirty) {
                this.loadMain();
                return;
            }

            this.dialogProp = {
                title: "確認",
                msg: "入力内容を破棄してデータを読み込みますか？",
                positive: "OK",
                negative: "キャンセル",
                callback: function (result) {
                    if (result) {
                        this.loadMain();
                    }
                },
            };
            this.$refs.confirm.open(this.dialogProp);
        },
        loadMain() {
            if (this.scoreId == "") {
                return;
            }

            this.modelAction = "serve";
            this.scoreBk = [];
            var saveData = this.getScoreData();

            var tmpScoreId = this.scoreId;
            var filterData = saveData.filter(function (data, index) {
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
            this.updateUndoRedoButton();
            this.toggleKind();
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
                    callback: function (result) {
                        if (result) {
                            callback();
                        }
                    },
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
        onClickScore(item) {
            this.deleteScore(item.index);
        },
        addScore(item) {
            if (item.isEmpty) {
                return;
            }
            this.pushScore(item.team, item.playerid, item.no, item.name, this.modelAction, this.getKind(), this.modelDetail);
            this.scoreBk = [];
            this.updateUndoRedoButton();
            this.$refs.scoreCarousel.slideTo(this.score.length - 1);
            this.outputlog();
        },
        deleteScore(deleteIndex) {
            this.dialogProp = {
                title: "削除確認",
                msg: "削除しますか？",
                positive: "OK",
                negative: "キャンセル",
                deleteIndex: deleteIndex,
                callback: this.callbackDelete,
            };
            this.$refs.confirm.open(this.dialogProp);
        },
        callbackDelete(result) {
            if (!result) {
                return;
            }

            var tmpDeleteIndex = this.dialogProp.deleteIndex;
            var newData = this.score.filter(function (s, index) {
                if (s.index != tmpDeleteIndex) return true;
            });

            this.score = newData;

            this.outputlog();

            this.isDirty = true;
        },
        getMaxIndex() {
            if (this.score.length == 0) {
                return 0;
            }

            return Math.max.apply(null, this.score.map(function (s) { return s.index; }));
        },
        onChangeAction() {
            console.log("onChangeAction");
            this.toggleKind();
            this.onChangeKind();
        },
        toggleKind() {
            this.itemKind[0].label = "";
            this.itemKind[1].label = "";
            this.itemKind[2].label = "";
            this.itemKind[3].label = "";
            this.itemKind[4].label = "";
            this.itemKind[5].label = "";

            this.itemKind[0].name = "-";
            this.itemKind[1].name = "-";
            this.itemKind[2].name = "-";
            this.itemKind[3].name = "-";
            this.itemKind[4].name = "-";
            this.itemKind[5].name = "-";

            this.itemKind[0].isEnabled = false;
            this.itemKind[1].isEnabled = false;
            this.itemKind[2].isEnabled = false;
            this.itemKind[3].isEnabled = false;
            this.itemKind[4].isEnabled = false;
            this.itemKind[5].isEnabled = false;

            this.modelDetail = "";

            if (this.modelAction == 'serve' || this.modelAction == 'block') {
                this.itemKind[0].label = "ポイント";
                this.itemKind[1].label = "ミス";

                this.itemKind[0].name = "point";
                this.itemKind[1].name = "miss";

                this.itemKind[0].isEnabled = true;
                this.itemKind[1].isEnabled = true;

                this.modelKind = "point";
                this.modelDetail = "D1";
            } else if (this.modelAction == 'spike') {
                this.itemKind[0].label = "ラリー";
                this.itemKind[1].label = "ポイント";
                this.itemKind[2].label = "ミス";

                this.itemKind[0].name = "rally";
                this.itemKind[1].name = "point";
                this.itemKind[2].name = "miss";

                this.itemKind[0].isEnabled = true;
                this.itemKind[1].isEnabled = true;
                this.itemKind[2].isEnabled = true;

                this.modelKind = "rally";
                this.modelDetail = "";
            } else if (this.modelAction == 'other_miss') {
                this.itemKind[0].label = "ミス";

                this.itemKind[0].name = "miss";

                this.itemKind[0].isEnabled = true;

                this.modelKind = "miss";
                this.modelDetail = "D1";
            } else if (this.modelAction == 'receive' ||
                this.modelAction == 'faul') {
                this.itemKind[0].label = "ミス";

                this.itemKind[0].name = "miss";

                this.itemKind[0].isEnabled = true;

                this.modelKind = "miss";
                this.modelDetail = "";
            }
        },
        onChangeKind() {
            this.changeDetailLabel();
        },
        changeDetailLabel() {
            this.itemDetail[0].label = "";
            this.itemDetail[1].label = "";
            this.itemDetail[2].label = "";
            this.itemDetail[3].label = "";
            this.itemDetail[4].label = "";
            this.itemDetail[5].label = "";

            this.itemDetail[0].name = "-";
            this.itemDetail[1].name = "-";
            this.itemDetail[2].name = "-";
            this.itemDetail[3].name = "-";
            this.itemDetail[4].name = "-";
            this.itemDetail[5].name = "-";

            this.itemDetail[0].isEnabled = false;
            this.itemDetail[1].isEnabled = false;
            this.itemDetail[2].isEnabled = false;
            this.itemDetail[3].isEnabled = false;
            this.itemDetail[4].isEnabled = false;
            this.itemDetail[5].isEnabled = false;

            this.modelDetail = "";

            if (this.modelAction == "serve") {
                if (this.modelKind == "point") {
                    var idx = 0;
                    this.itemDetail[idx].label = "エース";
                    this.itemDetail[idx].name = "ace";
                    this.itemDetail[idx].isEnabled = true;
                    idx++;

                    this.modelDetail = this.itemDetail[0].name;
                } else if (this.modelKind == "miss") {
                    var idx = 0;
                    this.itemDetail[idx].label = "アウト";
                    this.itemDetail[idx].name = "out";
                    this.itemDetail[idx].isEnabled = true;
                    idx++;

                    this.itemDetail[idx].label = "ネット";
                    this.itemDetail[idx].name = "net";
                    this.itemDetail[idx].isEnabled = true;
                    idx++;

                    this.modelDetail = this.itemDetail[0].name;
                }
            } else if (this.modelAction == "spike") {
                if (this.modelKind == "point") {
                    var idx = 0;

                    this.itemDetail[idx].label = "イン";
                    this.itemDetail[idx].name = "in";
                    this.itemDetail[idx].isEnabled = true;
                    idx++;

                    this.itemDetail[idx].label = "フェイント";
                    this.itemDetail[idx].name = "fake";
                    this.itemDetail[idx].isEnabled = true;
                    idx++;

                    this.itemDetail[idx].label = "ブロックアウト";
                    this.itemDetail[idx].name = "blockout";
                    this.itemDetail[idx].isEnabled = true;
                    idx++;
                    this.modelDetail = this.itemDetail[0].name;
                } else if (this.modelKind == "miss") {
                    var idx = 0;
                    this.itemDetail[idx].label = "アウト";
                    this.itemDetail[idx].name = "out";
                    this.itemDetail[idx].isEnabled = true;
                    idx++;

                    this.itemDetail[idx].label = "ネット";
                    this.itemDetail[idx].name = "net";
                    this.itemDetail[idx].isEnabled = true;
                    idx++;

                    this.itemDetail[idx].label = "ブロック";
                    this.itemDetail[idx].name = "block";
                    this.itemDetail[idx].isEnabled = true;
                    idx++;

                    this.modelDetail = this.itemDetail[0].name;
                }
            } else if (this.modelAction == "receive") {
            } else if (this.modelAction == "block") {
                if (this.modelKind == "miss") {
                    var idx = 0;
                    this.itemDetail[idx].label = "アウト";
                    this.itemDetail[idx].name = "out";
                    this.itemDetail[idx].isEnabled = true;
                    idx++;

                    this.itemDetail[idx].label = "吸い込み";
                    this.itemDetail[idx].name = "suikomi";
                    this.itemDetail[idx].isEnabled = true;
                    idx++;

                    this.modelDetail = this.itemDetail[0].name;
                }
            } else if (this.modelAction == "other_miss") {
                if (this.modelKind == "miss") {
                    var idx = 0;
                    this.itemDetail[idx].label = "ジャッジ";
                    this.itemDetail[idx].name = "judge";
                    this.itemDetail[idx].isEnabled = true;
                    idx++;

                    this.itemDetail[idx].label = "お見合い";
                    this.itemDetail[idx].name = "omiai";
                    this.itemDetail[idx].isEnabled = true;
                    idx++;

                    this.modelDetail = this.itemDetail[0].name;
                }
            }
        },
        getKind() {
            if (this.modelKind == 'other_miss' || this.modelKind == 'faul') {
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
                detail: detail,
            });
            this.isDirty = true;
        },
        updateUndoRedoButton() {
            if (this.score.length < 1) {
                this.scoreInputProp.setEnableUndo(false);
            } else {
                this.scoreInputProp.setEnableUndo(true);
            }
            if (this.scoreBk.length < 1) {
                this.scoreInputProp.setEnableRedo(false);
            } else {
                this.scoreInputProp.setEnableRedo(true);
            }
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
            if(this.scoreSettings.isLibero) {
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
        },
    },
}
</script>

<style src="../style/style.css" lang="css">
</style>
<style>
  .grid-scoreinput {
    margin: 10px;
    display: grid;
    grid-column-gap: 10px;
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
    grid-template-rows: 1fr 1fr 1fr 1fr 1fr 1fr 220px;
    grid-template-areas: "grid-action grid-kind grid-detail coat coat""grid-action grid-kind grid-detail coat coat""grid-action grid-kind grid-detail coat coat""grid-action grid-kind grid-detail coat coat""grid-action grid-kind grid-detail coat coat""grid-action grid-kind grid-detail coat coat""score score score score score";
  }

  .grid-action {
    display: grid;
    grid-row-gap: 10px;
    grid-template-columns: 1fr;
    grid-template-rows: 1fr 1fr 1fr 1fr 1fr 1fr;
    grid-template-areas: "serve""spike""block""receive""other_miss""faul";
    grid-area: grid-action;
  }

  .spike {
    grid-area: spike;
  }

  .block {
    grid-area: block;
  }

  .receive {
    grid-area: receive;
  }

  .serve {
    grid-area: serve;
  }

  .other_miss {
    grid-area: other_miss;
  }

  .faul {
    grid-area: faul;
  }

  .grid-kind {
    display: grid;
    grid-row-gap: 10px;
    grid-template-columns: 1fr;
    grid-template-rows: 1fr 1fr 1fr 1fr 1fr 1fr;
    grid-template-areas: "rally""point""miss""a""b""c";
    grid-area: grid-kind;
  }

  .rally {
    grid-area: rally;
  }

  .point {
    grid-area: point;
  }

  .miss {
    grid-area: miss;
  }

  .grid-detail {
    margin-right: 20px;
    display: grid;
    grid-row-gap: 10px;
    grid-template-columns: 1fr;
    grid-template-rows: 1fr 1fr 1fr 1fr 1fr 1fr;
    grid-template-areas: "detail1""detail2""detail3""detail4""detail5""detail6";
    grid-area: grid-detail;
  }

  .detail1 {
    grid-area: detail1;
  }

  .detail2 {
    grid-area: detail2;
  }

  .detail3 {
    grid-area: detail3;
  }

  .detail4 {
    grid-area: detail4;
  }

  .detail5 {
    grid-area: detail5;
  }

  .detail6 {
    grid-area: detail6;
  }

  .score {
    width: 100%;
    height: 100%;
    margin-top: 10px;
    /* margin-bottom: 10px; */
    /* background: #eee; */
    /* filter: drop-shadow(1px 1px 1px rgba(0, 0, 0, 0.6)); */
    grid-area: score;
  }

  .coat {
    display: grid;
    grid-row-gap: 10px;
    grid-column-gap: 10px;
    grid-template-columns: 1fr 1fr 1fr;
    grid-template-rows: 1fr 1fr 1fr 1fr 1fr 1fr;
    grid-template-areas: "a7 a8 rotate-a""a4 a5 a6""a3 a2 a1""b1 b2 b3""b6 b5 b4""rotate-b b8 b7";
    grid-area: coat;
  }

  .a1 {
    grid-area: a1;
  }

  .a2 {
    grid-area: a2;
  }

  .a3 {
    grid-area: a3;
  }

  .a4 {
    grid-area: a4;
  }

  .a5 {
    grid-area: a5;
  }

  .a6 {
    grid-area: a6;
  }

  .a7 {
    grid-area: a7;
  }

  .a8 {
    grid-area: a8;
  }

  .rotate-a {
    /* color: #333;
    background: #eee; */
    grid-area: rotate-a;
  }

  .b1 {
    grid-area: b1;
  }

  .b2 {
    grid-area: b2;
  }

  .b3 {
    grid-area: b3;
  }

  .b4 {
    grid-area: b4;
  }

  .b5 {
    grid-area: b5;
  }

  .b6 {
    grid-area: b6;
  }

  .b7 {
    grid-area: b7;
  }

  .b8 {
    grid-area: b8;
  }

  /* .forward-position {
    background-color: #d6edbe;
  }

  .back-position {
    background-color: #edd5be;
  } */

  .rotate-b {
    /* color: #333;
    background: #eee; */
    grid-area: rotate-b;
  }

  /* .coat div:active {
    color: #fff;
    background-color: #005ab3;
  } */
</style>
