<template>
  <v-container>
  <v-layout column>
    <v-flex xs10 offset-xs1>
      <div class="white elevation-2">
        <v-toolbar class="cyan" flat dense dark>
          <v-toolbar-title>Login</v-toolbar-title>
        </v-toolbar>
        <div class="pl-4 pr-4 pt-2 pb-2">
          <!-- TODO: fix the lazy validation issue-->
          <v-form v-model="valid" ref="form" lazy-validation>
            <v-text-field
              name="email"
              label="Email"
              v-model="email"
              :rules="rules.email"
              required
            ></v-text-field>

            <v-text-field
              name="password"
              label="Password"
              v-model="password"
              :rules="rules.password"
              min="8"
              :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
              :append-icon-cb="() => (showPassword = !showPassword)"
              :type="showPassword ? 'text' : 'password'"
              required
            ></v-text-field>
            <v-btn
              @click="login"
              :disabled="!valid"

            >
              Login
            </v-btn>
            <div v-html="error"></div>
          </v-form>
        </div>
      </div>
    </v-flex>
  </v-layout>
  </v-container>
</template>

<script>
  import AuthenticationService from '@/services/AuthenticationService';
  export default {
    name: 'Login',
    data() {
      return {
        email: '',
        password: '',
        valid: false,
        loading: false,
        error: null,
        showPassword: false,
        rules: {
          email: [
            (value) => !!value || 'Email is required.',
            (value) => {
              console.log('validating email', value);
              let emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
              return emailRegex.test(value) ||'Please enter a valid Email ID';
            },
          ],
          password: [
            (value) => !!value || 'Please enter Password',
          ],
        },
      };
    },

    methods: {
      async login() {
        if (this.$refs.form.validate()) {
          this.loading = true;
          this.valid = false;

          try {
            const res = await AuthenticationService.login({
              email: this.email,
              password: this.password,
            });

            this.valid = true;
            this.loading = false;
            this.$store.dispatch('setToken', res.data.token);
            this.$store.dispatch('setUser', res.data.user);
            console.log(res);
            // TODO: save the session detail in session store
            this.$router.push({name: 'home'});
          } catch (err) {
            this.loading = false;
            this.valid = true;
            let errorType = err.response.status;
            if (errorType === 400 || errorType === 422
              || errorType === 403) {
              let data = err.response.data;
              // hack to display server error
              this.rules.email.push(() => data.error.message);
              this.$refs.form.validate();
              this.rules.email.pop();
            } else {
              // TODO: display other error message properly
              this.error = err.response.data.error.message;
            }
          }
        }
      },
    },
    mounted() {
      // TODO: if user is already logged in redirect to home page
      // or intended url
      console.log(this.$options.name, ' mounted');
    },
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
