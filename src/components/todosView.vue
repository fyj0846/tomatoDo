<template>
  <div class="todo-view" append="tree">
    <app-header></app-header>
    <ul class="todos-list">
      <li class="todo-cell" v-for="todo in todos" :key="todo.todoId" append="tree">
        <todo :todo="todo" :todoId="todo.todoId"></todo>
      </li>
    </ul>
  </div>
</template>

<script>
  import AppHeader from '../components/app-header.vue'
  import Todo from '../components/todo.vue'

  export default {
    components: { AppHeader, Todo },
    computed: {
      todos () {
        const todos = this.$store.getters.activeTodos
        return Object.keys(todos)
          .reduce((acc, key) => {
            acc.push({ ...todos[key], todoId: key })
            return acc
          }, [])
          .sort((a, b) => {
            return a.done - b.done
          })
      }
    },
    mounted: function () {
      this.$store.dispatch('LOAD_TODOS')
    }
  }
</script>

<style scoped>
  .todo-view {
    height: 100%;
  }
  .todo-cell {
    margin-bottom: 3px;
    border-bottom-width: 2px;
    border-bottom-style: solid;
    border-bottom-color: #DDDDDD;
    background-color: #FFFFFF;
  }
</style>
