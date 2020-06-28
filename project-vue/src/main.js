import Vue from "vue"
import Vuex from "vuex"
import App from "./App.vue"
Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        bananas: 0,
        guanabanas: 0
    },
    mutations: {
        addBananas(state) {
            state.bananas++
        },
        addGuanabanas(state, payload) {
            state.guanabanas = state.guanabanas + payload.guanabanaInput
        }
    },
    getters: {
        getFruitSaladIngredients: state => {
            return (state.bananas + state.guanabanas)
        }
    }
})

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  store: store
}).$mount("#app")
