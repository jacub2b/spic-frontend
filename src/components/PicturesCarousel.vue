<template>
  <v-carousel
    show-arrows="hover"
    hide-delimiter-background
  >
    <v-carousel-item
      v-for="(path, i) in selectedPictures"
      :key="i"
      :src="path"
    />
  </v-carousel>
</template>

<script>
import {mapState} from "vuex";

export default {
  name: "PicturesCarousel",
  computed: {
    ...mapState(['selectedPictures'])
  }
}
</script>