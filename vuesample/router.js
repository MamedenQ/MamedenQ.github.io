import scoreinput from "./scoreinput.js";
import analyzelist from "./analyzelist.js";
import scorelist from "./scorelist.js";

export default new VueRouter({
    mode: 'history',
    // base:'/app/public/',
    routes: [
        {
            path: '/scoreinput',
            component: scoreinput,
        },
        {
            path: '/analyzelist',
            component: analyzelist,
        },
        {
            path: '/scorelist',
            component: scorelist,
        }
    ]
});
