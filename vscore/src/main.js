import Vue from "vue";
Vue.config.devtools = true;

import App from "./App.vue";
import vuetify from "./plugins/vuetify";
import router from "./router/router";

import vueSmoothScroll from "vue-smoothscroll";
Vue.use(vueSmoothScroll);

import dataAccess from "./components/DataAccess/DataAccess";
Vue.use(dataAccess);

Vue.config.productionTip = false;

new Vue({
    // mixins: [scrollMixin],
    router: router,
    vuetify: vuetify,
    render: h => h(App)
}).$mount("#app");
