const template = `
<div>
    <span>DBバックアップ</span><br>
    <button v-on:click="onClickBackupDB">DBバックアップ</button><br>
    <span>前回バックアップ日時 : {{ bkDate }}</span><br><br>
    <span>DBリストア</span><br>
    <button v-on:click="onClickRestoreDB">DBリストア</button><br><br>
    
    <span>DB内容JSON出力</span><br>
    <button v-on:click="outputDB">出力</button><br>
    <textarea style="width:100%;height:300px;">{{output}}</textarea><br><br>
    <span>JSON入力</span><br>
    <button v-on:click="onClickInputDB">入力</button><br>
    <textarea style="width:100%;height:300px;" v-model="modelInput"></textarea>

    <confirm v-if="showModalConfirm" v-on:dialogResult="result" :title="title" :msg="msg" :positive="positive" :negative="negative"></confirm>
</div>
`;

import confirm from './confirm.js'

export default {
    template,
    components: {
        confirm,
    },
    data() {
        return {
            output: "",
            modelInput: "",
            showModalConfirm: false,
            title: "",
            msg: "",
            positive: "OK",
            negative: "Cancel",
            callbackConfirm: null,
            bkDate: "",
        };
    },
    computed: {
        // compMessage() {
        //     return this.modelA + this.modelB;
        // }
    },
    mounted() {
        var bkDate = localStorage.getItem("bk_date");
        if (bkDate == null) {
            bkDate = "";
        }
        this.bkDate = bkDate;
    },
    methods: {
        outputDB() {
            var score = JSON.parse(localStorage.getItem("score"));
            var members = JSON.parse(localStorage.getItem("members"));
            var outputJson = {
                score: score,
                members: members,
            };
            this.output = JSON.stringify(outputJson);
        },
        onClickInputDB() {
            this.title = "入力確認";
            this.msg = " DBへ入力しますか？";
            this.callbackConfirm = this.callbackInputDB;

            this.showModalConfirm = true;
        },
        callbackInputDB(result) {
            if (!result) {
                return;
            }
            var inputJson = JSON.parse(this.modelInput);
            localStorage.setItem("score", JSON.stringify(inputJson.score));
            localStorage.setItem("members", JSON.stringify(inputJson.members));
            this.$emit("route-home");
        },
        onClickBackupDB() {
            this.title = "DBバックアップ確認";
            this.msg = " DBをバックアップしますか？";
            this.callbackConfirm = this.callbackBackupDB;

            this.showModalConfirm = true;
        },
        callbackBackupDB(result) {
            if (!result) {
                return;
            }

            var d = new Date();
            console.log("バックアップ日時:" + d.toLocaleString());
            var bkDate = d.toLocaleString();
            this.bkDate = bkDate;

            var score = JSON.parse(localStorage.getItem("score"));
            var members = JSON.parse(localStorage.getItem("members"));
            var teams = JSON.parse(localStorage.getItem("teams"));
            localStorage.setItem("bk_date", bkDate);
            localStorage.setItem("score_bk", JSON.stringify(score));
            localStorage.setItem("members_bk", JSON.stringify(members));
            localStorage.setItem("teams_bk", JSON.stringify(teams));
        },
        onClickRestoreDB() {
            this.title = "DBリストア確認";
            this.msg = " DBをリストアしますか？";
            this.callbackConfirm = this.callbackRestoreDB;

            this.showModalConfirm = true;
        },
        callbackRestoreDB(result) {
            if (!result) {
                return;
            }

            var score = JSON.parse(localStorage.getItem("score_bk"));
            var members = JSON.parse(localStorage.getItem("members_bk"));
            var teams = JSON.parse(localStorage.getItem("teams_bk"));
            localStorage.setItem("score", JSON.stringify(score));
            localStorage.setItem("members", JSON.stringify(members));
            localStorage.setItem("teams", JSON.stringify(teams));
        },
        result(flg) {
            this.callbackConfirm(flg);
            this.showModalConfirm = false;
        },
    }
};

