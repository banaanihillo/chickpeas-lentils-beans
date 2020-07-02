import Vue from "vue"
import Vuex from "vuex"
import VueRouter from "vue-router"
import App from "./App.vue"

import Players from "./components/Players"
import Teams from "./components/Teams"
import playerService from "./services/playerService"
import teamService from "./services/teamService"

Vue.use(Vuex)
Vue.use(VueRouter)

Vue.config.productionTip = false

const routes = [
    {
        path: "/players",
        component: Players
    },
    {
        path: "/teams",
        component: Teams
    }
]

const router = new VueRouter({
    routes: routes
})
//
const store = new Vuex.Store({
    state: {
        players: [

        ],
        teams: [

        ]
    },
    mutations: {
        initializeTeams(state, payload) {
            state.teams = payload.teams
        },
        initializePlayers(state, payload) {
            state.players = payload.players
        }/*,
        addExpansionTeam: {

        },
        signFreeAgent: {

        },
        makeTrade: {

        }*/
    },
    getters: {

    }
})

new Vue({
  render: h => h(App),
  store: store,
  router: router,
  async created() {
      try {
          const teams = await teamService.getTeams()
          this.$store.commit("initializeTeams", {
              type: "INITIALIZE_TEAMS",
              teams: teams
          })
      } catch (error) {
          console.log(error)
      }
      try {
          const players = await playerService.getPlayers()
          this.$store.commit("initializePlayers", {
              type: "INITIALIZE_PLAYERS",
              players: players
          })
      } catch (error) {
          console.log(error)
      }
  }
}).$mount("#app")
