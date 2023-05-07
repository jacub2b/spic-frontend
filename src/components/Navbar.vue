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
      <v-btn
          v-if="isLogged"
          id="plus"
          size="x-small"
          icon="mdi-plus"
          @click="showAddCategory = true"
      />
      <v-list-subheader>Categories</v-list-subheader>
      <router-link
          v-for="(category, i) in categories"
          :key="i"
          class="routerLink"
          :to="`/categories/${category.value}/pictures`"
      >
        <v-list-item :value="category.value">
          <v-icon
              start
              :icon="category.icon"
          />
          {{ category.title }}
          <v-btn
              v-if="category.owner !== 'public'"
              icon="mdi-trash-can-outline"
              size="x-small"
              id="delCategory"
              @click="deleteCategory(`/categories/${category.value}`)"
          />
        </v-list-item>
      </router-link>
    </v-list>
  </v-navigation-drawer>

  <v-dialog width="auto" v-model="showAddCategory">
    <add-category
        @close-dialog="showAddCategory = false"
        @add-category="addCategory"
    />
  </v-dialog>

  <v-dialog width="auto" v-model="showDeleteCategory">
    <delete-item
        @close-dialog="showDeleteCategory = false"
        @success="goHome"
        title="Delete Category"
        text="Are you sure you want to delete the category?"
        :src="categorySrcToDelete"
    />
  </v-dialog>
</template>

<script>
import {axiosIns} from "../../axios.config";
import {mapGetters, mapActions} from 'vuex'
import AddCategory from "@/components/AddCategory";
import DeleteItem from "@/components/DeleteItem";

export default {
  components: {DeleteItem, AddCategory},
  data: () => ({
    drawer: false,
    group: null,
    categories: [],
    showAddCategory: false,
    showDeleteCategory: false,
    categorySrcToDelete: null
  }),
  computed: {
    ...mapGetters(['isLogged', 'getUsername'])
  },
  methods: {
    ...mapActions(['logout']),
    addCategory(category) {
      this.showAddCategory = false;
      this.categories.push(category)
    },
    deleteCategory(src) {
      this.categorySrcToDelete = src
      this.showDeleteCategory = true
    },
    goHome() {
      location.href = '/'
    }
  },
  watch: {
    group() {
      this.drawer = false
    },
  },
  beforeUpdate() {
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

#plus {
  position: absolute;
  right: 15px;
  top: 15px;
}

#delCategory {
  position: absolute;
  right: 15px;
}
</style>