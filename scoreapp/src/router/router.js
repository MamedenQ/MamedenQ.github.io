import Vue from "vue";
import VueRouter from "vue-router";

import scoreinput from "../components/ScoreInput";
import scorelist from "../components/ScoreList";
import analyzelist from "../components/AnalyzeList";
import analyzedetail from "../components/AnalyzeDetail";
import settings from "../components/Settings";

Vue.use(VueRouter);

export default new VueRouter({
    test: {
        scoreInput: scoreinput
    },
    mode: "history",
    // base:'/app/public/',
    routes: [
        {
            path: "/scoreapp/home",
            component: scorelist
        },
        {
            name: "scoreInput",
            path: "/scoreapp/scoreinput",
            component: scoreinput
        },
        {
            path: "/scoreapp/scorelist",
            component: scorelist
        },
        {
            path: "/scoreapp/analyzelist",
            component: analyzelist
        },
        {
            path: "/scoreapp/analyzedetail",
            component: analyzedetail
        },
        {
            path: "/scoreapp/settings",
            component: settings
        }
    ]
});
