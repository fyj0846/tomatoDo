import Vue from 'vue'
import $ from 'jquery'

// 初始化， 从localStorage加载todo
export function LOAD_TODOS (state, todos) {
  console.log('mutation load_todos')
  Vue.set(state, 'todos', todos)
}

// 更新， todo状态更新 name-目标属性名  newValue-新的属性值
export function UPDATE_TODO (state, { id, name, newValue }) {
  console.log('mutation upadte_todo')
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

// 删除， todo状态更新 name-目标属性名  newValue-新的属性值
export function DELETE_TODO (state, { id, name, newValue }) {
  console.log('mutation delete_todo')
  for (var i = 0; i < state.todos.length; i++) {
    if (state.todos[i].todoId === id) {
      var newCopy = $.extend(true, {}, state.todos[i])
      newCopy[name] = newValue
      newCopy['isDeleted'] = true
      Vue.set(state.todos, i, newCopy)  // Vue method to discover change of list
      break
    }
  }
}

// 添加， todo新增 id-todo任务编号  item-任务属性
export function ADD_TODO (state, { id, item }) {
  console.log('mutation add_todo')
  state.todos.push(item)
}
