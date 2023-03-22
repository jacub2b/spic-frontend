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
          <v-icon start :icon="category.icon"></v-icon>{{ category.title }}
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
</template>

<script>
export default {
  data: () => ({
    drawer: false,
    group: null,
    categories: [
      {
        title: 'Drinks',
        value: 'drinks',
        icon: 'mdi-beer'
      },
      {
        title: 'Snacks',
        value: 'snacks',
        icon: 'mdi-french-fries'
      },
      {
        title: 'Vegetables',
        value: 'vegetables',
        icon: 'mdi-carrot'
      },
      {
        title: 'Fruits',
        value: 'fruits',
        icon: 'mdi-food-apple'
      },
    ],
  }),

  watch: {
    group() {
      this.drawer = false
    },
  },
}
</script>