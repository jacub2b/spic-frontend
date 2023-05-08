<template>
  <v-carousel
    show-arrows="hover"
    hide-delimiter-background
  >
    <v-carousel-item
      v-for="({src, title}, i) in selectedPictures"
      :key="i"
      :src="src"
    >
    <h3 class="picture-title">{{title}}</h3>
    <v-btn icon="mdi-volume-high" @click="speak(title)"/>
  </v-carousel-item>
  </v-carousel>
</template>

<script>
import {mapState} from "vuex";

export default {
  name: "PicturesCarousel",

  computed: {
    ...mapState(['selectedPictures'])
  },
  methods: {
    speak(text) {
      const utterance = new SpeechSynthesisUtterance(text);
      speechSynthesis.speak(utterance);
    }
  }
}
</script>

<style scoped>
p {
  font-family: "Franklin Gothic Book", sans-serif !important;
}

.picture-title {
    position: absolute;
    bottom: 0%;
    left: 50%;
    transform: translate(-50%, -50%);
    padding: 8px;
    color: white;
    background-color: rgba(0, 0, 0, 0.5);
  }

</style>