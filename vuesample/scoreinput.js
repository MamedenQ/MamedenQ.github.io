const template = `
    <div class="grid-scoreinput">
        <div class="grid-action">
            <div v-bind:class="item.classGrid" v-for="item of itemAction">
                <input type="radio" v-bind:id="item.id" name="action" v-bind:value="item.name" v-on:change="onChangeAction" v-model="modelAction">
                <label v-bind:for="item.id">
                    {{item.name}}
                </label>
            </div>
        </div>

        <div class="grid-kind">
            <div v-bind:class="item.classGrid" v-for="item of itemKind">
                <input type="radio" v-if="item.receive" v-bind:id="item.id" name="kind" v-bind:value="item.name" v-on:change="onChangeKind" v-model="modelKind" v-bind:disabled="!kindReceiveEnabled">
                <input type="radio" v-else v-bind:id="item.id" name="kind" v-bind:value="item.name" v-on:change="onChangeKind" v-model="modelKind" v-bind:disabled="!kindCommonEnabled">
                <label v-bind:for="item.id">
                    {{item.name}}
                </label>
            </div>
        </div>
        
        <div class="grid-detail">
            <div v-bind:class="item.classGrid" v-for="item of itemDetail">
                <input type="radio" v-bind:id="item.id" name="detail" v-bind:value="item.name" v-model="modelDetail">
                <label v-bind:for="item.id">
                    {{item.name}}
                </label>
            </div>
        </div>
        
        <div class="navi_b">
            <div class="function1">
                <svg v-on:click="save" xmlns="http://www.w3.org/2000/svg" width="70" height="70" viewBox="0 0 24 24" fill="none" stroke="#000000" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"></path>
                    <polyline points="17 21 17 13 7 13 7 21"></polyline>
                    <polyline points="7 3 7 8 15 8"></polyline>
                </svg>
            </div>

            <div class="function2">
                <svg v-on:click="load" xmlns="http://www.w3.org/2000/svg" width="70" height="70" viewBox="0 0 24 24" fill="none" stroke="#000000" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path><rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect></svg>
            </div>

            <div class="function3">
                <svg v-on:click="rotateB" xmlns="http://www.w3.org/2000/svg" width="70" height="70" viewBox="0 0 24 24" fill="none" stroke="#000000" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38"/></svg>
            </div>
            <div class="function4">
                <svg v-on:click="rotateA" xmlns="http://www.w3.org/2000/svg" width="70" height="70" viewBox="0 0 24 24" fill="none" stroke="#000000" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38"/></svg>
            </div>

            <div class="function5">
                <svg v-on:click="changeMember" xmlns="http://www.w3.org/2000/svg" width="70" height="70" viewBox="0 0 24 24" fill="none" stroke="#000000" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
            </div>

            <div class="function6">
                <svg v-if="undoEnabled" v-bind:disabled="!undoEnabled" v-on:click="undo" xmlns="http://www.w3.org/2000/svg" width="70" height="70" viewBox="0 0 24 24" fill="none" stroke="#000000" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
                    <!--
                    <path d="M2.5 2v6h6M2.66 15.57a10 10 0 1 0 .57-8.38"/>
                    -->
                    <path d="M10 16l-6-6 6-6"/>
                    <path d="M20 21v-7a4 4 0 0 0-4-4H5"/>
                </svg>
                <svg v-else v-bind:disabled="!undoEnabled" v-on:click="undo" xmlns="http://www.w3.org/2000/svg" width="70" height="70" viewBox="0 0 24 24" fill="none" stroke="#cacaca" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
                    <!--
                    <path d="M2.5 2v6h6M2.66 15.57a10 10 0 1 0 .57-8.38"/>
                    -->
                    <path d="M10 16l-6-6 6-6"/>
                    <path d="M20 21v-7a4 4 0 0 0-4-4H5"/>
                </svg>
            </div>

            <div class="function7">
                <svg v-if="redoEnabled" v-bind:disabled="!redoEnabled" v-on:click="redo" xmlns="http://www.w3.org/2000/svg" width="70" height="70" viewBox="0 0 24 24" fill="none" stroke="#000000" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
                    <!--
                    <path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38"/>
                    -->
                    <path d="M14 16l6-6-6-6"/>
                    <path d="M4 21v-7a4 4 0 0 1 4-4h11"/>
                </svg>
                <svg v-else v-bind:disabled="!redoEnabled" v-on:click="redo" xmlns="http://www.w3.org/2000/svg" width="70" height="70" viewBox="0 0 24 24" fill="none" stroke="#cacaca" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
                    <!--
                    <path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38"/>
                    -->
                    <path d="M14 16l6-6-6-6"/>
                    <path d="M4 21v-7a4 4 0 0 1 4-4h11"/>
                </svg>
            </div>
        </div>

        <draggable class="coat grid_style" element="ul">
            <li v-bind:style="'background: ' + scoreColor(0)" v-bind:class="item.classGrid" v-on:click="addScore(item)" v-for="item of itemTeamA" :key="item.team + item.no">
                {{item.no}}
            </li>
            <li v-bind:style="'background: ' + scoreColor(1)" v-bind:class="item.classGrid" v-on:click="addScore(item)" v-for="item of itemTeamB" :key="item.team + item.no">
                {{item.no}}
            </li>
        </draggable>

        <div class="score grid_style" style="overflow-x:auto; overflow-y:hidden;">
            <svg v-bind:width="score.length * 90" style="height: 100%; overflow: scroll;">
                <circle v-bind:fill="scoreColor(item.team)" r="40" v-bind:cx="50 + 90 * idx" cy="50" v-on:click="onClickScore(item)" v-for="(item, idx) of score"></circle>
                <text text-anchor="middle" v-bind:x="10 + 90 * idx + 40" v-bind:y="35" v-on:click="onClickScore(item)" v-for="(item, idx) of score">{{item.no}}</text>
                <text text-anchor="middle" v-bind:x="10 + 90 * idx + 40" v-bind:y="55" v-on:click="onClickScore(item)" v-for="(item, idx) of score">{{item.action}}</text>
                <text text-anchor="middle" v-bind:x="10 + 90 * idx + 40" v-bind:y="75" v-on:click="onClickScore(item)" v-for="(item, idx) of score">{{item.kind}}</text>
            </svg>
        </div>
    </div>
`;

