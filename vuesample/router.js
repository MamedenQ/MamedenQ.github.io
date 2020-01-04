import home from "./home.js";
import scoreinput from "./scoreinput.js";
import analyzelistplayer from "./analyzelistplayer.js";
import analyzelistmatch from "./analyzelistmatch.js";
import scorelist from "./scorelist.js";
import settings from "./settings.js";
// import analyzedetail from "./AnalyzeDetail.js";

export default new VueRouter({
    mode: 'history',
    // base:'/app/public/',
    routes: [
        {
            path: '/home',
            component: home,
        },
        {
            path: '/scoreinput',
            component: scoreinput,
        },
        {
            path: '/settings',
            component: settings,
        },
        {
            path: '/analyzelistplayer',
            component: analyzelistplayer,
        },
        {
            path: '/analyzelistmatch',
            component: analyzelistmatch,
        },
        {
            path: '/scorelist',
            component: scorelist,
        },
        // {
        //     path: '/AnalyzeDetail',
        //     component: analyzedetail,
        // },
    ]
});
