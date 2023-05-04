<template>
  <v-app>
    <Navbar/>
    <router-view/>
  </v-app>
</template>

<script>
import Navbar from './components/Navbar'
import {mapActions} from "vuex";

export default {
  name: 'App',
  components: {
    Navbar
  },
  methods: {
    ...mapActions(['loginWithToken'])
  },
  created() {
    const token = localStorage.getItem('jwt_token')
    if (token) this.loginWithToken(token)
  }
}
</script>