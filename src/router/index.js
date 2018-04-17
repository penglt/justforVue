import Vue from 'vue'
import Router from 'vue-router'
import one from '@/components/One'
import joke from '@/components/joke'
import detail from '@/components/detail'

Vue.use(Router)

export default new Router({
  mode:'history',
  routes: [
    {
      path: '/',
      name: 'one',
      component: one
    },
    {
      path: '/joke',
      component: joke
    },
    {
      path: '/mood/:typeId',
      component: function(resolve){
          require(['@/components/mood'],resolve)
      }
    },
    {
      path: '/detail/:productId',
      component: detail
    },
//这边都是后台相关的页面
    {
      path: '/admin',
      component: function(resolve){
        require(['@/admin/login'],resolve)
      }
    },
    {
      path: '/admin/index',
      component: function(resolve){
        require(['@/admin/index'],resolve)
      }
    },
    {
      path: '/upload',
      component: function(resolve){
        require(['@/admin/addmood'],resolve)
      }
    },
  ]
})
