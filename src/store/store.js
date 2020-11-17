import { ACTION_TYPES } from "../constants/action-types.js";
import Products from '../api/Products.js'
import Vue from "vue"
import Vuex from "vuex"

Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        products: {}
    },
    mutations: {
        [ACTION_TYPES.getProducts]: (state, payload) => {
            console.log(payload);
            (state.products[payload.category] = payload.products);
        },
    },
    actions: {
        onGetProducts:({ commit }, category ) => {
            Products.getProducts(category)
                .then(products => { commit(ACTION_TYPES.getProducts, {products, category}) })
        }
        
    },
    routes: {}, // Not needed?
})

export default store