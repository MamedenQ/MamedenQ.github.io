import page1 from "./page1.js";
import page2 from "./page2.js";

var router = new VueRouter({
    mode: 'history',
    // base:'/app/public/',
    routes: [
        {
            path: '/page1',
            // component: {
            //     template: page1.template
            // }
            component: page1,
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
// routerをマウント
var app = new Vue({
    el: '#app',
    router: router
}).$mount('#app');
