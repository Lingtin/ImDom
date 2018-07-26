import 'vant/lib/vant-css/index.css';

import App from './App.vue'
import Vant from 'vant';
import Vue from 'vue'
import fileters from './comm/filter.js';
import router from './router'
import store from './store'

Object.keys(fileters).map((key)=>{
  Vue.filter(key,fileters[key])
})

Vue.use(Vant);
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
