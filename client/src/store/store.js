import Vue from "vue"
import Vuex from "vuex"
import { ACTION_TYPES } from "../constants/action-types.js";
import Products from '../repository/Products.js'

Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        manufacturers:{},
        products: {
            beanies: [],
            gloves: [],
            facemasks: [],
        },
    },
    mutations: {
        [ACTION_TYPES.getProducts]: (state, payload) => {
            (state.products[payload.category] = payload.products);
            return payload.products
        },
    },
    actions: {
        onGetProducts:({ commit }, category ) => {
            // TODO: error handling
            return Products.getProducts(category)
                .then(products => {
                    commit(ACTION_TYPES.getProducts, {category, products: products.data})
                })
        },
    },
})

export default store