<template>
  <v-container style="width: 50%" class="ma-auto">
    <div class="text-center text-h2 mt-16">{{ title }}</div>
    <div class="text-center text-h4 mt-3">{{ text }}</div>

    <v-form v-model="valid">
      <v-row style="width: 40%" class="ma-auto">
        <v-col cols="12">
          <v-text-field
              label="Picture name"
              variant="outlined"
              v-model="pictureName"
              :rules="[val => !!val ? true : 'Specify a name']"
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
              prepend-icon=""
              prepend-inner-icon="mdi-paperclip"
              :rules="fileRules"
          />
        </v-col>

        <v-col cols="12" class="text-center">
          <v-btn
              append-icon="mdi-image-plus-outline"
              color="blue"
              @click="uploadFile"
              :disabled="!valid"
          >
            Upload picture
          </v-btn>
        </v-col>
      </v-row>
    </v-form>
  </v-container>
</template>

<script>
import {axiosIns} from "../../axios.config";

export default {
  name: "EmptyPictures",
  props: ['category', 'title', 'text'],
  data: () => ({
    file: [],
    pictureName: '',
    valid: false,
    fileRules: [
      files => files[0] ? true : 'Specify a file',
      files => files[0]?.size < 1_000_000 ? true : 'A file over 1MB cannot be uploaded'
    ]
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