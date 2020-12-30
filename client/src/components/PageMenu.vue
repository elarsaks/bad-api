<template>
    <div id="page-menu-wrapper">
        <v-row
        align="center"
        justify="space-around"
        >
            <v-btn
                v-for="item in buttons"
                :key="item"
                depressed
                color="primary"
            >
                {{item}}
            </v-btn>
        </v-row>
    </div>
</template>

<script>
export default {
    name: 'PageMenu',
    props: {
        buttons:{
            type: Array,
            required:true,
        }
    }
}
</script>

<style scoped>
#page-menu-wrapper {
    margin-top: 10px;
    margin-bottom: 10px;
}
</style>