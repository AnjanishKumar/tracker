<template>
  <v-container>
  <v-layout column>
    <v-flex xs10 offset-xs1>
      <div class="white elevation-2">
        <v-toolbar class="cyan" flat dense dark>
          <v-toolbar-title>Register</v-toolbar-title>
        </v-toolbar>
        <div class="pl-4 pr-4 pt-2 pb-2">
          <v-alert v-if="error" outline color="error" icon="warning" :value="true">
            {{error}}
          </v-alert>
          <!-- TODO: fix the lazy validation issue-->
          <v-form v-model="valid" ref="form" lazy-validation>
            <v-text-field
              name="email"
              label="Email"
              autocomplete="off"
              hint="Enter your email address"
              v-model="email"
              :rules="rules.email"
              required
            ></v-text-field>

            <v-text-field
              name="password"
              label="Password"
              autocomplete="off"
              hint="Enter password"
              v-model="password"
              :rules="rules.password"
              min="8"
              :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
              :append-icon-cb="() => (showPassword = !showPassword)"
              :type="showPassword ? 'text' : 'password'"
              required
            ></v-text-field>

            <v-text-field
              name="confirmPassword"
              label="Confirm Password"
              autocomplete="off"
              v-model="confirmPassword"
              :rules="rules.confirmPassword"
              :append-icon="showConfirmPassword ? 'mdi-eye' : 'mdi-eye-off'"
              :append-icon-cb="() => (showConfirmPassword = !showConfirmPassword)"
              :type="showConfirmPassword ? 'text' : 'password'"
              required
            ></v-text-field>
            <v-btn
              class="cyan"
              @click="register"
              :disabled="!valid"
            >
              submit
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
    name: 'Register',
    data() {
      return {
        email: '',
        password: '',
        confirmPassword: '',
        valid: false,
        loading: false,
        error: null,
        showPassword: false,
        showConfirmPassword: false,
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
            (value) => {
              return value.length >= 8 ||
                'Password must be at least 8 character long.';
            },
          ],
          confirmPassword: [
            (value) => !!value || 'Password Confirmation is required',
            (value) => {
              return value === this.password ||
                'Password confirmation don\'t match';
            },
          ],
        },
      };
    },

    methods: {
      async register() {
        if (this.$refs.form.validate()) {
          this.loading = true;
          this.valid = false;
          this.error=null;

          try {
            const res = await AuthenticationService.register({
              email: this.email,
              password: this.password,
              confirmPassword: this.confirmPassword,
            });

            this.valid = true;
            this.loading = false;
            this.error = res.data;
            // TODO: display next step after registration is successful
            console.log(res, res.data);
          } catch (err) {
            this.loading = false;
            let errorType = err.response.status;

            if (errorType === 400 || errorType === 422) {
              let data = err.response.data;
              data.error.details.forEach((error) => {
                // hack to display server validation error
                this.rules[error.key].push(() => error.message);
                this.$refs.form.validate();
                this.rules[error.key].pop();
              });
            } else {
              this.error = err.response.data.error.message;
            }
          }
        }
      },
    },
    mounted() {
      console.log(this.$options.name, ' mounted');
    },
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.error{
  color: #f00;
}
</style>
