<template>
  <img :src="require('../assets/logo.png')" alt="spic_logo"/>
  <h1 class="text-h3 text-center mt-5">Welcome to SPIC!</h1>
  <p class="text-h5 text-center mt-5">The application that lets you to speak with pictures.</p>
  <p class="text-h5 text-center mt-5">To start, choose your category (from the left menu) and browse <br>
                                      through the pictures to tell what you want by them.</p>
</template>

<script>
export default {
  name: "Welcome"
}
</script>

<style scoped>
img {
  display: block;
  margin-left: auto;
  margin-right: auto;
  margin-top: 100px;
  width: 20%;
}

p {
  font-family: "Franklin Gothic Book", sans-serif !important;

}
</style>