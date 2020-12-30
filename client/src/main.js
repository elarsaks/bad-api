import App from './App.vue'
import store from './store/store.js'
import Vue from 'vue'
import vuetify from './plugins/vuetify';
import VueRouter from "vue-router"
import router from './router/router.js'

Vue.config.productionTip = false
Vue.use(VueRouter)

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')

