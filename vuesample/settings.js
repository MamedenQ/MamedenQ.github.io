const template = `
<div class="main-area">
    <div class="view-contents">
        <span id="page-top"></span>
        <trashList></trashList><br><br>
        <masterMaintenance></masterMaintenance><br><br>
        <!--
        <span>詳細あり・なし</span><br>
        <input type="radio" id="detail_off" name="detail" v-model="settings.detail" value="0">
        <label for="detail_off">ON</label>
        <input type="radio" id="detail_on" name="detail" v-model="settings.detail" value="1">
        <label for="detail_on">OFF</label>
        <span>色設定</span><br>
        -->

        <backup></backup>
        <a data-scroll href="#page-top" style="position:fixed;bottom:10px;right:10px;filter: drop-shadow(3px 3px 3px rgba(0, 0, 0, 0.6));"><movetop></movetop></a>
    </div>
    <div class="menu" v-bind:style="styleNavi">
        <span>
            <span>ホーム</span>
            <svg v-on:click="onHome" xmlns="http://www.w3.org/2000/svg" width="70" height="70" viewBox="0 0 24 24" fill="none" stroke="#000000" stroke-width="1" stroke-linecap="round" stroke-linejoin="round">
                <path d="M20 9v11a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V9"/>
                <path d="M9 22V12h6v10M2 10.6L12 2l10 8.6"/>
            </svg>
        </span>
    </div>
    <confirm v-if="showModalConfirm" v-on:dialogResult="result" :title="title" :msg="msg" :positive="positive" :negative="negative"></confirm>
</div>
`;

import confirm from './confirm.js'
import trashList from './trashlist.js'
import masterMaintenance from './mastermaintenance.js'
import backup from './backup.js'
import movetop from './movetop.js'

export default {
    template,
    components: {
        trashList,
        masterMaintenance,
        confirm,
        backup,
        movetop,
    },
    data() {
        return {
            showModalConfirm: false,
            title: "",
            msg: "",
            positive: "OK",
            negative: "キャンセル",
            callbackConfirm: null,
            // styleGrid: {
            //     "grid-template-rows": "1fr",
            // },
            styleNavi: {
                "line-height": "700px",
            },
        };
    },
    computed: {
        // compMessage() {
        //     return this.modelA + this.modelB;
        // }
    },
    mounted() {
        var gridHeight = (window.innerHeight - 10);
        // this.styleGrid = {
        //     "grid-template-rows": gridHeight + "px",
        // };
        this.styleNavi = {
            "line-height": gridHeight + "px",
        };
    },
    methods: {
        onHome() {
            this.$emit("route-home");
        },
    }
};

