import Vue from 'vue'
import Router from 'vue-router'
import todosView from '@/components/todosView'
import addTodoView from '@/components/addTodoView'
import world from '../components/World'

Vue.use(Router)

// 全局路由映射，通过注入Vue的根组件实现子Vue组件的直接引用
export default new Router({
  routes: [
    {
      // 默认路由重定向
      path: '/',
      redirect: '/todoView'
    },
    {
      // todo任务展示列表
      path: '/todoView',
      name: 'todosView',
      component: todosView
    }, {
      // todo任务-新建
      path: '/addTodoView',
      name: 'addTodoView',
      component: addTodoView
    }, {
      // 测试组件
      path: '/world',
      name: 'world',
      component: world
    }
  ]
})
