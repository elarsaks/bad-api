<template>
  <button 
    :class="[ selected ? 'selected' : 'not-selected', hover ? 'hover' : '' ]"
    @mouseover="hover = true"
    @mouseleave="hover = false"
    @click="$emit('change-category', name)"
    >
    {{name}}
  </button>
</template>

<script>
export default {
  name: 'MenuButton',
  props: {
    name: String,
    selected: Boolean,
  },
  data() {
    return {
      hover: false
    }
  },
}
</script>

<style scoped>
button {
    padding: 1em;
    margin: 0.5em;
    font-size: 0.5em;
    border-radius: 2vh;
    border: none;
    color: white;
    text-transform: uppercase;
    font-weight: 600;
    z-index: 99;
}

button :hover{
  cursor: pointer;
}

.selected {
    background-color: rgb(21, 190, 154);
}

.not-selected {
    background-color: rgb(58, 58, 58);
}

.hover{
   cursor: pointer;
}
</style>

