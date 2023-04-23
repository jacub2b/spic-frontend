<template>
  <h1 class="text-h3 text-center mt-5">Register</h1>

  <v-row justify="center" class="mt-5">
    <v-col cols="4">
      <v-form @submit.prevent="" v-model="valid">
        <v-text-field
          v-model="username"
          label="Username"
          :rules="usernameRules"
        ></v-text-field>

        <v-text-field
          v-model="password"
          label="Password"
          :rules="passwordRules"
          type="password"
        ></v-text-field>

        <v-text-field
          v-model="repeatPassword"
          label="RepeatPassword"
          :rules="repeatPasswordRules"
          type="password"
        ></v-text-field>

        <v-text-field
          v-model="email"
          label="Email"
          :rules="emailRules"
        ></v-text-field>

        <v-btn
          type="submit"
          block
          class="mt-2"
          @click="handleRegister"
          :disabled="!valid"
        >
          Register
        </v-btn>

        <error-alert
          class="mt-5"
          v-if="isError"
          title="Register Error"
          :text="`The user '${username}' already exists.`"
        />
      </v-form>
    </v-col>
  </v-row>
</template>

<script>
import {axiosIns} from "../../axios.config";
import ErrorAlert from "@/components/ErrorAlert";

export default {
  name: "Register",
  components: {ErrorAlert},
  data: () => ({
    valid: false,
    username: '',
    usernameRules: [val => /^[^`~!@#$%^&*()_+=<>/?-]+$/.test(val) ? true : 'Username can\'t contain special characters'],
    password: '',
    passwordRules: [val => val.length >= 3 ? true : 'Password can\'t be shorter than 3 characters'],
    repeatPassword: '',
    email: '',
    emailRules: [val => /\w+@\w+\.\w+/.test(val) ? true : 'Invalid email'],
    isError: false
  }),
  computed: {
    repeatPasswordRules() {
      return [val => val === this.password ? true : 'Passwords need to be the same']
    }
  },
  methods: {
    handleRegister() {
      const username = this.username
      const password = this.password
      const email = this.email

      axiosIns('/register', {
        method: 'POST',
        data: {username, password, email}
      }).then(res => {
        const token = res.data.token
        localStorage.setItem('jwt_token', token)
        axiosIns.defaults.headers.common['Authorization'] = `Bearer ${token}`
        this.$router.push('/')
        axiosIns('/categories').then(res => console.log(res))
      }).catch(() => this.isError = true)
    }
  }
}
</script>

<style scoped>
h1 {
  margin-top: 100px !important;
}
</style>