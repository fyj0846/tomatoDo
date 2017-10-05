// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
// import VueResource from 'vue-resource'
import App from './App'
import router from './router'
import store from './store'
import vSelect from 'vue-select'
import VeeValidate, {Validator} from 'vee-validate';
import '../static/js/materialize.min.js'
import '../static/css/materialize.min.css'
import '../static/css/material-icons.css'
import '../src/assets/css/common.scss'
import zh_CN from '../static/js/zh_CN.js'   //验证器中文资源包

// vue-validator设置中文语言
Validator.addLocale(zh_CN);
const config = {
  errorBagName: 'errors', // change if property conflicts.
  delay: 0,
  locale: 'zh_CN',
  messages: null,
  strict: true
};
Vue.use(VeeValidate,config);

// 自定义validate
const dictionary = {
  zh_CN: {
    attributes:{
      // 中文提示信息的字段映射
      // 用户登录注册
      nameLogin: '用户账号',
      passwordLogin: '密码',
      name: '用户账号',
      nickName: '用户昵称',
      password:'密码',
      passwordCheck: '确认密码',
      email:'邮箱',
      // 项目管理
      projectName: '项目名称',
      projectDesc: '项目描述',
      projectNameEdit: '项目名称',
      projectDescEdit: '项目描述',
      // 场景管理
      sceneName: '场景名称',
      sceneDescribe: '场景描述',
      sceneNameEdit: '场景名称',
      sceneDescribeEdit: '场景描述',

      todoTitle: '任务标题',
      describe: '任务描述',
      expectClock: '所需番茄钟',
    }
  }
};
Validator.updateDictionary(dictionary);

Vue.config.productionTip = false
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
