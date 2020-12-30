import VueRouter from "vue-router"
import DataTable from "./components/DataTable.vue"
import store from "../store/store.js"

const router = new VueRouter({
    mode: 'history',
    routes: [
        {
            path: '/:category',
            component: DataTable,
            beforeEnter: (to, from, next) => {
                store.dispatch('onGetProducts', to.params.category)
                next()
              },
        },
    ],
  })

export default router