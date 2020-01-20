import Vue from 'vue'
import VueRouter from 'vue-router'

import scoreinput from "../components/ScoreInput";
import scorelist from "../components/ScoreList";
import analyzelist from "../components/AnalyzeList";
import analyzedetail from "../components/AnalyzeDetail";
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
        {
            path: '/analyzedetail',
            component: analyzedetail,
        },
        {
            path: '/settings',
            component: settings,
        },
    ]
});
