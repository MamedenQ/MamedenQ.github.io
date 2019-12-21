const template = `
    <div class="grid-scoreinput">
        <div class="grid-action" v-for="item of itemAction">
            <div v-bind:class="item.classGrid">
                <input type="radio" v-bind:id="item.id" name="action" v-bind:value="item.name" v-on:change="onChangeAction" v-model="modelAction">
                <label v-bind:for="item.id">
                    {{item.name}}
                </label>
            </div>
        </div>

        <div class="grid-kind" v-for="item of itemKind">
            <div v-bind:class="item.classGrid">
                <input type="radio" v-if="item.receive" v-bind:id="item.id" name="kind" v-bind:value="item.name" v-on:change="onChangeKind" v-model="modelKind" v-bind:disabled="!kindReceiveEnabled">
                <input type="radio" v-else v-bind:id="item.id" name="kind" v-bind:value="item.name" v-on:change="onChangeKind" v-model="modelKind" v-bind:disabled="!kindCommonEnabled">
                <label v-bind:for="item.id">
                    {{item.name}}
                </label>
            </div>
        </div>
        
        <div class="grid-detail" v-for="item of itemDetail">
            <div v-bind:class="item.classGrid">
                <input type="radio" v-bind:id="item.id" name="detail" v-bind:value="item.name" v-model="modelDetail">
                <label v-bind:for="item.id">
                    {{item.name}}
                </label>
            </div>
        </div>
        
        <div class="function grid_style">
            <button class="undo" v-bind:disabled="!undoEnabled" v-on:click="undo">undo</button>
            <button class="redo" v-bind:disabled="!redoEnabled" v-on:click="redo">redo</button>
        </div>
        <div class="coat grid_style" v-for="item of itemTeam">
            <div v-bind:class="item.classGrid" v-on:click="addScore(item)"></div>
            
            
            <!--
            <div class="a1 grid_style_team_a" value="1" v-on:click="addScore('a', 1)"></div>
            <div class="a2 grid_style_team_a" value="2" v-on:click="addScore('a', 2)"></div>
            <div class="a3 grid_style_team_a" value="3"></div>
            <div class="a4 grid_style_team_a" value="4"></div>
            <div class="a5 grid_style_team_a" value="5"></div>
            <div class="a6 grid_style_team_a" value="6"></div>
            <div class="a7 grid_style_team_a" value="7"></div>
            <div class="a8 grid_style_team_a" value="8"></div>
            <div class="a9 grid_style_team_a" value="9"></div>

            <div class="b1 grid_style_team_b" value="1"></div>
            <div class="b2 grid_style_team_b" value="2"></div>
            <div class="b3 grid_style_team_b" value="3"></div>
            <div class="b4 grid_style_team_b" value="4"></div>
            <div class="b5 grid_style_team_b" value="5"></div>
            <div class="b6 grid_style_team_b" value="6"></div>
            <div class="b7 grid_style_team_b" value="7"></div>
            <div class="b8 grid_style_team_b" value="8"></div>
            <div class="b9 grid_style_team_b" value="9"></div>
            -->
        </div>
        <div class="score grid_style">
            <div id='scorearea' style="height: 100%;overflow:auto;"></div>
        </div>
    </div>
`;

export default {
    template,
    data: function () {
        return {
            message: "home page",
            score: [],
            scoreBk: [],
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
            itemTeam :[
                {
                    team: "a",
                    no: "1",
                    classGrid: "a1 grid_style_team_a",
                },
            ],
        }
    },
    mounted() {
        this.modelAction = "serve";
        this.updateUndoRedoButton();
        this.toggleKind();
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
        test(s) {
            alert(s.abc);
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
            this.createScoreObj();
            this.outputlog();
        },
        redo() {
            if (this.scoreBk.length < 1) {
                return;
            }
            var popdata = this.scoreBk.pop();
            popdata.index = this.score.length + 1;
            this.score.push(popdata);
            this.updateUndoRedoButton();
            this.createScoreObj();
            this.outputlog();
        },
        save() {

        },
        addScore(item) {
            this.pushScore(item.team, item.no, this.modelAction, this.getKind(), this.modelDetail);
            this.scoreBk = [];
            this.updateUndoRedoButton();
            this.createScoreObj();
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

            this.createScoreObj();
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
        // getAction() {
        //     return $('input[name=action]:checked').val();
        // },
        getKind() {
            // var kind = $('input[name=action]:checked').val();
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
            this.score.push({
                // index: score.length + 1,
                index: this.getMaxIndex() + 1,
                team: team,
                no: no,
                action: action,
                kind: kind,
                detail: detail,
            });
        },
        // setVisible(selector, visible) {
        //     if (visible) {
        //         $(selector).removeClass('item_invisible');
        //     } else {
        //         $(selector).addClass('item_invisible');
        //     }
        // < button class= "btn01" v- on: click = 'isActive01=!isActive01' > こちらをクリック</button >
        // <div class="hoge01" v-bind: class='{active:isActive01}'>        // },
        // setEnabled(selector, enabled) {
        //     $(selector).prop("disabled", !enabled);
        // },
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
        createScoreObj() {
            // ドラッグドロップ
            // https://www.kabanoki.net/1712/#i-4
        }
    },
}