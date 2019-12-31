const template = `
    <div class="grid-scoreinput">
        <div class="grid-action">
            <div v-bind:class="item.classGrid" v-for="item of itemAction">
                <input type="radio" v-bind:id="item.id" name="action" v-bind:value="item.name" v-on:change="onChangeAction" v-model="modelAction">
                <label v-bind:for="item.id">
                    <!--
                    {{item.label}}<br>
                    -->
                    <serve width="100%" height="100%" v-if="item.id == 'action_serve'"></serve>
                    <spike width="100%" height="100%" v-else-if="item.id == 'action_spike'"></spike>
                    <block width="100%" height="100%" v-else-if="item.id == 'action_block'"></block>
                    <receive width="100%" height="100%" v-else-if="item.id == 'action_receive'"></receive>
                    <faul width="100%" height="100%" v-else-if="item.id == 'action_faul'"></faul>
                    <other_miss width="100%" height="100%" v-else-if="item.id == 'action_other_miss'"></other_miss>
                </label>
            </div>
        </div>

        <div class="grid-kind">
            <div v-bind:class="item.classGrid" v-for="item of itemKind">
                <input type="radio" v-bind:id="item.id" name="kind" v-bind:value="item.name" v-on:change="onChangeKind" v-model="modelKind" v-bind:disabled="!item.isEnabled">
                <label v-bind:for="item.id">
                    {{item.label}}
                </label>
            </div>
        </div>
        
        <div class="grid-detail" v-show="!showChangeArea">
            <div v-bind:class="item.classGrid" v-for="item of itemDetail">
                <input type="radio" v-bind:id="item.id" name="detail" v-bind:value="item.name" v-model="modelDetail" v-bind:disabled="!item.isEnabled">
                <label v-bind:for="item.id">
                    {{item.label}}
                </label>
            </div>
        </div>
        
        <ul class="coat"> 
            <li style="text-align: center;" v-bind:class="item.classGrid" v-on:click="addScore(item)" v-for="item of itemTeamA" :key="item.key" class="grid_style_team">
                <span v-show="!item.isEmpty">{{item.no + ":" + item.name}}</span><br>
                <player v-if="item.sex == 0" v-show="!item.isEmpty"></player>
                <player_f v-else v-show="!item.isEmpty"></player_f>
            </li>
            <li style="text-align: center;" v-bind:class="item.classGrid" v-on:click="addScore(item)" v-for="item of itemTeamB" :key="item.key" class="grid_style_team">
                <span v-show="!item.isEmpty">{{item.no + ":" + item.name}}</span><br>
                <player v-if="item.sex == 0" v-show="!item.isEmpty"></player>
                <player_f v-else v-show="!item.isEmpty"></player_f>
            </li>
        </ul>
<!--
        <ul class="change-area" v-show="showChangeArea" style="overflow-x:hidden; overflow-y:scroll;">
            <li class="member" v-for="member of members" :key="member.no">
                <input type="radio" v-bind:id="'mem_' + member.no" name="member" v-on:change="onChangeMember(member)" v-bind:value="member.no" v-model="modelMember">
                <label v-bind:for="'mem_' + member.no">
                    {{member.no}}<br>{{member.name}}<br>
                    <player v-if="member.sex == 0"></player>
                    <player_f v-else></player_f>
                </label>
            </li>
        </ul>
-->
        <div class="score grid_style" style="overflow-x:scroll; overflow-y:hidden;">
            <svg v-bind:width="score.length * 90 + 10" style="height: 100%;max-width:none;max-height:none;">
                <scoreObj v-on:click-score="onClickScore(item)" v-for="(item, idx) of score" :key="item.index" :item="item" :idx="idx"></scoreObj>
            </svg>
        </div>

        <div class="navi_a">
            <span>
                <span>戻る</span>
                <svg v-on:click="closeScore(true)" xmlns="http://www.w3.org/2000/svg" width="70" height="70" viewBox="0 0 24 24" fill="none" stroke="#000000" stroke-width="1" stroke-linecap="round" stroke-linejoin="round"><path d="M19 12H6M12 5l-7 7 7 7"/></svg>
                <br>
                <br>
                <span>ホーム</span>
                <svg xmlns="http://www.w3.org/2000/svg" width="70" height="70" viewBox="0 0 24 24" fill="none" stroke="#000000" stroke-width="1" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M20 9v11a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V9"/>
                    <path d="M9 22V12h6v10M2 10.6L12 2l10 8.6"/>
                </svg>
                <br>
                <br>
                <span>設定</span>
                <svg xmlns="http://www.w3.org/2000/svg" width="70" height="70" viewBox="0 0 24 24" fill="none" stroke="#000000" stroke-width="1" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg>
            </span>
        </div>

        <div class="navi_b">
            <span>
                <svg v-on:click="showModalSave = true" xmlns="http://www.w3.org/2000/svg" width="70" height="70" viewBox="0 0 24 24" fill="none" stroke="#000000" stroke-width="1" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"></path>
                    <polyline points="17 21 17 13 7 13 7 21"></polyline>
                    <polyline points="7 3 7 8 15 8"></polyline>
                </svg>
                <svg v-on:click="load" xmlns="http://www.w3.org/2000/svg" width="70" height="70" viewBox="0 0 24 24" fill="none" stroke="#000000" stroke-width="1" stroke-linecap="round" stroke-linejoin="round"><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path><rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect></svg>
                <span>ローテーション</span>
                <rotation v-on:rotate-member="rotateA"></rotation>
                <span>ローテーション</span>
                <rotation v-on:rotate-member="rotateB"></rotation>
                <span>交代</span>
                <member v-on:change-member="changeMember"></member>
                <svg v-if="undoEnabled" v-bind:disabled="!undoEnabled" v-on:click="undo" xmlns="http://www.w3.org/2000/svg" width="70" height="70" viewBox="0 0 24 24" fill="none" stroke="#000000" stroke-width="1" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M10 16l-6-6 6-6"/>
                    <path d="M20 21v-7a4 4 0 0 0-4-4H5"/>
                </svg>
                <svg v-else v-bind:disabled="!undoEnabled" v-on:click="undo" xmlns="http://www.w3.org/2000/svg" width="70" height="70" viewBox="0 0 24 24" fill="none" stroke="#cacaca" stroke-width="1" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M10 16l-6-6 6-6"/>
                    <path d="M20 21v-7a4 4 0 0 0-4-4H5"/>
                </svg>
                <svg v-if="redoEnabled" v-bind:disabled="!redoEnabled" v-on:click="redo" xmlns="http://www.w3.org/2000/svg" width="70" height="70" viewBox="0 0 24 24" fill="none" stroke="#000000" stroke-width="1" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M14 16l6-6-6-6"/>
                    <path d="M4 21v-7a4 4 0 0 1 4-4h11"/>
                </svg>
                <svg v-else v-bind:disabled="!redoEnabled" v-on:click="redo" xmlns="http://www.w3.org/2000/svg" width="70" height="70" viewBox="0 0 24 24" fill="none" stroke="#cacaca" stroke-width="1" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M14 16l6-6-6-6"/>
                    <path d="M4 21v-7a4 4 0 0 1 4-4h11"/>
                </svg>
            </span>
        </div>

        <div name="modalSave" v-if="showModalSave">
            <transition>
                <div class="modal-mask">
                    <div class="modal-wrapper">
                        <div class="modal-container">

                            <div class="modal-header">
                                <h3 slot="header">スコアの保存</h3>
                            </div>

                            <div class="modal-body">
                                <slot name="body">
                                    試合名<input type="text" v-model="modelTitle"/><br>
                                    日付<input type="date" v-model="modelDate" /><br>
                                    得点<input type="number" v-model="modelAPoint" />－
                                    <input type="number" v-model="modelBPoint" />
                                </slot>
                            </div>

                            <div class="modal-footer">
                                <slot name="footer">
                                    <button class="modal-default-button" @click="showModalSave = false">
                                        キャンセル
                                    </button>
                                    <button class="modal-default-button" @click="save">
                                        保存
                                    </button>
                                </slot>
                            </div>
                        </div>
                    </div>
                </div>
            </transition>
        </div>
        <div name="modalWarn" v-if="showModalWarn">
            <transition>
                <div class="modal-mask">
                    <div class="modal-wrapper">
                        <div class="modal-container">

                            <div class="modal-header">
                                <h3 slot="header">スコア入力の終了</h3>
                            </div>

                            <div class="modal-body">
                                <slot name="body">
                                    スコアが保存されていません。<br>
                                    入力内容を破棄して画面を移動しますか？
                                </slot>
                            </div>

                            <div class="modal-footer">
                                <slot name="footer">
                                    <button class="modal-default-button" @click="showModalWarn = false">
                                        キャンセル
                                    </button>
                                    <button class="modal-default-button" @click="closeScore(false)">
                                        続行
                                    </button>
                                </slot>
                            </div>
                        </div>
                    </div>
                </div>
            </transition>
        </div>
        <confirm v-if="showModalConfirm" v-on:dialogResult="result" :title="title" :msg="msg" :positive="positive" :negative="negative"></confirm>
        <memberChangeComp v-if="showModalMemberChange" v-on:member-change-result="memberChangeResult" :title="title" :msg="msg" :positive="positive" :negative="negative" :itemTeamA="itemTeamA" :itemTeamB="itemTeamB" :members="members"></memberChangeComp>
    </div>
`;

