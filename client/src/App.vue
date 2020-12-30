<template>
  <v-app>
    <AppBar :pages="categories"/>
    <router-view />
    <Footer />
  </v-app>
</template>

<script>
import AppBar from './components/AppBar';
import Footer from './components/Footer';

export default {
  name: 'App',
  components: {
    AppBar,
    Footer,
  },
  data() {
    return {
      categories: ['gloves', 'facemasks', 'beanies'],
    }
  },
};
</script>

<style scoped>
#table-wrapper{
  width: 90vw;
  margin-left: auto;
  margin-right: auto;
}
</style>