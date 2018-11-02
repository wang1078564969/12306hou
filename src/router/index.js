import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import User from '@/pages/User'
import Piao from '@/pages/Piao'
import Ex from '@/pages/Ex'
import Station from '@/pages/Station'


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: HelloWorld
    },
    {
      path:'/user',
      component:User
    }, {
      path: '/piao',
      component: Piao
    }, {
      path: '/ex',
      component: Ex
    }, {
      path: '/station',
      component: Station
    },
  ]
})
