<template>
  <div class="hello">
      <div class="card">
        <div class="card-body">
          <router-link to="/">Go to Manager</router-link>
        </div>
      </div>
      <file-item v-for="{name, _links} in files" :key="name"
        :name = "name"
        :url = "_links.self.href"
      />
  </div>
</template>

<script>
import FileItem from '@/components/FileItem'

export default {
  components: {
    'file-item': FileItem
  },
  name: 'Main',
  data () {
    return {
      files: [],
      directories: []
    }
  },
  methods: {
    loadFolder () {
      this.$axios.get('http://localhost:8080/api/directory')
        .then(response => {
          this.files = response.data.files
          this.directories = response.data.subDirectories
        })
    }
  },
  mounted () {
    this.loadFolder()
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
