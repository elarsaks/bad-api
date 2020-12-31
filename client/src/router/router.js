import VueRouter from "vue-router"
import DataTable from "./components/DataTable.vue"

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
        },
        {
          path: '/facemasks',
          name: 'facemasks',
          component: DataTable,
        },
        {
          path: '/beanies',
          name: 'beanies',
          component: DataTable,
      },
    ],
  })

export default router