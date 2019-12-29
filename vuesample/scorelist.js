const template = `
<div>
    <button v-on:click="linkAnalyzeList">分析</button>
    <table>
        <thead>
            <tr>
                <td>chk</td>
                <td>#</td>
                <td>タイトル</td>
                <td>日付</td>
                <td>セットカウント</td>
                <td>スコアリンク</td>
            </tr>
        </thead>
        <tbody>
            <tr v-for="item, idx of scoreList">
                <td><input type="checkbox" v-model="modelTarget" :value="item" v-on:change="onCheckChange()" /></td>
                <td>{{ idx }}</td>
                <td>{{ item.title }}</td>
                <td>{{ item.date }}</td>
                <td>セットカウント</td>
                <td><a href="#" v-on:click="linkScoreInput(item.id)">リンク</a></td>
            </tr>
        </tbody>
    </table>
    <button v-on:click="linkAnalyzeList">分析</button>
</div>
`;

export default {
    template,
    props: {
        score: String,
    },
    data() {
        return {
            scoreList: [],
            modelTarget: [],
        };
    },
    computed: {
        // compMessage() {
        //     return this.modelA + this.modelB;
        // }
    },
    mounted() {
        this.scoreList = JSON.parse(localStorage.getItem("score"));
    },
    methods: {
        onCheckChange() {
            console.log(this.modelTarget);
        },
        linkAnalyzeList() {
            this.$emit("route-analyze-list", this.modelTarget);
        },
        linkScoreInput(scoreId) {
            this.$emit("route-score-input", scoreId);
        }
    }
};

