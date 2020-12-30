<template>
    <div id="footer-wrapper">
        <v-footer
            class="pa-0"
        >
            <v-card
                tile
                width="100%"
                class="primary text-center"
            >
            <v-card-text class="white--text">
                {{ new Date().getFullYear() }} — <strong>Bad-Api</strong>
            </v-card-text>
            </v-card>
        </v-footer>
    </div>
</template>

<script>

export default {
  name: 'Footer',
};
</script>

<style scoped>
#footer-wrapper {
    width: 100%;
    position: absolute;
    bottom: 0px;
}
</style>