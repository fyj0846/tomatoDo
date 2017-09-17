// import {getItemInArray} from '../commonTool'
import axios from 'axios'

// 补充双位
var padDouble = function(t) {
  var num = t;
  if(typeof t == 'string') {
    num = parseInt(t);
  }
  if(num >= 0 && num <= 9) {
    num = '0' + num;
  }
  return num + '';
}

// 将UTC标准时间转换为本地时间
var getLocalDateString = function (str) {
  var date = new Date(str);
  var s1 = "-";
  var s2 = ":";
  var year = date.getFullYear();
  var month = padDouble(date.getMonth() + 1);
  var day = padDouble(date.getDate());
  var hour = padDouble(date.getHours());
  var minute = padDouble(date.getMinutes());
  var second = padDouble(date.getSeconds());
  return  year + s1 + month + s1 + day + " " + hour + s2 + minute + s2 + second;
}

// 从response中获得新曾对象后台分配的Id
function getAssignIdFromResp(response) {
  if(response && response.length > 0) {
     return response[0].data.affectedId;
  } else {
    console.log("unknown assign id");
    return '';
  }
}

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
  console.log('action commit:: load_todos');
  return new Promise((resolve, reject) => {
    axios.all([getAllObjs('todo', '1')])
      .then(axios.spread(function (todos) {
        // All requests are now complete
        console.log(todos);
        commit('LOAD_TODOS', todos.data.resultSet.map(function (item) {
          if(item.expectFinishTime) {
            console.log('expectFinishTime: ' + item.expectFinishTime);
            // 等待更高效的正则过滤替换
            item.expectFinishTime = getLocalDateString(item.expectFinishTime)
          }
          if(item.cTime) {
            console.log("createTime: " + item.cTime);
            item.cTime = getLocalDateString(item.cTime);
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
    axios.all([getAllObjs('todo', '1', id), getAllObjs('project', '1'), getAllObjs('scene', '1')])
      .then(axios.spread(function (todos, projects, scenes) {
        // All requests are now complete
        // console.log(todos);
        // console.log(projects);
        // console.log(scenes);
        // console.log(tags);
        commit('LOAD_TODO', todos.data.resultSet.map(function (item) {
            if(item.expectFinishTime) {
              console.log('expectFinishTime: ' + item.expectFinishTime);
              // 等待更高效的正则过滤替换
              item.expectFinishTime = getLocalDateString(item.expectFinishTime)
            }
            if(item.cTime) {
              console.log("createTime: " + item.cTime);
              item.cTime = getLocalDateString(item.cTime);
            }
            return item;
          })[0] || {});
        commit('LOAD_PROJECTS', projects.data.resultSet);
        commit('LOAD_SCENES', scenes.data.resultSet);
        LOAD_PRIORITIES({ commit, dispatch, state });  // priority为非后台数据，故在此直接调用该方法

        resolve();
      }))
      .catch(function(err) {
        console.log(err);
        reject();
      });
  })
}

export function FINISH_TODO ({ commit, dispatch, state }, { item }) {
  console.log('action commit: finish_todo');
  UPDATE_TODO({commit, dispatch, state}, {item});
}

export function UPDATE_TODO ({ commit, dispatch, state }, {item}) {
  console.log('action commit: update_todo')
  return new Promise((resolve, reject) => {
    axios.all([updateObjs('todo', '1', item.todoId, item)])
      .then(function (response) {
        console.log('action commit:: update todo success');
        commit('UPDATE_TODO', { item });
        resolve();
      })
      .catch(function(error) {
        console.log(error);
        reject();
      });
  })
}

export function ADD_TODO ({ commit, dispatch, state }, { item }) {
  console.log('action commit: add_todo')
  return new Promise((resolve, reject) => {
    axios.all([createObjs('todo', '1', item)])
      .then(function (response) {
        console.log('action commit:: create todo success');
        // get item id from backend by response
        item.todoId = getAssignIdFromResp(response);
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
//   console.log('action commit: delete_todo')
//   commit('DELETE_TODO', { id, name, newValue })
//   // 更新 todo 都本地localStorage
//   storage.setItem('todos', JSON.stringify(state.todos))
// }

/* context.commit,  context.dispatch, context.state, es6 函数结构写法 */
export function LOAD_PROJECTS ({ commit, dispatch, state }) {
  console.log("action commit: load projects");
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

export function ADD_PROJECT ({ commit, dispatch, state }, { item }) {
  console.log('action commit: add_project')
  // 生成随机ID
  return new Promise((resolve, reject) => {
    axios.all([createObjs('project', '1', item)])
      .then(function (response) {
        console.log('action commit:: add project success');
        // get item id from backend by response
        item.projectId = getAssignIdFromResp(response);
        commit('ADD_PROJECT', { item });
        resolve();
      })
      .catch(function(error) {
        console.log(error);
        reject();
      });
  })
}

export function UPDATE_PROJECT ({ commit, dispatch, state }, { item }) {
  console.log('action commit: update project');

  return new Promise((resolve, reject) => {
    axios.all([updateObjs('project', '1', item.projectId, item)])
      .then(function (response) {
        console.log('action commit:: update project success');
        commit('UPDATE_PROJECT', { item });
        resolve();
      })
      .catch(function(error) {
        console.log(error);
        reject();
      });
  })
}
//
export function DELETE_PROJECT ({ commit, dispatch, state }, { item }) {
  console.log('action commit: delete_project')
  UPDATE_PROJECT({ commit, dispatch, state }, { item })
}

/* context.commit,  context.dispatch, context.state, es6 函数结构写法 */
export function LOAD_SCENES ({ commit, dispatch, state }) {
  console.log("action commit:: load_scenes");
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


export function ADD_SCENE ({ commit, dispatch, state }, { item }) {
  console.log('action commit: add_scene')
  // 生成随机ID
  return new Promise((resolve, reject) => {
    axios.all([createObjs('scene', '1', item)])
      .then(function (response) {
        console.log('action commit: add scene success');
        // get item id from backend by response
        item.sceneId = getAssignIdFromResp(response);
        commit('ADD_SCENE', { item });
        resolve();
      })
      .catch(function(error) {
        console.log(error);
        reject();
      });
  })
}

export function UPDATE_SCENE ({ commit, dispatch, state }, { item }) {
  console.log('action commit: update scene');

  return new Promise((resolve, reject) => {
    axios.all([updateObjs('scene', '1', item.sceneId, item)])
      .then(function (response) {
        console.log('action commit:: update scene success');
        commit('UPDATE_SCENE', { item });
        resolve();
      })
      .catch(function(error) {
        console.log(error);
        reject();
      });
  })
}
//
export function DELETE_SCENE ({ commit, dispatch, state }, { item }) {
  console.log('action commit: delete scene')
  UPDATE_SCENE({ commit, dispatch, state }, { item })
}

export function LOAD_PRIORITIES ({ commit }) {
  console.log("action commit:: load_prioritys");
  var priorities = [{priority: '1', priorityName: '1星'}, {priority: '2', priorityName: '2星'}, {priority: '3', priorityName: '3星'},{priority: '4', priorityName: '4星'},{priority: '5', priorityName: '5星'}];
  commit('LOAD_PRIORITIES', priorities)
}