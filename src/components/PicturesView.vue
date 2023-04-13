<template>
  <h1 class="text-h3 text-center mt-5">Select your pictures</h1>

  <v-container>
    <v-row>
      <v-col v-for="(picture, i) in pictures" cols="3">
        <v-card>
          <v-img
            :src="picture.src"
            :alt="picture.title"
            :key="i"
            height="150"
            cover
          >
            <v-checkbox-btn :value="picture.src" v-model="selectedPictures"/>
          </v-img>
          <v-card-title>{{ picture.title }}</v-card-title>
        </v-card>
      </v-col>
    </v-row>

    <v-row>
      <v-col class="text-center" cols="12">
        <v-btn
          append-icon="mdi-chevron-right"
          color="blue"
          @click="showCarousel = true"
        >Show me</v-btn>
      </v-col>
    </v-row>

    <v-dialog v-model="showCarousel">
      <PicturesCarousel :pictures-paths="selectedPictures"/>
    </v-dialog>
  </v-container>
</template>

<script>
import {axiosIns} from "../../axios.config";
import PicturesCarousel from "@/components/PicturesCarousel";

export default {
  name: "PicturesView",
  components: {PicturesCarousel},
  props: ['category'],
  data: () => ({
    pictures: [],
    selectedPictures: [],
    showCarousel: false
  }),
  mounted() {
    axiosIns(`/categories/${this.category}/pictures`)
      .then(res => this.pictures = res.data)
  },
  watch: {
    category() {
      axiosIns(`/categories/${this.category}/pictures`)
        .then(res => this.pictures = res.data)

      this.selectedPictures = []
    }
  }
}
</script>

<style scoped>
h1 {
  margin-top: 100px !important;
}
</style>