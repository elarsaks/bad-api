<template>
    <div id="table-wrapper">
       <div class="text-center pt-2">
        <v-data-table
          :headers="headers"
          :items="activeProducts"
          :items-per-page="activeProducts.length"
          :loading="activeProducts.length < 1"
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
import { mapState } from 'vuex'

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
    }
  },
  methods: {
  },
  computed: {
    ...mapState({
    products: state => state.products,
    }),
    activeProducts(){
      return this.products[this.$route.name]
    },
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