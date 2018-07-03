<template>
  <div id="app">
    <v-app>
      <pageHeader />
      <main>
        <div class="m-0">
          <router-view></router-view>
        </div>
      </main>
    </v-app>
  </div>
</template>

<script>
import PageHeader from '@/components/Header.vue'

export default {
  name: 'app',
  components: {
    PageHeader
  }
}
</script>

<style lang="less">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 10px;
  

  
}
.main {
    overflow: hidden;
    margin-top: 2vh;
  }
  
.danger-alert {
  color: red;
}
</style>
