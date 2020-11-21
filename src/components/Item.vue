<template>
    <div class="item">
        <div class="item-element">{{source.name}}</div>
        <div class="item-element">{{source.manufacturer}}</div>
        <div class="item-element">{{source.price}}€</div>
    </div>
</template>
 
<script>
  export default {
    name: 'item-component',
    props: {
      source: {
        type: Object,
        default () {
          return {}
        }
      }
    }
  }
</script>

<style>
.item {
  width: 100%;
  text-align: justify;
}

.item-element {
  display: inline-block;
  text-align: left;
  width: 20%;
  margin-left: 10px;
  margin-right: 10px;
}
</style>