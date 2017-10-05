<template>
  <div class="page-view">
    <div class="page-header">
      <div class="cancel" @click="goBackHandler"> 返回</div>
      <div class="title"></div>
      <div class="save"></div>
    </div>
    <div class="page-content ">
      <div class="managerList">
        <ul class="collapsible  itemList" data-collapsible="accordion">
          <template v-for="scene in activeScenes">
            <li>
              <div class="collapsible-header">
                <div>
                  <i class="material-icons">place</i>
                  {{ scene.sceneName }}
                </div>
                <div>
                  <span class="badge red" v-text="scene_todos_count(scene_activeTodos_rel, scene.sceneId)"></span>
                  <span class="badge grey" v-text="scene_todos_count(scene_allTodos_rel, scene.sceneId)"></span>
                </div>
              </div>
              <div class="collapsible-body">
                <div class="body-describe"><span> {{ scene.sceneDescribe }}</span></div>
                <div class="body-tools">
                  <span class="material-icons delete" v-on:click.stop="editItem(scene)">edit</span>
                  <span class="material-icons delete"
                        v-bind:class='{disabled: scene_todos_count(scene_activeTodos_rel, scene.sceneId)}'
                        v-on:click.stop="deleteItem(scene)">delete
                </span>
                </div>
              </div>
            </li>
          </template>
        </ul>
      </div>
      <div id="addItem" class="modal">
        <div class="modal-header">新建场景</div>
        <div class="modal-content">
          <div class="input-field ">
            <input placeholder="输入场景名称" id="sceneName" type="text" class="validate" v-model="sceneName"
                   name="sceneName" :class="{'input': true, 'is-danger': errors.has('sceneName') }"
                   v-validate="'required|max:12'">
            <span v-show="errors.has('sceneName')" class="help is-danger">{{ errors.first('sceneName') }}</span>
            <!--<label for="sceneName"></label>-->
          </div>
          <div class="input-field ">
              <textarea id="sceneDesc" placeholder="输入场景描述" class="materialize-textarea"
                        v-model="sceneDescribe"
                        name="sceneDescribe" :class="{'input': true, 'is-danger': errors.has('sceneDescribe') }"
                        v-validate="'required|max:60'"
              ></textarea>
            <span v-show="errors.has('sceneDescribe')" class="help is-danger">{{ errors.first('sceneDescribe') }}</span>
            <!--<label for="sceneDesc"></label>-->
          </div>
        </div>
        <div class="modal-footer">
          <a class="modal-action modal-close waves-effect active btn-flat">取消</a>
          <a class="modal-action modal-close waves-effect active btn-flat"
             :class="{'disabled': errors.any()}"
             v-on:click="saveItem('add')">保存</a>
        </div>
      </div>
      <div id="editItem" class="modal">
        <div class="modal-header">编辑场景</div>
        <div class="modal-content">
          <div class="input-field ">
            <input placeholder="输入场景名称" id="sceneName2" type="text" class="validate" v-model="sceneName"
                   name="sceneNameEdit" :class="{'input': true, 'is-danger': errors.has('sceneNameEdit') }"
                   v-validate="'required|max:12'">
            <span v-show="errors.has('sceneNameEdit')" class="help is-danger">{{ errors.first('sceneNameEdit') }}</span>
            <!--<label for="sceneName2"></label>-->
          </div>
          <div class="input-field ">
              <textarea id="sceneDesc2" placeholder="输入场景描述" class="materialize-textarea"
                        v-model="sceneDescribe"
                        name="sceneDescribeEdit" :class="{'input': true, 'is-danger': errors.has('sceneDescribeEdit') }"
                        v-validate="'required|max:60'"
              ></textarea>
            <span v-show="errors.has('sceneDescribeEdit')" class="help is-danger">{{ errors.first('sceneDescribeEdit') }}</span>

          </div>
        </div>
        <div class="modal-footer">
          <a class="modal-action modal-close waves-effect btn-flat">取消</a>
          <a class="modal-action modal-close waves-effect active btn-flat"
             :class="{'disabled': errors.any()}"
             v-on:click="saveItem('update')">保存</a>
        </div>
      </div>
      <a class="btn-floating waves-effect waves-light floatAddBtn" href="#addItem" v-on:click="clearItem"><i
        class="material-icons">add</i></a>
    </div>
  </div>
</template>

<script>
  import $ from 'jquery'

  export default {
    data () {
      return {
        sceneId: '',
        sceneName: '',
        sceneDescribe: ''
      }
    },
    computed: {
      newItem () {
        return {
          sceneId: this.sceneId,
          sceneName: this.sceneName,
          sceneDescribe: this.sceneDescribe
        }
      },
      // 已配置scenes对象
      activeScenes () {
        return this.$store.getters.activeScenes
      },
      // 已关联的todo数量
      allTodos () {
        return this.$store.getters.allTodos
      },
      // 活跃的todo数量
      activeTodos () {
        return this.$store.getters.activeTodos
      },
      scene_allTodos_rel () {
        var tmp1 = {}
        for (var todo1 in this.allTodos) {
          if (tmp1[this.allTodos[todo1].sceneId] == null) {
            tmp1[this.allTodos[todo1].sceneId] = []
            tmp1[this.allTodos[todo1].sceneId].push(this.allTodos[todo1].todoId)
          } else {
            tmp1[this.allTodos[todo1].sceneId].push(this.allTodos[todo1].todoId)
          }
        }
        return tmp1
      },
      scene_activeTodos_rel () {
        var tmp2 = {}
        for (var todo2 in this.activeTodos) {
          if (tmp2[this.activeTodos[todo2].sceneId] == null) {
            tmp2[this.activeTodos[todo2].sceneId] = []
            tmp2[this.activeTodos[todo2].sceneId].push(this.activeTodos[todo2].todoId)
          } else {
            tmp2[this.activeTodos[todo2].sceneId].push(this.activeTodos[todo2].todoId)
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
      scene_todos_count (list, obj) {
        if (list != null && list[obj] != null) {
          return list[obj].length
        } else {
          return 0
        }
      },
      saveItem (type) {
        console.log('save new item')
        if (type == 'add') {
          this.$store.dispatch('ADD_SCENE', {item: this.newItem})
        } else if (type == 'update') {
          this.$store.dispatch('UPDATE_SCENE', {item: this.newItem})
        }
      },
      editItem (scene) {
        console.log('edit item')
        this.sceneId = scene.sceneId
        this.sceneName = scene.sceneName
        this.sceneDescribe = scene.sceneDescribe
        $('#editItem').modal('open');
      },
      deleteItem (scene) {
        console.log('delete item')
        if (this.scene_todos_count(this.scene_activeTodos_rel, scene.sceneId)) {
          console.log('还有未完成的任务，场景无法删除')
          return
        }
        scene.isDelete = 'T';
        this.$store.dispatch('DELETE_SCENE', {item: scene})
      },
      clearItem () {
        this.sceneName = ''
        this.sceneId = ''
        this.sceneDescribe = ''
      }
    },
    mounted () {
      $('.collapsible').collapsible()
      $('#sidenav-overlay').remove()
      $('.modal').modal()
    },
    created () {
      this.$store.dispatch('LOAD_SCENES')
      this.$store.dispatch('LOAD_TODOS')
    }
  }
</script>

<style scoped type="text/scss">
  .page-view {
    .page-content {
      .floatAddBtn {
        position: fixed;
        bottom: 10%;
        right: 15%;
      }
    }
  }
</style>
