// import {getItemInArray} from '../commonTool'
import axios from 'axios'
const storage = window.localStorage

// axios共享配置
var instance = axios.create({
  baseURL: 'http://localhost:8080/api/V1/',
  timeout: 1000,
  // headers: {'X-Custom-Header': 'foobar'}
});

// 组装请求
var getAllObjs = function (obj, userId, todoId) {
  var query = obj + '/' + userId;
  if(todoId)
    query += '/' + todoId;
  return instance.get(query);
}

// 组装请求
var updateObjs = function (obj, userId, itemId, item) {
  var query = obj + '/' + userId;
  if(itemId)
    query += '/' + itemId;
  return instance.put(query, item);
}

// 组装请求
var createObjs = function (obj, userId, item) {
  var query = obj + '/' + userId;
  return instance.post(query, item);
}

/* context.commit,  context.dispatch, context.state, es6 函数结构写法 */
export function LOAD_TODOS ({ commit, dispatch, state }) {
  console.log('action commit: load_todos');
  return new Promise((resolve, reject) => {
    axios.all([getAllObjs('todo', '1')])
      .then(axios.spread(function (todos, projects, scenes, tags) {
        // All requests are now complete
        console.log(todos);
        console.log(projects);
        console.log(scenes);
        console.log(tags);
        commit('LOAD_TODOS', todos.data.resultSet.map(function (item) {
          if(item.expectFinishTime) {
            // 等待更高效的正则过滤替换
            item.expectFinishTime = item.expectFinishTime.replace(/^[0-9]{2}/, '');
            item.expectFinishTime = item.expectFinishTime.replace('T', ' ');
            item.expectFinishTime = item.expectFinishTime.replace(/.[0-9]{3}Z$/, '');
          }
          if(item.cTime) {
            item.cTime = item.cTime.replace('T', ' ');
            item.cTime = item.cTime.replace(/.[0-9]{3}Z$/, '');
          }
          return item;
        }));
        resolve();
      }))
      .catch(function(err) {
        console.log(err);
        reject();
      });
  })
}

export function LOAD_TODO ({ commit, dispatch, state }, { id }) {
  console.log('action commit: load_todo')
  return new Promise((resolve, reject) => {
    axios.all([getAllObjs('todo', '1', id), getAllObjs('project', '1'), getAllObjs('scene', '1'), getAllObjs('tag', '1')])
      .then(axios.spread(function (todos, projects, scenes, tags) {
        // All requests are now complete
        // console.log(todos);
        // console.log(projects);
        // console.log(scenes);
        // console.log(tags);
        commit('LOAD_TODO', todos.data.resultSet.map(function (item) {
            if(item.expectFinishTime) {
              // 等待更高效的正则过滤替换
              item.expectFinishTime = item.expectFinishTime.replace('T', ' ');
              item.expectFinishTime = item.expectFinishTime.replace(/.[0-9]{3}Z$/, '');
            }
            if(item.cTime) {
              item.cTime = item.cTime.replace('T', ' ');
              item.cTime = item.cTime.replace(/.[0-9]{3}Z$/, '');
            }
            return item;
          })[0] || {});
        commit('LOAD_PROJECTS', projects.data.resultSet);
        commit('LOAD_SCENES', scenes.data.resultSet);
        commit('LOAD_TAGS', tags.data.resultSet);
        LOAD_PRIORITIES({ commit, dispatch, state });  // priority为非后台数据，故在此直接调用该方法

        resolve();
      }))
      .catch(function(err) {
        console.log(err);
        reject();
      });
  })
}

// export function UPDATE_TODO_MNGR ({ commit, dispatch, state }, { id, name, newValue }) {
//   console.log('action commit update_mngr_todo')
//   commit('UPDATE_TODO_MNGR', { id, name, newValue })
//   // 更新 todo 都本地localStorage
//   storage.setItem('todos', JSON.stringify(state.todos))
// }
//

//
export function FINISH_TODO ({ commit, dispatch, state }, { item }) {
  console.log('action commit finish_todo');
  UPDATE_TODO({commit, dispatch, state}, {item});
}

