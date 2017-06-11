<template>
  <div class="page-view" append="tree">
    <div class="page-header header page-header-background page-header-text">
      <div class="cancel" @click="cancelNewTodoHandler"> 取消</div>
      <div class="save row-padding-10" @click="saveNewTodoHandler"> 保存</div>
    </div>
    <div class="edit-todo-view-content row">
      <form class="col s12">
        <!--<div class="loading row"> &lt;!&ndash; v-if="loading" &ndash;&gt;-->
          <!--Loading...-->
        <!--</div>-->
        <div class="row">
          <div class="input-field col s12">
            <input placeholder="标题" id="todoTitle" type="text" class="validate" v-model="todoTitle">
            <label for="todoTitle"></label>
          </div>
          <div class="input-field col s12">
            <textarea id="comment" class="materialize-textarea" v-model="todoDesc"></textarea>
            <label for="comment">描述</label>
          </div>
        </div>
        <div class="row">
          <div class="input-field col s12">
            <select v-select="priority">
              <option value="" disabled>请选择优先级</option>
              <template v-for="star in stars">
                <option v-if="star == priority" :value="star" selected> {{ star }}星</option>
                <option v-else :value="star"> {{ star }}星</option>
              </template>
            </select>
            <label>优先级</label>
          </div>
        </div>
        <div class="row">
          <DatePicker class="col s6" title="选择日期" :propDate='expectFinishDate' v-on:updateSelectedDate="setExpectedFinishDate"></DatePicker>
          <!--  通过自定义事件，完成父子组件的通信 -->
          <TimePicker class="col s6" title="选择时间" :propDate='expectFinishDate' :propTime='expectFinishTime' v-on:updateSelectedTime="setExpectFinishTime"></TimePicker>
        </div>
        <div class="row">
          <div class="input-field col s12">
            <select v-select="projectId">
              <option value="" disabled selected>请选择项目</option>
              <template v-for="item in activeProjects">
                <option v-if="item.projectId == projectId" :value="item.projectId" selected>{{ item.projectName }}</option>
                <option v-else :value="item.projectId">{{ item.projectName }}</option>
              </template>
            </select>
            <label>项目</label>
          </div>
        </div>
        <!--场景用途未明确，暂时不提供-->
        <!--<div class="row">-->
          <!--<div class="input-field col s12">-->
            <!--<select v-select="sceneId">-->
              <!--<option value="" disabled selected>请选择场景</option>-->
              <!--<template v-for="item in activeScenes">-->
                <!--<option v-if="item.sceneId == sceneId" :value="item.sceneId" selected> {{ item.sceneName }}</option>-->
                <!--<option v-else :value="item.sceneId"> {{ item.sceneName }}</option>-->
              <!--</template>-->
            <!--</select>-->
            <!--<label>场景</label>-->
          <!--</div>-->
        <!--</div>-->
        <div class="row">
          <div class="input-field col s12">
            <div class="chips chips-initial">
              <!--<template v-for="tag in tags">-->
                <!--<div class="chip"> {{ tag.tagName }}-->
                  <!--<i class="material-icons close">close</i>-->
                <!--</div>-->
              <!--</template>-->
              <input id="tags" class="input" placeholder="回车添加标签">
              <!--<label for="tags">标签</label>-->
            </div>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
  import $ from 'jquery'
  import TimePicker from './common/time-picker'
  import DatePicker from './common/date-picker'

  export default {
    components: { TimePicker, DatePicker },
    data: function () {
      return {
        'loading': true,
        'stars': ['1', '2', '3', '4', '5'],
        'todoTitle': '',
        'todoId': '',
        'todoDesc': '',
        'priority': '',
        'expectFinishDate': '',
        'expectFinishTime': '',
//        'sceneId': '',
        'projectId': '',
        'tags': '',
        'spentClock': '',
        'isFinished': ''
      }
    },
    computed: {
      // 新任务对象
      updatedTODOItem () {
        return {
          'todoTitle': this.todoTitle,
          'todoId': this.todoId,
          'todoDesc': this.todoDesc,
          'priority': this.priority,
          'expectFinishDate': this.expectFinishDate,
          'expectFinishTime': this.expectFinishTime,
//          'sceneId': this.sceneId,
          'projectId': this.projectId,
          'tags': this.tags,
          'spentClock': this.spentClock,
          'isFinished': this.isFinished
        }
      },
      // 当前编辑的todo对象
      curEditTodo () {
        var todo = this.$store.getters.curEditTodo
        return todo
      },
      // 已配置project对象
      activeProjects () {
        return this.$store.getters.activeProjects
      },
      // 已配置scenes对象
//      activeScenes () {
//        return this.$store.getters.activeScenes
//      }
    },
    beforeMount: function () {
      this.$store.dispatch('LOAD_TODO', {id: this.$route.params.todoId})
      this.$store.dispatch('LOAD_PROJECTS')
//      this.$store.dispatch('LOAD_SCENES')
      this.initTodoMeta(this.$store.getters.curEditTodo)
    },
    mounted: function () {
      var VM = this
      // 初始化的tag标签
      if (!this.tags) {
        this.tags = []
      }
      var initTags = this.tags.map(function (tag) {
        return {
          tag: tag.tagName
        }
      })
      // materialize-css 初始化方法
      $('select').material_select()
      $('.chips').material_chip()
      $('.chips-initial').material_chip({
        data: initTags
      })
      $('.chips-placeholder').material_chip({
        placeholder: '输入并回车继续',
        secondaryPlaceholder: '添加标签'
      })
      $('.chips').on('chip.add', function (e, chip) {
        // you have the added chip here
        VM.tags.push({'tagName': chip.tag})
      })
      $('.chips').on('chip.delete', function (e, chip) {
        // you have the added chip here
        VM.tags = VM.deleteObjectInArray(VM.tags, 'tagName', chip.tag)
      })
    },
    methods: {
      // tools: delete ele in array
      deleteElementInArray (obj, target) {
        var index = obj.indexOf(target)
        if (index > -1) {
          return obj.slice(0, index).concat(obj.slice(index + 1))
        } else {
          return obj
        }
      },
      // tools: delete ele in Object
      deleteObjectInArray (obj, propNm, target) {
        for (var p in obj) {
          if (obj[p].hasOwnProperty(propNm) && obj[p][propNm] === target) {
            obj.splice(p, 1)
            break
          }
        }
        return obj
      },
      // 在页面挂载前初始化data
      initTodoMeta (todo) {
        this.todoTitle = todo.todoTitle
        this.todoId = todo.todoId
        this.todoDesc = todo.todoDesc
        this.priority = todo.priority
        this.expectFinishDate = todo.expectFinishDate
        this.expectFinishTime = todo.expectFinishTime
//        this.sceneId = todo.sceneId
        this.projectId = todo.projectId
        this.tags = todo.tags
        this.spentClock = todo.spentClock
        this.isFinished = todo.isFinished
      },
      // 取消新任务
      cancelNewTodoHandler (event) {
        console.log('cancel and go back!')
        this.newTODOItem = {}
        this.$router.back()
      },
      // 保存新任务
      saveNewTodoHandler (event) {
        console.log('save the update todo task')
        // 触发更新任务
        this.$store.dispatch('UPDATE_TODO', {'item': this.updatedTODOItem})
        this.$router.back()
      },
      // 设置计划完成的时间
      setExpectFinishTime (event) {
        console.log('set the setExpectFinishTime')
        this.expectFinishTime = event || '23:59'
      },
      // 设置计划完成的日期
      setExpectedFinishDate (event) {
        console.log('set the setExpectedFinishDate')
        this.expectFinishDate = event
      },
      updateValue (event) {
        console.log('date')
      }
    }
  }
</script>

<style scoped>
  .edit-todo-view {
    height: 100%;
  }

  .edit-todo-view .row .col {
    padding: 0px
  }

  .edit-todo-view .row div {
    padding: 0 1rem;
  }

  .select-wrapper .caret {
    right: 5px !important;
  }

  .edit-todo-view-header {
    position: fixed;
    top: 0;
    font-size: 16px;
    width: 100%;
    height: 80px;
    z-index: 2;
    margin-bottom: 3px;
    display: flex;
    flex-flow: nowrap;
    flex-direction: row;
    justify-content: flex-start;
    -webkit-justify-content: flex-start;
    align-items: center;
    -webkit-align-items: center;
    border-bottom-width: 2px;
    border-bottom-style: solid;
    border-bottom-color: #35495e;
  }

  .edit-todo-view-content {
    margin-top: 80px;
  }
  .edit-todo-view .cancel {
    flex: 0 0 70%;
    padding-left: 15px;
  }

  .row-padding-5 {
    padding: 0 5px;
  }
</style>
