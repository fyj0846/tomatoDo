<template>
  <div>
    <slot name="sideNav"></slot>
    <div class="header">
      <div class="header-sidenav-btn">
        <a href="#" data-activates="slide-out" class="button-collapse white-text">
          <i class="material-icons ">&#xE8EE;</i>
        </a>
      </div>
      <div class="header-title white-text">
        <span class="title">tomatoDo</span>
      </div>
      <div class="header-add-btn white-text">
        <i class="material-icons" @click="addTodoHandler">&#xE145;</i>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    methods: {
      addTodoHandler (event) {
        console.log('message', 'add todo touched')
        this.$router.push({ path: 'addTodoView' })
      },
      loginOrRegistryHandler (event) {
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
    background-color: #2e9787;
  }
  .header-title {
    flex: 0 0 72%;
    font-size: 2rem;
  }

  .title {
    font-family: Verdana, Geneva, sans-serif;
  }

  .header-sidenav-btn {
    flex: 0 0 15%;
    font-size: 2rem;
  }

  .header-sidenav-btn i, .header-add-btn  i {
    display: block;
    font-size: 2.5rem;
  }
</style>
