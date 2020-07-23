import Vue from "vue"
import Vuex from "vuex"
import VueRouter from "vue-router"
import App from "./App.vue"

import BallGame from "./components/BallGame"
import Players from "./components/Players"
import Teams from "./components/Teams"
import AddPlayer from "./components/AddPlayer"
import AddTeam from "./components/AddTeam"
import playerService from "./services/playerService"
import teamService from "./services/teamService"

Vue.use(Vuex)
Vue.use(VueRouter)

Vue.config.productionTip = false

const routes = [
    {
        path: "/ballgame",
        component: BallGame
    },
    {
        path: "/players",
        component: Players
    },
    {
        path: "/teams",
        component: Teams
    },
    {
        path: "/add-player",
        component: AddPlayer
    },
    {
        path: "/add-team",
        component: AddTeam
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
        },
        addExpansionTeam(state, payload) {
            state.teams = state.teams.concat(payload)
        },
        signFreeAgent(state, payload) {
            //
            state.players = state.players.concat(payload)   
        },
        modifyPlayer(state, payload) {
            const modifiedPlayer = state.players.find(player => player._id === payload._id)
            state.players = state.players.map(player => {
                return (player._id === payload._id) ? modifiedPlayer : player
            })
        }
    },
    actions: {
        async signFreeAgent(context, payload) {

            context.commit(
                "signFreeAgent",
                await playerService.addPlayer(payload.input)
            )
        },
        async addExpansionTeam(context, payload) {
            context.commit(
                "addExpansionTeam",
                await teamService.addTeam(payload.input)
            )
        },
        async modifyPlayer(context, payload) {
            context.commit(
                "modifyPlayer",
                await playerService.modifyPlayer(payload.input)
            )
        }
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
