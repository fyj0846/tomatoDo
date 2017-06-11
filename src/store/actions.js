import {getItemInArray} from '../commonTool'

const storage = window.localStorage

/* context.commit,  context.dispatch, context.state, es6 函数结构写法 */
export function LOAD_TODOS ({ commit, dispatch, state }) {
  console.log('action comit load_todos')
  // 从本地localStorage取所有todo任务
  var todosFromStorage = JSON.parse(storage.getItem('todos'))
  var projectsFromStorage = JSON.parse(storage.getItem('projects'))
  var scenesFromStorage = JSON.parse(storage.getItem('scenes'))

  commit('LOAD_TODOS', todosFromStorage.map(function (item) {
    // 动态关联场景表
    if (item.sceneId) {
      // 从storage中搜索对应的配置-奉理理
      var sceneItem = getItemInArray(scenesFromStorage, item.sceneId, 'sceneId')
      if (!sceneItem) {
        console.log('unknown sceneId, exit')
      } else {
        item.scene = {
          sceneId: sceneItem.sceneId,
          sceneName: sceneItem.sceneName || ''
        }
      }
    }
    // 动态关联项目表
    if (item.projectId) {
      // 从storage中搜索对应的配置
      var projectItem = getItemInArray(projectsFromStorage, item.projectId, 'projectId')
      if (!projectItem) {
        console.log('unknown projectId, exit')
      } else {
        item.project = {
          projectId: projectItem.projectId,
          projectName: projectItem.projectName || ''
        }
      }
    }
    return item
  }))
}

export function LOAD_TODO ({ commit, dispatch, state }, { id }) {
  console.log('action comit load_todo')
  var todosFromStorage = JSON.parse(storage.getItem('todos'))
  var curEditTodo = {}
  for (var i = 0; i < todosFromStorage.length; i++) {
    if (todosFromStorage[i].todoId === id) {
      curEditTodo = todosFromStorage[i]
      break
    }
  }
  commit('LOAD_TODO', curEditTodo)
  // 加载 todo 都本地localStorage
  // storage.setItem('todos', JSON.stringify(state.todos))
}

export function UPDATE_TODO_MNGR ({ commit, dispatch, state }, { id, name, newValue }) {
  console.log('action comit update_mngr_todo')
  commit('UPDATE_TODO_MNGR', { id, name, newValue })
  // 更新 todo 都本地localStorage
  storage.setItem('todos', JSON.stringify(state.todos))
}

export function FINISH_TODO ({ commit, dispatch, state }, { id, name, newValue }) {
  console.log('action comit finish_todo')
  commit('FINISH_TODO', { id, name, newValue })
  // 更新 todo 都本地localStorage
  storage.setItem('todos', JSON.stringify(state.todos))
}

export function UPDATE_TODO ({ commit, dispatch, state }, { item }) {
  console.log('action comit update_todo')
  commit('UPDATE_TODO', { item })
  // 更新 todo 都本地localStorage
  storage.setItem('todos', JSON.stringify(state.todos))
}

export function ADD_TODO ({ commit, dispatch, state }, { item }) {
  console.log('action comit add_todo')
  // 生成随机ID
  var userId = 'qiujian'
  var timestamp = new Date()
  var id = userId + '-' + timestamp.getFullYear() + '' + timestamp.getMonth() + '' + timestamp.getDate() + '-' + timestamp.getTime()
  item.todoId = id
  commit('ADD_TODO', { id, item })
  // 更新 todo 都本地localStorage
  storage.setItem('todos', JSON.stringify(state.todos))
}

export function DELETE_TODO ({ commit, dispatch, state }, { id, name, newValue }) {
  console.log('action comit delete_todo')
  commit('DELETE_TODO', { id, name, newValue })
  // 更新 todo 都本地localStorage
  storage.setItem('todos', JSON.stringify(state.todos))
}

/* context.commit,  context.dispatch, context.state, es6 函数结构写法 */
export function LOAD_PROJECTS ({ commit, dispatch, state }) {
  var projectsFromStorage = JSON.parse(storage.getItem('projects'))
  commit('LOAD_PROJECTS', projectsFromStorage)
}

export function ADD_PROJECT ({ commit, dispatch, state }, { item }) {
  console.log('action comit add_project')
  // 生成随机ID
  var userId = 'qiujian'
  var timestamp = new Date()
  var id = userId + '-project' + '-' + timestamp.getFullYear() + '' + timestamp.getMonth() + '' + timestamp.getDate() + '-' + timestamp.getTime()
  item.projectId = id
  commit('ADD_PROJECT', { id, item })
  // 更新 todo 都本地localStorage
  storage.setItem('projects', JSON.stringify(state.projects))
}

export function UPDATE_PROJECT ({ commit, dispatch, state }, { item }) {
  console.log('action comit add_project')
  // 生成随机ID
  var id = item.projectId
  commit('UPDATE_PROJECT', { id, item })
  // 更新 todo 都本地localStorage
  storage.setItem('projects', JSON.stringify(state.projects))
}

export function DELETE_PROJECT ({ commit, dispatch, state }, { id }) {
  console.log('action comit delete_project')
  commit('DELETE_PROJECT', { id })
  // 更新 todo 都本地localStorage
  storage.setItem('projects', JSON.stringify(state.projects))
}

/* context.commit,  context.dispatch, context.state, es6 函数结构写法 */
export function LOAD_SCENES ({ commit, dispatch, state }) {
  var scenesFromStorage = JSON.parse(storage.getItem('scenes'))
  commit('LOAD_SCENES', scenesFromStorage)
}

export function ADD_SCENE ({ commit, dispatch, state }, { item }) {
  console.log('action comit add_scene')
  // 生成随机ID
  var userId = 'qiujian'
  var timestamp = new Date()
  var id = userId + '-scene' + '-' + timestamp.getFullYear() + '' + timestamp.getMonth() + '' + timestamp.getDate() + '-' + timestamp.getTime()
  item.sceneId = id
  commit('ADD_SCENE', { id, item })
  // 更新 todo 都本地localStorage
  storage.setItem('scenes', JSON.stringify(state.scenes))
}

export function DELETE_SCENE ({ commit, dispatch, state }, { id }) {
  console.log('action comit delete_scene')
  commit('DELETE_SCENE', { id })
  // 更新 todo 都本地localStorage
  storage.setItem('scenes', JSON.stringify(state.scenes))
}
