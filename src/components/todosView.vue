<template>
  <div class="todo-view" append="tree">
    <app-header class="todo-view-header"></app-header>
    <side-nav slot="sideNav"></side-nav>
    <div class="row todo-view-content">
      <div v-for="todo in todoList" class="col s12 m6">
        <todo :todoMeta="todo"></todo>
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
    computed: {
      todoList () {
        return this.$store.getters.allTodos
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

  .todo-view-content {
    margin-top: 80px;
  }
</style>
