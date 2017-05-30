<template>
  <div class="add-todo-view" append="tree">
    <div class="add-todo-view-header header light-blue white-text">
      <div class="cancel" @click="cancelNewTodoHandler"> 取消</div>
      <div class="save row-padding-5" @click="saveNewTodoHandler"> 保存</div>
      <div>|</div>
      <div class="share row-padding-5"> 发送</div>
    </div>
    <div class="add-todo-view-content row">
      <form class="col s12">
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
              <option value="" disabled selected>请选择优先级</option>
              <option value="1">1星</option>
              <option value="2">2星</option>
              <option value="3">3星</option>
              <option value="4">4星</option>
              <option value="5">5星</option>
            </select>
            <label>优先级</label>
          </div>
        </div>
        <div class="row">
          <DatePicker class="col s6" title="选择日期" v-on:updateSelectedDate="setExpectedFinishDate"></DatePicker>
          <!--  通过自定义事件，完成父子组件的通信 -->
          <TimePicker class="col s6" title="选择时间" :date='expectFinishDate' v-on:updateSelectedTime="setExpectFinishTime"></TimePicker>
        </div>
        <div class="row">
          <div class="input-field col s12">
            <select v-select="projectId">
              <option value="" disabled selected>请选择项目</option>
              <option v-for="item in activeProjects" :value="item.projectId">{{ item.projectName }}</option>
              <!--<option value="project001">EDA</option>-->
              <!--<option value="project002">鹰眼</option>-->
              <!--<option value="project003">todo</option>-->
            </select>
            <label>项目</label>
          </div>
        </div>
        <div class="row">
          <div class="input-field col s12">
            <select v-select="sceneId">
              <option value="" disabled selected>请选择场景</option>
              <option v-for="item in activeScenes" :value="item.sceneId"> {{ item.sceneName }}</option>
              <!--<option value="scene001">study</option>-->
              <!--<option value="scene002">work</option>-->
              <!--<option value="scene003">fun</option>-->
            </select>
            <label>场景</label>
          </div>
        </div>
        <div class="row">
          <div class="input-field col s12">
            <div class="chips chips-placeholder">
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
        todoTitle: '',
        todoId: '',
        todoDesc: '',
        priority: '',
        expectFinishDate: '',
        expectFinishTime: '',
        sceneId: '',
        projectId: '',
        tags: [],
        spentClock: 0,
        isFinished: false
      }
    },
    computed: {
      // 新任务对象
      newTODOItem () {
        return {
          'todoTitle': this.todoTitle,
          'todoId': this.todoId,
          'todoDesc': this.todoDesc,
          'priority': this.priority,
          'expectFinishDate': this.expectFinishDate,
          'expectFinishTime': this.expectFinishTime,
          'sceneId': this.sceneId,
          'projectId': this.projectId,
          'tags': this.tags,
          'spentClock': this.spentClock,
          'isFinished': this.isFinished
        }
      },
      // 已配置project对象
      activeProjects () {
        return this.$store.getters.activeProjects
      },
      // 已配置scenes对象
      activeScenes () {
        return this.$store.getters.activeScenes
      }
    },
    beforeMount: function () {
      this.$store.dispatch('LOAD_PROJECTS')
      this.$store.dispatch('LOAD_SCENES')
    },
    mounted: function () {
      var VM = this
      // materialize-css 初始化方法
      $('select').material_select()
      $('.chips').material_chip()
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
      // 取消新任务
      cancelNewTodoHandler (event) {
        console.log('cancel and go back!')
        this.newTODOItem = {}
        this.$router.back()
      },
      // 保存新任务
      saveNewTodoHandler (event) {
        console.log('save the new todo task')
        // 触发新增任务
        this.$store.dispatch('ADD_TODO', {'item': this.newTODOItem})
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
  .add-todo-view {
    height: 100%;
  }

  .add-todo-view .row .col {
    padding: 0px
  }

  .add-todo-view .row div {
    padding: 0 1rem;
  }

  .select-wrapper .caret {
    right: 5px !important;
  }

  .add-todo-view-header {
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

  .add-todo-view-content {
    margin-top: 80px;
  }
  .add-todo-view .cancel {
    flex: 0 0 80%;
    padding-left: 15px;
  }

  .row-padding-5 {
    padding: 0 5px;
  }
</style>
