<template>
  <div>
    <slot name="sideNav"></slot>
    <div class="page-header">
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

  .header-title {
    flex: 0 0 72%;
    font-size: 1.2rem;
  }

  .header-sidenav-btn {
    font-size: 1.4rem;
    padding-left: 8px;
  }

  .header-sidenav-btn i, .header-add-btn  i {
    display: block;
    font-size: 1.4rem;
    padding-right: 8px;
  }
</style>
