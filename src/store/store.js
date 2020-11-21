import Vue from "vue"
import Vuex from "vuex"
import { ACTION_TYPES } from "../constants/action-types.js";
import Availability from '../api/Availability.js'
import Products from '../api/Products.js'


Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        products: {
            jackets: [],
            shirts: [],
            accessories: [],
        },
        manufacturers:{}
    },
    mutations: {
        [ACTION_TYPES.getProducts]: (state, payload) => {
            (state.products[payload.category] = payload.products);
            return payload.products
        },
        [ACTION_TYPES.getAvailability]: (state, payload) => {
            (state.manufacturers[payload.manufacturer] = payload.data);
            return payload.manufacturers
        },
    },
    actions: {
        onGetProducts:({ commit }, category ) => {     
            // TODO: error handling
            return Products.getProducts(category)
                .then(products => { 
                    commit(ACTION_TYPES.getProducts, {products, category})
                    return products
                })
        },
        onGetAvailability:({ commit }, manufacturer ) => {     
            // TODO: error handling
            return Availability.getAvailability(manufacturer)
                .then(data => { 
                    commit(ACTION_TYPES.getAvailability, {manufacturer, data})
                    return data
                })
        },
    },
    routes: {}, // Not needed?
})

export default store