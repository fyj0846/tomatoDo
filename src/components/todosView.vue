<template>
  <div class="page-view" append="tree">
    <app-header class="todo-view-header"></app-header>
    <side-nav slot="sideNav"></side-nav>
    <ul id="todoTab" class="todo-tabs tabs">
      <li class="tab col s6"><a class="active " href="#activeTodos">正在进行</a></li>
      <li class="tab col s6"><a href="#finishedTodos">已完成</a></li>
      <!--<li class="tab col s3"><a href="#deleteTotos">已删除</a></li>-->
    </ul>
    <div id="finishedTodos" class="col s12">
      <div class="row todo-view-content">
        <div v-for="todo in finishedList" class="col s12 m6">
          <todo :todoMetaProp="todo"></todo>
        </div>
      </div>
    </div>
    <div id="activeTodos" class="col s12">
      <div class="row todo-view-content">
        <div v-for="todo in todoList" class="col s12 m6">
          <todo v-on:FINISHTODO="getCurrentTodo" :todoMetaProp="todo"></todo>
        </div>
      </div>
    </div>
    <!--<div id="deleteTotos" class="col s12">空</div>-->
    <div id='modalSave' class="modal">
      <div class="date-panel">
        <div class="panel-header">任务满意度</div>
        <div class="panel-content">
          <div class="todo-satisfiyDegree red-text">
            <i v-for="(style,index) in satisfyStyle" class="material-icons" @click="onSelectSatifyDegree(index)">{{
              style }}</i>
          </div>
        </div>
        <div class="panel-footer">
          <a class="waves-effect  btn-flat active" @click="closeModal">取消</a>
          <a class="waves-effect  btn-flat active" @click="getTodoDone">保存</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import AppHeader from '../components/app-header.vue'
  import Todo from '../components/todo.vue'
  import SideNav from '../components/sideNav.vue'
  import $ from 'jquery'
  export default {
    components: { AppHeader, Todo, SideNav },
    data: function () {
      return {
        currentTodo: null,
      }
    },
    computed: {
      todoList () {
//        return this.$store.getters.activeTodos
        return [{
          todoTitle: "TEST001",
          projectName: "测试项目",
          tags: "测试,挑战",
          expectFinishTime: "2017-09-28",
          spentClock: "2",
          priority: "3",
          isFinished: "F",
          satisfiyDegree: 0,
        }]
      },
      finishedList() {
        return this.$store.getters.finishedTodos
      },
      // 满意度转换为星星样式数组（icon）
      satisfyStyle () {
        var satisfyStyleList = []
        if (this.currentTodo) {
          for (var i = 0; i < this.currentTodo.satisfiyDegree && i < 5; i++) {
            satisfyStyleList.push('star')
          }
          for (var j = this.currentTodo.satisfiyDegree; j < 5; j++) {
            satisfyStyleList.push('star_border')
          }
        }
        return satisfyStyleList
      },
    },
    methods: {
      // 从todo卡片获取当前处理的todo
      getCurrentTodo(opt) {
        this.currentTodo = opt.todo;
        this.openModal();
      },
      // 选择满意度星星
      onSelectSatifyDegree(index) {
        console.log("set todo satisfiyDegree");
        this.currentTodo.satisfiyDegree = index + 1;
      },
      // 保存
      getTodoDone () {
        this.currentTodo.isFinished = 'T';
        // 优化spentClock计算规则
        this.currentTodo.score = 3.9 * this.currentTodo.priority
        this.$store.dispatch('UPDATE_TODO', { item: this.currentTodo })
        this.closeModal();
      },
      // 打开满意度modal
      openModal () {
        $('#modalSave').modal('open')
      },
      // 关闭满意度modal
      closeModal () {
        $('#modalSave').modal('close')
      },
    },
    beforeMount: function () {
      console.log('todoView: load todos')
      this.$store.dispatch('LOAD_TODOS')
    },
    mounted: function () {
      console.log('todosView: view mounted')
      $('.button-collapse').sideNav()
      $('ul.tabs').tabs();
      $('.modal').modal()
    }
  }
</script>

<style scoped type="text/scss">
  .todo-tabs {
    width: auto;
    margin: $common-header-height $common-space-LR 0;

    .indicator {
      background-color: $common-green !important;
    }

    .tab {
      a {
        color: $common-black;
        {
          &.active, &:hover {
            color: $common-green;
          }
        }
      }
    }
  }

  .modal .panel-content {
    padding: 68px 0px 60px 0px;

    .material-icons {
      font-size: 3.2rem;
    }
  }
</style>
