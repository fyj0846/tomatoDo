<template>
  <div class="page-view">
    <div class="page-header header page-header-background page-header-text">
      <div class="cancel" @click="goBackHandler"> 返回</div>
      <!--<div class="save row-padding-10" @click=""> 保存</div>-->
    </div>
    <div class="page-content">
      <ul class="collapsible  itemList" data-collapsible="accordion">
        <template v-for="project in activeProjects">
          <li>
            <div class="collapsible-header">
              <div>
                <i class="material-icons">place</i>
                {{ project.projectName }}
              </div>
              <div>
                <span class="badge red" v-text="project_todos_count(project_activeTodos_rel, project.projectId)"></span>
                <span class="badge grey" v-text="project_todos_count(project_allTodos_rel, project.projectId)"></span>
              </div>
            </div>
            <div class="collapsible-body">
              <div class="body-describe"><span> {{ project.projectDescribe }}</span></div>
              <div class="body-tools">
                <span class="material-icons delete" v-on:click.stop="editItem(project)">edit</span>
                <span class="material-icons delete"
                      v-bind:class='{disabled: project_todos_count(project_activeTodos_rel, project.projectId)}'
                      v-on:click.stop="deleteItem(project)">delete
                </span>
              </div>
            </div>
          </li>
        </template>
      </ul>
      <div id="addItem" class="modal">
        <div class="modal-header">
          新建项目
        </div>
        <div class="modal-content">
          <div class="input-field ">
            <input placeholder="项目名称" id="projectName" type="text" class="validate" v-model="projectName">
            <label for="projectName"></label>
          </div>
          <div class="input-field ">
            <textarea id="projectDesc" placeholder="项目描述" class="materialize-textarea"
                      v-model="projectDescribe"></textarea>
            <label for="projectDesc"></label>
          </div>
        </div>
        <div class="modal-footer">
          <a class="modal-action modal-close waves-effect active btn-flat">取消</a>
          <a class="modal-action modal-close waves-effect active btn-flat" v-on:click="saveItem('add')">保存</a>
        </div>
      </div>
      <div id="editItem" class="modal">
        <div class="modal-header">
          编辑项目
        </div>
        <div class="modal-content">
          <div class="input-field ">
            <input placeholder="项目名称" id="projectName2" type="text" class="validate" v-model="projectName">
            <label for="projectName2"></label>
          </div>
          <div class="input-field ">
            <textarea id="projectDesc2" placeholder="项目描述" class="materialize-textarea"
                      v-model="projectDescribe"></textarea>
            <label for="projectDesc2"></label>
          </div>
        </div>
        <div class="modal-footer">
          <a class="modal-action modal-close waves-effect btn-flat">取消</a>
          <a class="modal-action modal-close waves-effect active btn-flat" v-on:click="saveItem('update')">保存</a>
        </div>
      </div>
      <a class="btn-floating waves-effect waves-light floatAddBtn" href="#addItem" v-on:click="clearItem"><i
        class="material-icons">add</i></a>
    </div>
  </div>
</template>

