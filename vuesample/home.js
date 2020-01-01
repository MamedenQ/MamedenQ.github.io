const template = `
<div class="grid-top">
    <div class="btninput" v-on:click="onClickScoreInput">
    <!--
        <span>スコアを入力する</span>
        -->
        <scoreinputicon class="grid_style"></scoreinputicon>
    </div>
    <div class="btnlist" v-on:click="onClickScoreList">
        <analyzeicon class="grid_style"></analyzeicon>
    </div>
    <div class="btnsettings" v-on:click="onClickSettings">
        <settingsIcon class="grid_style"></settingsIcon>
    </div>
    <div class="empty">
        ここにアプリ名入れる
    </div>
</div>
`;

import scoreinputicon from './scoreinputicon.js'
import analyzeicon from './analyzeicon.js'
import settingsIcon from './SettingsIcon.js'

export default {
    template,
    components: {
        scoreinputicon,
        analyzeicon,
        settingsIcon,
    },
    methods: {
        onClickScoreInput() {
            this.$emit("route-score-input-new");
        },
        onClickScoreList() {
            this.$emit("route-score-list");
        },
        onClickSettings() {
            this.$emit("route-settings");
        },
    },
};
