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
    curEditTodo: {},
    projects: [],
    scenes: [],
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
    curEditTodo (state) {
      const { curEditTodo } = state
      return curEditTodo
    },
    activeTodosCount (state, getters) {
      return getters.activeTodos.length
    },
    activeProjects (state) {
      const { projects } = state
      return projects
    },
    activeScenes (state) {
      const { scenes } = state
      return scenes
    }
  }
})

export default store
