// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import 'materialize-css/dist/js/materialize.min.js'
import 'materialize-css/dist/css/materialize.min.css'
import $ from 'jquery'

Vue.config.productionTip = false

/* eslint-disable no-new */

/* 手工指定select原语， 用于处理因materialize-css中对select优化(option->ul/li)，选择事件无法通过v-model绑定到属性的问题 */
/* 需要将select中的v-model替换为此处的v-select */
Vue.directive('select', {
  'twoWay': true,
  'bind': function (el, binding, vnode) {
    $(el).on('change', function () {
      if (binding.expression.indexOf('.') < 0) {
        vnode.context.$set(vnode.context, binding.expression, el.value)
      } else {
        console.log('select： 绑定了多重对象属性，不支持')
      }
    })
    $(el).material_select()
  },
  'unbind': function (el) {
    $(el).material_select('destroy')
  }
})

// for test data
window.localStorage.clear()
window.localStorage.setItem('todos',
  '[{"todoTitle":"EDA基线管理","todoDesc":"EDA基线管理描述","todoId":"001","tags":[{"tagName":"hard"},{"tagName":"EDA"}],"sceneId":"scene001","projectId":"project001",' +
  '"expectFinishDate":"2016-10-01","expectFinishTime":"17:00","spentClock":"0","priority":"4","isFinished":false,"isDeleted":false},' +
  '{"todoTitle":"EDA通知发布-完成","todoId":"002","tags":[{"tagName":"hard"},{"tagName":"EDA2"}],' +
  '"sceneId":"scene002","projectId":"project002","expectFinishDate":"2016-10-01","expectFinishTime":"2017-05-06 17:00","spentClock":"0","priority":"4",' +
  '"isFinished":true},{"todoTitle":"测试项目-未完成已删除","todoId":"003","tags":[{"tagName":"hard"},' +
  '{"tagName":"EDA3"}],"sceneId":"scene001","projectId":"project001","expectFinishDate":"2016-10-01","expectFinishTime":"2017-05-07 17:00",' +
  '"spentClock":"0","priority":"4","isFinished":false,"isDeleted":true},{"todoTitle":"测试项目-未完成未删除",' +
  '"todoId":"004","tags":[{"tagName":"hard"},{"tagName":"EDA3"}],"sceneId":"scene002","projectId":"project002",' +
  '"expectFinishDate":"2016-10-01","expectFinishTime":"2017-05-07 17:00","spentClock":"0","priority":"2","isFinished":false,"isDeleted":false}]')
window.localStorage.setItem('projects', '[{"projectId":"project001","projectName":"EDA"},{"projectId":' +
  '"project002","projectName":"ITSM"},{"projectId":"project003","projectName":"TODO"}]')
window.localStorage.setItem('scenes', '[{"sceneId":"scene001","sceneName":"工位"},{"sceneId":"scene002","sceneName":"家"},{"sceneId":"scene003","sceneName":"通勤"}]')

new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
