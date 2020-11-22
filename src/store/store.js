import Vue from "vue"
import Vuex from "vuex"
import { ACTION_TYPES } from "../constants/action-types.js";
import Availability from '../api/Availability.js'
import Clean from '../services/Clean.js'
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
        [ACTION_TYPES.checkAvailability]: (state, payload) => {
            let availabilityData = state.manufacturers[payload.manufacturer].find(e => e.id == payload.id.toUpperCase())
            let cleanedAvailabilityData = Clean.cleanAvailability(availabilityData.DATAPAYLOAD);
            (state.products[payload.category].find(e => e.id == payload.id).stock = cleanedAvailabilityData)
            // Should mutation return anything???!!
            return cleanedAvailabilityData
        },
        [ACTION_TYPES.getAvailability]: (state, payload) => {
            (state.manufacturers[payload.manufacturer] = payload.data);
            // Should mutation return anything???!!
            return payload.manufacturers
        },
        [ACTION_TYPES.getProducts]: (state, payload) => {
            (state.products[payload.category] = payload.products);
            // Should mutation return anything???!!
            return payload.products
        },
    },
    actions: {
        onCheckAvailability:({ commit }, payload) => {     
            commit(ACTION_TYPES.checkAvailability, payload)
        },
        onGetAvailability:({ commit }, manufacturer ) => {     
            // TODO: error handling
            return Availability.getAvailability(manufacturer)
                .then(data => { 
                    commit(ACTION_TYPES.getAvailability, {manufacturer, data})
                    return data
                })
        },
        onGetProducts:({ commit }, category ) => {     
            // TODO: error handling
            return Products.getProducts(category)
                .then(products => { 
                    commit(ACTION_TYPES.getProducts, {products, category})
                    return products
                })
        },
    },
    routes: {}, // Not needed?
})

export default store