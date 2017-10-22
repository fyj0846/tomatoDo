<template>
  <div class="card">
    <div class="todo-header grey lighten-1">
      <span>{{ todoMeta.todoTitle }}</span>
      <!--<i @click="finishTodo" class="material-icons right">done</i>-->
      <i @click="getTodoDelete" class="material-icons right">delete</i>
    </div>
    <div class=" todo-content">
      <div class="todo-content-left">
        <div class="todo-project left-center">
          <i class="material-icons">folder</i>
          <span class=" padding_left_right">{{ todoMeta.projectName }}</span>
        </div>
        <!--场景需求不明确，暂不提供-->
        <!--<div class="todo-scene left-center">-->
          <!--<i class="material-icons">place</i>-->
          <!--<span class=" padding_left_right">{{ todoMeta.sceneName }}</span>-->
        <!--</div>-->
        <div class="todo-tags left-center">
          <i class="material-icons">label_outline</i>
          <!--v-for="tag in todoMeta.tags"-->
          <span class="todo-flag padding_left_right" >
            {{ todoMeta.tags }}
          </span>
        </div>
        <div class="todo-timing left-center">
          <i class="material-icons">timelapse</i>
          <span class="todo-timeLeft padding_left_right">{{ todoMeta.finishTime }}</span>
        </div>
        <div class="todo-statis left-center">
          <i class="material-icons">assignment</i>
          <span class="todo-spent padding_left_right">{{ todoMeta.score }}</span>
        </div>
      </div>
      <div class="todo-content-right">
        <div class="todo-priority red-text">
          <i v-for="style in satisfyStyle " class="material-icons">{{ style }}</i>
        </div>
      </div>
    </div>
    <div class="card-action todo-action right-center">
      <!--<i @click="editTodoHandler(todoMeta.todoId)" class="material-icons right">edit</i>-->
      <!--<i @click="continueTodo" v-bind:class="[{ active: this.continueFlag }, 'material-icons', 'right']">repeat_one</i>-->
      <!--<i @click="toggleTodo" class="material-icons right"> {{ timerController }}</i>-->
      <!--<i @click="stopTodo" class="material-icons right">stop</i>-->
    </div>
  </div>
</template>

<script>
  import $ from 'jquery';

  export default {
    data: function () {
      return {
        todoMeta: '',
      }
    },
    props: {
      // todoView 传递的参数
      todoMetaProp: {
        type: Object,
        required: true
      }
    },
    computed: {
      // 优先级转换为星星样式数组（icon）
      satisfyStyle () {
        var styleList = []
        for (var i = 0; i < this.todoMeta.satisfiyDegree && i < 5; i++) {
          styleList.push('star')
        }
        for (var j = this.todoMeta.satisfiyDegree; j < 5; j++) {
          styleList.push('star_border')
        }
        return styleList
      },
    },
    mounted () {
      this.todoMeta = $.extend({}, this.todoMetaProp);
    },
    methods: {
      // todo删除
      getTodoDelete () {
        this.todoMeta.isDelete = "T";
        // 优化spentClock计算规则
        this.$store.dispatch('UPDATE_TODO', {item: this.todoMeta})
      },
    }
  }
</script>

<style scoped>

  .card-active {
    /*后续可以考虑做成闪烁*/
    box-shadow: 0 6px 6px 0 rgba(0,0,255,0.14), 0 4px 8px 0 rgba(0,0,255,0.22), 0 6px 4px -8px rgba(0,0,255,0.2);
  }

  .card .card-action {
    padding: 0px;
  }

  /*todo卡片头部样式*/
  .todo-header {
    font-size: 1.2rem;
    padding: 2px 15px  2px 8px;
  }

  .todo-header a:nth-child(1) {
    margin-right: 10px;
  }

  /*todo卡片体样式*/
  .todo-content {
    padding: 4px 12px;
    min-height: 96px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .todo-content-left {
    display: flex;
    flex: 4;
    flex-direction: column;
    align-self: flex-start;
  }

  .todo-content-left div {
    /*line-height: 30px;*/
  }
  .todo-content-right {
    display: flex;
    flex: 3;
    flex-direction: column;
    align-self: center;
  }

  .todo-content-right .todo-inTask {
    font-size: 2.2rem;
  }

  .todo-action {
    /*height: 41px;*/
    padding: 4px 10px !important;
  }

  .todo-header i, .todo-action i {
    margin: 0 7px;
  }

  .todo-action .active {
    background-color: yellow;
  }

  .left-center {
    display: flex;
    justify-content: flex-start;
    align-items: center;
  }

  .right-center {
    display: flex;
    justify-content: flex-end;
    align-items: center;
  }

  .padding_left_right {
    padding: 0 5px;
  }
</style>
