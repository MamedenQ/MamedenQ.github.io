const template = `
<div class="grid-top">
    <div class="btninput" v-on:click="onClickScoreInput">
    <!--
        <span>スコアを入力する</span>
        -->
        <scoreinputicon class="grid_style"></scoreinputicon>
    </div>
</div>
`;

import scoreinputicon from './scoreinputicon.js'

export default {
    template,
    components: {
        scoreinputicon,
    },
    methods: {
        onClickScoreInput() {
            this.$emit("route-score-input-new");
        },

    },
};
