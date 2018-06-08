<template>
  <div class="d-flex">
    <sidebar></sidebar>
    <conversation></conversation>
  </div>
</template>

<script>
  import Sidebar from '@/components/Sidebar'
  import Conversation from '@/components/Conversation'

  export default {
    components : { Sidebar, Conversation}
  }
</script>

<style scoped>

</style>
