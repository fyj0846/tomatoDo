<template>
  <div class="page-view" append="tree">
    <div class="page-header">
      <div class="cancel" @click="cancelNewTodoHandler"> 取消</div>
      <div class="title"></div>
      <div class="save" @click="saveNewTodoHandler"> 保存</div>
    </div>
    <div class="page-content row">
      <form class="col s12">
        <!--<div class="loading row"> &lt;!&ndash; v-if="loading" &ndash;&gt;-->
        <!--Loading...-->
        <!--</div>-->
        <div class="row">
          <div class="input-field col s12">
            <input placeholder="标题" id="todoTitle" type="text" class="validate" v-model="curEditTodo.todoTitle">
            <label for="todoTitle">标题</label>
          </div>
          <div class="input-field col s12">
            <textarea placeholder="请输入描述信息" id="describe" class="materialize-textarea" v-model="curEditTodo.todoDescribe"></textarea>
            <label for="describe">描述</label>
          </div>
        </div>
        <div class="row">
          <div class="input-field col s12">
            <input placeholder="所需番茄钟" id="expectClock" type="text" class="validate" v-model="curEditTodo.expectClock">
            <label for="expectClock">时长</label>
          </div>
        </div>
        <div class="row">
            <!--<select v-select="newChoosePriority">-->
            <!--<option value="" disabled>请选择优先级</option>-->
            <!--<template v-for="star in stars">-->
            <!--<option v-if="star == newChoosePriority" :value="star" selected> {{ star }}星</option>-->
            <!--<option v-else :value="star"> {{ star }}星</option>-->
            <!--</template>-->
            <!--</select>-->
          <div class="col s12">
            <v-select v-model="newChoosePriority" :options="activePriorities" label="priorityName"></v-select>
            <!--<label>优先级</label>-->
          </div>
        </div>
        <div class="row">
          <!--  通过自定义事件，完成父子组件的通信 -->
          <DatePicker class="col s6" title="选择日期" :propDate='newChooseDate'
                      v-on:updateSelectedDate="setExpectedFinishDate"></DatePicker>
          <!--  通过自定义事件，完成父子组件的通信 -->
          <TimePicker class="col s6" title="选择时间" :propDate='newChooseDate' :propTime='newChooseTime'
                      v-on:updateSelectedTime="setExpectFinishTime"></TimePicker>
        </div>
        <div class="row">
          <div class=" col s12">
            <v-select v-model="newChooseProject" :options="activeProjects" label="projectName"></v-select>
            <!--<label>项目</label>-->
          </div>
        </div>
        <div class="row">
          <div class=" col s12">
            <v-select v-model="newChooseScene" :options="activeScenes" label="sceneName"></v-select>
            <!--<label>场景</label>-->
          </div>
        </div>
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
    components: {TimePicker, DatePicker},
    data: function () {
      return {
        'loading': true,
        'stars': '',
        'newChoosePriority': '',
        'newChooseProject': '',
        'newChooseScene': '',
        'newChooseTag': '',
        'newChooseDate': '',
        'newChooseTime': '',
        'tags': []
      }
    },
    computed: {
      // 当前编辑的todo对象
      curEditTodo () {
        return this.$store.getters.curEditTodo
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

      // 新任务对象
      updatedTODOItem () {
        return {
          'todoTitle': this.curEditTodo.todoTitle,
          'todoId': this.curEditTodo.todoId,
          'todoDescribe': this.curEditTodo.todoDescribe,
          'priority': this.newChoosePriority.priority,  // 用于更新关联的project
          'expectClock': this.curEditTodo.expectClock,
          'expectFinishTime': this.newChooseDate + " " + this.newChooseTime,
          'spentClock': this.curEditTodo.spentClock,
          'tags': this.updatedTags,
          'isFinished': this.curEditTodo.isFinished,
          'isDelete': this.curEditTodo.isDelete,
          'projectId': this.newChooseProject.projectId,  // 用于更新关联的project
          'sceneId': this.newChooseScene.sceneId,        // 用于更新关联的scene
        }
      },

      updatedTags () {
        return this.tags.map(function (item) {return item.tag;}).join(";")
      }
    },
    created: function () {
      // 从后台获取todo信息（含projectId, projectName等），同时获取所有的备选信息
      this.$store.dispatch('LOAD_TODO', {id: this.$route.params.todoId}).then(() => {
        this.init();
      });

      // 从后台获取所有备选信息
//      this.$store.dispatch('LOAD_PRIORITIES');
//      this.$store.dispatch('LOAD_PROJECTS');
//      this.$store.dispatch('LOAD_SCENES');
//      this.$store.dispatch('LOAD_TAGS');
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
        VM.tags.push({'tag' : chip.tag})
      })
      $('.chips').on('chip.delete', function (e, chip) {
        // you have the added chip here
        VM.tags = VM.deleteObjectInArray(VM.tags, 'tag', chip.tag)
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

      // 状态初始化
      init () {
        this.newChoosePriority = {'priority': this.curEditTodo.priority, 'priorityName':this.curEditTodo.priority};
        this.newChooseProject = {'projectId': this.curEditTodo.projectId, 'projectName': this.curEditTodo.projectName};
        this.newChooseScene = {'sceneId': this.curEditTodo.sceneId, 'sceneName': this.curEditTodo.sceneName};
        this.newChooseDate = this.curEditTodo.expectFinishTime ? this.curEditTodo.expectFinishTime.split(' ')[0] : "";
        this.newChooseTime = this.curEditTodo.expectFinishTime ? this.curEditTodo.expectFinishTime.split(' ')[1] : "";
        this.tags = this.curEditTodo.tags.split(";").map(function(item) {
          return {'tag': item};
        });

        $('.chips-initial').material_chip({
          data: this.tags
        })
      },
      // 取消新任务
      cancelNewTodoHandler (event) {
        console.log('editTodoView: cancel and go back!')
        this.$router.back()
      },
      // 保存新任务
      saveNewTodoHandler (event) {
        console.log('editTodoView: save and update todo')
        // 触发更新任务，需要更新tag表中的tagName序列
        this.$store.dispatch('UPDATE_TODO', {'item': this.updatedTODOItem}).then(() => {
          this.$router.back();
        })
      },
      setExpectFinishTime (event) {
        console.log('set the setExpectFinishTime: ' + event);
        this.newChooseTime = event;
      },
      // 设置计划完成的日期
      setExpectedFinishDate (event) {
        console.log('set the setExpectedFinishDate: ' +event)
        this.newChooseDate = event;
      }
    }
  }
</script>

<style scoped type="text/scss">

</style>
