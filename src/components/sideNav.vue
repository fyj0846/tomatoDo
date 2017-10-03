<template>
    <ul id="slide-out" class="side-nav">
      <li>
        <div class="card-panel teal lighten-2">
          <div class="basic-text white-text name">{{ userNickName }}</div>
          <div class="basic-text white-text email">{{ userMail }}</div>
          <div class="loginView btn" @click="handleLoginOrRegistry()">
            <div v-if="userStatus">
              <span class="basic-text white-text">退出登录</span>
            </div>
            <div v-else>
              <span class="basic-text white-text">登录或注册</span>
            </div>
          </div>
        </div>
      </li>
      <li><div class="divider"></div></li>
      <!--<li><a class="waves-effect levelTop" href="#!">滴答滴答</a></li>-->
      <!--<li><div class="divider"></div></li>-->
      <!--<li><a class="waves-effect levelTop">目标</a></li>-->
      <!--<li><a class="waves-effect" href="#!">今日任务</a></li>-->
      <!--<li><a class="waves-effect" href="#!">明日待办</a></li>-->
      <!--<li><a class="waves-effect" href="#!">日程</a></li>-->
      <!--<li><div class="divider"></div></li>-->
      <!--<li><a class="waves-effect levelTop">成果</a></li>-->
      <!--<li><a class="waves-effect" href="#!">回顾</a></li>-->
      <!--<li><a class="waves-effect" href="#!">奖励</a></li>-->
      <li><div class="divider"></div></li>
      <li><a class="waves-effect levelTop">管理</a></li>
      <li><a class="waves-effect" @click="jumpTo('projectManager')">项目</a></li>
      <li><a class="waves-effect" @click="jumpTo('sceneManager')">场景</a></li>
      <!-- 场景的需求未明确，暂时不提供 -->
      <!--<li><a class="waves-effect" @click="jumpTo('sceneManager')">场景</a></li>-->
      <!--<li><a class="waves-effect" href="#!">标签</a></li>-->
      <li><div class="divider"></div></li>
      <!--<li><a class="waves-effect levelTop">设置</a></li>-->
    </ul>
</template>

<script>
  export default {
    data: function(){
      return {
        userAlert: ""
      }
    },
    computed: {
      // 当前登录用户
      userInfo () {
        return this.$store.getters.currentUser;
      },

      userStatus() {
        return this.userInfo && this.userInfo.userId;
      },

      userName () {
        return this.userInfo.userName;
      },

      userMail () {
        return this.userInfo.userMail || "未登录";
      },

      userNickName () {
        return this.userInfo.userNickName || "游客";
      }
    },
    methods: {
      jumpTo (target) {
        console.log(target + ' manager touched')
        if(this.userStatus) {
          this.$router.push({name: target})
        } else {
          this.userAlert = '请先登录';
          Materialize.toast(this.userAlert, 850)
        }
      },
      handleLoginOrRegistry () {
        if(this.userStatus) {
          // 跳转，使用户退出
          this.logout();
        } else if (!this.userStatus) {
          // 跳转，使用户登录或者注册
          this.$router.push({name: 'login'})
        }
      },
      logout() {
        console.log("user logout")
        this.$store.dispatch('USER_LOGOUT')
          .then(() => {
            // 提示退出成功，自动跳转到login页
            this.userAlert = '退出登录成功';
            Materialize.toast(this.userAlert, 850)
            // 跳转到登录页
            this.$router.push({name: 'login'})
          })
          .catch(() => {
            // 登录失败，展示modal信息
            this.userAlert = '退出登录失败';
            Materialize.toast(this.userAlert, 1250)
          })
      }
    }
  }
</script>

<style scoped>
  .side-nav li>a {
    line-height: 2.8rem;
    height: 2.8rem;
  }

  .side-nav .divider {
    margin: 2px 0 0 0;
  }

  .card-panel {
    margin: 0;
    padding: 12px 16px;
    line-height: 1.8rem;
  }

  .loginView {
    width: 100%;
    background-color: #03a9f4;
    margin-top: 5px;
    line-height: 36px;
    display: flex;
    justify-content: center;
  }

  .levelTop {
    padding-left: 16px;
    line-height:  30px;
  }
</style>
