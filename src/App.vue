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

  </div>
</template>

<script>
import MenuButton from './components/MenuButton.vue'
import Throbber from './components/Throbber.vue'
import store from './store/store.js'

export default {
  name: 'App',
  components: {
    MenuButton,
    Throbber,
  },
  data() {
    return {
      selected: 'shirts',
      categories: ['jackets', 'shirts', 'accessories'],
      loading: true,
    }
  },
  computed: {
    products () {
      return store.state.products
    }
  },
  methods: {
    changeCategory(category){
      this.selected = category
      this.loading = true
      if (this.products[category] == undefined){
      store.dispatch("onGetProducts", this.selected)
        .then(() => this.loading = false)
      }
    }
  },
  mounted(){
    store.dispatch("onGetProducts", this.selected)
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
