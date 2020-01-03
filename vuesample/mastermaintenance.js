const template = `
<div>
    <span>マスタメンテ</span><br>
    <table class="analyze">
        <thead class="analyze_head">
            <tr>
                <th style="width:20%">番号</th>
                <th style="width:20%">名前</th>
                <th style="width:20%">性別</th>
                <th style="width:20%">所属</th>
                <th style="width:20%">削除</th>
            </tr>
        </thead>
        <tbody class="analyze_body">
            <tr v-for="item, idx of members" :keys="idx">
                <td><input style="width:100%" type="text" v-model="members[idx].no" /></td>
                <td><input style="width:100%" type="text" v-model="members[idx].name" /></td>
                <td style="text-align:center;">
                    <input type="radio" id="male" v-bind:name="'sex' + idx" v-model="members[idx].sex" value="0">
                    <label for="male">男</label>
                    <input type="radio" id="female" v-bind:name="'sex' + idx" v-model="members[idx].sex" value="1">
                    <label for="female">女</label>
                </td>
                <td>
                    <select v-model="members[idx].team" style="width:100%">
                        <option v-for="team in teams" v-bind:value="team.no">
                            {{ team.name }}
                        </option>
                    </select>
                </td>
                <td style="text-align:center;"><button v-on:click="onClickDelete(item)" class="btn btn-warning">削除</button></td>
            </tr>
        </tbody>
    </table>
    <button v-on:click="onClickAddMember" class="btn btn-primary">追加</button>
    <button v-on:click="onClickSaveMember" class="btn btn-primary">保存</button>
    <br><br><br>
    <table class="analyze">
        <thead class="analyze_head">
            <tr>
                <th style="width:50%">番号</th>
                <th style="width:50%">チーム名前</th>
            </tr>
        </thead>
        <tbody class="analyze_body">
            <tr v-for="item, idx of teams" :keys="idx">
                <td>{{ item.no }}</td>
                <td><input style="width:100%" type="text" v-model="teams[idx].name" /></td>
            </tr>
        </tbody>
    </table>
    <button v-on:click="onClickSaveTeam" class="btn btn-primary">保存</button>
    <confirm v-if="showModalConfirm" v-on:dialogResult="result" :title="title" :msg="msg" :positive="positive" :negative="negative"></confirm>
</div>
`;

import confirm from './confirm.js'

export default {
    template,
    // props: {
    //     score: String,
    // },
    components: {
        confirm,
    },
    data() {
        return {
            deleteItem: [],
            members: [],
            showModalConfirm: false,
            modelDeleteTarget: [],
            title: "",
            msg: "",
            positive: "OK",
            negative: "キャンセル",
            callbackConfirm: null,
            teams: [
                { no: 1, name: "" },
                { no: 2, name: "" },
                { no: 3, name: "" },
                { no: 4, name: "" },
                { no: 5, name: "" },
                { no: 6, name: "" },
                { no: 7, name: "" },
                { no: 8, name: "" },
                { no: 9, name: "" },
                { no: 10, name: "" },
            ],
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
            this.members = JSON.parse(localStorage.getItem("members"));
            if (this.members == null) {
                this.members = [];
            }
            this.teams = JSON.parse(localStorage.getItem("teams"));
            if (this.teams == null) {
                this.teams = [
                    { no: 1, name: "" },
                    { no: 2, name: "" },
                    { no: 3, name: "" },
                    { no: 4, name: "" },
                    { no: 5, name: "" },
                    { no: 6, name: "" },
                    { no: 7, name: "" },
                    { no: 8, name: "" },
                    { no: 9, name: "" },
                    { no: 10, name: "" },
                ];
            }
        },
        onClickDelete(item) {
            this.deleteItem = item;
            this.title = "削除確認";
            this.msg = "削除しますか？";
            this.callbackConfirm = this.callbackDelete;

            this.showModalConfirm = true;
        },
        result(flg) {
            this.callbackConfirm(flg);
            this.showModalConfirm = false;
        },
        callbackDelete(result) {
            if (!result) {
                return;
            }

            var item = this.deleteItem;
            // var scoreList = JSON.parse(localStorage.getItem("score"));
            var filterData = this.members.filter(function (data, index) {
                if (data.no != item.no) return true;
            });
            // filterData[0].isTrash = true;

            // localStorage.setItem("score", JSON.stringify(scoreList));

            this.members = filterData;
            // this.refresh();
        },
        onClickAddMember() {
            this.members.push(
                {
                    no: "",
                    name: "",
                    sex: 0,
                }
            );
        },
        onClickSaveMember() {
            this.title = "保存確認";
            this.msg = "保存しますか？";
            this.callbackConfirm = this.callbackSaveMember;

            this.showModalConfirm = true;
        },
        callbackSaveMember(result) {
            if (!result) {
                return;
            }
            localStorage.setItem("members", JSON.stringify(this.members));
        },
        onClickSaveTeam() {
            this.title = "保存確認";
            this.msg = "保存しますか？";
            this.callbackConfirm = this.callbackSaveTeam;

            this.showModalConfirm = true;
        },
        callbackSaveTeam(result) {
            if (!result) {
                return;
            }
            localStorage.setItem("teams", JSON.stringify(this.teams));
        },
    }
};

