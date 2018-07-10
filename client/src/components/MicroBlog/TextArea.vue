<template>
    <v-layout row wrap>
        <v-flex xs12>
            <textarea
            rows="5"
            cols="75"
            maxlength="250"
            placeholder="Blog here" 
            v-model="input" 
            @keydown.enter="postBlog">
            </textarea>
        </v-flex>
    </v-layout>
</template>

<script>
export default {
    data() {
        content: ''
    },
    methods: {
        async postBlog() {
            this.sendTweet(this.input)
            this.content=''
        }
    }

}
</script>
<style>
textarea{
    border-style: solid;
    border-width: 2px;
    border-color: #43A047;
}
</style>
