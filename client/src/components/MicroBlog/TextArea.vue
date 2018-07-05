<template>
    <v-layout>
        <div class="tweetBox">
            <textarea v-model="content" @keyup="keyUp">Blog here ...</textarea>
        </div>
        <v-btn color="green darken-1">Submit</v-btn>
    </v-layout>
</template>

<script>
export default {
    data() {
        content: ''
    },
    methods: {
        keyUp(e) {
            this.sendTweet(this.content)
            this.content=''
        }
    }

}
</script>

<style>
    .tweetBox{
        border:darkgreen;
    }
</style>
