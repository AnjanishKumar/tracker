<template>
  <v-toolbar class="cyan" fixed>
    <v-toolbar-title
      class="mr-2 home"
      @click="navigateTo({name: 'home'})"
    >
      Tracker
    </v-toolbar-title>
    <v-toolbar-items>
      <v-btn flat dark>Browse</v-btn>
    </v-toolbar-items>
    <v-spacer></v-spacer>

    <v-toolbar-items>
        <v-btn
          flat
          dark
          v-if="!$store.state.isUserLoggedIn"
          @click="navigateTo({name: 'login'})"
        >
          Login
        </v-btn>

        <v-btn
          flat
          dark
          v-if="!$store.state.isUserLoggedIn"
          @click="navigateTo({name: 'register'})"
        >
          Sign up
        </v-btn>
      <v-btn
        flat
        dark
        v-if="$store.state.isUserLoggedIn"
        @click="logout"
      >
        Logout
      </v-btn>
    </v-toolbar-items>
  </v-toolbar>
</template>

<script>
  export default {
    name: 'Header',
    data() {
      return {

      };
    },

    methods: {
      navigateTo(route) {
        this.$router.push(route);
      },

      logout() {
        // TODO: send logout request to server
        // to clear out the token on server
        this.$store.dispatch('logout');
        this.$router.push({name: 'home'});
      },
    },

    watch: {

    },

    mounted() {
        console.log(this.$options.name, ' mounted');
    },
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.home{
  cursor: pointer;
}
</style>
