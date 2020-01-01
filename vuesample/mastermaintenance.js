const template = `
<div>
    <span>マスタメンテ</span><br>
    <table class="analyze">
        <thead class="analyze_head">
            <tr>
                <th style="width:25%">番号</th>
                <th style="width:25%">名前</th>
                <th style="width:25%">性別</th>
                <th style="width:25%">削除</th>
            </tr>
        </thead>
        <draggable element="tbody" class="analyze_body">
            <tr v-for="item, idx of members" :keys="idx">
                <td><input style="width:100%" type="text" v-model="members[idx].no" /></td>
                <td><input style="width:100%" type="text" v-model="members[idx].name" /></td>
                <td style="text-align:center;">
                    <input type="radio" id="male" v-bind:name="'sex' + idx" v-model="members[idx].sex" value="0">
                    <label for="male">男</label>
                    <input type="radio" id="female" v-bind:name="'sex' + idx" v-model="members[idx].sex" value="1">
                    <label for="female">女</label>
                </td>
                <td><button v-on:click="onClickDelete(item)">削除</button></td>
            </tr>
        </draggable>
    </table>
    <button v-on:click="onClickAdd">追加</button>
    <button v-on:click="onClickSave">保存</button>
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
            negative: "Cancel",
            callbackConfirm: null,
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
        testf() {
            // console.log(testm);
            console.log(JSON.stringify(this.test, null, "    "));
        },
        refresh() {
            this.members = JSON.parse(localStorage.getItem("members"));
            if (this.members == null) {
                this.members = [];
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
        onClickAdd() {
            this.members.push(
                {
                    no: "",
                    name: "",
                    sex: 0,
                }
            );
        },
        onClickSave() {
            // this.deleteItem = item;
            this.title = "保存確認";
            this.msg = "保存しますか？";
            this.callbackConfirm = this.callbackSave;

            this.showModalConfirm = true;
        },
        callbackSave(result) {
            if (!result) {
                return;
            }
            localStorage.setItem("members", JSON.stringify(this.members));
        },
    }
};

