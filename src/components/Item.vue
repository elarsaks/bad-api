<template>
    <div class="item">
        <div class="item-element name">{{source.name}}</div>
        <div class="item-element">{{source.manufacturer}}</div>
        <div class="item-element price">{{source.price}}€</div>
        <div class="item-element stock">
          <Throbber 
            v-if="this.source.stock == undefined"
            width= "1.5em"
          />
          <div v-if="this.source.stock">
            {{this.source.stock}}
          </div>
        </div>
    </div>
</template>
 
<script>
import store from '../store/store.js'
import Throbber from './Throbber.vue'

  export default {
    name: 'item-component',
    props: {
      source: {
        type: Object,
        default () {
          return {}
        }
      }
    },
    components: {
      Throbber
    },
    // TODO: what happenns when stock item cannot be found 
    created(){
      store.dispatch("onCheckAvailability", {
        category: this.source.type,
        id: this.source.id,
        manufacturer: this.source.manufacturer,
      })
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