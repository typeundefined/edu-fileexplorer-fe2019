<template>
  <div class="card">
    <div class="card-body">
      <h5 class="card-title">{{name}} </h5>

    </div>
  </div>
</template>

<script>

export default {
  name: 'FileItem',
  props: ['name', 'url'],
  data () {
    return {}
  },
  methods: {
  }
}
</script>

<style scoped>
</style>
