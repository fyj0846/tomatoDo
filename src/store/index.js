import Vue from 'vue'
import Vuex from 'vuex'
import * as actions from './actions'
import * as mutations from './mutations'

Vue.use(Vuex)

const store = new Vuex.Store({
  actions,
  mutations,
  state: {
    todos: [],
    // todos: [{
    //   todoTitle: 'EDA基线管理',
    //   todoId: '001',
    //   tags: [{
    //     tagName: 'hard'
    //   }, {
    //     tagName: 'EDA'
    //   }],
    //   scene: {
    //     sceneName: '办公'
    //   },
    //   expectFinishTime: '17:00',
    //   spentClock: '0',
    //   priority: '4',
    //   isFinished: false
    // }, {
    //   todoTitle: 'EDA通知发布-完成',
    //   todoId: '002',
    //   tags: [{
    //     tagName: 'hard'
    //   }, {
    //     tagName: 'EDA2'
    //   }],
    //   scene: {
    //     sceneName: '办公'
    //   },
    //   expectFinishTime: '2017-05-06 17:00',
    //   spentClock: '0',
    //   priority: '4',
    //   isFinished: true
    // }, {
    //   todoTitle: '测试项目-未完成已删除',
    //   todoId: '003',
    //   tags: [{
    //     tagName: 'hard'
    //   }, {
    //     tagName: 'EDA3'
    //   }],
    //   scene: {
    //     sceneName: '办公'
    //   },
    //   expectFinishTime: '2017-05-07 17:00',
    //   spentClock: '0',
    //   priority: '4',
    //   isFinished: false,
    //   isDeleted: true
    // }, {
    //   todoTitle: '测试项目-未完成未删除',
    //   todoId: '004',
    //   tags: [{
    //     tagName: 'hard'
    //   }, {
    //     tagName: 'EDA3'
    //   }],
    //   scene: {
    //     sceneName: '办公'
    //   },
    //   expectFinishTime: '2017-05-07 17:00',
    //   spentClock: '0',
    //   priority: '2',
    //   isFinished: false,
    //   isDeleted: false
    // }],
    users: {}
  },

  getters: {
    activeTodos (state) {
      const { todos } = state
      return todos.filter(function (todo) {
        if (todo.isFinished !== true && todo.isDeleted !== true) {
          return true
        }
      })
    },
    activeTodosCount (state, getters) {
      return getters.activeTodos.length
    }
  }
})

export default store
