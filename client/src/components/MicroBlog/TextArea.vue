<template>
    <v-layout>
        <v-flex>
          <div class="text">
            <textarea placeholder="Blog Here .." autofocus v-model="input" @keyup.enter.native="postBlog"></textarea>
         </div>    
        </v-flex>
    </v-layout>
</template>

<script>
export default {
    data() {
        input: ''
    },
    methods: {
        async postBlog(event) {
            event.preventDefault();
            console.log("You Pressed Enter")
            //this.sendTweet(this.input)
            //this.input=''
        }
    }

}
</script>
<style lang="less">
  .text {
    height: 160px;
    margin-bottom:1vh;
  textarea {
    padding: 2vh;
    height: 100%;
    width: 70%;
    border-style: solid;
    border-width: 2px;
    border-color: #43A047;
    outline: none;
    resize: none;
  }
  }
</style>
