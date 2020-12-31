<template>
    <div id="table-wrapper">
      <v-alert
        v-if="error"
        border="right"
        colored-border
        type="error"
        elevation="2"
      >
        <p> Error: Oops something went wrong :( Please contact system administrator.</p>
      </v-alert>
       <div class="text-center pt-2">
        <v-data-table
          v-if="!error"
          :headers="headers"
          :items="products"
          :items-per-page="products.length"
          :loading="loading"
          loading-text="Loading... Please wait"
          hide-default-footer
          class="elevation-1"
          dense
          disable-pagination
        >
        </v-data-table>
      </div>
    </div>
</template>

<script>
import Products from '../../repository/Products.js'

export default {
  name: 'DataTable',
  data() {
    return {
      headers: [
        { text: 'Name', align: 'start', sortable: false, value: 'name'},
        { text: 'Type', sortable: false, value: 'type'},
        { text: 'Manufacturer', sortable: false, value: 'manufacturer' },
        { text: 'Price', sortable: false, value: 'price' },
        { text: 'Colors', sortable: false, value: 'color' },
        { text: 'Stock', sortable: false, value: 'instock' },
      ],
      loading: false,
      products: [],
      error: null,
    }
  },
  created(){
    this.fetchData()
  },
  watch:{
   $route: 'fetchData'
  } ,
  methods: {
    fetchData () {
      this.loading = true

      Products.getProducts(this.$route.name)
        .then(products => {
          this.loading = false
          this.products = products
        })
        .catch(err => {
          console.log(err)
          this.error = err
        })
    }
  },
}
</script>

<style scoped>
#table-wrapper{
  margin-top: 10vh;
  width: 90vw;
  margin-left: auto;
  margin-right: auto;
}

#virtual-scroll-table {
  max-height: 80vh;
  overflow: auto;
}
</style>