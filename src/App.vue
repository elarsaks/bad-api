<template>
  <div id="app">
    <MenuButton
      class="menu-button"
      v-for="category in categories"
      v-bind:key="category"
      :name="category"
      :selected="category == selected"
      @change-category="changeCategory"
    />

    <Throbber 
      v-if="this.loading || this.products.length < 1" 
      width= "200px"
    />

    <virtual-list 
      v-if="!this.loading && this.products.length != 0"
      class="virtual-list-outer"
      item-class="row"
      wrap-class="virtual-list-inner"
      :data-key="'id'"
      :data-sources="products"
      :data-component="itemComponent"
      :keeps="keeps"
      :extra-props="manufacturers"
    />

  </div>
</template>

<script>
import Item from './components/./Item'
import config from './config.js'
import VirtualList from 'vue-virtual-scroll-list'
import MenuButton from './components/MenuButton.vue'
import Throbber from './components/Throbber.vue'
import Filter from './services/Filter.js'
import { mapState } from 'vuex'

export default {
  name: 'App',
  components: {
    VirtualList,
    MenuButton,
    Throbber,
  },
  data() {
    return {
      itemComponent: Item,
      selected: 'shirts',
      categories: ['jackets', 'shirts', 'accessories'],
      loading: true,
      keeps: config.displayProducts,
    }
  },
  computed: mapState({
    products: state => state.products['shirts'],
    manufacturers: state => state.manufacturers
  }),
  methods: {
    changeCategory(category){
      this.selected = category
      this.$store.dispatch("onChangeCategory", category)
      if (this.products.length < 1){
        this.loading = true
        this.$store.dispatch("onGetProducts", category)
          .then(() => this.loading = false)
      }
    }
  },
  created(){
    this.$store.dispatch("onGetProducts", {category: 'shirts', amount: config.fetchProducts})
      .then(products => Filter.getManufacturersList(products))
      .then(manuList => {
        console.log(manuList)
        manuList.forEach(m => {
          this.$store.dispatch("onSetManufacturers", {manufacturer: m, status: false})
        });
        return manuList
      })
      .then(manuList => manuList.map(m => this.$store.dispatch("onGetAvailability", m)))
      .then(manuList => {
        this.loading = false
        Promise.all(manuList)
        })
  }
}
</script>

<style>
#app {
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
  font-size: 25px;
}

.virtual-list-outer {
  text-align: center;
  height: 80vh;
  width: 70vw;
  overflow-y: auto;
  margin-left: auto;
  margin-right: auto;
}

.virtual-list-inner {
  width: 100%;
}

.row {
  width: 99%;
  font-size: 1.2em;
  font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
  border: 1px solid rgb(221, 220, 220);
}

.row :hover{
  cursor: pointer;
  background-color: rgba(0, 255, 213, 0.479);
}

</style>
