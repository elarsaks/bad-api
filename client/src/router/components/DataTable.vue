<template>
    <div id="table-wrapper">
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
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'DataTable',
  data() {
    return {
      selected: 'beanies',
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
    fetchProducts(category){
      this.$store.dispatch("onGetProducts", category)
    },
  },
  mounted(){
   // this.fetchProducts('beanies')
    console.log(this.$route.params);
    this.selected=this.$route.params.category
  },
}
</script>

<style scoped>
#table-wrapper{
  width: 90vw;
  margin-left: auto;
  margin-right: auto;
}
</style>