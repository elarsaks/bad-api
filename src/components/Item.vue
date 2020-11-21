<template>
    <div class="item">
        <div class="item-element name">{{source.name}}</div>
        <div class="item-element">{{source.manufacturer}}</div>
        <div class="item-element price">{{source.price}}€</div>
        <div class="item-element stock">
          Instock
        </div>
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
  width: 25%;
  margin-left: 10px;
  margin-right: 10px;
}

.name {
  width: 30%;
}

.price {
  width: 15%;
}

.stock {
  text-align: center;
}
</style>