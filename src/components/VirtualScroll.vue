<template>
  <div>
    <virtual-list 
      style="height: 360px; overflow-y: auto;"
      :data-key="'id'"
      :data-sources="products"
      :data-component="itemComponent"
    />
  </div>
</template>
 
<script>
  import Item from './Item'
  import VirtualList from 'vue-virtual-scroll-list'
 
  export default {
    name: 'VirtualList',
    props: {
        products: Array,
    },
    data () {
      return {
        itemComponent: Item,
        items: [{uid: 'unique_1', text: 'abc'}, {uid: 'unique_2', text: 'xyz'},]
      }
    },
    components: { 'virtual-list': VirtualList },
  }
</script>