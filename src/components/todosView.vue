<template>
  <div class="page-view" append="tree">
    <!--<app-header class="todo-view-header"></app-header>-->
    <slot name="sideNav"></slot>
    <div class="page-header">
      <div class="header-sidenav-btn">
        <a href="#" data-activates="slide-out" class="button-collapse white-text">
          <i class="material-icons ">&#xE8EE;</i>
        </a>
      </div>
      <div class="header-title white-text">
        <span class="title">tomatoDo</span>
      </div>
      <div class="header-add-btn white-text">
        <i class="material-icons" @click="addTodoHandler">&#xE145;</i>
      </div>
    </div>
    <side-nav slot="sideNav"></side-nav>
    <div class="page-content">
      <ul id="todoTab" class="todo-tabs tabs">
        <li class="tab s6"><a class="active " href="#activeTodos">正在进行</a></li>
        <li class="tab s6"><a href="#finishedTodos">已完成</a></li>
        <!--<li class="tab col s3"><a href="#deleteTotos">已删除</a></li>-->
      </ul>
      <div id="finishedTodos" class="">
        <div class=" todo-view-content">
          <div v-for="todo in finishedList" class=" ">
            <todo v-on:TODOACTION="execTodoAction" v-on:TODOSTATUS="updateTodoStatus"
                  :todoMetaProp="todo" :statusProp="status"></todo>
          </div>
        </div>
      </div>
      <div id="activeTodos" class="">
        <div class=" todo-view-content">
          <div v-for="todo in todoList" class=" ">
            <todo v-on:TODOACTION="execTodoAction" v-on:TODOSTATUS="updateTodoStatus"
                  :todoMetaProp="todo" :statusProp="status"></todo>
          </div>
        </div>
      </div>
      <!--<div id="deleteTotos" class="">空</div>-->
      <div id='modalSave' class="modal">
        <div class="date-modal">
          <div class="modal-header">任务满意度</div>
          <div class="modal-content">
            <div class="todo-satisfiyDegree red-text">
              <i v-for="(style,index) in satisfyStyle" class="material-icons" @click="onSelectSatifyDegree(index)">{{
                style }}</i>
            </div>
          </div>
          <div class="modal-footer">
            <a class="waves-effect  btn-flat active" @click="closeModal">取消</a>
            <a class="waves-effect  btn-flat active" @click="getTodoDone">保存</a>
          </div>
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
        targetTodo: null,  // 当前action处理的todo对象
        elapsingTodo: null,  // 当前活跃的todo对象
        status: "NULL",
      }
    },
    computed: {
      todoList () {
        return this.$store.getters.activeTodos
//        return [{
//          todoTitle: "TEST001",
//          projectName: "测试项目",
//          tags: "测试,挑战",
//          expectFinishTime: "2017-09-28",
//          spentClock: "2",
//          priority: "3",
//          isFinished: "F",
//          satisfiyDegree: 0,
//        }]
      },
      finishedList() {
        return this.$store.getters.finishedTodos
      },
      // 满意度转换为星星样式数组（icon）
      satisfyStyle () {
        var satisfyStyleList = []
        if (this.targetTodo) {
          for (var i = 0; i < this.targetTodo.satisfiyDegree && i < 5; i++) {
            satisfyStyleList.push('star')
          }
          for (var j = this.targetTodo.satisfiyDegree; j < 5; j++) {
            satisfyStyleList.push('star_border')
          }
        }
        return satisfyStyleList
      },
    },
    methods: {
      // 获取动作
      execTodoAction(opt) {
        // 参数中的todo为触发动作的todo
        // elapsingTodo为当前进行的todo，两者意义不同
        this.targetTodo = opt.todo || {};
        if(this.status != 'NULL') {
          // 保存再执行
          console.log("有正在执行的todo");
          // 需要探针获取最新clockElapse状态

          this.$store.dispatch('UPDATE_TODO', { item: {todoId: this.elapsingTodo.todoId, clockElapse: this.elapsingTodo.clockElapse || 0} })
            .then(()=>{
              if(opt && opt.action == 'EDIT') {
                this.$router.push({name: 'editTodoView', params: { todoId: this.targetTodo.todoId }})
              }
              else if(opt && opt.action == 'ADD') {
                this.$router.push({ path: 'addTodoView' })
              }
              else if(opt && opt.action == 'FINISH'){
                this.openModal()
              }
              this.status = "NULL"
            })
        } else {
          // 直接执行
          console.log("无正在执行的todo")
          if(opt && opt.action == 'EDIT') {
            this.$router.push({name: 'editTodoView', params: { todoId: this.targetTodo.todoId }})
          }
          else if(opt && opt.action == 'ADD') {
            this.$router.push({ path: 'addTodoView' })
          }
          else if(opt && opt.action == 'FINISH'){
            this.openModal()
          }
          this.status = "NULL"
        }
      },

      // 从todo卡片获取当前是否有进行的任务
      updateTodoStatus(opt) {
        // 状态更新时，设置新状态
        if(this.status != opt.status)
          this.status = opt.status;
        this.elapsingTodo = opt.todo;
      },

      // 选择满意度星星
      onSelectSatifyDegree(index) {
        console.log("set todo satisfiyDegree");
        this.targetTodo.satisfiyDegree = index + 1;
      },
      // 新增
      addTodoHandler (event) {
        this.execTodoAction({'action': 'ADD'});
      },
      // 保存
      getTodoDone () {
        this.targetTodo.isFinished = 'T';
        // 优化spentClock计算规则
        this.targetTodo.score = 3.9 * this.targetTodo.priority
        this.$store.dispatch('UPDATE_TODO', { item: this.targetTodo }).then(()=>{
          this.closeModal();
        })
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

<style scoped type="text/css">
  .modal .modal-content {
    padding: 68px 0px 60px 0px;
  }

  .modal .modal-content .material-icons {
    font-size: 3.2rem;
  }

  .header-title {
    flex: 0 0 88%;
    font-size: 1.4rem;
  }

  .header-sidenav-btn {
    /*font-size: 1.4rem;*/
    padding-left: 8px;
  }

  .header-sidenav-btn i, .header-add-btn  i {
    display: block;
    font-size: 1.4rem;
    font-weight: bolder;
    padding-right: 8px;
  }
</style>
