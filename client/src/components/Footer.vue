<template>
    <v-footer
        v-bind="localAttrs"
       :padless="padless"
       class="pa-0"
    >
        <v-card
            tile
            width="100%"
            class="blue darken-3 text-center"
         >

        <v-card-text class="white--text">
            {{ new Date().getFullYear() }} — <strong>Bad-Api</strong>
        </v-card-text>
        </v-card>
    </v-footer>
</template>

<script>

export default {
  name: 'Footer',
};
</script>