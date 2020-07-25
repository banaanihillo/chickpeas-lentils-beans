<template>
    <div>
    <table id = "scorecard" border = 1>
        <tr>
            <td id = "scorecard-title" v-if = "selectedTeam"> {{selectedTeam}} </td>
            <td v-else id = "scorecard-title-empty"> Team name </td>
            <th
                scope = "col"
                v-for = "inning in innings"
                v-bind:key = "inning"
                id = "column-header"
            >
                {{inning}}
            </th>
        </tr>
        <tr v-for = "player in selectedPlayers" v-bind:key = "player.name">
            <th scope = "row" v-if = "getPlayer(player.name)" id = "row-header">
                #{{getPlayer(player.name).number}} <br />
                {{player.name}} <br />
                <select>
                    <option disabled value = ""></option>
                    <option
                        v-for = "position in getPlayer(player.name).positions"
                        v-bind:key = "position"
                    >
                        {{position}}
                    </option>
                </select>
            </th>
            <th v-else id = "row-header-empty"> {{player.name}} </th>

            <td v-for = "inning in innings" v-bind:key = "inning">
                <span v-for = "ball in 3" v-bind:key = "'Ball ' + ball" id = "ball">
                    <input type = checkbox />
                </span> <br />
                <span v-for = "strike in 2" v-bind:key = "'Strike ' + strike" id = "strike">
                    <input type = checkbox />
                </span> <br />
                <select v-model = "player.plateAppearances[inning]">
                    <option disabled value = "" selected> Payoff </option>
                    <optgroup label = "Base hit">
                        <option> 1B </option>
                        <option> 2B </option>
                        <option> 3B </option>
                        <option> HR </option>
                    </optgroup>
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
                    <option> SAC </option>

                </select> <br />
                <span>
                    <input
                        type = "text"
                        pattern = "([1-9]-)*([1-9])"
                        size = 5ch
                        value = ""
                        placeholder = "Putout"
                        title = "Fielder, or fielders separated by hyphens"
                    />
                </span> <br />
                <svg width = "60px" height = "60px">
                    <path d = "
                                M 30 5
                                L 55 30
                                L 30 55
                                L 5 30
                                z
                    " />
                    <text x = "30" y = "35" text-anchor = "middle">
                        {{player.plateAppearances[inning]}}
                    </text>
                </svg>
                <!--
                <svg width = "3ch" height = "3ch">
                    <g>
                        <line x1 = "0" y1 = "20" x2 = "20" y2 = "0" id = "second-to-third" />
                        
                        <line x1 = "0" y1 = "0" x2 = "20" y2 = "20" id = "first-to-second" />
                        <line x1 = "0" y1 = "0" x2 = "20" y2 = "20" id = "third-to-home" />
                        <line x1 = "0" y1 = "20" x2 = "20" y2 = "0" id = "home-to-first" />
                        
                    </g>
                </svg>
                <svg width = "3ch" height = "3ch">
                    <line x1 = "0" y1 = "0" x2 = "20" y2 = "20" id = "first-to-second" />
                    <text> K </text>
                </svg>
                <svg width = "3ch" height = "3ch">
                    <line x1 = "0" y1 = "0" x2 = "20" y2 = "20" id = "third-to-home" />
                </svg>
                <svg width = "3ch" height = "3ch">
                    <line x1 = "0" y1 = "20" x2 = "20" y2 = "0" id = "home-to-first" />
                </svg>
                -->
                <!--
                <br />
                <div id = "diamond">
                    <div id = "diamond-top">
                        <div id = "first-to-second"> SB </div>
                    </div>
                    <div id = "diamond-bottom">
                        {{player.plateAppearances[inning]}}
                    </div>
                </div>
                -->
            </td>
        </tr>
    </table>

    <h5> Batting statistics </h5>
    <batting-statistics v-bind:battingOrder = "selectedPlayers" />

    </div>
</template>

<script>
    import BattingStatistics from "./BattingStatistics"

    export default {
        name: "ScoreCard",
        components: {
            BattingStatistics
        },
        props: {
            selectedPlayers: Object,
            innings: Number,
            selectedTeam: String
        },/*
        data() {
            return {
                plateAppearances: [],
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
        background-color: black;
        margin-left: auto;
        margin-right: auto;
    }
    /*
    #diamond-top {
        width: 0;
        height: 0;
        border: 2ch solid transparent;
        border-bottom-color: deeppink;
        margin-left: auto;
        margin-right: auto;
    }
    #diamond-bottom {
        width: 0;
        height: 0;
        border: 2ch solid transparent;
        border-top-color: magenta;
        margin-left: auto;
        margin-right: auto;
        color: gold;
    }
    #first-to-second {
        color: yellow;
    }
    */
    #row-header {
        color: magenta;
        width: 25ch;
    }
    #row-header-empty {
        color: gray;
    }
    #column-header {
        color: magenta;
        height: 4ch;
    }
    #scorecard-title {
        background-color: hotpink;
        color: black;
        width: 25ch;
    }
    #scorecard-title-empty {
        color: darkslategray;
        width: 25ch;
    }
    input:invalid {
        background-color: tomato;
    }
    input {
        background-color: thistle;
    }
    select {
        background-color: plum;
    }
    #ball {
        background-color: green;
        font-size: 2ch;
    }
    #strike {
        background-color: gold;
        font-size: 2ch;
    }
    #ball input:checked {
        box-shadow: 0 0 0 1px chartreuse;
    }
    #strike input:checked {
        box-shadow: 0 0 0 1px;
    }
    path {
        fill: fuchsia;
        stroke: gold;
        stroke-width: 3;
    }
    /*
    line {
        stroke: deeppink;
    }
    #home-to-first {
        stroke: yellow;
    }
    */
</style>
