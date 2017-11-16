<template>
  <div id="app">
    <v-app>
      <page-header/>
      <main>
        <v-container fluid>
          <!--<img src="./assets/logo.png">-->
          <router-view/>
        </v-container>
      </main>
    </v-app>
  </div>
</template>

<script>
  import PageHeader from './components/header/Header.vue';
  export default {
    name: 'app',
    components: {
      PageHeader,
    },
  };
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.error--text{
  color: #ff6161;
}
</style>
