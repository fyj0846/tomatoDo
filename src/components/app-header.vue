<template>
  <div>
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


</style>
