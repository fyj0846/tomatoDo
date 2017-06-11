import Vue from 'vue'
import $ from 'jquery'

// 初始化， 从localStorage加载todo
export function LOAD_TODOS (state, todos) {
  console.log('mutation load_todos')
  Vue.set(state, 'todos', todos)
}

// 加载指定Id的todo
export function LOAD_TODO (state, todo) {
  console.log('mutation load_todo')
  Vue.set(state, 'curEditTodo', todo)
}

// 更新， todo状态更新 name-目标属性名  newValue-新的属性值
export function UPDATE_TODO_MNGR (state, { id, name, newValue }) {
  console.log('mutation upadte_mngr_todo')
  for (var i = 0; i < state.todos.length; i++) {
    if (state.todos[i].todoId === id) {
      state.todos[i][name] = newValue
      break
    }
  }
}

// 完成， todo状态更新 name-目标属性名  newValue-新的属性值
export function FINISH_TODO (state, { id, name, newValue }) {
  console.log('mutation finish_todo')
  for (var i = 0; i < state.todos.length; i++) {
    if (state.todos[i].todoId === id) {
      state.todos[i][name] = newValue
      state.todos[i]['isFinished'] = true
      break
    }
  }
}

// 更新， todo状态更新
export function UPDATE_TODO (state, { item }) {
  console.log('mutation update_todo')
  for (var i = 0; i < state.todos.length; i++) {
    if (state.todos[i].todoId === item.todoId) {
      Vue.set(state.todos, i, item)  // Vue method to discover change of list
      break
    }
  }
}

// 删除， todo删除 id-todo任务编号  item-任务属性
export function DELETE_TODO (state, { id, name, newValue }) {
  console.log('mutation delete_todo')
  for (var i = 0; i < state.todos.length; i++) {
    if (state.todos[i].todoId === id) {
      state.todos[i][name] = newValue
      state.todos[i]['isDeleted'] = true
    }
  }
}

// 添加， todo新增 id-todo任务编号  item-任务属性
export function ADD_TODO (state, { id, item }) {
  console.log('mutation add_todo')
  state.todos.push(item)
}

// 加载， 从localStorage中读取projects配置
export function LOAD_PROJECTS (state, projects) {
  console.log('mutation load_projects')
  Vue.set(state, 'projects', projects)
}

// 添加， project新增 id-编号  item-属性
export function ADD_PROJECT (state, { id, item }) {
  console.log('mutation add_project')
  state.projects.push(item)
}

// 更新， project更新
export function UPDATE_PROJECT (state, { id, item }) {
  console.log('mutation update_project')
  for (var i = 0; i < state.projects.length; i++) {
    if (state.projects[i].projectId === id) {
      Vue.set(state.projects, i, item)  // Vue method to discover change of list
      break
    }
  }
}

// 删除， todo状态更新 name-目标属性名  newValue-新的属性值
export function DELETE_PROJECT (state, { id }) {
  console.log('mutation delete_project')
  for (var i = 0; i < state.projects.length; i++) {
    if (state.projects[i].projectId === id) {
      var newCopy = $.extend(true, {}, state.todos[i])
      newCopy['isDeleted'] = true
      Vue.set(state.projects, i, newCopy)  // Vue method to discover change of list
      break
    }
  }
}

// 加载， 从localStorage中读取scenes配置
export function LOAD_SCENES (state, scenes) {
  console.log('mutation load_scenes')
  Vue.set(state, 'scenes', scenes)
}

// 添加， scene新增 id-编号  item-属性
export function ADD_SCENE (state, { id, item }) {
  console.log('mutation add_scene')
  state.scenes.push(item)
}

// 删除， todo状态更新 name-目标属性名  newValue-新的属性值
export function DELETE_SCENE (state, { id }) {
  console.log('mutation delete_scene')
  for (var i = 0; i < state.scenes.length; i++) {
    if (state.scenes[i].sceneId === id) {
      var newCopy = $.extend(true, {}, state.todos[i])
      newCopy['isDeleted'] = true
      Vue.set(state.scenes, i, newCopy)  // Vue method to discover change of list
      break
    }
  }
}
