<template>
  <v-card>
    <v-toolbar :title="title" color="red">
      <v-btn icon="mdi-close" @click="this.$emit('close-dialog')"/>
    </v-toolbar>

    <v-card-text class="text-h6 pa-2">{{ text }}</v-card-text>

    <v-card-actions>
      <v-spacer/>
      <v-btn color="red" @click="deleteItem">Delete</v-btn>
      <v-spacer/>
    </v-card-actions>
  </v-card>
</template>

<script>
import {axiosIns} from "../../axios.config";

export default {
  name: "DeleteItem",
  props: ['title', 'text', 'src'],
  methods: {
    deleteItem() {
      axiosIns.delete(this.src)
      this.$router.go()
    }
  }
}
</script>