import scoreinput from "./scoreinput.js";
import page2 from "./page2.js";

export default new VueRouter({
    // var router = new VueRouter({
    mode: 'history',
    // base:'/app/public/',
    routes: [
        {
            path: '/scoreinput',
            // component: {
            //     template: page1.template
            // }
            component: scoreinput,
        },
        {
            path: '/page2',
            // component: {
            //     template: page2
            // }
            component: page2,
        }
    ]
});
