<template>
  <div>
    <slot name="sideNav"></slot>
    <div class="header">
      <div class="header-sidenav-btn">
        <a href="#" data-activates="slide-out" class="button-collapse white-text">
          <i class="material-icons ">view_headline</i>
        </a>
      </div>
      <div class="header-title white-text" @click="jump('/')">
        <span class="title">tomatoDo</span>
      </div>
      <div class="header-add-btn white-text">
        <i class="material-icons" @click="openAddTodo()">add</i>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    methods: {
      openAddTodo (event) {
        console.log('message', 'add touched')
      },
      handleLoginOrRegistry (event) {
        console.log('message', 'please login or registry')
      }
    }
  }
</script>

<style scoped>
  .header {
    font-size: 16px;
    height: 80px;
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
    background-color: #42b983;
  }
  .header-title {
    flex: 0 0 70%;
    font-size: 2rem;
  }

  .title {
    font-family: Verdana, Geneva, sans-serif;
  }

  .header-sidenav-btn {
    flex: 0 0 20%;
    font-size: 2rem;
  }

  .header-sidenav-btn i, .header-add-btn  i {
    display: block;
    font-size: 2.5rem;
  }
</style>
