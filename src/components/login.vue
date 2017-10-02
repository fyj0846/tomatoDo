<template>
  <div class="page-view" append="tree">
    <div class="page-header">
      <div class="cancel"></div>
      <div class="title">{{ pageTitle }}</div>
      <div class=""></div>
    </div>
    <div v-if="userView == 'LOGIN'" class="page-content">
      <form class="login">
        <div class="input-field">
          <input placeholder="用户账号" id="userName" type="text" class="validate" v-model="userName">
          <!--<label for="todoTitle">标题</label>-->
        </div>
        <div class="input-field">
          <input placeholder="密码" id="userPwd" type="password" class="validate" v-model="userPwd">
          <!--<label for="describe">描述</label>-->
        </div>
        <div class="loginCtrl">
          <a class="waves-effect  btn-flat active" @click="changeView('REG')">注册新用户</a>
          <a class="waves-effect  btn-flat active" @click="userLogin">登录</a>
        </div>
      </form>
      <div id='userAlert' class="modal">
        <div class="">
          <div class="modal-header"></div>
          <div class="modal-content">
            <div class=" red-text">
              {{ userStatus }}
            </div>
          </div>
          <!--<div class="modal-footer">-->
          <!--<a class="waves-effect  btn-flat active" @click="">取消</a>-->
          <!--<a class="waves-effect  btn-flat active" @click="">保存</a>-->
          <!--</div>-->
        </div>
      </div>
    </div>
    <div v-if="userView == 'REG'" class="page-content">
      <form class="login">
        <div class="input-field">
          <input placeholder="用户账号" id="userName" type="text" class="validate" v-model="userName">
          <!--<label for="todoTitle">标题</label>-->
        </div>
        <div class="input-field">
          <input placeholder="用户昵称" id="userName" type="text" class="validate" v-model="userNick">
          <!--<label for="todoTitle">标题</label>-->
        </div>
        <div class="input-field">
          <input placeholder="密码" id="userPwd" type="password" class="validate" v-model="userPwd">
          <!--<label for="describe">描述</label>-->
        </div>
        <div class="input-field">
          <input placeholder="再次输入密码" id="userPwd" type="password" class="validate" v-model="userPwdConfirm">
          <!--<label for="describe">描述</label>-->
        </div>
        <div class="input-field">
          <input placeholder="邮箱地址" id="userMail" type="text" class="validate" v-model="userMail">
          <!--<label for="describe">描述</label>-->
        </div>
        <div class="input-field">
          <v-select v-model="userGental" :options="gentalList" label="desc"></v-select>
          <!--<label>优先级</label>-->
        </div>
        <div class="loginCtrl">
          <a class="waves-effect  btn-flat active" @click="changeView('LOGIN')">已有账号登录</a>
          <a class="waves-effect  btn-flat active" @click="userRegistry">注册新用户</a>
        </div>
      </form>
      <div id='userAlert' class="modal">
        <div class="">
          <div class="modal-header"></div>
          <div class="modal-content">
            <div class=" red-text">
              {{ userStatus }}
            </div>
          </div>
          <!--<div class="modal-footer">-->
          <!--<a class="waves-effect  btn-flat active" @click="">取消</a>-->
          <!--<a class="waves-effect  btn-flat active" @click="">保存</a>-->
          <!--</div>-->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import $ from 'jquery'
  export default {
    data: function () {
      return {
        userName: '',
        userPwd: '',
        userPwdConfirm: '',
        userNick: '',
        userMail: '',
        userGental: { 'type': "U", 'desc': '请选择性别' },
        userStatus: '',
        userView: 'LOGIN', //REG
        pageTitle: '用户登录',

        gentalList: {},
        alert: {
          loginSuccess: "登录成功，正在跳转",
          loginFail: "登录失败，请重试",
          regSuccess: "注册成功，请在登录页面登录",
          regFail: "注册失败，请重试"
        }
      }
    },
    computed: {
      userLoginInfo: function () {
        return {
          userName: this.userName,
          userPassword: this.userPwd,
        }
      },
      userRegInfo: function () {
        return {
          userName: this.userName,
          userPassword: this.userPwd,
          userNickName: this.userNick,
          userMail: this.userMail,
          userGental: this.userGental.type,
        }
      }
    },
    methods: {
      reset: function () {
        this.userPwd = "";
        this.userPwdConfirm = "";
        this.userMail = "";
        this.userGental = { 'type': "U", 'desc': '请选择性别' };
      },

      changeView: function (newView) {
        this.reset();
        if(newView == "REG") {
          this.pageTitle = '用户注册'
        } else if(newView == "LOGIN") {
          this.pageTitle = '用户登录'
        }
        this.userView = newView;
      },

      userRegistry: function () {
        console.log('user to registry')
        // 触发新增任务
        this.$store.dispatch('USER_REGISTRY', {'user': this.userRegInfo})
          .then(() => {
            // 提示登录成功，自动跳转到todosView页
            this.userStatus = this.alert.regSuccess;
            Materialize.toast(this.userStatus, 850)
            // 跳转到首页
            this.changeView('LOGIN');
            this.$router.push({name: 'login'});
          })
          .catch(() => {
            // 登录失败，展示modal信息
            this.userStatus = this.alert.regFail;
            Materialize.toast(this.userStatus, 1250)
          })
      },

      userLogin: function () {
        console.log('user to login')
        // 触发新增任务
        this.$store.dispatch('USER_LOGIN', {'user': this.userLoginInfo})
          .then(() => {
            // 提示登录成功，自动跳转到todosView页
            this.userStatus = this.alert.loginSuccess;
            Materialize.toast(this.userStatus, 850)
            // 跳转到首页
            this.$router.push({name: 'todosView'});
          })
          .catch(() => {
            // 登录失败，展示modal信息
            this.userStatus = this.alert.loginFail;
            Materialize.toast(this.userStatus, 1250)
          })
      }
    },
    beforeMount: function () {
    },
    mounted: function () {
      $('#sidenav-overlay').remove()
      this.gentalList = [{ 'type': "M", 'desc': '男' },
        { 'type': "F", 'desc': '女' },
        { 'type': "U", 'desc': '就不告诉你' }];
    }
  }
</script>

<style scoped type="text/css">
  .loginCtrl {
    display: flex;
    justify-content: space-around;
  }
</style>
