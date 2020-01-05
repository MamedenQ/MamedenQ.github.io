import Vue from 'vue'
import VueRouter from 'vue-router'

import home from "../components/home";
import scoreinput from "../components/scoreinput";
import scorelist from "../components/scorelist";
import analyzelistplayer from "../components/analyzelistplayer";
import analyzelistmatch from "../components/analyzelistmatch";
import settings from "../components/settings";

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
