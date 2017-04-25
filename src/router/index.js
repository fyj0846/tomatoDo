import Vue from 'vue'
import Router from 'vue-router'
import todosView from '@/components/todosView'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'todosView',
      component: todosView
    }
  ]
})
