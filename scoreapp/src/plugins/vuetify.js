import Vue from 'vue';
import Vuetify from 'vuetify/lib';
// import colors from 'vuetify/lib/util/colors'
import '@fortawesome/fontawesome-free/css/all.css'

// Vue.use(Vuetify, {
//     primary: "#3f51b5",
//     secondary: "#2196f3",
//     accent: "#ff5722",
//     error: "#e91e63",
//     warning: "#ffc107",
//     info: "#607d8b",
//     success: "#009688"
// });
Vue.use(Vuetify);

export default new Vuetify({
    icons: {
        iconfont: 'fa',
    },
    // icons: {
    //     iconfont: 'mdi', // default
    //     values: {
    //         serve: '',
    //         support: 'mdi-lifebuoy',
    //         steam: 'mdi-steam-box',
    //         pc: 'mdi-desktop-classic',
    //         xbox: 'mdi-xbox',
    //         playstation: 'mdi-playstation',
    //         switch: 'mdi-nintendo-switch',
    //     },
    // },
    theme: {
        themes: {
            light: {
                //     primary: "#3f51b5",
                //     secondary: "#2196f3",
                //     accent: "#ff5722",
                //     error: "#e91e63",
                //     warning: "#ffc107",
                //     info: "#607d8b",
                //     success: "#009688"
            },
        },
    },
});