export function UPDATE_TODO ({ commit, dispatch, state }, { item, tag }) {
  console.log('action commit: update_todo')
  return new Promise((resolve, reject) => {
    axios.all([updateObjs('todo', '1', item.todoId, item), updateObjs('tag', '1', tag.tagId, tag)])
      .then(function (response) {
        console.log('action commit: update todo success');
        commit('UPDATE_TODO', { item });
        commit('UPDATE_TAG', { tag });
        resolve();
      })
      .catch(function(error) {
        console.log(error);
        reject();
      });
  })
}
//
export function ADD_TODO ({ commit, dispatch, state }, { item }) {
  console.log('action commit add_todo')
  return new Promise((resolve, reject) => {
    axios.all([createObjs('todo', '1', item)])
      .then(function (response) {
        console.log('action commit: create todo success');
        commit('ADD_TODO', { item });
        resolve();
      })
      .catch(function(error) {
        console.log(error);
        reject();
      });
  })
}
//
// export function DELETE_TODO ({ commit, dispatch, state }, { id, name, newValue }) {
//   console.log('action commit delete_todo')
//   commit('DELETE_TODO', { id, name, newValue })
//   // 更新 todo 都本地localStorage
//   storage.setItem('todos', JSON.stringify(state.todos))
// }

/* context.commit,  context.dispatch, context.state, es6 函数结构写法 */
export function LOAD_PROJECTS ({ commit, dispatch, state }) {
  console.log("action commit: load_projects");
  return new Promise((resolve, reject) => {
    axios.all([getAllObjs('project', '1')])
      .then(axios.spread(function (projects) {
        // All requests are now complete
        console.log(projects);
        commit('LOAD_PROJECTS', projects.data.resultSet)
        resolve();
      }))
      .catch(function (err) {
        console.log(err);
        reject();
      });
  })
}

// export function ADD_PROJECT ({ commit, dispatch, state }, { item }) {
//   console.log('action commit add_project')
//   // 生成随机ID
//   var userId = 'qiujian'
//   var timestamp = new Date()
//   var id = userId + '-project' + '-' + timestamp.getFullYear() + '' + timestamp.getMonth() + '' + timestamp.getDate() + '-' + timestamp.getTime()
//   item.projectId = id
//   commit('ADD_PROJECT', { id, item })
//   // 更新 todo 都本地localStorage
//   storage.setItem('projects', JSON.stringify(state.projects))
// }
//
// export function UPDATE_PROJECT ({ commit, dispatch, state }, { item }) {
//   console.log('action commit add_project')
//   // 生成随机ID
//   var id = item.projectId
//   commit('UPDATE_PROJECT', { id, item })
//   // 更新 todo 都本地localStorage
//   storage.setItem('projects', JSON.stringify(state.projects))
// }
//
// export function DELETE_PROJECT ({ commit, dispatch, state }, { id }) {
//   console.log('action commit delete_project')
//   commit('DELETE_PROJECT', { id })
//   // 更新 todo 都本地localStorage
//   storage.setItem('projects', JSON.stringify(state.projects))
// }

/* context.commit,  context.dispatch, context.state, es6 函数结构写法 */
export function LOAD_SCENES ({ commit, dispatch, state }) {
  console.log("action commit: load_scenes");
  return new Promise((resolve, reject) => {
    axios.all([getAllObjs('scene', '1')])
      .then(axios.spread(function (scenes) {
        // All requests are now complete
        console.log(scenes);
        commit('LOAD_SCENES', scenes.data.resultSet)
        resolve();
      }))
      .catch(function (err) {
        console.log(err);
        reject();
      });
  })
}

// export function ADD_SCENE ({ commit, dispatch, state }, { item }) {
//   console.log('action commit add_scene')
//   // 生成随机ID
//   var userId = 'qiujian'
//   var timestamp = new Date()
//   var id = userId + '-scene' + '-' + timestamp.getFullYear() + '' + timestamp.getMonth() + '' + timestamp.getDate() + '-' + timestamp.getTime()
//   item.sceneId = id
//   commit('ADD_SCENE', { id, item })
//   // 更新 todo 都本地localStorage
//   storage.setItem('scenes', JSON.stringify(state.scenes))
// }
//
// export function DELETE_SCENE ({ commit, dispatch, state }, { id }) {
//   console.log('action commit delete_scene')
//   commit('DELETE_SCENE', { id })
//   // 更新 todo 都本地localStorage
//   storage.setItem('scenes', JSON.stringify(state.scenes))
// }

export function LOAD_PRIORITIES ({ commit, dispatch, state }) {
  console.log("action commit: load_prioritys");
  var priorities = [{priority: '1', priorityName: '1星'}, {priority: '2', priorityName: '2星'}, {priority: '3', priorityName: '3星'},{priority: '4', priorityName: '4星'},{priority: '5', priorityName: '5星'}];
  commit('LOAD_PRIORITIES', priorities)
}