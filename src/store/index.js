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
    allTodos (state) {
      const { todos } = state
      return todos.filter(function (todo) {
        if (todo.isDeleted !== 'T') {
          return true
        }
      })
    },
    allTodosCount (state, getters) {
      return getters.allTodos.length
    },
    activeTodos (state) {
      const { todos } = state
      return todos.filter(function (todo) {
        if (todo.isFinished != 'T' && todo.isDeleted != 'T') {
          return true
        }
      })
    },
    activeTodosCount (state, getters) {
      return getters.activeTodos.length
    },
    curEditTodo (state) {
      const { curEditTodo } = state
      return curEditTodo
    },
    activePriorities (state) {
      const { priorities } = state;
      return priorities;
    },
    activeProjects (state) {
      const { projects } = state
      return projects.filter(function (project) {
        if (project.isDeleted !== true) {
          return true
        }
      })
    },
    activeScenes (state) {
      const { scenes } = state
      return scenes.filter(function (scene) {
        if (scene.isDeleted !== true) {
          return true
        }
      })
    }
  }
})

export default store
