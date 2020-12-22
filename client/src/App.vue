<template>
  <v-app>
    <AppBar />
    <div id="table-wrapper">
       <div class="text-center pt-2">

        <v-pagination
            v-model="page"
            :length="pageCount"
        ></v-pagination>

        <v-data-table
          :headers="headers"
          :items="products[this.selected]"
          :page.sync="page"
          :items-per-page="itemsPerPage"
          hide-default-footer
          class="elevation-1"
          @page-count="pageCount = $event"
        ></v-data-table>

        <v-pagination
          v-model="page"
          :length="pageCount"
        ></v-pagination>
      </div>
    </div>

  </v-app>
</template>

<script>
import AppBar from './components/AppBar';
import config from './config.js'

import Filter from './services/Filter.js'
import { mapState } from 'vuex'

export default {
  name: 'App',

  components: {
    AppBar
  },

  data() {
    return {
      selected: 'shirts',
      categories: ['jackets', 'shirts', 'accessories'],
      loading: true,
      keeps: config.displayProducts,
      page: 1,
      pageCount: 0,
      itemsPerPage: 25,
      headers: [
        {
          text: 'Name',
          align: 'start',
          sortable: false,
          value: 'name',
        },
        { text: 'Type', value: 'type' },
        { text: 'Manufacturer (g)', value: 'manufacturer' },
        { text: 'Price', value: 'price' },
        { text: 'Colors', value: 'color' },
        { text: 'Stock', value: 'stock' },
      ],
    }
  },
  computed: {
    ...mapState({
    manufacturers: state => state.manufacturers,
    products: state => state.products,
    })
  },
  methods: {
    changeCategory(category){ 
      this.selected = category
      if (this.products[category].length < 1){
        this.fetchProducts(category)
      }
    },
    fetchProducts(category){
      this.loading = true
        this.$store.dispatch("onGetProducts", {category: category, amount: config.fetchProducts})
          .then(products => Filter.getManufacturersList(products))
          .then(manuList => this.setManuListToStore(manuList))
          .then(manuList => manuList.map(m => this.$store.dispatch("onGetAvailability", m)))
          .then(manuList => {
            this.loading = false
            Promise.all(manuList)
            })
    },
    setManuListToStore(manuList){
      manuList.forEach(m => 
        this.$store.dispatch("onSetManufacturers", {manufacturer: m, status: false}));
      return manuList
    },
  },
  created(){
    this.fetchProducts('shirts')
  }
};
</script>


<style scoped>
#table-wrapper{
  width: 90vw;
  margin-left: auto;
  margin-right: auto;
}
</style>