import confirm from './confirm.js'
import faul from './faul.js'
import other_miss from './other_miss.js'
import block from './block.js'
import receive from './receive.js'
import spike from './spike.js'
import serve from './serve.js'
import scoreObj from './score_obj.js'
import member from './member.js'
import player from './player.js'
import player_f from './player_f.js'
import rotation from './rotate.js'
import memberChangeComp from './MemberChangeComp.js'

export default {
    template,
    components: {
        confirm,
        faul,
        other_miss,
        block,
        receive,
        spike,
        serve,
        scoreObj,
        member,
        player,
        player_f,
        rotation,
        memberChangeComp,
    },
    props: {
        scoreId: String,
    },
    filters: {
        memberDisp(str) {

        },
    },
    // watch: {

    // },
    data: function () {
        return {
            scoreColor: [
                "#5acbc0",
                "#a8a093",
            ],
            score: [],
            scoreBk: [],
            scoreTempSave: [],
            undoEnabled: false,
            redoEnabled: false,
            modelAction: "",
            modelKind: "",
            modelDetail: "",
            modelTitle: "",
            // modelMember: "",
            // selectedMember: null,
            modelDate: "",
            modelAPoint: 0,
            modelBPoint: 0,
            showModalSave: false,
            showModalWarn: false,
            showModalConfirm: false,
            showModalMemberChange: false,
            title: "",
            msg: "",
            positive: "",
            negative: "",
            callbackConfirm: "",
            isCancel: false,
            isDirty: false,
            showChangeArea: false,
            // styleChangeArea: {
            //     "grid-template-columns": "70px 1fr 1fr 1fr 1fr 1fr 0fr 70px",
            // },
            // styleHiddenCoatMember: {
            //     visibility: "hidden",
            // },
            itemAction: [
                {
                    label: "Serve",
                    name: "serve",
                    id: "action_serve",
                    classGrid: "action serve"
                },
                {
                    label: "Spike",
                    name: "spike",
                    id: "action_spike",
                    classGrid: "action spike"
                },
                {
                    label: "Block",
                    name: "block",
                    id: "action_block",
                    classGrid: "action block"
                },
                {
                    label: "Receive",
                    name: "receive",
                    id: "action_receive",
                    classGrid: "action receive"
                },
                {
                    label: "Other Miss",
                    name: "other_miss",
                    id: "action_other_miss",
                    classGrid: "action other_miss"
                },
                {
                    label: "Faul",
                    name: "faul",
                    id: "action_faul",
                    classGrid: "action faul",
                    imgsrc: "./pic/faul.png",
                },
            ],
            itemKind: [
                {
                    label: "Rally",
                    name: "rally",
                    id: "kind_rally",
                    classGrid: "kind rally kind_rally_label",
                    isEnabled: true,
                },
                {
                    label: "Point",
                    name: "point",
                    id: "kind_point",
                    classGrid: "kind point kind_point_label",
                    isEnabled: true,
                },
                {
                    label: "Miss",
                    name: "miss",
                    id: "kind_miss",
                    classGrid: "kind miss kind_miss_label",
                    isEnabled: true,
                },
                {
                    label: "A",
                    name: "a",
                    id: "kind_a",
                    classGrid: "kind a kind_a_label",
                    isEnabled: true,
                },
                {
                    label: "B",
                    name: "b",
                    id: "kind_b",
                    classGrid: "kind b kind_b_label",
                    isEnabled: true,
                },
                {
                    label: "C",
                    name: "c",
                    id: "kind_c",
                    classGrid: "kind c kind_c_label",
                    isEnabled: true,
                },
            ],
            itemDetail: [
                {
                    label: "D1",
                    name: "D1",
                    id: "detail_1",
                    classGrid: "detail detail1 detail_1_label",
                    isEnabled: true,
                },
                {
                    label: "D2",
                    name: "D2",
                    id: "detail_2",
                    classGrid: "detail detail2 detail_2_label",
                    isEnabled: true,
                },
                {
                    label: "D3",
                    name: "D3",
                    id: "detail_3",
                    classGrid: "detail detail3 detail_3_label",
                    isEnabled: true,
                },
                {
                    label: "D4",
                    name: "D4",
                    id: "detail_4",
                    classGrid: "detail detail4 detail_4_label",
                    isEnabled: true,
                },
                {
                    label: "D5",
                    name: "D5",
                    id: "detail_5",
                    classGrid: "detail detail5 detail_5_label",
                    isEnabled: true,
                },
                {
                    label: "D6",
                    name: "D6",
                    id: "detail_6",
                    classGrid: "detail detail6 detail_6_label",
                    isEnabled: true,
                },
            ],
            itemTeamA: [
                { key: "a7", team: "a", no: "", name: "", sex: 0, classGrid: "a7", isEmpty: true, },
                { key: "a8", team: "a", no: "", name: "", sex: 0, classGrid: "a8", isEmpty: true, },
                { key: "a9", team: "a", no: "", name: "", sex: 0, classGrid: "a9", isEmpty: true, },
                { key: "a4", team: "a", no: "", name: "", sex: 0, classGrid: "a4", isEmpty: true, },
                { key: "a5", team: "a", no: "", name: "", sex: 0, classGrid: "a5", isEmpty: true, },
                { key: "a6", team: "a", no: "", name: "", sex: 0, classGrid: "a6", isEmpty: true, },
                { key: "a3", team: "a", no: "", name: "", sex: 0, classGrid: "a3", isEmpty: true, },
                { key: "a2", team: "a", no: "", name: "", sex: 0, classGrid: "a2", isEmpty: true, },
                { key: "a1", team: "a", no: "", name: "", sex: 0, classGrid: "a1", isEmpty: true, },
            ],
            itemTeamB: [
                { key: "b1", team: "b", no: "", name: "", sex: 0, classGrid: "b1", isEmpty: true, },
                { key: "b2", team: "b", no: "", name: "", sex: 0, classGrid: "b2", isEmpty: true, },
                { key: "b3", team: "b", no: "", name: "", sex: 0, classGrid: "b3", isEmpty: true, },
                { key: "b6", team: "b", no: "", name: "", sex: 0, classGrid: "b6", isEmpty: true, },
                { key: "b5", team: "b", no: "", name: "", sex: 0, classGrid: "b5", isEmpty: true, },
                { key: "b4", team: "b", no: "", name: "", sex: 0, classGrid: "b4", isEmpty: true, },
                { key: "b9", team: "b", no: "", name: "", sex: 0, classGrid: "b9", isEmpty: true, },
                { key: "b8", team: "b", no: "", name: "", sex: 0, classGrid: "b8", isEmpty: true, },
                { key: "b7", team: "b", no: "", name: "", sex: 0, classGrid: "b7", isEmpty: true, },
            ],
            members: [
                { no: -1, name: "（なし）", },
                { no: 1, name: "しんや", },
                { no: 2, name: "ふじわら", },
                { no: 3, name: "いけだ", },
                { no: 4, name: "ながおか", },
                { no: 5, name: "なごや", },
                { no: 6, name: "のせ", },
                { no: 7, name: "みさ", },
                { no: 8, name: "よしはら", },
                { no: 9, name: "はづき", },
                { no: 10, name: "ほし", },
                { no: 11, name: "わだ", },
                { no: 100, name: "あまちゃん", },
                { no: 101, name: "ふゆこ", },
                { no: 102, name: "こまつ", },
                { no: 103, name: "ひーちゃん", },
                { no: 104, name: "まんべ", },
                { no: 105, name: "まりこ", },
                { no: 106, name: "かわ", },
                { no: 107, name: "ぶん", },
                { no: 108, name: "あっきーな", },
                { no: 109, name: "みずか", },
                { no: 110, name: "てら", },
                { no: 111, name: "きく", },
                { no: 112, name: "たける", },
                { no: 113, name: "やまぴ", },
                { no: 114, name: "のん", },
                { no: 115, name: "せき", },
            ],
        }
    },
    mounted() {
        // #1f77b4
        // console.log("color:" + this.scoreColor(0));
        // this.createDigest("abc");
        var d = new Date();
        var format_str = 'YYYY-MM-DD';
        format_str = format_str.replace(/YYYY/g, d.getFullYear());
        format_str = format_str.replace(/MM/g, d.getMonth() + 1);
        format_str = format_str.replace(/DD/g, d.getDate());
        this.modelDate = format_str;

        this.modelAction = "serve";
        this.updateUndoRedoButton();
        this.toggleKind();
        this.onChangeKind();
        this.loadMain();
        // localStorage.removeItem("score");
    },
    // computed: {
    //     modelAction: {
    //         get() {
    //             return this.value
    //         },
    //         set(newVal) {
    //             this.valueAction = newVal
    //         }
    //     }
    // },
    methods: {
        outputlog() {
            console.log(JSON.stringify(this.score, null, "    "));
        },
        undo() {
            if (this.score.length < 1) {
                return;
            }
            this.scoreBk.push(this.score.pop());
            this.updateUndoRedoButton();
            this.outputlog();
            // this.$emit('commit1', 'aaa');
            this.isDirty = true;
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
        },
        save() {
            // 保存ボタンの制御を行う
            if (this.modelTitle == "") {
                return;
            }
            this.showModalSave = false;
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

            var saveDatas = JSON.parse(localStorage.getItem("score"));
            if (saveDatas == null) {
                saveDatas = [];
            }
            var existsData = false;
            var tmpScoreId = this.scoreId;
            saveDatas.forEach(function (saveData) {
                if (saveData.id == tmpScoreId) {
                    console.log("exists save data.");
                    saveData.title = data.title;
                    saveData.date = data.date;
                    saveData.score = data.score;
                    existsData = true;
                }
            });

            if (!existsData) {
                console.log("not exists save data.");
                saveDatas.push(data);
            }

            localStorage.setItem("score", JSON.stringify(saveDatas));
            this.isDirty = false;
        },
        load() {
            if (!this.isDirty) {
                this.loadMain();
                return;
            }
            this.title = "確認";
            this.msg = "入力内容を破棄してデータを読み込みますか？";
            this.positive = "OK";
            this.negative = "Cancel";
            this.showModalConfirm = true;

            this.callbackConfirm = function (result) {
                if (result) {
                    this.loadMain();
                }
            };
        },
        loadMain() {
            if (this.scoreId == "") {
                return;
            }

            this.modelAction = "serve";
            this.scoreBk = [];
            var saveData = JSON.parse(localStorage.getItem("score"));

            if (saveData == null) {
                saveData = [];
            }

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
            this.itemTeamA = filterData[0].teamA;
            this.itemTeamB = filterData[0].teamB;
            this.modelAPoint = filterData[0].teamAPoint;
            this.modelBPoint = filterData[0].teamBPoint;
            this.updateUndoRedoButton();
            this.toggleKind();
            this.outputlog();
            this.isDirty = false;
        },
        closeScore(isCheck) {
            this.showModalWarn = false;
            if (isCheck && this.isDirty) {
                this.showModalWarn = true;
                return;
            }

            this.$router.push({ path: '/scorelist' });
        },
        checkSaved() {
            if (this.isDirty) {
                this.showModalWarn = true;
            }
        },
        onClickScore(item) {
            console.log("onClickScore");
            this.deleteScore(item.index);
        },
        addScore(item) {
            // if (this.showChangeArea && this.selectedMember != null) {
            //     if (this.selectedMember.no == -1) {
            //         item.no = "";
            //         item.name = "";
            //         item.sex = 0;
            //         item.isEmpty = true;
            //     } else {
            //         item.no = this.selectedMember.no;
            //         item.name = this.selectedMember.name;
            //         item.sex = this.selectedMember.sex;
            //         item.isEmpty = false;
            //     }
            // } else {
            if (item.isEmpty) {
                return;
            }
            this.pushScore(item.team, item.no, item.name, this.modelAction, this.getKind(), this.modelDetail);
            this.scoreBk = [];
            this.updateUndoRedoButton();
            this.outputlog();
            // }
        },
        deleteScore(deleteIndex) {
            this.title = "削除確認";
            this.msg = "削除しますか？";
            this.positive = "OK";
            this.negative = "Cancel";
            this.showModalConfirm = true;

            this.callbackConfirm = function (result) {
                if (!result) {
                    return;
                }

                var newData = this.score.filter(function (s, index) {
                    if (s.index != deleteIndex) return true;
                });

                this.score = newData;

                this.outputlog();

                this.isDirty = true;
            }
        },
        getMaxIndex() {
            if (this.score.length == 0) {
                return 0;
            }

            return Math.max.apply(null, this.score.map(function (s) { return s.index; }));
        },
        onChangeAction() {
            this.toggleKind();
            this.onChangeKind();
        },
        toggleKind() {
            var kindCommonEnabled;
            var kindReceiveEnabled;

            this.itemKind[0].label = "Rally";
            this.itemKind[1].label = "Point";
            this.itemKind[2].label = "Miss";
            this.itemKind[3].label = "A";
            this.itemKind[4].label = "B";
            this.itemKind[5].label = "C";

            this.itemKind[0].name = "rally";
            this.itemKind[1].name = "point";
            this.itemKind[2].name = "miss";
            this.itemKind[3].name = "a";
            this.itemKind[4].name = "b";
            this.itemKind[5].name = "c";

            if (this.modelAction == 'receive') {
                kindCommonEnabled = true;
                kindReceiveEnabled = true;
                this.modelKind = "rally";
                this.modelDetail = "D1";
            } else if (this.modelAction == 'other_miss' || this.modelAction == 'faul') {
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

                kindCommonEnabled = false;
                kindReceiveEnabled = false;
                this.modelKind = "";
                this.modelDetail = "";
            } else {
                this.itemKind[3].label = "";
                this.itemKind[4].label = "";
                this.itemKind[5].label = "";

                this.itemKind[3].name = "-";
                this.itemKind[4].name = "-";
                this.itemKind[5].name = "-";

                kindCommonEnabled = true;
                kindReceiveEnabled = false;
                this.modelKind = "rally";
                this.modelDetail = "D1";
            }

            this.itemKind[0].isEnabled = kindCommonEnabled;
            this.itemKind[1].isEnabled = kindCommonEnabled;
            this.itemKind[2].isEnabled = kindCommonEnabled;
            this.itemKind[3].isEnabled = kindReceiveEnabled;
            this.itemKind[4].isEnabled = kindReceiveEnabled;
            this.itemKind[5].isEnabled = kindReceiveEnabled;
        },
        onChangeKind() {
            this.changeDetailLabel();
        },
        // onChangeMember(member) {
        //     this.selectedMember = member;
        // },
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

            if (this.modelAction == "serve") {
                if (this.modelKind == "point") {
                    var idx = 0;
                    this.itemDetail[idx].label = "Ace";
                    this.itemDetail[idx].name = "ace";
                    this.itemDetail[idx].isEnabled = true;
                    idx++;

                    this.modelDetail = this.itemDetail[0].name;
                } else if (this.modelKind == "miss") {
                    var idx = 0;
                    this.itemDetail[idx].label = "Out";
                    this.itemDetail[idx].name = "out";
                    this.itemDetail[idx].isEnabled = true;
                    idx++;

                    this.itemDetail[idx].label = "Net";
                    this.itemDetail[idx].name = "net";
                    this.itemDetail[idx].isEnabled = true;
                    idx++;

                    this.modelDetail = this.itemDetail[0].name;
                }
            } else if (this.modelAction == "spike") {
                if (this.modelKind == "point") {
                    var idx = 0;
                    // this.itemDetail[idx].label = "Ace";
                    // this.itemDetail[idx].name = "ace";
                    // this.itemDetail[idx].isEnabled = true;
                    // idx++;

                    this.itemDetail[idx].label = "In";
                    this.itemDetail[idx].name = "in";
                    this.itemDetail[idx].isEnabled = true;
                    idx++;

                    this.itemDetail[idx].label = "Fake";
                    this.itemDetail[idx].name = "fake";
                    this.itemDetail[idx].isEnabled = true;
                    idx++;

                    this.itemDetail[idx].label = "Blockout";
                    this.itemDetail[idx].name = "blockout";
                    this.itemDetail[idx].isEnabled = true;
                    idx++;
                    this.modelDetail = this.itemDetail[0].name;
                } else if (this.modelKind == "miss") {
                    var idx = 0;
                    this.itemDetail[idx].label = "Out";
                    this.itemDetail[idx].name = "out";
                    this.itemDetail[idx].isEnabled = true;
                    idx++;

                    this.itemDetail[idx].label = "Net";
                    this.itemDetail[idx].name = "net";
                    this.itemDetail[idx].isEnabled = true;
                    idx++;

                    this.itemDetail[idx].label = "Block";
                    this.itemDetail[idx].name = "block";
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
        pushScore(team, no, name, action, kind, detail) {
            var teamcode;
            if (team == "a") {
                teamcode = 0;
            } else {
                teamcode = 1;
            }

            this.score.push({
                index: this.getMaxIndex() + 1,
                team: teamcode,
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
                this.undoEnabled = false;
            } else {
                this.undoEnabled = true;
            }
            if (this.scoreBk.length < 1) {
                this.redoEnabled = false;
            } else {
                this.redoEnabled = true;
            }
        },
        rotateA() {
            var team = [
                this.itemTeamA[8],
                this.itemTeamA[7],
                this.itemTeamA[6],
                this.itemTeamA[3],
                this.itemTeamA[4],
                this.itemTeamA[5],
                this.itemTeamA[0],
                this.itemTeamA[1],
                this.itemTeamA[2],
            ]
            this.rotate(team);
        },
        rotateB() {
            var team = [
                this.itemTeamB[0],
                this.itemTeamB[1],
                this.itemTeamB[2],
                this.itemTeamB[5],
                this.itemTeamB[4],
                this.itemTeamB[3],
                this.itemTeamB[8],
                this.itemTeamB[7],
                this.itemTeamB[6],
            ]
            this.rotate(team);
        },
        rotate(team) {
            // jsonの順番を変えるようにしないとだめ
            var tempNo = -1;
            var tempName = "";
            var first = true;
            for (var i = 8; i > 0; i--) {
                if (team[i].isEmpty) {
                    continue;
                }
                if (first) {
                    tempNo = team[i].no;
                    tempName = team[i].name;
                    first = !first;
                }
                for (var j = i - 1; j >= 0; j--) {
                    if (!team[j].isEmpty) {
                        team[i].no = team[j].no;
                        team[i].name = team[j].name;
                        break;
                    }
                }
            }

            team[0].no = tempNo;
            team[0].name = tempName;
        },
        result(flg) {
            // console.log("dlg:" + flg);
            this.callbackConfirm(flg);
            this.showModalConfirm = false;
        },
        changeMember() {
            // this.showChangeArea = !this.showChangeArea;
            // if (this.showChangeArea) {
            //     this.styleChangeArea = {
            //         "grid-template-columns": "70px 1fr 0fr 0fr 1fr 1fr 1fr 70px",
            //     };
            //     // this.styleCoatMember.visibility = "visible";
            // } else {
            //     this.styleChangeArea = {
            //         "grid-template-columns": "70px 1fr 1fr 1fr 1fr 1fr 0fr 70px",
            //     };
            //     // this.styleCoatMember.visibility = "hidden";
            // }

            // // this.$emit('send-message');
            this.title = "メンバーチェンジ";
            // this.msg = "入力内容を破棄してデータを読み込みますか？";
            this.positive = "OK";
            this.negative = "Cancel";
            this.showModalMemberChange = true;
        },
        memberChangeResult(flg, itemTeamA, itemTeamB) {
            this.showModalMemberChange = false;
            if (flg) {
                this.itemTeamA = itemTeamA;
                this.itemTeamB = itemTeamB;
            }
        }





        // ドラッグドロップ
        // https://www.kabanoki.net/1712/#i-4

        // svg関連まとめサイト
        // https://www.webcreatorbox.com/webinfo/svg-icons-patterns-illustration

        // https://iconsvg.xyz/

        // https://ikonate.com/#content
    },
}