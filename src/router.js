import Home from './views/Home.vue'
import Router from 'vue-router'
import Vue from 'vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/msg',
      name: 'msg',
      component:(resolve)=>require(['@/views/msg.vue'],resolve)
    },
    {
      path: '/ss',
      name: 'ss',
      component:(resolve)=>require(['@/views/sss.vue'],resolve)
    }
  ]
})
