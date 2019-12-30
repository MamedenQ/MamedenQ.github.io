import scoreinput from "./scoreinput.js";
import analyzelist from "./analyzelist.js";
import scorelist from "./scorelist.js";
import trashlist from "./trashlist.js";

export default new VueRouter({
    mode: 'history',
    // base:'/app/public/',
    routes: [
        {
            path: '/scoreinput',
            component: scoreinput,
        },
        {
            path: '/trashlist',
            component: trashlist,
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
