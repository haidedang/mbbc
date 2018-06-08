<template>
  <div class="text">
    <textarea placeholder="Ctrl + Enter" v-model="content" @keyup="onKeyup"></textarea>
  </div>
</template>

<script>
  export default {
    vuex: {},
    data() {
      return {
        content: ''
      };
    },
    methods: {
      onKeyup(e) {
        if (e.ctrlKey && e.keyCode === 13 && this.content.length) {
          this.sendMessage(this.content);
          this.content = '';
        }
      }
    }
  }
</script>

<style scoped lang="less">
  .text {
    height: 160px;
    border-top: solid 1px #ddd;
  textarea {s
    padding: 10px;
    height: 100%;
    width: 100%;
    border: none;
    outline: none;
    resize: none;
  }
  }
</style>
