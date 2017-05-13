<template>
  <div>
    <router-view style="flex:1"></router-view>
  </div>
</template>

<script>
  export default {
    methods: {
      // 路由回退demo
      back: function () {
        this.$router.back()
      }
    }
  }
</script>
