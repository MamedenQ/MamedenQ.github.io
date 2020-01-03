const template = `
    <div class="grid-scoreinput" v-bind:style="styleGrid">
        <div class="grid-action">
            <div v-bind:class="item.classGrid" v-for="item of itemAction">
                <input type="radio" v-bind:id="item.id" name="action" v-bind:value="item.name" v-on:change="onChangeAction" v-model="modelAction">
                <label v-bind:for="item.id">
                    <span v-bind:style="styleLabel">{{item.label}}</span>
                    <serve v-if="item.id == 'action_serve'"></serve>
                    <spike v-else-if="item.id == 'action_spike'"></spike>
                    <block v-else-if="item.id == 'action_block'"></block>
                    <receive v-else-if="item.id == 'action_receive'"></receive>
                    <faul v-else-if="item.id == 'action_faul'"></faul>
                    <other_miss v-else-if="item.id == 'action_other_miss'"></other_miss>
                </label>
            </div>
        </div>

        <div class="grid-kind">
            <div v-bind:class="item.classGrid" v-for="item of itemKind">
                <input type="radio" v-bind:id="item.id" name="kind" v-bind:value="item.name" v-on:change="onChangeKind" v-model="modelKind" v-bind:disabled="!item.isEnabled">
                <label v-bind:for="item.id">
                    <span v-bind:style="styleLabel">{{item.label}}</span>
                    <point v-if="item.name == 'point'"></point>
                    <other_miss v-else-if="item.name == 'miss'"></other_miss>
                    <rally v-else-if="item.name == 'rally'"></rally>
                </label>
            </div>
        </div>
        
        <div class="grid-detail">
            <div v-bind:class="item.classGrid" v-for="item of itemDetail">
                <input type="radio" v-bind:id="item.id" name="detail" v-bind:value="item.name" v-model="modelDetail" v-bind:disabled="!item.isEnabled">
                <label v-bind:for="item.id">
                    <span v-bind:style="styleLabel">{{item.label}}</span>
                    <net v-if="item.name == 'net'"></net>
                    <inIcon v-else-if="item.name == 'in' || item.name == 'ace'"></inIcon>
                    <fake v-else-if="item.name == 'fake'"></fake>
                    <judge v-else-if="item.name == 'judge'"></judge>
                    <out v-else-if="item.name == 'out'"></out>
                    <block v-else-if="item.name == 'block' || item.name == 'blockout'"></block>
                    <suikomi v-else-if="item.name == 'suikomi'"></suikomi>
                    <omiai v-else-if="item.name == 'omiai'"></omiai>
                </label>
            </div>
        </div>
        
        <div class="coat" v-bind:style="styleGridCoat">
            <div v-bind:class="item.classGrid" v-on:click="addScore(item)" v-for="item of itemTeamA">
                <span v-show="!item.isEmpty">{{item.no + ":" + item.name}}</span><br>
                <player v-show="item.sex == 0 && !item.isEmpty"></player>
                <player_f v-show="item.sex == 1 && !item.isEmpty"></player_f>
            </div>
            <div class="rotate-a" v-on:click="rotateA">
                <span>ローテ</span>
                <rotation></rotation>
            </div>

            <div v-bind:class="item.classGrid" v-on:click="addScore(item)" v-for="item of itemTeamB">
                <span v-show="!item.isEmpty">{{item.no + ":" + item.name}}</span><br>
                <player v-show="item.sex == 0 && !item.isEmpty"></player>
                <player_f v-show="item.sex == 1 && !item.isEmpty"></player_f>
            </div>
            <div class="rotate-b" v-on:click="rotateB">
                <span>ローテ</span>
                <rotation></rotation>
            </div>
        </div>

        <div class="score grid_style" style="overflow-x:scroll; overflow-y:hidden;">
            <svg v-bind:width="score.length * 90 + 10" style="height: 100%;max-width:none;max-height:none;">
                <scoreObj v-on:click-score="onClickScore(item)" v-for="(item, idx) of score" :key="item.index" :item="item" :idx="idx"></scoreObj>
            </svg>
        </div>

        <div class="navi_a" v-bind:style="styleNavi">
            <span>
                <div v-if="!isNewScore">
                <span>戻る</span>
                <svg v-on:click="closeScore(true)" xmlns="http://www.w3.org/2000/svg" width="70" height="70" viewBox="0 0 24 24" fill="none" stroke="#000000" stroke-width="1" stroke-linecap="round" stroke-linejoin="round"><path d="M19 12H6M12 5l-7 7 7 7"/></svg>
                </div>
                <span>ホーム</span>
                <svg v-on:click="onHome" xmlns="http://www.w3.org/2000/svg" width="70" height="70" viewBox="0 0 24 24" fill="none" stroke="#000000" stroke-width="1" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M20 9v11a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V9"/>
                    <path d="M9 22V12h6v10M2 10.6L12 2l10 8.6"/>
                </svg>
                <span>保存</span>
                <svg v-on:click="showModalSave = true" xmlns="http://www.w3.org/2000/svg" width="70" height="70" viewBox="0 0 24 24" fill="none" stroke="#000000" stroke-width="1" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"></path>
                    <polyline points="17 21 17 13 7 13 7 21"></polyline>
                    <polyline points="7 3 7 8 15 8"></polyline>
                </svg>
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
<!--
        <div class="navi_b" v-bind:style="styleNavi">
            <span>
                <span>保存</span>
                <svg v-on:click="showModalSave = true" xmlns="http://www.w3.org/2000/svg" width="70" height="70" viewBox="0 0 24 24" fill="none" stroke="#000000" stroke-width="1" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"></path>
                    <polyline points="17 21 17 13 7 13 7 21"></polyline>
                    <polyline points="7 3 7 8 15 8"></polyline>
                </svg>
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
-->
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
import point from './point.js'
import net from './net.js'
import out from './out.js'
import inIcon from './inicon.js'
import fake from './fake.js'
import judge from './judge.js'
import suikomi from './suikomi.js'
import omiai from './omiai.js'
import rally from './rally.js'

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
        point,
        net,
        out,
        inIcon,
        fake,
        judge,
        suikomi,
        omiai,
        rally,
    },
    props: {
        scoreId: String,
        isNewScore: Boolean,
    },
    filters: {
        memberDisp(str) {

        },
    },
    // watch: {

    // },
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
            undoEnabled: false,
            redoEnabled: false,
            modelAction: "",
            modelKind: "",
            modelDetail: "",
            modelTitle: "",
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
            // stylePlayer: {
            //     "height": "89px",
            // },
            itemAction: [
                { label: "サーブ", name: "serve", id: "action_serve", classGrid: "select-item serve" },
                { label: "スパイク", name: "spike", id: "action_spike", classGrid: "select-item spike" },
                { label: "ブロック", name: "block", id: "action_block", classGrid: "select-item block" },
                { label: "レシーブ ", name: "receive", id: "action_receive", classGrid: "select-item receive" },
                { label: "他ミス", name: "other_miss", id: "action_other_miss", classGrid: "select-item other_miss" },
                { label: "ファウル", name: "faul", id: "action_faul", classGrid: "select-item faul" },
            ],
            itemKind: [
                // { label: "Rally", name: "rally", id: "kind_rally", classGrid: "select-item rally", isEnabled: true, },
                // { label: "Point", name: "point", id: "kind_point", classGrid: "select-item point", isEnabled: true, },
                // { label: "Miss", name: "miss", id: "kind_miss", classGrid: "select-item miss", isEnabled: true, },
                // { label: "A", name: "a", id: "kind_a", classGrid: "select-item a", isEnabled: true, },
                // { label: "B", name: "b", id: "kind_b", classGrid: "select-item b", isEnabled: true, },
                // { label: "C", name: "c", id: "kind_c", classGrid: "select-item c", isEnabled: true, },
                { label: "ラリー", name: "rally", id: "kind_1", classGrid: "select-item rally", isEnabled: true, },
                { label: "ポイント", name: "point", id: "kind_2", classGrid: "select-item point", isEnabled: true, },
                { label: "ミス", name: "miss", id: "kind_3", classGrid: "select-item miss", isEnabled: true, },
                { label: "A", name: "a", id: "kind_4", classGrid: "select-item a", isEnabled: true, },
                { label: "B", name: "b", id: "kind_5", classGrid: "select-item b", isEnabled: true, },
                { label: "C", name: "c", id: "kind_6", classGrid: "select-item c", isEnabled: true, },
                // { label: "", name: "empty", id: "kind_empty", classGrid: "kind empty", isEnabled: false, },
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
                // { key: "a7", team: "a", no: "", name: "", sex: 0, classGrid: "grid_style_team a7", isEmpty: true, },
                // { key: "a8", team: "a", no: "", name: "", sex: 0, classGrid: "grid_style_team a8", isEmpty: true, },
                // { key: "a9", team: "a", no: "", name: "", sex: 0, classGrid: "grid_style_team a9", isEmpty: true, },
                // { key: "a4", team: "a", no: "", name: "", sex: 0, classGrid: "grid_style_team a4", isEmpty: true, },
                // { key: "a5", team: "a", no: "", name: "", sex: 0, classGrid: "grid_style_team a5", isEmpty: true, },
                // { key: "a6", team: "a", no: "", name: "", sex: 0, classGrid: "grid_style_team a6", isEmpty: true, },
                // { key: "a3", team: "a", no: "", name: "", sex: 0, classGrid: "grid_style_team a3", isEmpty: true, },
                // { key: "a2", team: "a", no: "", name: "", sex: 0, classGrid: "grid_style_team a2", isEmpty: true, },
                // { key: "a1", team: "a", no: "", name: "", sex: 0, classGrid: "grid_style_team a1", isEmpty: true, },
                { key: "a1", team: "a", no: "", name: "", sex: 0, classGrid: "grid_style_team a1", isEmpty: true, },
                { key: "a2", team: "a", no: "", name: "", sex: 0, classGrid: "grid_style_team a2", isEmpty: true, },
                { key: "a3", team: "a", no: "", name: "", sex: 0, classGrid: "grid_style_team a3", isEmpty: true, },
                { key: "a4", team: "a", no: "", name: "", sex: 0, classGrid: "grid_style_team a4", isEmpty: true, },
                { key: "a5", team: "a", no: "", name: "", sex: 0, classGrid: "grid_style_team a5", isEmpty: true, },
                { key: "a6", team: "a", no: "", name: "", sex: 0, classGrid: "grid_style_team a6", isEmpty: true, },
                { key: "a7", team: "a", no: "", name: "", sex: 0, classGrid: "grid_style_team a7", isEmpty: true, },
                { key: "a8", team: "a", no: "", name: "", sex: 0, classGrid: "grid_style_team a8", isEmpty: true, },
            ],
            itemTeamB: [
                // { key: "b1", team: "b", no: "", name: "", sex: 0, classGrid: "grid_style_team b1", isEmpty: true, },
                // { key: "b2", team: "b", no: "", name: "", sex: 0, classGrid: "grid_style_team b2", isEmpty: true, },
                // { key: "b3", team: "b", no: "", name: "", sex: 0, classGrid: "grid_style_team b3", isEmpty: true, },
                // { key: "b6", team: "b", no: "", name: "", sex: 0, classGrid: "grid_style_team b6", isEmpty: true, },
                // { key: "b5", team: "b", no: "", name: "", sex: 0, classGrid: "grid_style_team b5", isEmpty: true, },
                // { key: "b4", team: "b", no: "", name: "", sex: 0, classGrid: "grid_style_team b4", isEmpty: true, },
                // { key: "b9", team: "b", no: "", name: "", sex: 0, classGrid: "grid_style_team b9", isEmpty: true, },
                // { key: "b8", team: "b", no: "", name: "", sex: 0, classGrid: "grid_style_team b8", isEmpty: true, },
                // { key: "b7", team: "b", no: "", name: "", sex: 0, classGrid: "grid_style_team b7", isEmpty: true, },
                { key: "b1", team: "b", no: "", name: "", sex: 0, classGrid: "grid_style_team b1", isEmpty: true, },
                { key: "b2", team: "b", no: "", name: "", sex: 0, classGrid: "grid_style_team b2", isEmpty: true, },
                { key: "b3", team: "b", no: "", name: "", sex: 0, classGrid: "grid_style_team b3", isEmpty: true, },
                { key: "b4", team: "b", no: "", name: "", sex: 0, classGrid: "grid_style_team b4", isEmpty: true, },
                { key: "b5", team: "b", no: "", name: "", sex: 0, classGrid: "grid_style_team b5", isEmpty: true, },
                { key: "b6", team: "b", no: "", name: "", sex: 0, classGrid: "grid_style_team b6", isEmpty: true, },
                { key: "b7", team: "b", no: "", name: "", sex: 0, classGrid: "grid_style_team b7", isEmpty: true, },
                { key: "b8", team: "b", no: "", name: "", sex: 0, classGrid: "grid_style_team b8", isEmpty: true, },
            ],
            members: [],
        }
    },
    mounted() {
        this.modelDate = this.getNowDateStr();

        this.members = JSON.parse(localStorage.getItem("members"));
        if (this.members == null) {
            this.members = [];
        }

        this.loadMain();
        this.modelAction = "serve";
        this.updateUndoRedoButton();
        this.toggleKind();
        this.onChangeKind();

        var itemHeight = (window.innerHeight - 205) / 6;
        this.styleGrid = {
            "grid-template-rows": itemHeight + "px " + itemHeight + "px " + itemHeight + "px " + itemHeight + "px " + itemHeight + "px " + itemHeight + "px 200px",
        };
        var itemHeightCoat = (window.innerHeight - 255) / 6;
        this.styleGridCoat = {
            "grid-template-rows": itemHeightCoat + "px " + itemHeightCoat + "px " + itemHeightCoat + "px " + itemHeightCoat + "px " + itemHeightCoat + "px " + itemHeightCoat + "px",
        };
        this.styleNavi = {
            "line-height": window.innerHeight + "px",
        };
        this.styleLabel = {
            "line-height": (itemHeight - 10) + "px",
        };
        // this.stylePlayer = {
        //     "height": (itemHeight - 10) + "px",
        // }; // grid間隔分だけ減らす
        // console.log("score input mounted 02");
        // grid - template - rows: 1fr 1fr 1fr 1fr 1fr 1fr 220px;

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
            console.log(JSON.stringify(this.score, null, "    "));
        },
        undo() {
            if (this.score.length < 1) {
                return;
            }
            this.scoreBk.push(this.score.pop());
            this.updateUndoRedoButton();
            this.outputlog();

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
                    // console.log("exists save data.");
                    saveData.title = data.title;
                    saveData.date = data.date;
                    saveData.score = data.score;
                    existsData = true;
                }
            });

            if (!existsData) {
                // console.log("not exists save data.");
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

            this.$emit("route-score-list");
        },
        checkSaved() {
            if (this.isDirty) {
                this.showModalWarn = true;
            }
        },
        onClickScore(item) {
            // console.log("onClickScore");
            this.deleteScore(item.index);
        },
        addScore(item) {
            if (item.isEmpty) {
                return;
            }
            this.pushScore(item.team, item.no, item.name, this.modelAction, this.getKind(), this.modelDetail);
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
                // } else if (this.modelAction == 'receive') {
                // this.itemKind[0].label = "A";
                // this.itemKind[1].label = "B";
                // this.itemKind[2].label = "C";
                // this.itemKind[3].label = "ミス";

                // this.itemKind[0].name = "a";
                // this.itemKind[1].name = "b";
                // this.itemKind[2].name = "c";
                // this.itemKind[3].name = "miss";

                // this.itemKind[0].isEnabled = true;
                // this.itemKind[1].isEnabled = true;
                // this.itemKind[2].isEnabled = true;
                // this.itemKind[3].isEnabled = true;

                // this.modelKind = "a";
                // this.modelDetail = "D1";
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
                // if (this.modelKind == "miss") {
                //     var idx = 0;
                //     this.itemDetail[idx].label = "Out";
                //     this.itemDetail[idx].name = "out";
                //     this.itemDetail[idx].isEnabled = true;
                //     idx++;

                //     this.itemDetail[idx].label = "Judge";
                //     this.itemDetail[idx].name = "judge";
                //     this.itemDetail[idx].isEnabled = true;
                //     idx++;

                //     this.itemDetail[idx].label = "Omiai";
                //     this.itemDetail[idx].name = "omiai";
                //     this.itemDetail[idx].isEnabled = true;
                //     idx++;

                //     this.itemDetail[idx].label = "Tsunagi";
                //     this.itemDetail[idx].name = "tsunagi";
                //     this.itemDetail[idx].isEnabled = true;
                //     idx++;

                //     this.modelDetail = this.itemDetail[0].name;
                // }
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
            // var team = [
            //     // this.itemTeamA[8],
            //     this.itemTeamA[7],
            //     this.itemTeamA[6],
            //     this.itemTeamA[3],
            //     this.itemTeamA[4],
            //     this.itemTeamA[5],
            //     this.itemTeamA[0],
            //     this.itemTeamA[1],
            //     this.itemTeamA[2],
            // ]
            // this.rotate(team);
            this.rotate(this.itemTeamA);
        },
        rotateB() {
            // var team = [
            //     this.itemTeamB[0],
            //     this.itemTeamB[1],
            //     this.itemTeamB[2],
            //     this.itemTeamB[5],
            //     this.itemTeamB[4],
            //     this.itemTeamB[3],
            //     // this.itemTeamB[8],
            //     this.itemTeamB[7],
            //     this.itemTeamB[6],
            // ]
            // this.rotate(team);
            this.rotate(this.itemTeamB);
        },
        rotate(team) {
            // jsonの順番を変えるようにしないとだめ
            var tempNo = -1;
            var tempName = "";
            var tempSex = 0;
            var first = true;
            for (var i = 7; i > 0; i--) {
                if (team[i].isEmpty) {
                    continue;
                }
                if (first) {
                    tempNo = team[i].no;
                    tempName = team[i].name;
                    tempSex = team[i].sex;
                    first = !first;
                }
                for (var j = i - 1; j >= 0; j--) {
                    if (!team[j].isEmpty) {
                        team[i].no = team[j].no;
                        team[i].name = team[j].name;
                        team[i].sex = team[j].sex;
                        break;
                    }
                }
            }

            team[0].no = tempNo;
            team[0].name = tempName;
            team[0].sex = tempSex;
        },
        result(flg) {
            this.callbackConfirm(flg);
            this.showModalConfirm = false;
        },
        changeMember() {
            this.title = "メンバーチェンジ";
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
        },
        onHome() {
            this.$emit("route-home");
        },
    },
}