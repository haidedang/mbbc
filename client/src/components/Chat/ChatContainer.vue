<template>
  <div class="d-flex">
    <sidebar class="contacts"></sidebar>
    <conversation></conversation>
  </div>
</template>

<script>
  import Sidebar from '@/components/Chat/Sidebar'
  import Conversation from '@/components/Chat/Conversation'

  export default {
    components : { Sidebar, Conversation}
  }
</script>

<style scoped>
.contacts{
  max-width: 33vh;
}
</style>
