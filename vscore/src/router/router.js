import Vue from 'vue'
import VueRouter from 'vue-router'

import home from "../components/Home";
import scoreinput from "../components/ScoreInput";
import scorelist from "../components/ScoreList";
import analyzelistplayer from "../components/AnalyzeListPlayer";
import analyzelistmatch from "../components/AnalyzeListMatch";
import settings from "../components/Settings";

Vue.use(VueRouter)

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
            path: '/scorelist',
            component: scorelist,
        },
        {
            path: '/analyzelistplayer',
            component: analyzelistplayer,
        },
        {
            path: '/analyzelistmatch',
            component: analyzelistmatch,
        },
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
