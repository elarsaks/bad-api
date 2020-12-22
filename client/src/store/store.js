import Vue from "vue"
import Vuex from "vuex"
import { ACTION_TYPES } from "../constants/action-types.js";
import Availability from '../api/Availability.js'
import Products from '../api/Products.js'

Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        manufacturers:{},
        products: {
            jackets: [],
            shirts: [],
            accessories: [],
        },
    },
    mutations: {
        [ACTION_TYPES.getAvailability]: (state, payload) => {
            //(state.manufacturers[payload.manufacturer] = payload.data);
            Vue.set(state.manufacturers, payload.manufacturer, {
                status: payload.status,
                data: payload.data
            })
            return payload.manufacturers
        },
        [ACTION_TYPES.getProducts]: (state, payload) => {
            (state.products[payload.category] = payload.products);
            return payload.products
        },
        [ACTION_TYPES.setManufacturers]: (state, payload) => {
            Vue.set(state.manufacturers, payload.manufacturer, {
                status: payload.status,
                data: []
            })
        },
    },
    actions: {
        onGetAvailability:({ commit }, manufacturer ) => { 
            
            function recursiveCalling(manufacturer){
                Availability.getAvailability(manufacturer)
                .then(data => {
                    if (Array.isArray(data)){
                        commit(ACTION_TYPES.getAvailability, {manufacturer, data, status: true})
                        return data
                    } else {
                        recursiveCalling(manufacturer)
                    }
                })
            }

            return recursiveCalling(manufacturer)
        },
        onGetProducts:({ commit }, payload ) => {
            // TODO: error handling
            return Products.getProducts(payload)
                .then(products => { 
                    commit(ACTION_TYPES.getProducts, {products, category: payload.category})
                    return products
                })
        },
        onSetManufacturers:({ commit }, payload ) => {
            commit(ACTION_TYPES.setManufacturers, payload)
        },
    },
})

export default store