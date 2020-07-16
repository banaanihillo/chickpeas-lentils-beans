<template>
    <table id = "scorecard" border = 1>
        <tr>
            <td> Away </td>
            <th scope = "col" v-for = "inning in innings" v-bind:key = "inning">
                {{inning}}
            </th>
        </tr>
        <tr v-for = "player in awayPlayers" v-bind:key = "player + Math.random()">
            <th scope = "row" v-if = "getPlayer(player)" id = "row-header">
                #{{getPlayer(player).number}} <br />
                {{getPlayer(player).name}} <br />
                <select>
                    <option disabled value = ""></option>
                    <option
                        v-for = "position in getPlayer(player).positions"
                        v-bind:key = "position"
                    >
                        {{position}}
                    </option>
                </select>
            </th>
            <th v-else></th>

            <td v-for = "inning in innings" v-bind:key = "inning">
                <span v-for = "ball in 3" v-bind:key = "'Ball ' + ball">
                    <input type = checkbox />
                </span> <br />
                <span v-for = "strike in 2" v-bind:key = "'Strike ' + strike">
                    <input type = checkbox />
                </span> <br />
                <select v-model = "payoff">
                    <option disabled value = ""> Payoff </option>
                    <option> H </option>
                    <option> E </option>
                    <option> Fc </option>
                    <option> K </option>
                    <option> F </option>
                    <option> L </option>
                    <option> GO </option>
                    <option> DP </option>
                </select> <br />
                <input
                    v-if = "payoff === 'E' || payoff === 'F' || payoff === 'L'
                    || payoff === 'GO' || payoff === 'DP'"
                    type = "text" placeholder = "Play" size = 5ch
                />
            </td>
        </tr>
    </table>
</template>

<script>
//
    export default {
        name: "ScoreCard",
        //
        props: {
            awayPlayers: Object,
            homePlayers: Object,
            innings: Number
        },
        data() {
            return {
                payoff: "",
                putout: ""
            }
        },
        computed: {
            players() {
                return this.$store.state.players

            }
        },
        methods: {
            getPlayer(playerName) {
                return this.players.find(player => player.name === playerName)
            }

        }
    }
</script>
<!---->
<style scoped>
    #scorecard {
        background-color: violet;
        color: darkmagenta;
    }
    #diamond {
        background-color: hotpink;
        transform: rotate(0.125turn);
        width: 3ch;
        height: 3ch;
    }
    #row-header {
        color: black;
        width: 25ch;
    }
</style>
