import App from './App.vue'
import Vue from 'vue'
import router from './router'
import stom from './api/stom.connect.js'

Vue.config.productionTip = false

stom.init();

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
