import Vue from 'vue'
import App from './App.vue'
import Vuex from './store/store.js'

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')

Vue.use(Vuex)