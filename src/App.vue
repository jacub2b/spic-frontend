<template>
  <v-app>
    <Navbar/>
    <Welcome/>
  </v-app>
</template>

<script>
import Navbar from './components/Navbar'
import Welcome from "@/components/Welcome";

export default {
  name: 'App',
  components: {
    Welcome,
    Navbar
  }
}
</script>