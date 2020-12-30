import VueRouter from "vue-router"
import DataTable from "./components/DataTable.vue"
import store from "../store/store.js"

const router = new VueRouter({
    mode: 'history',
    routes: [
        {
          path: '/',
          redirect: '/gloves',
        },
        {
          path: '/gloves',
          name: 'gloves',
          component: DataTable,
          beforeEnter: (to, from, next) => {
              store.dispatch('onGetProducts', 'gloves')
              next()
            },
        },
        {
          path: '/facemasks',
          name: 'facemasks',
          component: DataTable,
          beforeEnter: (to, from, next) => {
            store.dispatch('onGetProducts', 'facemasks')
              next()
            },
        },
        {
          path: '/beanies',
          name: 'beanies',
          component: DataTable,
          beforeEnter: (to, from, next) => {
              store.dispatch('onGetProducts', 'beanies')
              next()
          },
      },
    ],
  })

export default router