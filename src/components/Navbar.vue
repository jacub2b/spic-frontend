<template>
  <v-app-bar elevation="5">
    <v-app-bar-nav-icon variant="text" @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
    <v-toolbar-title>SPIC - Let The Pic Speak!</v-toolbar-title>

    <router-link v-if="!isLogged" class="routerLink" to="/login">
      <v-btn>Login</v-btn>
    </router-link>
    <p v-if="isLogged">
      Welcome {{ getUsername }}
      <v-btn @click="logout">Logout</v-btn>
    </p>
    <router-link class="routerLink" to="/register">
      <v-btn>Register</v-btn>
    </router-link>
  </v-app-bar>

  <v-navigation-drawer
      v-model="drawer"
      location="left"
      temporary
  >
    <v-list>
      <v-list-subheader>Categories</v-list-subheader>
      <router-link
          v-for="(category, i) in categories"
          :key="i"
          class="routerLink"
          :to="`/categories/${category.value}/pictures`"
      >
        <v-list-item :value="category.value">
          <v-icon start :icon="category.icon"></v-icon>
          {{ category.title }}
        </v-list-item>
      </router-link>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
import {axiosIns} from "../../axios.config";
import {mapGetters, mapActions} from 'vuex'

export default {
  data: () => ({
    drawer: false,
    group: null,
    categories: [],
  }),

  computed: {
    ...mapGetters(['isLogged', 'getUsername'])
  },
  methods: {
    ...mapActions(['logout'])
  },
  watch: {
    group() {
      this.drawer = false
    },
  },
  mounted() {
    axiosIns('/categories')
        .then(res => this.categories = res.data)
  }
}
</script>

<style scoped>
.routerLink {
  text-decoration: none;
  color: inherit;
}
</style>