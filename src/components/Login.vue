<template>
  <div class="container">
        <div class="form-group">
            <div>
              <label for="login">Username</label>
              <input id="login"
                     type="text"
                     name="username"
                     class="form-control"
                     placeholder="Enter login"
                     v-model="username">
            </div>
            <div>
                <label for="password">Password</label>
                <input type="password"
                       name="password"
                       id="password"
                       class="form-control"
                       placeholder="Password"
                       v-model="password">
            </div>
            <div>
                 <button class="btn btn-primary" v-on:click="doLogin">Sign in</button>
            </div>
       </div>
</div>
</template>

<script>

export default {
  name: 'Login',
  data () {
    return {
      username: '',
      password: ''
    }
  },
  methods: {
    doLogin: function () {
      var data = {
        username: this.username,
        password: this.password
      }
      this.$axios.post('http://localhost:8080/api/auth/login', data)
        .then(response => {
          localStorage.setItem('accessToken', response.data.accessToken)
          this.$router.push({name: 'Main'})
        })
    }
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
