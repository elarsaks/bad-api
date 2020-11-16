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
  </div>
</template>

<script>
import MenuButton from './components/MenuButton.vue'

export default {
  name: 'App',
  components: {
    MenuButton,
  },
  data() {
    return {
      selected: 'shirts',
      categories: ['jackets', 'shirts', 'accessories'],
      loading: false,
    }
  },
  methods: {
    changeCategory(category){
      this.selected = category
      console.log(category)
    }
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
