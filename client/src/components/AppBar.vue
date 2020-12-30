<template>
     <div id="app-bar-wrapper">
        <v-app-bar
            color="primary"
            dense
            dark
        >
            <v-toolbar-title>Bad-Api</v-toolbar-title>
                <v-tabs centered>
                    <v-tab
                        v-for="page in pages"
                        :key="page"
                        :to="page"
                    >
                        {{page}}
                    </v-tab>
                </v-tabs>
            <v-spacer></v-spacer>
            <v-toolbar-title>Version 2</v-toolbar-title>
        </v-app-bar>
    </div>
</template>

<script>

export default {
  name: 'AppBar',
  props:{
      pages: {
          type: Array,
          required: true,
      }
  }
};
</script>

<style scoped>
#app-bar-wrapper {
    position: fixed;
    width: 100%;
}

.v-tabs{
    width: 80%;
    margin-right: auto;
    margin-left: auto;
}
</style>