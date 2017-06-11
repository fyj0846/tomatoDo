<template>
  <div class="page-view">
    <div class="page-header header page-header-background page-header-text">
      <div class="cancel" @click="cancelHandler"> 取消</div>
      <div class="save row-padding-10" @click=""> 保存</div>
    </div>
    <div class="page-content row">
      <ul class="collapsible popout itemList" data-collapsible="accordion">
        <template v-for="scene in activeScenes">
          <li>
            <div class="collapsible-header">
              <div>
                <i class="material-icons">place</i>
                {{ scene.sceneName }}
              </div>
              <i class="material-icons delete" v-on:click.stop="deleteItem(scene.sceneId)">delete</i>
            </div>
            <div class="collapsible-body"><span> {{ scene.sceneDesc }}</span></div>
          </li>
        </template>
      </ul>
      <div id="addItem" class="modal">
        <div class="modal-content">
          <h4>新建项目</h4>
          <p>项目是您项目的项目的项目啊，这个还要解释吗</p>
          <div class="row">
            <div class="input-field col s12">
              <input placeholder="项目名称" id="sceneName" type="text" class="validate" v-model="sceneName">
              <label for="sceneName"></label>
            </div>
            <div class="input-field col s12">
              <textarea id="sceneDesc" placeholder="项目描述" class="materialize-textarea" v-model="sceneDesc"></textarea>
              <label for="sceneDesc"></label>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <a class="modal-action modal-close waves-effect waves-green btn-flat" v-on:click="saveItem">保存</a>
          <a class="modal-action modal-close waves-effect waves-green btn-flat">取消</a>
        </div>
      </div>
      <a class="btn-floating waves-effect waves-light floatAddBtn" href="#addItem" v-on:click="clearItem"><i class="material-icons">add</i></a>
    </div>
  </div>
</template>

<script>
  // 引入公共CSS
  require('../assets/css/common.css')
  import $ from 'jquery'

  export default {
    data () {
      return {
        sceneId: '',
        sceneName: '',
        sceneDesc: ''
      }
    },
    computed: {
      newItem () {
        return {
          sceneId: this.sceneId,
          sceneName: this.sceneName,
          sceneDesc: this.sceneDesc
        }
      },
      // 已配置scenes对象
      activeScenes () {
        return this.$store.getters.activeScenes
      }
    },
    methods: {
      // 取消
      cancelHandler (event) {
        console.log('cancel and go back!')
        this.$router.back()
      },
      log () {
        console.log('delete')
      },
      saveItem () {
        console.log('save new item')
        this.$store.dispatch('ADD_SCENE', {item: this.newItem})
      },
      deleteItem (id) {
        console.log('delete item')
        this.$store.dispatch('DELETE_SCENE', {id: id})
      },
      clearItem () {
        this.sceneName = ''
        this.sceneId = ''
        this.sceneDesc = ''
      }
    },
    mounted () {
      $('#sidenav-overlay').remove()
      $('.modal').modal()
      $('.collapsible').collapsible()

      this.$store.dispatch('LOAD_SCENES')
    }
  }
</script>

<style scoped>
  .itemList {
    display: flex;
    flex-direction: column;
    width: 90%;
    margin-left: 5%;
    margin-top: 30%;
  }

  .collapsible-header {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }

  .floatAddBtn {
    position: fixed;
    bottom: 10%;
    right: 15%;
  }
</style>
