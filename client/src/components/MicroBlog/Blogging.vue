<template>
  <!--<v-container>
    <v-layout>
        <ul v-for="article in blog" :key="article.id">
          <li>
            <v-flex>
              <v-card>
                <v-card-title>
                  <h3 class="mb-0">{{ article.userID }}</h3>
                  <div class="mt-0">
                    <p class="timestamp">{{ article.timestamp }}</p>
                    <p class="mt-2"> {{ article.content }} </p>
                  </div>
                </v-card-title>
              </v-card>
            </v-flex>
          </li>
        </ul>
    </v-layout>
  </v-container> -->
  <v-container>
    <text-area></text-area>
    <list-all></list-all>
  </v-container>
</template>

<script>
  import ListAll from "@/components/MicroBlog/ListAllBlogs"
  import TextArea from "@/components/MicroBlog/TextArea"

  export default {
    components : { ListAll, TextArea}
  }
</script>

<style lang="less" scoped>

</style>
