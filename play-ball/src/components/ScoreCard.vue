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
        <tr v-for = "(player, index) in selectedPlayers" v-bind:key = "player.name">
            <th scope = "row" v-if = "player.name" id = "row-header">
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
            <th v-else id = "row-header-empty"> Batting order number {{index}} </th>
            <td v-for = "inning in innings" v-bind:key = "inning">
                <span v-for = "ball in 3" v-bind:key = "'Ball ' + ball" id = "ball">
                    <input type = checkbox />
                </span> <br />
                <span v-for = "strike in 2" v-bind:key = "'Strike ' + strike" id = "strike">
                    <input type = checkbox />
                </span> <br />
                <select
                    value = ""
                    v-on:change = "({target}) => addPayoff(target.value, player, inning)"
                >
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
                    <option> SAC </option>

                </select> <br />
                <span v-if = "player.plateAppearances">
                    <span v-if = "player.plateAppearances[inning]">
                        <span v-if = "player.plateAppearances[inning].payoff === 'H'">
                            <select
                                id = "type-of-hit"
                                @change = "({target}) => addHit(target.value, player, inning)"
                            >
                                <option disabled value = "" selected> Hit </option>
                                <option> 1B </option>
                                <option> 2B </option>
                                <option> 3B </option>
                                <option> HR </option>
                            </select>
                            <br />
                        </span>
                        <span v-else-if = "player.plateAppearances[inning].payoff === 'BB'
                            || player.plateAppearances[inning].payoff === 'HBP'
                            || player.plateAppearances[inning].payoff === 'Fc'
                            || player.plateAppearances[inning].payoff === 'K'"/>
                        <span v-else>
                            <input
                                type = "text"
                                pattern = "([1-9]-)*([1-9])"
                                size = 4ch
                                value = ""
                                placeholder = "Putout"
                                title = "Fielder, or fielders separated by hyphens"
                                v-on:input = "({target}) =>
                                    addPutout(target.value, player, inning)"
                            />
                            <br />
                        </span>
                        <span
                            id = "runs-batted-in"
                            v-if = "checkPayoff(player.plateAppearances[inning].payoff)"
                        > RBI:
                            <select
                                @change = "({target}) => addRBI(target.value, player, inning)"
                                id = "runs-batted-in-input"
                            >
                                <option selected value = 0> 0 </option>
                                <option
                                    v-for = "number in 4"
                                    v-bind:key = "number"
                                    v-bind:value = "number"
                                >
                                    {{number}}
                                </option>
                            </select>
                        </span>
                    </span>
                </span>
                <br />
                <!---->
                <svg width = "6.5ch" height = "6.5ch">
                    <g>
                        <line
                            x1 = "30" y1 = "55" x2 = "55" y2 = "30"
                            id = "home-to-first" onclick = "style.stroke='yellow'"/>
                        <line
                            x1 = "55" y1 = "30" x2 = "30" y2 = "5"
                            id = "first-to-second" onclick = "style.stroke='yellow'" />
                        <line
                            x1 = "30" y1 = "5" x2 = "5" y2 = "30"
                            id = "second-to-third" onclick = "style.stroke='yellow'" />
                        <line
                            x1 = "5" y1 = "30" x2 = "30" y2 = "55"
                            id = "third-to-home" onclick = "style.stroke='yellow'" />
                    </g>
                    <g v-if = "player.plateAppearances">
                        <g v-if = "player.plateAppearances[inning]">
                            <text
                                x = "30"
                                y = "35"
                                text-anchor = "middle"
                                v-if = "player.plateAppearances[inning].typeOfHit"
                                id = "base-hit"
                            >
                                {{player.plateAppearances[inning].typeOfHit}}
                            </text>
                            <text
                                x = "30"
                                y = "35"
                                text-anchor = "middle"
                                v-else-if = "player.plateAppearances[inning].putout"
                                id = "putout"
                            >

                                {{player.plateAppearances[inning].putout}}
                            </text>
                            <text
                                v-else-if = "player.plateAppearances[inning].payoff"
                                x = "30"
                                y = "35"
                                text-anchor = "middle"
                                id = "payoff"
                            >
                            
                                {{player.plateAppearances[inning].payoff}}
                            </text>
                        </g>
                    </g>
                </svg>
                
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
        },
        
        computed: {
            players() {
                return this.$store.state.players
            },
            console: () => console,
            window: () => window
        },
        methods: {
            getPlayer(playerName) {
                return this.players.find(player => player.name === playerName)
            },
            addPutout(value, player, inning) {
                if (player.plateAppearances[inning].payoff === "GO"
                    || player.plateAppearances[inning].payoff === "DP")
                {
                    this.$set(player.plateAppearances[inning], "putout", value)
                }
                else {
                    const putout = player.plateAppearances[inning].payoff + value
                    this.$set(player.plateAppearances[inning], "putout", putout)
                }
            },
            addPayoff(value, player, inning) {
                if (!Object.prototype.hasOwnProperty.call(player, "plateAppearances")) {
                    this.$set(player, "plateAppearances", {})
                }
                const plateAppearance = {
                    payoff: value
                }
                this.$set(player.plateAppearances, inning, plateAppearance)
            },
            addHit(value, player, inning) {
                this.$set(player.plateAppearances[inning], "typeOfHit", value)
            },
            addRBI(value, player, inning) {
                this.$set(player.plateAppearances[inning], "runsBattedIn", Number(value))
            },
            checkPayoff(payoff) {
                if (payoff === 'K' || payoff === 'DP') {
                    return false
                } else {
                    return true
                }
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

    #row-header {
        color: magenta;
        width: 1fr;
    }
    #row-header-empty {
        color: gray;
    }
    #column-header {
        color: magenta;
        width: 8ch;
        height: 4ch;
    }
    #scorecard-title {
        background-color: hotpink;
        color: black;

    }
    #scorecard-title-empty {
        color: darkslategray;
        
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
    
    line {
        stroke: deeppink;
        stroke-width: 2;
    }
    line:hover {
        stroke: yellow;
    }
    text {
        fill: magenta;
    }
    #payoff {
        stroke: gold;
    }
    #putout {
        stroke: tomato;
    }
    #runs-batted-in-input {
        background-color: darkkhaki;
    }
    #base-hit {
        stroke: lime;
    }
    #runs-batted-in {
        color: hotpink;
    }
    #type-of-hit {
        background-color: limegreen;
    }
</style>