export default {
    template,
    data: function () {
        return {
            scoreColor: color,
            score: [],
            scoreBk: [],
            scoreTempSave: [],
            kindCommonEnabled: true,
            kindReceiveEnabled: false,
            undoEnabled: false,
            redoEnabled: false,
            modelAction: "",
            modelKind: "",
            modelDetail: "",
            itemAction: [
                {
                    name: "serve",
                    id: "action_serve",
                    classGrid: "action serve"
                },
                {
                    name: "spike",
                    id: "action_spike",
                    classGrid: "action spike"
                },
                {
                    name: "block",
                    id: "action_block",
                    classGrid: "action block"
                },
                {
                    name: "receive",
                    id: "action_receive",
                    classGrid: "action receive"
                },
                {
                    name: "other_miss",
                    id: "action_other_miss",
                    classGrid: "action other_miss"
                },
                {
                    name: "faul",
                    id: "action_faul",
                    classGrid: "action faul"
                },
            ],
            itemKind: [
                {
                    name: "rally",
                    id: "kind_rally",
                    classGrid: "kind rally kind_rally_label",
                    receive: false,
                },
                {
                    name: "point",
                    id: "kind_point",
                    classGrid: "kind point kind_point_label",
                    receive: false,
                },
                {
                    name: "miss",
                    id: "kind_miss",
                    classGrid: "kind miss kind_miss_label",
                    receive: false,
                },
                {
                    name: "a",
                    id: "kind_a",
                    classGrid: "kind a kind_a_label",
                    receive: true,
                },
                {
                    name: "b",
                    id: "kind_b",
                    classGrid: "kind b kind_b_label",
                    receive: true,
                },
                {
                    name: "c",
                    id: "kind_c",
                    classGrid: "kind c kind_c_label",
                    receive: true,
                },
            ],
            itemDetail: [
                {
                    name: "D1",
                    id: "detail_1",
                    classGrid: "detail detail1 detail_1_label",
                },
                {
                    name: "D2",
                    id: "detail_2",
                    classGrid: "detail detail2 detail_2_label",
                },
                {
                    name: "D3",
                    id: "detail_3",
                    classGrid: "detail detail3 detail_3_label",
                },
                {
                    name: "D4",
                    id: "detail_4",
                    classGrid: "detail detail4 detail_4_label",
                },
                {
                    name: "D5",
                    id: "detail_5",
                    classGrid: "detail detail5 detail_5_label",
                },
                {
                    name: "D6",
                    id: "detail_6",
                    classGrid: "detail detail6 detail_6_label",
                },
            ],
            itemTeamA: [
                {
                    team: "a",
                    no: "1",
                    classGrid: "a1 grid_style_team_a",
                },
                {
                    team: "a",
                    no: "2",
                    classGrid: "a2 grid_style_team_a",
                },
                {
                    team: "a",
                    no: "3",
                    classGrid: "a3 grid_style_team_a",
                },
                {
                    team: "a",
                    no: "4",
                    classGrid: "a4 grid_style_team_a",
                },
                {
                    team: "a",
                    no: "5",
                    classGrid: "a5 grid_style_team_a",
                },
                {
                    team: "a",
                    no: "6",
                    classGrid: "a6 grid_style_team_a",
                },
                {
                    team: "a",
                    no: "7",
                    classGrid: "a7 grid_style_team_a",
                },
                {
                    team: "a",
                    no: "8",
                    classGrid: "a8 grid_style_team_a",
                },
                {
                    team: "a",
                    no: "9",
                    classGrid: "a9 grid_style_team_a",
                },
            ],
            itemTeamB: [
                {
                    team: "b",
                    no: "1",
                    classGrid: "b1 grid_style_team_b",
                },
                {
                    team: "b",
                    no: "2",
                    classGrid: "b2 grid_style_team_b",
                },
                {
                    team: "b",
                    no: "3",
                    classGrid: "b3 grid_style_team_b",
                },
                {
                    team: "b",
                    no: "4",
                    classGrid: "b4 grid_style_team_b",
                },
                {
                    team: "b",
                    no: "5",
                    classGrid: "b5 grid_style_team_b",
                },
                {
                    team: "b",
                    no: "6",
                    classGrid: "b6 grid_style_team_b",
                },
                {
                    team: "b",
                    no: "7",
                    classGrid: "b7 grid_style_team_b",
                },
                {
                    team: "b",
                    no: "8",
                    classGrid: "b8 grid_style_team_b",
                },
                {
                    team: "b",
                    no: "9",
                    classGrid: "b9 grid_style_team_b",
                },
            ],
        }
    },
    mounted() {
        this.modelAction = "serve";
        this.updateUndoRedoButton();
        this.toggleKind();
        localStorage.removeItem("score");
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
            this.$emit('commit1', 'aaa');
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
        },
        save() {
            localStorage.setItem("score", JSON.stringify(this.score));
        },
        load() {
            this.modelAction = "serve";
            this.scoreBk = [];
            this.score = JSON.parse(localStorage.getItem("score"));
            this.updateUndoRedoButton();
            this.toggleKind();
            this.outputlog();
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
            var result = confirm("削除しますか？");

            if (!result) {
                return;
            }

            var newData = this.score.filter(function (s, index) {
                if (s.index != deleteIndex) return true;
            });

            this.score = newData;

            this.outputlog();
        },
        getMaxIndex() {
            if (this.score.length == 0) {
                return 0;
            }

            return Math.max.apply(null, this.score.map(function (s) { return s.index; }));
        },
        onChangeAction() {
            this.toggleKind();
        },
        toggleKind() {
            if (this.modelAction == 'receive') {
                this.kindCommonEnabled = true;
                this.kindReceiveEnabled = true;
            } else if (this.modelAction == 'other_miss' || this.modelAction == 'faul') {
                this.kindCommonEnabled = false;
                this.kindReceiveEnabled = false;
            } else {
                this.kindCommonEnabled = true;
                this.kindReceiveEnabled = false;
            }

            this.modelKind = "rally";
            this.modelDetail = "D1";
        },
        onChangeKind() {
            this.modelDetail = "D1";
        },
        getKind() {
            if (this.modelKind == 'other_miss' || this.modelKind == 'faul') {
                return "";
            }
            return this.modelKind;
        },
        // getDetail() {
        //     // spike
        //     // 普通に得点、ブロックアウト
        //     // アウト、ネット、ブロック

        //     // block
        //     // 普通に得点
        //     // アウト、吸い込み

        //     // receive
        //     // 得点したときはスパイク扱い（フェイント）とかにするか
        //     // 弾いて落とす、次がつなげられない

        //     // serve
        //     // エース
        //     // アウト、ネット
        // },
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

        },
        rotateB() {

        },
        changeMember() {

        },
        // ドラッグドロップ
        // https://www.kabanoki.net/1712/#i-4

        // svg関連まとめサイト
        // https://www.webcreatorbox.com/webinfo/svg-icons-patterns-illustration

        // https://iconsvg.xyz/

        // https://ikonate.com/#content
    },
}