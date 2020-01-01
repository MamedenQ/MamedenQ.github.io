import home from "./home.js";
import scoreinput from "./scoreinput.js";
import analyzelist from "./analyzelist.js";
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
            path: '/analyzelist',
            component: analyzelist,
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
