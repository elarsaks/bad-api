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
      v-if="this.loading" 
      width= "200px"
    />

    <VirtualScroll
      v-if="!this.loading && products.length > 0" 
      :products="products"
    />

  </div>
</template>

<script>
import VirtualScroll from './components/VirtualScroll.vue'
import MenuButton from './components/MenuButton.vue'
import Throbber from './components/Throbber.vue'
import store from './store/store.js'

export default {
  name: 'App',
  components: {
    MenuButton,
    Throbber,
    VirtualScroll,
  },
  data() {
    return {
      selected: 'shirts',
      categories: ['jackets', 'shirts', 'accessories'],
      loading: true,
    }
  },
  /*/ move it down the chain
  computed: {
    products () {
      return store.state.products[this.selected]
    }
  }, */
  methods: {
    changeCategory(category){
      this.selected = category
      if (this.products[category] == undefined){
        this.loading = true
        store.dispatch("onGetProducts", this.selected)
          .then(() => this.loading = false)
      }
    }
  },
  created(){
    this.changeCategory('shirts')
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

</style>
