<template>
  <div class="card"  v-bind:class="{ 'card-active': timerHandle }">
    <div class="todo-header grey lighten-1">
      <span>{{ todoMeta.todoTitle }}</span>
      <i @click="getTodoDone" class="material-icons right">done</i>
      <i @click="getTodoDelete" class="material-icons right">delete</i>
    </div>
    <div class=" todo-content">
      <div class="todo-content-left">
        <div class="todo-project left-center">
          <i class="material-icons">place</i>
          <span class=" padding_left_right">{{ todoMeta.project.projectName }}</span>
        </div>
        <!--场景需求不明确，暂不提供-->
        <!--<div class="todo-scene left-center">-->
          <!--<i class="material-icons">place</i>-->
          <!--<span class=" padding_left_right">{{ todoMeta.scene.sceneName }}</span>-->
        <!--</div>-->
        <div class="todo-flags left-center">
          <i class="material-icons">label</i>
          <span class="todo-flag padding_left_right" v-for="tag in todoMeta.tags">
            {{ tag.tagName }}
          </span>
        </div>
        <div class="todo-timing left-center">
          <i class="material-icons">schedule</i>
          <span class="todo-timeLeft padding_left_right">{{ todoMeta.expectFinishTime }}</span>
        </div>
        <div class="todo-statis left-center">
          <i class="material-icons">thumb_up</i>
          <span class="todo-spent padding_left_right">{{ todoMeta.spentClock }}</span>
        </div>
      </div>
      <div class="todo-content-right">
        <div class="todo-priority red-text">
          <i v-for="style in priorityStyle " class="material-icons">{{ style }}</i>
        </div>
        <div class="todo-inTask"> {{ timerShow }}</div>
      </div>
    </div>
    <div class="card-action todo-action right-center">
      <i @click="editTodoHandler(todoMeta.todoId)" class="material-icons right">edit</i>
      <i @click="continueTodo" v-bind:class="[{ active: this.continueFlag }, 'material-icons', 'right']">repeat_one</i>
      <i @click="toggleTodo" class="material-icons right"> {{ timerController }}</i>
      <i @click="stopTodo" class="material-icons right">stop</i>
    </div>
    <div class="card-reveal">
      <span class="card-title grey-text text-darken-4">Card Title<i class="material-icons right">close</i></span>
      <p>Here is some more information about this product that is only revealed once clicked on.</p>
    </div>
  </div>
</template>

