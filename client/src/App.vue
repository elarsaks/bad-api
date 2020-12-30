<template>
  <v-app>
    <AppBar />
    <div id="table-wrapper">
      <PageMenu 
        :buttons="categories"
      />
       <div class="text-center pt-2">
        <v-data-table
          :headers="headers"
          :items="products[this.selected]"
          :items-per-page="products[this.selected].length"
          :loading="products[this.selected].length < 1"
          loading-text="Loading... Please wait"
          hide-default-footer
          class="elevation-1"
        ></v-data-table>
      </div>
    </div>
    <Footer />
  </v-app>
</template>

<script>
import AppBar from './components/AppBar';
import Footer from './components/Footer';
import PageMenu from './components/PageMenu';
import { mapState } from 'vuex'

export default {
  name: 'App',
  components: {
    AppBar,
    Footer,
    PageMenu,
  },
  data() {
    return {
      selected: 'beanies',
      categories: ['gloves', 'facemasks', 'beanies'],
      // Is loading needed after routing?
      loading: false,
      headers: [
        { text: 'Name', align: 'start', sortable: false, value: 'name'},
        { text: 'Type', sortable: false, value: 'type'},
        { text: 'Manufacturer', sortable: false, value: 'manufacturer' },
        { text: 'Price', sortable: false, value: 'price' },
        { text: 'Colors', sortable: false, value: 'color' },
        { text: 'Stock', sortable: false, value: 'instock' },
      ],
    }
  },
  computed: {
    ...mapState({
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
      this.$store.dispatch("onGetProducts", category)
    },
  },
  created(){
    this.fetchProducts('beanies')
  }
};
</script>

<style scoped>
#table-wrapper{
  width: 90vw;
  margin-left: auto;
  margin-right: auto;
}

.pagination-wrapper{
  width: 70%;
    margin-left: auto;
  margin-right: auto;
}
</style>