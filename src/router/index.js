import Vue from 'vue'
import Router from 'vue-router'
import login from '@/components/login'
import todosView from '@/components/todosView'
import addTodoView from '@/components/addTodoView'
import editTodoView from '@/components/editTodoView'
import timePicker from '../components/common/time-picker'
import projectManager from '../components/projectManager'
import sceneManager from '../components/sceneManager'

Vue.use(Router)

// 全局路由映射，通过注入Vue的根组件实现子Vue组件的直接引用
export default new Router({
  routes: [
    {
      // 默认路由重定向
      path: '/',
      // redirect: '/login'
      redirect: '/todosView'
    },
    {
      // 用户登录/注册
      path: '/login',
      name: 'login',
      component: login
    },
    {
      // todo任务展示列表
      path: '/todosView',
      name: 'todosView',
      component: todosView
    }, {
      // todo任务-新建
      path: '/addTodoView',
      name: 'addTodoView',
      component: addTodoView
    }, {
      // todo任务-编辑
      path: '/editTodoView',
      name: 'editTodoView',
      component: editTodoView
    }, {
      // 项目管理
      path: '/projectManager',
      name: 'projectManager',
      component: projectManager
    }, {
      // 场景管理
      path: '/sceneManager',
      name: 'sceneManager',
      component: sceneManager
    },
    {
      // 测试组件
      path: '/test',
      name: 'time-picker',
      component: timePicker
    }
  ]
})
