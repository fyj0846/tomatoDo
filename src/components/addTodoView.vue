<template>
  <div class="page-view" append="tree">
    <div class="page-header">
      <div class="cancel" @click="cancelNewTodoHandler"> 取消</div>
      <div class="title"></div>
      <div class="save" @click="saveNewTodoHandler"> 保存</div>
    </div>
    <div class="page-content">
      <form class="">
        <div class="">
          <div class="input-field">
            <input placeholder="输入任务标题" id="todoTitle" type="text" class="validate" v-model="todoTitle">
            <!--<label for="todoTitle">标题</label>-->
          </div>
          <div class="input-field">
            <textarea placeholder="输入任务描述" id="describe" class="materialize-textarea" v-model="todoDescribe"></textarea>
            <!--<label for="describe">描述</label>-->
          </div>
        </div>
        <div class="">
          <div class="input-field">
            <input placeholder="输入所需番茄钟" id="expectClock" type="text" class="validate" v-model="expectClock">
            <!--<label for="expectClock">时长</label>-->
          </div>
        </div>
        <div class="">
          <div class="input-field">
            <v-select v-model="newChoosePriority" :options="activePriorities" label="priorityName"></v-select>
            <!--<label>优先级</label>-->
          </div>
        </div>
        <div class="selector">
          <DatePicker class="" title="选择日期" :propDate='newChooseDate'
                      v-on:updateSelectedDate="setExpectedFinishDate"></DatePicker>
          <!--  通过自定义事件，完成父子组件的通信 -->
          <TimePicker class="" title="选择时间" :propDate='newChooseDate' :propTime='newChooseTime'
                      v-on:updateSelectedTime="setExpectFinishTime"></TimePicker>
        </div>
        <div class="">
          <div class="input-field">
            <v-select v-model="newChooseProject" :options="activeProjects" label="projectName"></v-select>
            <!--<label>项目</label>-->
          </div>
        </div>
        <!--场景-->
        <div class="">
          <div class="input-field">
            <v-select v-model="newChooseScene" :options="activeScenes" label="sceneName"></v-select>
          </div>
        </div>
        <div class="">
          <div class="input-field">
            <div class="chips chips-placeholder">
              <input id="tags" class="input" placeholder="回车添加标签">
            </div>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
  // 引入公共CSS
  import $ from 'jquery'
  import TimePicker from './common/time-picker'
  import DatePicker from './common/date-picker'

  export default {
    components: { TimePicker, DatePicker },
    data: function () {
      return {
        todoTitle: '',
        todoDescribe: '',
        priority: '',
        expectClock: '',
        expectFinishTime: '',
        sceneId: '',
        projectId: '',
        spentClock: 0,
        isFinished: 'F',
        newChoosePriority: '',
        newChooseProject: '',
        newChooseScene: '',
        tags: []
      }
    },
    computed: {
      // 新任务对象
      newTODOItem () {
        return {
          'todoTitle': this.todoTitle,
          'todoDescribe': this.todoDescribe,
          'priority': this.newChoosePriority.priority,
          'expectClock': this.expectClock,
          'expectFinishTime': this.newChooseDate + " " + this.newChooseTime,
          'tags': this.newTagItem,
          'spentClock': this.spentClock,
          'isFinished': this.isFinished,
          'isDelete': this.isDelete,
          'sceneId': this.newChooseScene.sceneId,
          'projectId': this.newChooseProject.projectId,
        }
      },
      newTagItem (){
        return this.tags.map(function (item) {
          return item.tag;
        }).join(";")
      },
      activePriorities () {
        return this.$store.getters.activePriorities
      },
      // 已配置project对象
      activeProjects () {
        return this.$store.getters.activeProjects
      },
      // 已配置scenes对象
      activeScenes () {
        return this.$store.getters.activeScenes
      },
      newChooseDate() {
        return this.getNowFormatDay();
      },
      newChooseTime() {
        return this.getNowFormatTime();
      },
    },
    created: function () {
      this.init();
      // 从后台获取所有备选信息
      this.$store.dispatch('LOAD_PRIORITIES');
      this.$store.dispatch('LOAD_PROJECTS');
      this.$store.dispatch('LOAD_SCENES');
    },
    mounted: function () {
      var VM = this
      // materialize-css 初始化方法
//      $('select').material_select()
      $('.chips').material_chip()
      $('.chips-placeholder').material_chip({
        placeholder: '输入并回车继续',
        secondaryPlaceholder: '添加标签'
      })
      $('.chips').on('chip.add', function (e, chip) {
        // you have the added chip here
        console.log("chip.add")
        VM.tags.push({ 'tag': chip.tag })
      })
      $('.chips').on('chip.delete', function (e, chip) {
        // you have the added chip here
        VM.tags = VM.deleteObjectInArray(VM.tags, 'tag', chip.tag)
      })
    },
    methods: {
      toDouble: function (t) {
        var num = t;
        if (typeof t == 'string') {
          num = parseInt(t);
        }
        if (num >= 1 && num <= 9) {
          num = '0' + num;
        }
        return num + '';
      },
      // tools: getInitDay
      getNowFormatDay: function (daySep) {
        var date = new Date();
        var s1 = daySep || "-";
        var year = date.getFullYear();
        var month = this.toDouble(date.getMonth() + 1);
        var day = this.toDouble(date.getDate());
        return year + s1 + month + s1 + day;
      },
      // tools: getInitTime
      getNowFormatTime(hourSep) {
        var date = new Date();
        var s2 = hourSep || ":";
        var hour = this.toDouble(date.getHours());
        var minute = this.toDouble(date.getMinutes());
        var second = this.toDouble(date.getSeconds());
        return hour + s2 + minute + s2 + second;
      },
      init() {
        this.newChoosePriority = { 'priority': -1, 'priorityName': '请选择优先级' };
        this.newChooseProject = { 'projectId': -1, 'projectName': '请选择项目' };
        this.newChooseScene = { 'sceneId': -1, 'sceneName': '请选择场景' };
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
        this.$store.dispatch('ADD_TODO', { 'item': this.newTODOItem }).then(() => {
          this.$router.back()
        })
      },
      setExpectFinishTime (event) {
        console.log('set the setExpectFinishTime');
        this.newChooseTime = event;
      },
      // 设置计划完成的日期
      setExpectedFinishDate (event) {
        console.log('set the setExpectedFinishDate')
        this.newChooseDate = event;
      }
    }
  }
</script>

<style scoped type="text/scss">

</style>
