<template>
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
</template>

<script>
  export default {
    methods: {
      handleLoginOrRegistry (event) {
        console.log('message', 'please login or registry')
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
