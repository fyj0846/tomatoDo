<template>
  <div class="todo-view" append="tree">
    <app-header>
      <side-nav slot="sideNav"></side-nav>
    </app-header>
    <div class="row">
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

  export default {
    components: { AppHeader, Todo, SideNav },
//    data: function () {
//      return {
//      }
//    },
    computed: {
      // 从vuex中，返回状态是未完成且未删除的todo task
      todoList () {
        return this.$store.getters.activeTodos
      }
    },
    mounted: function () {
      // reset test data
      window.localStorage.clear()
      window.localStorage.setItem('todos',
        '[{"todoTitle":"EDA基线管理","todoId":"001","tags":[{"tagName":"hard"},{"tagName":"EDA"}],"scene":{"sceneName":"办公"},"expectFinishTime":"17:00","spentClock":"0","priority":"4","isFinished":false,"isDeleted":false},{"todoTitle":"EDA通知发布-完成","todoId":"002","tags":[{"tagName":"hard"},{"tagName":"EDA2"}],"scene":{"sceneName":"办公"},"expectFinishTime":"2017-05-06 17:00","spentClock":"0","priority":"4","isFinished":true},{"todoTitle":"测试项目-未完成已删除","todoId":"003","tags":[{"tagName":"hard"},{"tagName":"EDA3"}],"scene":{"sceneName":"办公"},"expectFinishTime":"2017-05-07 17:00","spentClock":"0","priority":"4","isFinished":false,"isDeleted":true},{"todoTitle":"测试项目-未完成未删除","todoId":"004","tags":[{"tagName":"hard"},{"tagName":"EDA3"}],"scene":{"sceneName":"办公"},"expectFinishTime":"2017-05-07 17:00","spentClock":"0","priority":"2","isFinished":false,"isDeleted":false}]')
      console.log('dispatch load_todos')
      this.$store.dispatch('LOAD_TODOS')
    }
  }
</script>

<style scoped>
  .todo-view {
    height: 100%;
  }
</style>
