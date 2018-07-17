<template>
  <div class="d-flex">
  <v-container id="Blog">
    <text-area></text-area>
    <list-all></list-all>
  </v-container>
  </div>
</template>

<script>
  import ListAll from "@/components/MicroBlog/ListAllBlogs"
  import TextArea from "@/components/MicroBlog/TextArea"

  export default {
    components : { ListAll, TextArea }
  }
</script>

<style lang="less" scoped>
/* #Blog{
  z-index:-1;
} */
</style>
