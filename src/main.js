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

axios.interceptors.response.use(
  response => response,
  error => {
    if (error.response.status === 401) {
      app.$router.push({name: 'Login'})
    } else {
      return Promise.reject(error)
    }
  })

// TODO debug me
//axios.interceptors.request.use(
  //config => {
    //var token = localStorage.getItem('accessToken')
    //if (token) {
      //config.headers.Authorization = `Bearer ${token}`
    //}
    //return config
  //},
  //error => { Promise.reject(error) }
//)
