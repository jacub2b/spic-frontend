<template>
  <v-carousel
    show-arrows="hover"
    hide-delimiter-background
  >
    <v-carousel-item
      v-for="(path, i) in picturesPaths"
      :key="i"
      :src="path"
    />
  </v-carousel>
</template>

<script>
export default {
  name: "PicturesCarousel",
  props: ['picturesPaths'],
}
</script>