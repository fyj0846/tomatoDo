<template>
  <div class="add-todo-view" append="tree">
    <div class="add-todo-view-header header light-blue white-text">
      <div class="cancle" @click="cancleNewTodoHandler"> 取消</div>
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
          <DatePicker title="传递的titile" v-on:updateSelectedDate="setExpectedFinishDate"></DatePicker>
          <!--  通过自定义事件，完成父子组件的通信 -->
          <TimePicker v-on:updateSelectedTime="setExpectFinishTime"></TimePicker>
        </div>
        <div class="row">
          <div class="input-field col s12">
            <select v-select="projectId">
              <option value="" disabled selected>请选择项目</option>
              <option value="project001">EDA</option>
              <option value="project002">鹰眼</option>
              <option value="project003">todo</option>
            </select>
            <label>项目</label>
          </div>
        </div>
        <div class="row">
          <div class="input-field col s12">
            <select v-select="sceneId">
              <option value="" disabled selected>请选择场景</option>
              <option value="scene001">study</option>
              <option value="scene002">work</option>
              <option value="scene003">fun</option>
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
        tags: [
//            {
//            tagName: 'hard'
//            },
//            {
//            tagName: 'EDA'
//            }
        ],
        scene: {
//            sceneId: '',
//            sceneName: '办公'
        },
        sceneId: '',
        project: {
          projectId: '',
          projectName: ''
        },
        projectId: '',
        expectFinishDate: '',
        expectFinishTime: '',
        spentClock: '',
        priority: '',
        isFinished: false
      }
    },
    computed: {
      date () {
        console.log(this.$refs.datePicker.value)
        return this.$refs.datePicker.value
      }
    },
    mounted: function () {
      console.log('add todo mounted!')
      $('select').material_select()
      $('.chips').material_chip()
      $('.chips-placeholder').material_chip({
        placeholder: '输入并回车继续',
        secondaryPlaceholder: '添加标签'
      })
    },
    methods: {
      cancleNewTodoHandler (event) {
        console.log('cancel and go back!')
        this.$router.back()
      },
      saveNewTodoHandler (event) {
        console.log('save the new todo task')
      },
      setExpectFinishTime (event) {
        console.log('set the setExpectFinishTime')
        this.expectFinishTime = event || '23:59'
      },
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
  .add-todo-view .cancle {
    flex: 0 0 80%;
    padding-left: 15px;
  }

  .row-padding-5 {
    padding: 0 5px;
  }
</style>
