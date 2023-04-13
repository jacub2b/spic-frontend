<template>
  <v-app-bar elevation="5">
    <v-app-bar-nav-icon variant="text" @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
    <v-toolbar-title>SPIC - Let The Pic Speak!</v-toolbar-title>
  </v-app-bar>

  <v-navigation-drawer
    v-model="drawer"
    location="left"
    temporary
  >
    <v-list>
      <v-list-subheader>Categories</v-list-subheader>
      <v-list-item
        v-for="(category, i) in categories"
        :key="i"
        :value="category.value"
      >
        <router-link id="routerLink" :to="`/categories/${category.value}/pictures`">
          <v-icon start :icon="category.icon"></v-icon>
          {{ category.title }}
        </router-link>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
import {axiosIns} from "../../axios.config";

export default {
  data: () => ({
    drawer: false,
    group: null,
    categories: [],
  }),
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
#routerLink {
  text-decoration: none;
  color: inherit;
}
</style>