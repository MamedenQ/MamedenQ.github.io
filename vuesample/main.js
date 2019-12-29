// import page1 from "./page1.js";
// import page2 from "./page2.js";
import router from './router.js'
// import scoreinput from "./scoreinput.js";

const NaviA = {
    template: `
        <div class="navi_a grid_style">
            <div class="menu1">
                <svg xmlns="http://www.w3.org/2000/svg" width="70" height="70" viewBox="0 0 24 24" fill="none" stroke="#000000" stroke-width="1" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M20 9v11a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V9"/>
                    <path d="M9 22V12h6v10M2 10.6L12 2l10 8.6"/>
                </svg>
            </div>
            <div class="menu2">
            <svg xmlns="http://www.w3.org/2000/svg" width="70" height="70" viewBox="0 0 24 24" fill="none" stroke="#000000" stroke-width="1" stroke-linecap="round" stroke-linejoin="round"><path d="M19 12H6M12 5l-7 7 7 7"/></svg>
            </div>
            <div class="menu3">
            <svg xmlns="http://www.w3.org/2000/svg" width="70" height="70" viewBox="0 0 24 24" fill="none" stroke="#000000" stroke-width="1" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg>
            </div>
        </div>
    `,
    methods: {
        // handler() {
        //     alert('abc');
        // },
    },
};

// const EmmitReceiver = {
//     template: `
//         <div>
//             <div v-on:commit1="handler"></div>
//         </div>
//     `,
//     methods: {
//         handler(msg) {
//             console.log(msg);
//         },
//     },
// };

// routerをマウント
var app = new Vue({
    el: '#app',
    // components: {
    //     page1,
    // },
    components: {
        // 'navi_a': NaviA,
        // 'emt_recv': EmmitReceiver,
        // 'input_score': scoreinput,
    },
    // template: `
    // <div class="grid-main">
    //     <div v-on:commit="handler"></div>
    //     <!-- <button v-on:click="handler">abc</button> -->
    //     <div class="header grid_style">
    //         <router-link to="/page1">スコア入力</router-link>
    //         <router-link to="/page2">ユーザー一覧ページ</router-link>
    //     </div>
    //     <div class="navi_a grid_style">
    //         <div class="menu1 grid_style">メイン</div>
    //     </div>
    //     <div class="contents">
    //         <router-view>(ここにコンテンツが表示される)</router-view>
    //     </div>
    //     <div class="footer grid_style"></div>
    // </div>
    // `,
    router: router,
    // methods: {
    //     handler() {
    //         alert('abc');
    //     },
    // }
    // methods: {
    //     handler: function (msg) {
    //         console.log(msg);
    //         alert(msg);
    //     },
    // },
    methods: {
        popup() {
            console.log('popup!');
        },
        routeAnalyzeList(items) {
            this.analyzeData = items;
            this.$router.push({ path: '/analyzelist' });
        },
        routeScoreInput(scoreId) {
            this.scoreId = scoreId;
            this.$router.push({ path: '/scoreinput' });
        },
        routeScoreInputNew() {
            this.createDigest(this.digestCallback);
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
                // console.log(`"${str}" => ${"SHA-256"} (ArrayBuffer):`, x); // ArrayBuffer
                const hex = this.hexString(x); // convert to hex string.
                callback(hex);
                // console.log(`"${str}" => ${"SHA-256"} (Hex):`, hex);
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
        // router.push({ path: '/scoreinput' });
    },
    data: function () {
        return {
            // scoreId: "20191225_001",
            scoreId: "",
            analyzeData: [],
        }
    }
}).$mount('#app');

// app.component('score_input_event', {
//     template: `
//     <button v-on:click="$emit('welcome')">
//       Click me to be welcomed
//     </button>
//   `
// })
