<template>
  <div class="todo-view" append="tree">
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
          <todo :todoMeta="todo"></todo>
        </div>
      </div>
    </div>
    <div id="activeTodos" class="col s12">
      <div class="row todo-view-content">
        <div v-for="todo in todoList" class="col s12 m6">
          <todo :todoMeta="todo"></todo>
        </div>
      </div>
    </div>
    <!--<div id="deleteTotos" class="col s12">空</div>-->
  </div>
</template>

<script>
  import AppHeader from '../components/app-header.vue'
  import Todo from '../components/todo.vue'
  import SideNav from '../components/sideNav.vue'
  import $ from 'jquery'
  export default {
    components: {AppHeader, Todo, SideNav},
    computed: {
      todoList () {
        return this.$store.getters.activeTodos
      },
      finishedList() {
        return this.$store.getters.finishedTodos
      }
    },
    beforeMount: function () {
      console.log('todoView: load todos')
      this.$store.dispatch('LOAD_TODOS')
    },
    mounted: function () {
      console.log('todosView: view mounted')
      $('.button-collapse').sideNav()
    }
  }
</script>

<style scoped>
  .todo-view {
    height: 100%;
  }

  .todo-view-header {
    position: fixed;
    top: 0;
    font-size: 16px;
    width: 100%;
    height: 80px;
    z-index: 5;
  }

  .todo-tabs {
    margin-top: 80px;
    width: auto;
    margin-left: 15px;
    margin-right: 15px;
  }

  .todo-tabs .tab a {
    color: #000;
  }

  .todo-tabs .tab a.active, .todo-tabs .tab a:hover {
    color: #42b983;
  }

  .todo-view-content {
    margin-top: 8px;
  }
</style>
