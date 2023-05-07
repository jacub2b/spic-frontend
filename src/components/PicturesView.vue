<template>
  <add-pictures
      v-if="!pictures.length"
      :category="category"
      title="Pictures not found"
      text="Oh, you don't have any pictures here. If you want to add - upload now!"
  />

  <h1 v-if="pictures.length" class="text-h3 text-center mt-5">Select your pictures</h1>

  <v-container>
    <v-row>
      <v-col v-for="(picture, i) in pictures" cols="3">
        <v-card>
          <v-img
              :src="picture.src"
              :alt="picture.title"
              :key="i"
              height="250"
              cover
          >
            <v-checkbox-btn style="font-size: 25px" :value="picture.src" v-model="selectedPictures"/>
          </v-img>
          <v-card-title>{{ picture.title }}</v-card-title>
        </v-card>
      </v-col>
    </v-row>

    <v-row v-if="pictures.length">
      <v-col class="text-center" cols="12">
        <v-btn
            append-icon="mdi-chevron-right"
            color="blue"
            @click="showCarousel = true"
            :disabled="!selectedPictures.length"
        >
          Show me
        </v-btn>
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
import AddPictures from "@/components/AddPictures";

export default {
  name: "PicturesView",
  components: {AddPictures, PicturesCarousel},
  props: ['category'],
  data: () => ({
    pictures: [],
    selectedPictures: [],
    showCarousel: false
  }),
  methods: {
    loadPictures(pictures) {
      this.selectedPictures = []
      this.pictures = []

      pictures.forEach(pic => {
        pic.src = axiosIns.defaults.baseURL + pic.src
        this.pictures.push(pic)
      })
    }
  },
  mounted() {
    axiosIns(`/pictures/categories/${this.category}`)
        .then(res => this.loadPictures(res.data))
  },
  watch: {
    category() {
      axiosIns(`/pictures/categories/${this.category}`)
          .then(res => this.loadPictures(res.data))
    }
  }
}
</script>

<style scoped>
h1 {
  margin-top: 100px !important;
}
</style>