<script>
  // 引入公共CSS
  //  require('../assets/css/common.scss')
  import $ from 'jquery'

  export default {
    data () {
      return {
        projectId: '',
        projectName: '',
        projectDescribe: ''
      }
    },
    computed: {
      newItem () {
        return {
          projectId: this.projectId,
          projectName: this.projectName,
          projectDescribe: this.projectDescribe
        }
      },
      // 已配置projects对象
      activeProjects () {
        return this.$store.getters.activeProjects
      },
      // 已关联的todo数量
      allTodos () {
        return this.$store.getters.allTodos
      },
      // 活跃的todo数量
      activeTodos () {
        return this.$store.getters.activeTodos
      },
      project_allTodos_rel () {
        var tmp1 = {}
        for (var todo1 in this.allTodos) {
          if (tmp1[this.allTodos[todo1].projectId] == null) {
            tmp1[this.allTodos[todo1].projectId] = []
            tmp1[this.allTodos[todo1].projectId].push(this.allTodos[todo1].todoId)
          } else {
            tmp1[this.allTodos[todo1].projectId].push(this.allTodos[todo1].todoId)
          }
        }
        return tmp1
      },
      project_activeTodos_rel () {
        var tmp2 = {}
        for (var todo2 in this.activeTodos) {
          if (tmp2[this.activeTodos[todo2].projectId] == null) {
            tmp2[this.activeTodos[todo2].projectId] = []
            tmp2[this.activeTodos[todo2].projectId].push(this.activeTodos[todo2].todoId)
          } else {
            tmp2[this.activeTodos[todo2].projectId].push(this.activeTodos[todo2].todoId)
          }
        }
        return tmp2
      }
    },
    methods: {
      // 返回
      goBackHandler (event) {
        console.log('cancel and go back!')
        this.$router.back()
      },
      log () {
        console.log('delete')
      },
      project_todos_count (list, obj) {
        if (list != null && list[obj] != null) {
          return list[obj].length
        } else {
          return 0
        }
      },
      saveItem (type) {
        console.log('save new item')
        if (type == 'add') {
          this.$store.dispatch('ADD_PROJECT', {item: this.newItem})
        } else if (type == 'update') {
          this.$store.dispatch('UPDATE_PROJECT', {item: this.newItem})
        }
      },
      editItem (project) {
        console.log('edit item')
        this.projectId = project.projectId
        this.projectName = project.projectName
        this.projectDescribe = project.projectDescribe
        $('#editItem').modal('open');
      },
      deleteItem (project) {
        console.log('delete item')
        if (this.project_todos_count(this.project_activeTodos_rel, project.projectId)) {
          console.log('还有未完成的任务，项目无法删除')
          return
        }
        project.isDelete = 'T';
        this.$store.dispatch('DELETE_PROJECT', {item: project})
      },
      clearItem () {
        this.projectName = ''
        this.projectId = ''
        this.projectDescribe = ''
      }
    },
    mounted () {
      $('#sidenav-overlay').remove()
      $('.modal').modal()
      $('.collapsible').collapsible()
    },
    created () {
      this.$store.dispatch('LOAD_PROJECTS')
      this.$store.dispatch('LOAD_TODOS')
    }
  }
</script>

<style scoped type="text/scss">
  /*.itemList {*/
  /*display: flex;*/
  /*flex-direction: column;*/
  /*width: 96%;*/
  /*margin-left: 2%;*/
  /*margin-top: 20%;*/
  /*}*/

  /*.collapsible-header {*/
  /*display: flex;*/
  /*flex-direction: row;*/
  /*justify-content: space-between;*/
  /*background-color: #F5f5f5;*/
  /*}*/

  /*.collapsible-header span.badge {*/
  /*!*min-width: auto;*!*/
  /*border-radius: 60%;*/
  /*color: white;*/
  /*}*/

  /*.collapsible-body {*/
  /*display: flex;*/
  /*flex-direction: row;*/
  /*justify-content: space-between;*/
  /*padding: 1rem;*/
  /*}*/

  /*.collapsible-body .body-tools {*/
  /*display: flex;*/
  /*align-items: center;*/
  /*}*/

  /*.collapsible-body .body-tools .material-icons {*/
  /*padding: 0 6px;*/
  /*}*/

  /*.collapsible-body .body-describe {*/
  /*display: flex;*/
  /*flex: 0 0 80%;*/
  /*align-items: center;*/
  /*}*/

  /*!*.collapsible-body div:nth-child(2) {*!*/
  /*!*!*flex: 4;*!*!*/
  /*!*}*!*/

  /*!*.collapsible-body div:nth-child(1) {*!*/
  /*!*margin-left: 75%;*!*/
  /*!*margin-bottom: 5px;*!*/
  /*!*}*!*/

  /*.collapsible-body div:nth-child(1) span {*/
  /*margin: 0 3px;*/
  /*}*/

  /*.floatAddBtn {*/
  /*position: fixed;*/
  /*bottom: 10%;*/
  /*right: 15%;*/
  /*}*/
  /*.disabled {*/
  /*color: #ccc;*/
  /*}*/
</style>
