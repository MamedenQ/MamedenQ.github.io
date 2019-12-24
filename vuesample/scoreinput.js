const template = `
    <div class="grid-scoreinput">
        <div class="grid-action">
            <div v-bind:class="item.classGrid" v-for="item of itemAction">
                <input type="radio" v-bind:id="item.id" name="action" v-bind:value="item.name" v-on:change="onChangeAction" v-model="modelAction">
                <label v-bind:for="item.id">
                    {{item.label}}
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
        
        <div class="grid-detail">
            <div v-bind:class="item.classGrid" v-for="item of itemDetail">
                <input type="radio" v-bind:id="item.id" name="detail" v-bind:value="item.name" v-model="modelDetail" v-bind:disabled="!item.isEnabled">
                <label v-bind:for="item.id">
                    {{item.label}}
                </label>
            </div>
        </div>
        
        <div class="navi_b grid_style">
            <div class="function1">
                <svg v-on:click="showModalSave = true" xmlns="http://www.w3.org/2000/svg" width="70" height="70" viewBox="0 0 24 24" fill="none" stroke="#000000" stroke-width="1" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"></path>
                    <polyline points="17 21 17 13 7 13 7 21"></polyline>
                    <polyline points="7 3 7 8 15 8"></polyline>
                </svg>
            </div>

            <div class="function2">
                <svg v-on:click="load" xmlns="http://www.w3.org/2000/svg" width="70" height="70" viewBox="0 0 24 24" fill="none" stroke="#000000" stroke-width="1" stroke-linecap="round" stroke-linejoin="round"><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path><rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect></svg>
            </div>

            <div class="function3">
                <svg v-on:click="rotateB" xmlns="http://www.w3.org/2000/svg" width="70" height="70" viewBox="0 0 24 24" fill="none" stroke="#000000" stroke-width="1" stroke-linecap="round" stroke-linejoin="round"><path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38"/></svg>
            </div>
            <div class="function4">
                <svg v-on:click="rotateA" xmlns="http://www.w3.org/2000/svg" width="70" height="70" viewBox="0 0 24 24" fill="none" stroke="#000000" stroke-width="1" stroke-linecap="round" stroke-linejoin="round"><path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38"/></svg>
            </div>

            <div class="function5">
                <svg v-on:click="changeMember" xmlns="http://www.w3.org/2000/svg" width="70" height="70" viewBox="0 0 24 24" fill="none" stroke="#000000" stroke-width="1" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
            </div>

            <div class="function6">
                <svg v-if="undoEnabled" v-bind:disabled="!undoEnabled" v-on:click="undo" xmlns="http://www.w3.org/2000/svg" width="70" height="70" viewBox="0 0 24 24" fill="none" stroke="#000000" stroke-width="1" stroke-linecap="round" stroke-linejoin="round">
                    <!--
                    <path d="M2.5 2v6h6M2.66 15.57a10 10 0 1 0 .57-8.38"/>
                    -->
                    <path d="M10 16l-6-6 6-6"/>
                    <path d="M20 21v-7a4 4 0 0 0-4-4H5"/>
                </svg>
                <svg v-else v-bind:disabled="!undoEnabled" v-on:click="undo" xmlns="http://www.w3.org/2000/svg" width="70" height="70" viewBox="0 0 24 24" fill="none" stroke="#cacaca" stroke-width="1" stroke-linecap="round" stroke-linejoin="round">
                    <!--
                    <path d="M2.5 2v6h6M2.66 15.57a10 10 0 1 0 .57-8.38"/>
                    -->
                    <path d="M10 16l-6-6 6-6"/>
                    <path d="M20 21v-7a4 4 0 0 0-4-4H5"/>
                </svg>
            </div>

            <div class="function7">
                <svg v-if="redoEnabled" v-bind:disabled="!redoEnabled" v-on:click="redo" xmlns="http://www.w3.org/2000/svg" width="70" height="70" viewBox="0 0 24 24" fill="none" stroke="#000000" stroke-width="1" stroke-linecap="round" stroke-linejoin="round">
                    <!--
                    <path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38"/>
                    -->
                    <path d="M14 16l6-6-6-6"/>
                    <path d="M4 21v-7a4 4 0 0 1 4-4h11"/>
                </svg>
                <svg v-else v-bind:disabled="!redoEnabled" v-on:click="redo" xmlns="http://www.w3.org/2000/svg" width="70" height="70" viewBox="0 0 24 24" fill="none" stroke="#cacaca" stroke-width="1" stroke-linecap="round" stroke-linejoin="round">
                    <!--
                    <path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38"/>
                    -->
                    <path d="M14 16l6-6-6-6"/>
                    <path d="M4 21v-7a4 4 0 0 1 4-4h11"/>
                </svg>
            </div>
        </div>

        <ul class="coat">
            <li v-if="!item.isEmpty" v-bind:class="item.classGrid" v-on:click="addScore(item)" v-for="item of itemTeamA" :key="item.team + item.no">{{item.no}}</li>
            <li v-if="!item.isEmpty" v-bind:class="item.classGrid" v-on:click="addScore(item)" v-for="item of itemTeamB" :key="item.team + item.no">{{item.no}}</li>
            <!--
            <svg v-bind:class="item.classGrid" v-on:click="addScore(item)" v-for="item of itemTeamA" :key="item.team + item.no" xmlns="http://www.w3.org/2000/svg" width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="#000000" stroke-width="1" stroke-linecap="round" stroke-linejoin="round">
                <path d="M5.52 19c.64-2.2 1.84-3 3.22-3h6.52c1.38 0 2.58.8 3.22 3"/>
                <circle cx="12" cy="10" r="3"/>
                <circle cx="12" cy="12" r="10"/>
                <text text-anchor="middle" v-bind:x="0" v-bind:y="0" >{{item.no}}</text>
            </svg>
            <svg v-bind:class="item.classGrid" v-on:click="addScore(item)" v-for="item of itemTeamB" :key="item.team + item.no" xmlns="http://www.w3.org/2000/svg" width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="#000000" stroke-width="1" stroke-linecap="round" stroke-linejoin="round">
                <path d="M5.52 19c.64-2.2 1.84-3 3.22-3h6.52c1.38 0 2.58.8 3.22 3"/>
                <circle cx="12" cy="10" r="3"/>
                <circle cx="12" cy="12" r="10"/>
            </svg>
            -->
        </ul>

        <div class="score grid_style" style="overflow-x:auto; overflow-y:hidden;">
            <svg v-bind:width="score.length * 90" style="height: 100%; overflow: scroll;">
                <circle v-bind:fill="scoreColor(item.team)" r="40" v-bind:cx="50 + 90 * idx" cy="50" v-on:click="onClickScore(item)" v-for="(item, idx) of score"></circle>
                <text text-anchor="middle" v-bind:x="10 + 90 * idx + 40" v-bind:y="35" v-on:click="onClickScore(item)" v-for="(item, idx) of score">{{item.no}}</text>
                <text text-anchor="middle" v-bind:x="10 + 90 * idx + 40" v-bind:y="55" v-on:click="onClickScore(item)" v-for="(item, idx) of score">{{item.action}}</text>
                <text text-anchor="middle" v-bind:x="10 + 90 * idx + 40" v-bind:y="75" v-on:click="onClickScore(item)" v-for="(item, idx) of score">{{item.kind}}</text>
            </svg>
        </div>

        <div class="navi_a grid_style">
            <div class="menu1">
                <svg xmlns="http://www.w3.org/2000/svg" width="70" height="70" viewBox="0 0 24 24" fill="none" stroke="#000000" stroke-width="1" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M20 9v11a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V9"/>
                    <path d="M9 22V12h6v10M2 10.6L12 2l10 8.6"/>
                </svg>
            </div>
            <div class="menu2">
                <svg v-on:click="closeScore(true)" xmlns="http://www.w3.org/2000/svg" width="70" height="70" viewBox="0 0 24 24" fill="none" stroke="#000000" stroke-width="1" stroke-linecap="round" stroke-linejoin="round"><path d="M19 12H6M12 5l-7 7 7 7"/></svg>
            </div>
            <div class="menu7">
            <svg xmlns="http://www.w3.org/2000/svg" width="70" height="70" viewBox="0 0 24 24" fill="none" stroke="#000000" stroke-width="1" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg>
            </div>
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
                                    日付<input type="date" v-model="modelDate" />
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
    </div>
`;

