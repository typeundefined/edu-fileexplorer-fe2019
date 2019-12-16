// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'

Vue.config.productionTip = false
Vue.prototype.$axios = axios

/* eslint-disable no-new */
var app = new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})

axios.interceptors.request.use(
  function (config) {
    var token = localStorage.getItem('accessToken')
    if (token) {
      config.headers['Auth-token'] = `Bearer ${token}`
    }
    return config
  },
  function (error) { return Promise.reject(error) }
)

axios.interceptors.response.use(
  function (response) {
    return response
  },
  function (error) {
    if (error.response.status === 401) {
      localStorage.removeItem('accessToken')
      app.$router.push({name: 'Login'})
    } else {
      return Promise.reject(error)
    }
  })
