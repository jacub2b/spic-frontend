<template>
  <v-container style="width: 50%" class="ma-auto">
    <div class="text-center text-h2 mt-16">Pictures not found</div>
    <div class="text-center text-h4 mt-3">Oh, you don't have any pictures here. If you want to add - upload now!</div>

    <v-row style="width: 40%" class="ma-auto">
      <v-col cols="12">
        <v-text-field
            label="Picture name"
            variant="outlined"
            v-model="pictureName"
        />
      </v-col>

      <v-col cols="12">
        <v-file-input
            color="blue"
            variant="outlined"
            chips
            label="Picture to add"
            v-model="file"
            accept=".jpg,.jpeg,.png"
            :loading="false"
            prepend-icon=""
            prepend-inner-icon="mdi-paperclip"
        />
      </v-col>

      <v-col cols="12" class="text-center">
        <v-btn
            append-icon="mdi-image-plus-outline"
            color="blue"
            @click="uploadFile"
            :disabled="!file.length"
        >
          Upload picture
        </v-btn>
      </v-col>
    </v-row>

  </v-container>
</template>

<script>
import {axiosIns} from "../../axios.config";

export default {
  name: "EmptyPictures",
  props: ['category'],
  data: () => ({
    file: [],
    pictureName: ''
  }),
  methods: {
    uploadFile() {
      const formData = new FormData()
      formData.append('file', this.file[0])
      formData.append('title', this.pictureName)

      axiosIns.post(`/pictures/categories/${this.category}`, formData)
          .then(() => this.$router.go())
    }
  }
}
</script>