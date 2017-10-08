<template>
  <div class="page-view" append="tree">
    <div class="page-header">
      <div class="cancel" @click="cancelHandler()">返回</div>
      <div class="title">{{ pageTitle }}</div>
      <div class="save"></div>
    </div>
    <div v-if="userView == 'LOGIN'" class="page-content">
      <form class="login">
        <div class="input-field">
          <input placeholder="用户账号" id="userNameLogin" type="text" v-model="userNameLogin"
                 name="nameLogin" :class="{'input': true, 'is-danger': errors.has('nameLogin') }"
                 v-validate="'required|max:12'">
          <span v-show="errors.has('nameLogin')" class="help is-danger">{{ errors.first('nameLogin') }}</span>
          <!--<label for="todoTitle">标题</label>-->
        </div>
        <div class="input-field">
          <input placeholder="密码" id="userPwdLogin" type="password" required="required" v-model="userPwdLogin"
                 name="passwordLogin" :class="{'input': true, 'is-danger': errors.has('passwordLogin') }"
                 v-validate="'required|max:12|min:6|regex:^[a-zA-Z0-9]+$'">
          <!--<label for="describe">描述</label>-->
          <span v-show="errors.has('passwordLogin')" class="help is-danger">{{ errors.first('passwordLogin') }}</span>
        </div>
        <div class="loginCtrl">
          <a class="waves-effect  btn" @click="changeView('REG')">注册新用户</a>
          <a class="waves-effect  btn"  :class="{'disabled': errors.any()}"
             @click="userLogin">登录</a>
        </div>
      </form>
    </div>
    <div v-show="userView == 'REG'" class="page-content">
      <form class="reg">
        <div class="input-field">
          <input placeholder="用户账号" id="userNameReg" type="text" v-model="userNameReg"
                 name="name" :class="{'input': true, 'is-danger': errors.has('name') }"
                 v-validate="'required|max:12'">
          <span v-show="errors.has('name')" class="help is-danger">{{ errors.first('name') }}</span>
          <!--<label for="todoTitle">标题</label>-->
        </div>
        <div class="input-field">
          <input placeholder="用户昵称" id="userNickName" type="text" v-model="userNick"
                 name="nickName" :class="{'input': true, 'is-danger': errors.has('nickName') }"
                 v-validate="'required|max:6'">
          <!--<label for="todoTitle">标题</label>-->
          <span v-show="errors.has('nickName')" class="help is-danger">{{ errors.first('nickName') }}</span>
        </div>
        <div class="input-field">
          <input placeholder="密码" id="userPwdReg" type="password"
                 name="password" :class="{'input': true, 'is-danger': errors.has('password') }"
                 v-validate="'required|max:12|min:6|regex:^[a-zA-Z0-9]+$'"
                 v-model="userPwdReg">
          <span v-show="errors.has('password')" class="help is-danger">{{ errors.first('password') }}</span>
          <!--<label for="describe">描述</label>-->
        </div>
        <div class="input-field">
          <input placeholder="再次输入密码" id="userConfirmPwd" type="password" v-model="userPwdRegConfirm"
                 name="passwordCheck" :class="{'input': true, 'is-danger': errors.has('passwordCheck') }"
                 v-validate="'required|max:12|regex:^[a-zA-Z0-9]+$|confirmed:password'">
          <!--<label for="describe">描述</label>-->
          <span v-show="errors.has('passwordCheck')" class="help is-danger">{{ errors.first('passwordCheck') }}</span>
        </div>
        <div class="input-field">
          <input placeholder="邮箱地址" id="userMail" name="email"
                 :class="{'input': true, 'is-danger': errors.has('email') }"
                 type="text"  v-validate="'required|email'"
                 v-model="userMail">
          <!--<label for="describe">描述</label>-->
          <span v-show="errors.has('email')" class="help is-danger">{{ errors.first('email') }}</span>
        </div>
        <div class="input-field">
          <v-select v-model="userGental" :options="gentalList" label="desc"
                    type="text" ></v-select>
          <!--<label>优先级</label>-->
          <!--<span v-show="errors.has('gentle')" class="help is-danger">{{ errors.first('gentle') }}</span>-->
        </div>
        <div class="loginCtrl">
          <a class="waves-effect  btn" @click="changeView('LOGIN')">已有账号登录</a>
          <a class="waves-effect  btn" :class="{'disabled': errors.any()}"
           @click="userRegistry">注册新用户</a>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
  import $ from 'jquery'
  export default {
    data: function () {
      return {
        userNameLogin: '',
        userNameReg: '',
        userPwdLogin: '',
        userPwdReg: '',
        userPwdRegConfirm: '',
        userNick: '',
        userMail: '',
        userGental: { 'type': "U", 'desc': '请选择性别' },
        userStatus: '',
        userView: 'LOGIN', //REG
        pageTitle: '用户登录',

        gentalList: [],
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
          userName: this.userNameLogin,
          userPassword: this.userPwdLogin,
        }
      },
      userRegInfo: function () {
        return {
          userName: this.userNameReg,
          userPassword: this.userPwdReg,
          userNickName: this.userNick,
          userMail: this.userMail,
          userGental: this.userGental.type,
        }
      }
    },
    methods: {
      reset: function () {
        this.userPwdLogin = "";
        this.userPwdReg = "";
        this.userPwdRegConfirm = "";
        this.userNick = ""
        this.userMail = "";
        this.userGental = { 'type': "U", 'desc': '请选择性别' };
      },

      cancelHandler: function () {
        this.$router.back()
      },
      changeView: function (newView) {
        this.reset();
        if(newView == "REG") {
          this.pageTitle = '用户注册'
        } else if(newView == "LOGIN") {
          this.pageTitle = '用户登录'
        }
        this.userView = newView;

        // 清理验证器的error
        this.errors.clear();
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

  .loginCtrl a {
    font-size: 1.1rem;
  }
</style>
