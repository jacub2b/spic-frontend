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
      <v-col v-for="(picture, i) in pictures" cols="3" :key="i">
        <v-card>
          <v-img
              :src="picture.src"
              :alt="picture.title"
              :key="i"
              height="250"
              cover
          >
            <v-checkbox-btn
                style="font-size: 25px"
                :value="picture"
                v-model="selectedPictures"
            />
            <v-btn
                v-if="picture.owner !== 'public'"
                id="delPic"
                icon="mdi-trash-can-outline"
                @click="deletePicture(picture)"
            />
          </v-img>
          <v-card-title>{{ picture.title }}</v-card-title>
        </v-card>
      </v-col>
    </v-row>

    <v-row v-if="pictures.length">
      <v-col class="text-right">
        <v-btn
          append-icon="mdi-backspace-outline"
          color="grey-darken-3"
          @click="clearSelectedPictures"
          :disabled="!selectedPictures.length"
        >
          Clear selected pictures
        </v-btn>
      </v-col>

      <v-col class="text-center" cols="auto" >
        <v-btn
            append-icon="mdi-chevron-right"
            color="blue"
            @click="showCarousel = true"
            :disabled="!selectedPictures.length"
        >
          Show me
        </v-btn>
      </v-col>

      <v-col v-if="isLogged">
        <v-btn
            append-icon="mdi-image-plus-outline"
            color="blue"
            @click="moveToAddPicture"
        >
          Add Picture
        </v-btn>
      </v-col>
    </v-row>

    <add-pictures
        id="addPictures"
        v-if="showAddPicture"
        :category="category"
        title="Add a picture"
        text="Upload a new picture to this category"
    />

    <v-dialog v-model="showCarousel">
      <PicturesCarousel/>
    </v-dialog>

    <v-dialog width="auto" v-model="showDeletePicture">
      <delete-item
          @close-dialog="showDeletePicture = false"
          @success="this.$router.go()"
          title="Delete Picture"
          text="Are you sure you want to delete the picture?"
          :src="pictureSrcToDelete"
      />
    </v-dialog>
  </v-container>
</template>

<script>
import {axiosIns} from "../../axios.config";
import PicturesCarousel from "@/components/PicturesCarousel";
import AddPictures from "@/components/AddPictures";
import {mapGetters, mapActions} from "vuex";
import DeleteItem from "@/components/DeleteItem";

export default {
  name: "PicturesView",
  components: {DeleteItem, AddPictures, PicturesCarousel},
  props: ['category'],
  computed: {
    ...mapGetters(['isLogged']),
    selectedPictures: {
      get() {
        return this.$store.state.selectedPictures
      },
      set(selectedPictures) {
        this.updatePictures(selectedPictures)
      }
    }
  },
  data: () => ({
    pictures: [],
    showCarousel: false,
    showAddPicture: false,
    showDeletePicture: false,
    pictureSrcToDelete: null
  }),
  methods: {
    ...mapActions(['updatePictures', 'clearSelectedPictures']),
    loadPictures(pictures) {
      this.pictures = []

      pictures.forEach(pic => {
        pic.src = axiosIns.defaults.baseURL + pic.src
        this.pictures.push(pic)
      })
    },
    moveToAddPicture() {
      this.showAddPicture = true
      setTimeout(() => window.addPictures.scrollIntoView({behavior: 'smooth'}), 200)  // Component loading delay
    },
    deletePicture(src) {
      this.pictureSrcToDelete = src
      this.showDeletePicture = true
    }
  },
  mounted() {
    axiosIns(`/pictures/categories/${this.category}`)
        .then(res => this.loadPictures(res.data))
  },
  beforeUpdate() {
    this.showAddPicture = false
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

#delPic {
  position: absolute;
  top: 0;
  right: 0;
}
</style>