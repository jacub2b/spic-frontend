<template>
  <v-card>
    <v-toolbar title="Add category">
      <v-btn icon="mdi-close" @click="this.$emit('close-dialog')"/>
    </v-toolbar>

    <v-card-text>
      <div class="text-h6 pa-2">Enter a name for the new category</div>
      <v-text-field label="Category name" v-model="category"/>

      <error-alert
          v-if="isError"
          title="Add category error"
          :text="`The category '${category}' already exists.`"
      />
    </v-card-text>

    <v-card-actions>
      <v-spacer/>
      <v-btn color="blue" @click="handleAddCategory" :disabled="!this.category">Add category</v-btn>
      <v-spacer/>
    </v-card-actions>
  </v-card>
</template>

<script>
import {axiosIns} from "../../axios.config";
import ErrorAlert from "@/components/ErrorAlert";

export default {
  name: "AddCategory",
  components: {ErrorAlert},
  data: () => ({
    category: '',
    isError: false
  }),
  methods: {
    handleAddCategory() {
      const category = this.category
      axiosIns('/categories', {method: 'POST', data: {category}})
          .then((res) => this.$emit('close-dialog', res.data.newCategory))
          .catch(() => this.isError = true)
    }
  }
}
</script>