import Vue from "vue";
Vue.config.devtools = true;

import App from "./App.vue";
import vuetify from "./plugins/vuetify";
import router from "./router/router";

import vueSmoothScroll from "vue-smoothscroll";
Vue.use(vueSmoothScroll);

var scrollMixin = {
    created: function() {},
    methods: {
        moveTop() {
            this.$SmoothScroll(document.querySelector("#page-top"), 750, this.callbackTop, undefined, "y");
        },
        callbackTop() {
            // console.log("callbackTop");
        }
    }
};

Vue.mixin(scrollMixin);

import dataAccess from "./components/DataAccess/DataAccess";
Vue.use(dataAccess);

Vue.config.productionTip = false;

new Vue({
    // mixins: [scrollMixin],
    router: router,
    vuetify: vuetify,
    render: h => h(App)
}).$mount("#app");
