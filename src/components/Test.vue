<template>

  <div class="container">
    <div>
      <input type="text" size="40">
    </div>
    <div id="ShowDir" >
      {{info.config.headers}}
      <h1>FileExplorer</h1>
      <div
        v-for="files in info.data.files"
        class="files"
      >
        <a v-bind:href=files._links.self.href> {{ files.name }}:</a>

        <span class="lighten">
         {{files.size}} Байт
    </span>
      </div>
      <br>
      <br>
      <div
        v-for="subDirectories in info.data.subDirectories"
        class="subDirectories"
      >
        <a v-bind:href=subDirectories._links.self.href>{{ subDirectories.name }}</a>
      </div>
    </div>
  </div>
</template>

<script>
  import axios from 'axios'
  import Login from './Login'


  export default {
    name: 'Test',
    data() {
      return {
        info: null
      };
    },
    mounted() {
      let token = localStorage.getItem('accessToken')

      let config = {
        headers: {
          'Auth-token': 'Bearer ' + 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhZG1pbiIsImlhdCI6MTU3NjA4ODAwMywiZXhwIjoxNTc2MDg4MzYzfQ.bxNeexwQkbRknrciVcz4aReLs-lQkBE_2be16wXaz-E'
        }}
      axios
        .get('http://localhost:8080/api/directory/', config).then(response => {
          console.log(token);
          (this.info = response)});
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
