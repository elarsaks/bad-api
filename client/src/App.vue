<template>
  <v-app>
    <AppBar />
    <div id="table-wrapper">
       <div class="text-center pt-2">

       <div class="pagination-wrapper">
          <v-pagination
              v-model="page"
              :length="pageCount"
          ></v-pagination>
       </div>

        <v-data-table
          :headers="headers"
          :items="products[this.selected]"
          :page.sync="page"
          :items-per-page="itemsPerPage"
          hide-default-footer
          class="elevation-1"
          @page-count="pageCount = $event"
        ></v-data-table>

        <div class="pagination-wrapper">
            <v-pagination
                v-model="page"
                :length="pageCount"
            ></v-pagination>
        </div>
      </div>
    </div>

  </v-app>
</template>

<script>
import AppBar from './components/AppBar';
import { mapState } from 'vuex'

export default {
  name: 'App',

  components: {
    AppBar
  },

  data() {
    return {
      selected: 'beanies',
      categories: ['gloves', 'facemasks', 'beanies'],
      loading: true,
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
        { text: 'Manufacturer', value: 'manufacturer' },
        { text: 'Price', value: 'price' },
        { text: 'Colors', value: 'color' },
        { text: 'Stock', value: 'instock' },
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
  width: 50%;
    margin-left: auto;
  margin-right: auto;
}
</style>