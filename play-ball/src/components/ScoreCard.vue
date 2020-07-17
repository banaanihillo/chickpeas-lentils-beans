<template>
    <table id = "scorecard" border = 1>
        <tr>
            <td id = "scorecard-title"> Away </td>
            <th
                scope = "col"
                v-for = "inning in innings"
                v-bind:key = "inning"
                id = "column-header"
            >
                {{inning}}
            </th>
        </tr>
        <tr v-for = "player in selectedPlayers" v-bind:key = "player + Math.random()">
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
            <th v-else> Fill out the batting order above </th>

            <td v-for = "inning in innings" v-bind:key = "inning">
                <span v-for = "ball in 3" v-bind:key = "'Ball ' + ball">
                    <input type = checkbox />
                </span> <br />
                <span v-for = "strike in 2" v-bind:key = "'Strike ' + strike">
                    <input type = checkbox />
                </span> <br />
                <select>
                    <option disabled value = "" selected> Payoff </option>
                    <option> H </option>
                    <option> E </option>
                    <option> Fc </option>
                    <option> BB </option>
                    <option> HBP </option>
                    <option> K </option>
                    <option> F </option>
                    <option> L </option>
                    <option> GO </option>
                    <option> DP </option>
                    <option> PO </option>
                    <option> FO </option>
                </select> <br />
                <input
                    type = "text"
                    pattern = "([1-9]-)*([1-9])"
                    size = 5ch
                    value = ""
                    placeholder = "Putout"
                    title = "Fielder, or fielders separated by hyphens"
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
            selectedPlayers: Object,
            innings: Number
        },/*
        data() {
            return {
                payoff: "",
                putout: "",
                play: ""
            }
        },*/
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
        background-color: hotpink;
        color: silver;
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
    #column-header {
        color: black;
    }
    #scorecard-title {
        background-color: magenta;
        color: black;
    }
    input:invalid {
        background-color: tomato;
    }
</style>
