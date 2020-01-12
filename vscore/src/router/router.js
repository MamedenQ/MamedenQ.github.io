import Vue from 'vue'
import VueRouter from 'vue-router'

import home from "../components/Home";
import scoreinput from "../components/ScoreInput";
import scorelist from "../components/ScoreList";
import analyzelist from "../components/AnalyzeList";
// import analyzelistmatch from "../components/AnalyzeListMatch";
import settings from "../components/Settings";

Vue.use(VueRouter)

export default new VueRouter({
    test: {
        scoreInput: scoreinput,
    },
    mode: 'history',
    // base:'/app/public/',
    routes: [
        {
            path: '/home',
            component: scorelist,
        },
        {
            name: "scoreInput",
            path: '/scoreinput',
            component: scoreinput,
        },
        {
            path: '/scorelist',
            component: scorelist,
        },
        {
            path: '/analyzelist',
            component: analyzelist,
        },
        // {
        //     path: '/analyzelistmatch',
        //     component: analyzelistmatch,
        // },
        // {
        //     path: '/AnalyzeDetail',
        //     component: analyzedetail,
        // },
        {
            path: '/settings',
            component: settings,
        },
    ]
});
