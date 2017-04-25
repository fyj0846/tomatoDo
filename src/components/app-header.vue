<template>
  <div>
    <ul id="slide-out" class="side-nav">
      <li>
        <div class="card-panel teal lighten-2">
          <div class="basic-text white-text name">qiujian</div>
          <div class="basic-text white-text email">qiujian0846@gmail.com</div>
          <div class="loginView" @click="handleLoginOrRegistry()"><span class="basic-text white-text">登录或者注册</span></div>
        </div>
      </li>
      <li><div class="divider"></div></li>
      <li><a class="waves-effect levelTop" href="#!">滴答滴答</a></li>
      <li><div class="divider"></div></li>
      <li><a class="waves-effect levelTop">目标</a></li>
      <li><a class="waves-effect" href="#!">今日任务</a></li>
      <li><a class="waves-effect" href="#!">明日待办</a></li>
      <li><a class="waves-effect" href="#!">日程</a></li>
      <li><div class="divider"></div></li>
      <li><a class="waves-effect levelTop">成果</a></li>
      <li><a class="waves-effect" href="#!">回顾</a></li>
      <li><a class="waves-effect" href="#!">奖励</a></li>
      <li><div class="divider"></div></li>
      <li><a class="waves-effect levelTop">管理</a></li>
      <li><a class="waves-effect" href="#!">项目</a></li>
      <li><a class="waves-effect" href="#!">场景</a></li>
      <li><a class="waves-effect" href="#!">标签</a></li>
      <li><div class="divider"></div></li>
      <li><a class="waves-effect levelTop">设置</a></li>
    </ul>
    <div class="header">
      <div class="header-sidenav-btn">
        <a href="#" data-activates="slide-out" class="button-collapse white-text">
          <i class="material-icons ">view_headline</i>
        </a>
      </div>
      <div class="header-title white-text" @click="jump('/')">
        <span class="title">tomatoDo</span>
      </div>
      <div class="header-add-btn white-text">
        <i class="material-icons" @click="openAddTodo()">add</i>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    methods: {
      openAddTodo (event) {
        console.log('message', 'add touched')
      },
      handleLoginOrRegistry (event) {
        console.log('message', 'please login or registry')
      }
    }
  }
</script>

<style scoped>
  .header {
    font-size: 16px;
    height: 80px;
    margin-bottom: 3px;
    display: flex;
    flex-flow: nowrap;
    flex-direction: row;
    justify-content: flex-start;
    -webkit-justify-content: flex-start;
    align-items: center;
    -webkit-align-items: center;
    border-bottom-width: 2px;
    border-bottom-style: solid;
    border-bottom-color: #35495e;
    background-color: #42b983;
  }
  .header-title {
    flex: 0 0 70%;
    font-size: 2rem;
  }

  .title {
    font-family: Verdana, Geneva, sans-serif;
  }

  .header-sidenav-btn {
    flex: 0 0 20%;
    font-size: 2rem;
  }

  .header-sidenav-btn i, .header-add-btn  i {
    display: block;
    font-size: 2.5rem;
  }

  .side-nav li>a {
    line-height: 2.8rem;
    height: 2.8rem;
  }

  .side-nav .divider {
    margin: 2px 0 0 0;
  }

  .card-panel {
    margin: 0;
    line-height: 1.8rem;
  }

  .loginView {
    width: 90%;
    background-color: #ddd;
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