import confirm from './confirm.js'

export default {
    template,
    components: {
        confirm,
    },
    data: function () {
        return {
            scoreColor: color,
            score: [],
            scoreBk: [],
            scoreTempSave: [],
            undoEnabled: false,
            redoEnabled: false,
            modelAction: "",
            modelKind: "",
            modelDetail: "",
            modelTitle: "",
            modelDate: "2019-11-03",
            showModalSave: false,
            showModalWarn: false,
            showModalConfirm: false,
            title: "",
            msg: "",
            callbackConfirm: "",
            isCancel: false,
            isDirty: false,
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
                    classGrid: "action faul"
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
                {
                    team: "a",
                    no: "1",
                    classGrid: "a1 grid_style_team_a",
                    isEmpty: false,
                },
                {
                    team: "a",
                    no: "2",
                    classGrid: "a2 grid_style_team_a",
                    isEmpty: false,
                },
                {
                    team: "a",
                    no: "3",
                    classGrid: "a3 grid_style_team_a",
                    isEmpty: false,
                },
                {
                    team: "a",
                    no: "4",
                    classGrid: "a4 grid_style_team_a",
                    isEmpty: false,
                },
                {
                    team: "a",
                    no: "5",
                    classGrid: "a5 grid_style_team_a",
                    isEmpty: false,
                },
                {
                    team: "a",
                    no: "6",
                    classGrid: "a6 grid_style_team_a",
                    isEmpty: false,
                },
                {
                    team: "a",
                    no: "7",
                    classGrid: "a7 grid_style_team_a",
                    isEmpty: true,
                },
                {
                    team: "a",
                    no: "8",
                    classGrid: "a8 grid_style_team_a",
                    isEmpty: true,
                },
                {
                    team: "a",
                    no: "9",
                    classGrid: "a9 grid_style_team_a",
                    isEmpty: true,
                },
            ],
            itemTeamB: [
                {
                    team: "b",
                    no: "1",
                    classGrid: "b1 grid_style_team_b",
                    isEmpty: false,
                },
                {
                    team: "b",
                    no: "2",
                    classGrid: "b2 grid_style_team_b",
                    isEmpty: false,
                },
                {
                    team: "b",
                    no: "3",
                    classGrid: "b3 grid_style_team_b",
                    isEmpty: false,
                },
                {
                    team: "b",
                    no: "4",
                    classGrid: "b4 grid_style_team_b",
                    isEmpty: false,
                },
                {
                    team: "b",
                    no: "5",
                    classGrid: "b5 grid_style_team_b",
                    isEmpty: false,
                },
                {
                    team: "b",
                    no: "6",
                    classGrid: "b6 grid_style_team_b",
                    isEmpty: false,
                },
                {
                    team: "b",
                    no: "7",
                    classGrid: "b7 grid_style_team_b",
                    isEmpty: true,
                },
                {
                    team: "b",
                    no: "8",
                    classGrid: "b8 grid_style_team_b",
                    isEmpty: true,
                },
                {
                    team: "b",
                    no: "9",
                    classGrid: "b9 grid_style_team_b",
                    isEmpty: true,
                },
            ],
        }
    },
    mounted() {
        this.modelAction = "serve";
        this.updateUndoRedoButton();
        this.toggleKind();
        this.onChangeKind();
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
            var saveData = {
                title: this.modelTitle,
                date: this.modelDate,
                score: this.score,
            };
            localStorage.setItem("score", JSON.stringify(saveData));
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
            this.modelAction = "serve";
            this.scoreBk = [];
            var saveData = JSON.parse(localStorage.getItem("score"));
            this.score = saveData.score;
            this.modelTitle = saveData.title;
            this.modelDate = saveData.date;
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

            this.$router.push({ path: '/page2' });
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
            this.pushScore(item.team, item.no, this.modelAction, this.getKind(), this.modelDetail);
            this.scoreBk = [];
            this.updateUndoRedoButton();
            this.outputlog();
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
                    this.itemDetail[0].label = "Ace";
                    this.itemDetail[0].name = "ace";
                    this.itemDetail[0].isEnabled = true;
                    this.modelDetail = this.itemDetail[0].name;
                } else if (this.modelKind == "miss") {
                    this.itemDetail[0].label = "Net";
                    this.itemDetail[1].label = "Out";
                    this.itemDetail[0].name = "net";
                    this.itemDetail[1].name = "out";
                    this.itemDetail[0].isEnabled = true;
                    this.itemDetail[1].isEnabled = true;
                    this.modelDetail = this.itemDetail[0].name;
                }
            } else if (this.modelAction == "spike") {
                if (this.modelKind == "point") {
                    this.itemDetail[0].label = "Ace";
                    this.itemDetail[1].label = "In";
                    this.itemDetail[2].label = "Fake";
                    this.itemDetail[3].label = "Blockout";
                    this.itemDetail[0].name = "ace";
                    this.itemDetail[1].name = "in";
                    this.itemDetail[2].name = "fake";
                    this.itemDetail[3].name = "blockout";
                    this.itemDetail[0].isEnabled = true;
                    this.itemDetail[1].isEnabled = true;
                    this.itemDetail[2].isEnabled = true;
                    this.itemDetail[3].isEnabled = true;
                    this.modelDetail = this.itemDetail[0].name;
                } else if (this.modelKind == "miss") {
                    this.itemDetail[0].label = "Net";
                    this.itemDetail[1].label = "Out";
                    this.itemDetail[2].label = "Block";
                    this.itemDetail[0].name = "net";
                    this.itemDetail[1].name = "out";
                    this.itemDetail[2].name = "block";
                    this.itemDetail[0].isEnabled = true;
                    this.itemDetail[1].isEnabled = true;
                    this.itemDetail[2].isEnabled = true;
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
        pushScore(team, no, action, kind, detail) {
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
            this.rotate(this.itemTeamA);
        },
        rotateB() {
            this.rotate(this.itemTeamB);
        },
        rotate(team) {
            var temp = -1;
            var first = true;
            for (var i = 8; i > 0; i--) {
                if (team[i].isEmpty) {
                    continue;
                }
                if (first) {
                    temp = team[i].no;
                    first = !first;
                }
                for (var j = i - 1; j >= 0; j--) {
                    if (!team[j].isEmpty) {
                        team[i].no = team[j].no;
                        break;
                    }
                }
            }

            team[0].no = temp;
        },
        result(flg) {
            // console.log("dlg:" + flg);
            this.callbackConfirm(flg);
            this.showModalConfirm = false;
        },
        changeMember() {
            this.$emit('send-message');
        },
        // ドラッグドロップ
        // https://www.kabanoki.net/1712/#i-4

        // svg関連まとめサイト
        // https://www.webcreatorbox.com/webinfo/svg-icons-patterns-illustration

        // https://iconsvg.xyz/

        // https://ikonate.com/#content
    },
}