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

    <v-progress-linear
        v-if="loading"
        value="15" 
      />

    <table>
      <tr >
        <th class="table-header"> Name </th>
        <th class="table-header"> Manufacturer </th>
        <th class="table-header"> Colors </th>
        <th class="table-header"> Price </th>
        <th class="table-header"> Stock </th>
      </tr>
    </table>

    <v-card
      elevation="16"
      :max-width="width * 0.9"
      class="mx-auto"
    >
      <v-virtual-scroll
        bench="5"
        :items="products"
        :height="height * 0.85"
        item-height="50"
      >
        <template v-slot:default="{ item }">
          <v-list-item :key="item.id">
            <v-list-item-content>
              <tr >
                <td class="table-cell"> {{ item.name }} </td>
                <td class="table-cell" > {{ item.manufacturer }} </td>
                <td class="table-cell" > {{ item.color.toString()}} </td>
                <td class="table-cell" > {{ item.price }} € </td>
                <td class="table-cell"> {{ item.instock }} </td>
              </tr>
            </v-list-item-content>
          </v-list-item>

          <v-divider />
          </template>
      </v-virtual-scroll>
    </v-card> 
  </div>
</template>

<script>
import Products from '../../repository/Products.js'

export default {
  name: 'DataTable',
  data() {
    return {
      loading: false,
      products: [],
      error: null,
    }
  },
  created(){
    this.fetchData()
  },
  computed:{
    height(){
      return window.innerHeight
    },
    width(){
      return window.innerWidth
    }
  },
  watch:{
    $route: 'fetchData'
  },
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

.table-header {
  width: 17.5vw;
}

.table-cell {
  text-align: center;
  width: 18vw;
}

</style>
