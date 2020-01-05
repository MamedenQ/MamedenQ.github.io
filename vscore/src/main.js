import Vue from 'vue'
import App from './App'
import router from './router/router'

import vueSmoothScroll from 'vue-smooth-scroll'
Vue.use(vueSmoothScroll);

// 必ずVueインスタンス作成前に登録する
Vue.directive('scroll', {
  inserted: function (el, binding) {
    let f = function (evt) {
      if (binding.value(evt, el)) {
        window.removeEventListener('scroll', f)
      }
    };
    window.addEventListener('scroll', f)
  }
});

import VueGoodTablePlugin from 'vue-good-table';

// import the styles 
import 'vue-good-table/dist/vue-good-table.css'

Vue.use(VueGoodTablePlugin);

new Vue({
  router: router,
  el: '#app',
  render: h => h(App),
  // components: { Home },
  data: {
  },
});

