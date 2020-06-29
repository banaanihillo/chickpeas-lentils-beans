import Vue from "vue"
import Vuex from "vuex"
import VueRouter from "vue-router"
import App from "./App.vue"
import axios from "axios"
import Players from "./components/Players"
import Teams from "./components/Teams"
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

const baseURL = "http://localhost:3000"

const store = new Vuex.Store({
    state: {
        /*
        leagues: {
            majorLeagueBaseball: {
                americanLeague: {
                    designatedHitter: true,
                    east: {
                        abbreviation: "AL East"
                    },
                    central: {
                        abbreviation: "AL Central"
                    },
                    west: {
                        abbreviation: "AL West"
                    }
                },
                nationalLeague: {
                    designatedHitter: false,
                    east: {
                        abbreviation: "NL East"
                    },
                    central: {
                        abbreviation: "NL Central"
                    },
                    west: {
                        abbreviation: "NL West"
                    }
                }
            },
            koreanBaseballOrganization: {
                designatedHitter: true
            },
            nipponProfessionalBaseball: {
                centralLeague: {
                    designatedHitter: false
                },
                pacificLeague: {
                    designatedHitter: true
                }
            },
            chineseProfessionalBaseballLeague: {
                designatedHitter: true
            }
        },
        */
        teams: [

        ],
        players: [

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
        getTeam: (state, teamAbbreviation) => {
            return state.teams.find(team => team.id === teamAbbreviation)
        }
    }
})

new Vue({
  render: h => h(App),
  store: store,
  router: router,
  async created() {
      try {
          const response = await axios.get(`${baseURL}/teams`)
          this.$store.commit("initializeTeams", {
              type: "INITIALIZE_TEAMS",
              teams: response.data
          })
      } catch (error) {
          console.log(error)
      }
      try {
          const response = await axios.get(`${baseURL}/players`)
          this.$store.commit("initializePlayers", {
              type: "INITIALIZE_PLAYERS",
              players: response.data
          })
      } catch (error) {
          console.log(error)
      }
  }
}).$mount("#app")
