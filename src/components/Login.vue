<template>
  <h1 class="text-h3 text-center mt-5">Login</h1>

  <v-row justify="center" class="mt-5">
    <v-col cols="4">
      <v-form @submit.prevent="">
        <v-text-field
          v-model="username"
          label="Username"
        ></v-text-field>

        <v-text-field
          v-model="password"
          label="Password"
          type="password"
        ></v-text-field>

        <v-btn
          type="submit"
          block
          class="mt-2"
          @click="handleLogin"
        >
          Login
        </v-btn>

        <error-alert
          class="mt-5"
          v-if="isError"
          title="Login Error"
          :text="errorText"
        />
      </v-form>
    </v-col>
  </v-row>
</template>

<script>
import {axiosIns} from "../../axios.config";
import ErrorAlert from "@/components/ErrorAlert";
import {mapActions} from 'vuex'

export default {
  name: "Login",
  components: {ErrorAlert},
  data: () => ({
    username: '',
    password: '',
    isError: false,
    errorText: ''
  }),
  methods: {
    ...mapActions(['login']),
    handleLogin() {
      const username = this.username
      const password = this.password

      if (!username || !password) {
        this.errorText = "Username and password can't be empty."
        return this.isError = true
      }

      axiosIns('/login', {
        method: 'POST',
        data: {username, password}
      }).then(res => {
        const token = res.data.token
        this.login(username, token)
        this.$router.push('/')
      }).catch(() => {
        this.errorText = "Username or password isn't correct."
        this.isError = true
      })
    }
  }
}
</script>

<style scoped>
h1 {
  margin-top: 100px !important;
}
</style>