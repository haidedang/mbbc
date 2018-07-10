<template>
  <v-container>
    <text-area></text-area>
    <list-all></list-all>
  </v-container>
</template>

<script>
  import ListAll from "@/components/MicroBlog/ListAllBlogs"
  import TextArea from "@/components/MicroBlog/TextArea"

  export default {
    components : { ListAll, TextArea }
  }
</script>

<style lang="less" scoped>

</style>
