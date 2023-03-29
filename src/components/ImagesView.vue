<template>
  <v-container class="fill-height">
    <v-row>
      <v-col v-for="(image, i) in images" cols="3">
        <v-card>
          <v-img
            :src="image.src"
            :alt="image.title"
            :key="i"
            height="150"
            cover
          />
          <v-card-title>{{ image.title }}</v-card-title>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import {axiosIns} from "../../axios.config";

export default {
  name: "ImagesView",
  props: ['category'],
  data: () => ({
    images: [],
  }),
  mounted() {
    axiosIns(`/categories/${this.category}/images`)
      .then(res => this.images = res.data)
  },
  watch: {
    category() {
      axiosIns(`/categories/${this.category}/images`)
        .then(res => this.images = res.data)
    }
  }
}
</script>