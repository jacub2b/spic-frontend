<template>
  <v-alert
    :title="title"
    :text="text"
    icon="$error"
    color="error"
  />
</template>

<script>
export default {
  props: ['title', 'text']
}
</script>