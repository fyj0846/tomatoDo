<template>
  <div class="card"  v-bind:class="{ 'card-active': timerHandle }">
    <div class="todo-header grey lighten-1">
      <span>{{ todoMeta.todoTitle }}</span>
      <i @click="finishTodo" class="material-icons right">done</i>
      <i @click="getTodoDelete" class="material-icons right">delete</i>
    </div>
    <div class=" todo-content">
      <div class="todo-content-left">
        <div class="todo-project left-center">
          <i class="material-icons">folder</i>
          <span class=" padding_left_right">{{ todoMeta.projectName }}</span>
        </div>
        <!--场景需求不明确，暂不提供-->
        <div class="todo-scene left-center">
          <i class="material-icons">place</i>
          <span class=" padding_left_right">{{ todoMeta.sceneName }}</span>
        </div>
        <div class="todo-tags left-center">
          <i class="material-icons">label_outline</i>
          <!--v-for="tag in todoMeta.tags"-->
          <span class="todo-flag padding_left_right" >
            {{ todoMeta.tags }}
          </span>
        </div>
        <div class="todo-timing left-center">
          <i class="material-icons">schedule</i>
          <span class="todo-timeLeft padding_left_right">{{ todoMeta.expectFinishTime }}</span>
        </div>
        <div class="todo-statis left-center">
          <i class="material-icons">done</i>
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
  </div>
</template>

<script>
  import $ from 'jquery';

  export default {
    data: function () {
      return {
        timerHandle: 0,
//        timer: '',
        timerShow: '',
        timerController: '',
        continueFlag: false,
        todoMeta: $.extend({}, this.todoMetaProp)
      }
    },
    props: {
      // todoView 传递的参数
      todoMetaProp: {
        type: Object,
        required: true
      },
      statusProp: {
        type: String,
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
      },
    },
    mounted () {
      this.resetTimer()
    },
    methods: {
      // 执行各类动作：暂停|删除|编辑
      todoAction (action) {
        // FINISH, EDIT, ADD
        this.clearTimer()
        this.resetTimerController()
        this.$emit("TODOACTION", {action: action, todo: this.todoMeta });
      },

      // 将当前活动的todo传递至todosView管控
      // 只有该方法会触发活动todo的切换
      updateTodoStatus (status) {
        // NULL, PROCESSING, PAUSE
        this.$emit("TODOSTATUS", {status: status, todo: this.todoMeta });
      },
      // todo完成
      finishTodo() {
        this.todoAction('FINISH');
      },
      // todo删除
      getTodoDelete () {
        this.clearTimer()
        this.resetTimerController()
        this.todoMeta.isDelete = "T";
        // 优化spentClock计算规则
        this.$store.dispatch('UPDATE_TODO', {item: this.todoMeta})
      },

      // todo开始或启动根据timerHandler来判断
      toggleTodo () {
        if (this.timerHandle > 0) {
          // 启动状态 -> 暂停
          this.pauseTodo()
        } else {
          // 暂停状态 -> 启动
          this.startTodo()
        }
      },

      // todo启动
      startTodo () {
        console.log('start todo task')
        // 计时器逻辑
        var THAT = this
        // 判断当前是否有任务进行，如果有任务进行，则不允许重复或者更多任务启动
        if(this.statusProp == "PROCESSING") {
          Materialize.toast("当前已有任务进行中，请勿同时启动多个任务", 1250);
          return;
        }
        clearInterval(this.timerHandle)
        this.timerHandle = setInterval(function () {
          if (THAT.todoMeta.clockElapse >= 1) {
            THAT.todoMeta.clockElapse--
            THAT.timerShow = THAT.convertTimeToShow(THAT.todoMeta.clockElapse)
          } else if (THAT.todoMeta.clockElapse === 0) {
            THAT.stopTodo()
            // 持续进行
            if (THAT.continueFlag) {
              THAT.startTodo()
            }
            return
          }
        }, 1000)
        this.updateTodoStatus("PROCESSING");
        this.toggleTimerController()
      },

      // todo暂停
      pauseTodo () {
        console.log('pause todo task!')
        this.clearTimer()
        this.updateTodoStatus("PAUSE")
        // 中途遭受干扰，任务暂停
        // 统计中断次数
        this.todoAction('UPDATE')
      },

      // todo停止，直接调用后台数据服务
      stopTodo () {
        this.clearTimer()
        // update spent clock
        this.updateTodoStatus("NULL");
        if (this.todoMeta.clockElapse === 0) {
          // 完整完成一个 clock
          // 更新统计信息
          console.log("timeout expired");
          this.todoMeta.spentClock = this.todoMeta.spentClock - 0 + 1;
        } else {
          // 中途干扰，任务停止
          // 统计中断次数
          console.log("interrupt occur")
//          this.todoMeta.interupt = this.todoMeta.interupt - 0 + 1;
//          this.$store.dispatch('UPDATE_TODO', {item: this.todoMeta})
        }
        this.resetTimer(true)
        this.$store.dispatch('UPDATE_TODO', {item: this.todoMeta})
      },

      // 刷新todo 启动/暂停按钮
      toggleTimerController () {
        if (this.timerController === 'play_arrow') {
          this.timerController = 'pause'
        } else {
          this.timerController = 'play_arrow'
        }
      },

      convertTimeToShow (time) {
        var minute = Math.floor(time / 60)
        var second = Math.floor(time) - (minute * 60)
        if (minute <= 9) minute = '0' + minute
        if (second <= 9) second = '0' + second
        return minute + ':' + second
      },
      // 重置 todo 恢复到准备启动状态
      resetTimerController () {
        this.timerController = 'play_arrow'
      },

      // 清理 todo 定时器
      clearTimer () {
        clearInterval(this.timerHandle)
        this.timerHandle = 0
        this.toggleTimerController()
      },

      initTimer () {

      },
      // 重置  todo 定时器
      resetTimer (foreUpdate) {
        if(!this.todoMeta.clockElapse || this.todoMeta.clockElapse == 0 || foreUpdate) {
          this.todoMeta.clockElapse = 25*60;
        }
        this.timerShow =  this.convertTimeToShow(this.todoMeta.clockElapse)
        this.timerHandle = 0
        this.resetTimerController();
      },

      // todo 编辑
      editTodoHandler () {
        // 当前进行的任务不可编辑
        if(this.timerHandle > 0) {
          Materialize.toast("当前任务正在进行，编辑前请先暂停该任务", 850)
          return;
        }
        // 页面跳转前，完成状态保存
        this.todoAction('EDIT');
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
