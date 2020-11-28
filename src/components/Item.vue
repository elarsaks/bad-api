<template>
    <div class="item">
        <div class="item-element name">{{source.name}}</div>
        <div class="item-element">{{source.manufacturer}}</div>
        <div class="item-element price">{{source.price}}€</div>
        <div class="item-element stock">
          <Throbber 
            v-if="this.stock == false"
            width= "1.5em"
          />
          <div v-if="this.stock">
            {{this.stock}}
          </div>
        </div>
    </div>
</template>
 
<script>
//import Clean from '../services/Clean.js'
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
    computed: {
      /* HERE IS A BUG!
        Vue dont watch for changes inside the object and will not re-render when Vuex state (manufacturers) changes.
      */
      manufacturers () {
        return this.$store.state.manufacturers
      },
      stock () {
        /*
        return this.$store.state.manufacturers[this.source.manufacturer]
          ? Clean.cleanAvailability( this.$store.state.manufacturers[this.source.manufacturer]
            .find(e => e.id == this.source.id.toUpperCase()).DATAPAYLOAD)
          : false */
          return false
      },
    },
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