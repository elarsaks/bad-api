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
      style="height: 80vh; overflow-y: auto;"
      :data-key="'id'"
      :data-sources="products"
      :data-component="itemComponent"
    />

  </div>
</template>

<script>
import Item from './components/./Item'
import VirtualList from 'vue-virtual-scroll-list'
import MenuButton from './components/MenuButton.vue'
import Throbber from './components/Throbber.vue'
import store from './store/store.js'

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
      loading: false,
    }
  },
  computed: {
    products () {
      return store.state.products[this.selected]
    },
  }, 
  methods: {
    changeCategory(category){
      this.selected = category
      if (this.products.length < 1){
        this.loading = true
        // TODO: error handling
        store.dispatch("onGetProducts", this.selected)
          .then(() => this.loading = false)
      }
    }
  },
  created(){
    store.dispatch("onGetProducts", 'shirts')
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
