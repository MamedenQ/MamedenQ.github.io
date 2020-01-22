import Vue from "vue";
Vue.config.devtools = true;

import App from "./App.vue";
import vuetify from "./plugins/vuetify";
import router from "./router/router";

import vueSmoothScroll from "vue-smooth-scroll";
Vue.use(vueSmoothScroll);

// 必ずVueインスタンス作成前に登録する
Vue.directive("scroll", {
    inserted: function(el, binding) {
        let f = function(evt) {
            if (binding.value(evt, el)) {
                window.removeEventListener("scroll", f);
            }
        };
        window.addEventListener("scroll", f);
    }
});

import dataAccess from "./components/DataAccess/DataAccess";
Vue.use(dataAccess);

Vue.config.productionTip = false;

new Vue({
    router: router,
    vuetify: vuetify,
    render: h => h(App)
}).$mount("#app");