<script>
  export default {
    data: function () {
      return {
        timerHandle: 0,
        timer: '',
        timerShow: '',
        timerController: '',
        continueFlag: false
      }
    },
    props: {
      // todoView 传递的参数
      todoMeta: {
        type: Object,
        required: true
      }
    },
    computed: {
      // 优先级转换为星星样式数组（icon）
      priorityStyle () {
        var styleList = []
        for (var i = 0; i < this.todoMeta.priority && i < 5; i++) {
          styleList.push('star')
        }
        for (var j = this.todoMeta.priority; j < 5; j++) {
          styleList.push('star_border')
        }
        return styleList
      }
    },
    mounted () {
      this.resetTimer()
    },
    methods: {
      // todo 完成
      getTodoDone () {
        console.log('todo done!')
        this.clearTimer()
        this.resetTimerController()
        var spClock = this.todoMeta.spentClock || 0
        // 优化spentClock计算规则
        this.$store.dispatch('FINISH_TODO', {id: this.todoMeta.todoId, name: 'spentClock', newValue: spClock - 0 + 1})
      },

      // todo 删除
      getTodoDelete () {
        console.log('todo delete!')
        this.clearTimer()
        this.resetTimerController()
        var spClock = this.todoMeta.spentClock || 0
        // 优化spentClock计算规则
        this.$store.dispatch('DELETE_TODO', {id: this.todoMeta.todoId, name: 'spentClock', newValue: spClock - 0 + 1})
      },

      // todo 开始或启动，根据timerHandler来判断
      toggleTodo () {
        if (this.timerHandle > 0) {
          // 启动状态 -> 暂停
          this.pauseTodo()
        } else {
          // 暂停状态 -> 启动
          this.startTodo()
        }
      },

      // todo 启动
      startTodo () {
        console.log('start todo task')
        // 计时器逻辑
        var THAT = this
        clearInterval(this.timerHandle)
        this.timerHandle = setInterval(function () {
          var minute = 0
          var second = 0  // 时间默认值
          if (THAT.timer >= 1) {
            THAT.timer--
            minute = Math.floor(THAT.timer / 60)
            second = Math.floor(THAT.timer) - (minute * 60)
          } else if (THAT.timer === 0) {
            THAT.stopTodo()
            // 持续进行
            if (THAT.continueFlag) {
              THAT.startTodo()
            }
            return
          }
          if (minute <= 9) minute = '0' + minute
          if (second <= 9) second = '0' + second
          THAT.timerShow = minute + ':' + second
        }, 1000)
        this.toggleTimerController()
      },

      // todo 暂停
      pauseTodo () {
        console.log('pause todo task!')
        this.clearTimer()
        // 中途遭受干扰，任务暂停
        // 统计中断次数
        this.toggleTimerController()
      },

      // todo 停止
      stopTodo () {
        this.clearTimer()
        this.resetTimerController()
        // update spent clock
        if (this.timer === 0) {
          // 完整完成一个 clock
          // 更新统计信息
          var spClock = this.todoMeta.spentClock || 0
          this.$store.dispatch('UPDATE_TODO_MNGR', {id: this.todoMeta.todoId, name: 'spentClock', newValue: spClock - 0 + 1})
        } else {
          // 中途干扰，任务停止
          // 统计中断次数
          var ipt = this.todoMeta.interupt || 0
          this.$store.dispatch('UPDATE_TODO_MNGR', {id: this.todoMeta.todoId, name: 'interupt', newValue: ipt - 0 + 1})
        }
        this.resetTimer()
      },

      // 刷新 todo 启动/暂停按钮
      toggleTimerController () {
        if (this.timerController === 'play_arrow') {
          this.timerController = 'pause'
        } else {
          this.timerController = 'play_arrow'
        }
      },

      // 重置 todo 恢复到准备启动状态
      resetTimerController () {
        this.timerController = 'play_arrow'
      },

      // 清理 todo 定时器
      clearTimer () {
        clearInterval(this.timerHandle)
        this.timerHandle = 0
      },

      // 重置  todo 定时器
      resetTimer () {
        this.timerShow = '00:10'
        this.timer = 10
        this.timerHandle = 0
        this.timerController = 'play_arrow'
      },

      // todo 编辑
      editTodoHandler (todoId) {
        console.log('message', 'edit todo touched')
        this.$router.push({name: 'editTodoView', params: { todoId: todoId }})
      },

      // todo 查看
      viewTodo () {
        console.log('view todo task')
      },

      // todo 告警
      continueTodo () {
        console.log('continue todo task one by one')
        this.continueFlag = !this.continueFlag
      },

    }
  }
</script>

<style scoped>
  /*自定义卡片样式*/
  .card {
    margin: 0.5rem;
  }

  .card-active {
    border: 1px solid red;
  }

  /*todo卡片头部样式*/
  .todo-header {
    font-size: 1.3rem;
    padding: 5px 15px  5px 8px;
  }

  .todo-header a:nth-child(1) {
    margin-right: 10px;
  }

  /*todo卡片体样式*/
  .todo-content {
    padding: 12px 20px;
    min-height: 120px;
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
    line-height: 30px;
  }
  .todo-content-right {
    display: flex;
    flex: 3;
    flex-direction: column;
    align-self: center;
  }

  .todo-content-right .todo-inTask {
    font-size: 2.6rem;
  }

  .todo-action {
    height: 41px;
    padding: 10px 10px;
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
