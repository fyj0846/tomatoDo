// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
// import VueResource from 'vue-resource'
import App from './App'
import router from './router'
import store from './store'
import vSelect from 'vue-select'
import '../static/js/materialize.min.js'
import '../static/css/materialize.min.css'
import '../static/css/material-icons.css'

Vue.config.productionTip = false

/* eslint-disable no-new */

Vue.component('v-select', vSelect)
/* 手工指定select原语， 用于处理因materialize-css中对select优化(option->ul/li)，选择事件无法通过v-model绑定到属性的问题 */
/* 需要将select中的v-model替换为此处的v-select */
// Vue.directive('select', {
//   'twoWay': true,
//   'bind': function (el, binding, vnode) {
//     $(el).on('change', function () {
//       if (binding.expression.indexOf('.') < 0) {
//         vnode.context.$set(vnode.context, binding.expression, el.value)
//       } else {
//         console.log('select： 绑定了多重对象属性，不支持')
//       }
//     })
//     $(el).material_select()
//   },
//   'unbind': function (el) {
//     $(el).material_select('destroy')
//   }
// })

new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
