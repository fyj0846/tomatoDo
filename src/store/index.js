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
    user: {},
    priorities: [],
    tags: []
  },
  getters: {
    currentUser(state) {
      var {user} = state
      return user;
    },
    allTodos (state) {
      const { todos } = state
      return todos.filter(function (todo) {
        if (todo.isDelete !== 'T') {
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
        if (todo.isFinished != 'T' && todo.isDelete != 'T') {
          return true
        }
      })
    },
    finishedTodos (state) {
      const { todos } = state
      return todos.filter(function (todo) {
        if (todo.isFinished == 'T' && todo.isDelete != 'T') {
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
        if (project.isDelete !== 'T') {
          return true
        }
      })
    },
    activeScenes (state) {
      const { scenes } = state
      return scenes.filter(function (scene) {
        if (scene.isDelete !== 'T') {
          return true
        }
      })
    }
  }
})

export default store
