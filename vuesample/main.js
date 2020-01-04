import router from './router.js'

// routerをマウント
var app = new Vue({
    el: '#app',
    components: {
    },
    router: router,
    methods: {
        popup() {
            console.log('popup!');
        },
        routeScoreList() {
            this.$router.push({ path: '/scorelist' });
        },
        routeAnalyzeList(items) {
            this.analyzeData = items;
            this.$router.push({ path: '/analyzelist' });
        },
        routeScoreInput(scoreId) {
            this.scoreId = scoreId;
            this.isNewScore = false;
            this.$router.push({ path: '/scoreinput' });
        },
        routeScoreInputNew() {
            this.isNewScore = true;
            this.createDigest(this.digestCallback);
        },
        routeHome() {
            this.$router.push({ path: '/home' });
        },
        routeSettings() {
            this.$router.push({ path: '/settings' });
        },
        routeAnalyzeDetail(analyzePlayerData) {
            this.analyzePlayerData = analyzePlayerData;
            this.$router.push({ path: '/AnalyzeDetail' });
        },
        digestCallback(hex) {
            this.scoreId = hex;
            this.$router.push({ path: '/scoreinput' });
        },
        createDigest(callback) {
            if (!crypto || !crypto.subtle) {
                throw Error("crypto.subtle is not supported."); // ブラウザ未対応
            }
            var d = new Date();
            console.log(d.toLocaleString());
            var str = d.toLocaleString();

            crypto.subtle.digest("SHA-256", new TextEncoder().encode(str)).then(x => {
                const hex = this.hexString(x); // convert to hex string.
                callback(hex);
            });
        },
        hexString(buffer) {
            const byteArray = new Uint8Array(buffer);
            const hexCodes = [...byteArray].map(value => {
                const hexCode = value.toString(16);
                const paddedHexCode = hexCode.padStart(2, '0');
                return paddedHexCode;
            });
            return hexCodes.join('');
        }
    },
    mounted() {
        router.push({ path: '/home' });
    },
    data: function () {
        return {
            isNewScore: true,
            scoreId: "",
            analyzeData: [],
            analyzePlayerData: {},
        }
    }
}).$mount('#app');
