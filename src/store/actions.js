const storage = window.localStorage

/* context.commit,  context.dispatch, context.state, es6 函数结构写法 */
export function LOAD_TODOS ({ commit, dispatch, state }) {
  console.log('action comit load_todos')
  // 从本地localStorage取所有todo任务
  commit('LOAD_TODOS', JSON.parse(storage.getItem('todos')))
}

export function UPDATE_TODO ({ commit, dispatch, state }, { id, name, newValue }) {
  console.log('action comit update_todo')
  commit('UPDATE_TODO', { id, name, newValue })
  // 更新 todo 都本地localStorage
  storage.setItem('todos', JSON.stringify(state.todos))
}

export function FINISH_TODO ({ commit, dispatch, state }, { id, name, newValue }) {
  console.log('action comit finish_todo')
  commit('FINISH_TODO', { id, name, newValue })
  // 更新 todo 都本地localStorage
  storage.setItem('todos', JSON.stringify(state.todos))
}

export function DELETE_TODO ({ commit, dispatch, state }, { id, name, newValue }) {
  console.log('action comit delete_todo')
  commit('DELETE_TODO', { id, name, newValue })
  // 更新 todo 都本地localStorage
  storage.setItem('todos', JSON.stringify(state.todos))
}
