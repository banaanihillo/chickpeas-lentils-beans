<template>
    <table id = "pitching-score-card">
        <tr id = "scorecard-header">
            <td id = "scorecard-title"> Pitcher </td>
            <th v-for = "stat in stats" v-bind:key = "stat + ' header'">
                {{stat}}
            </th>
            <th> Innings </th>
        </tr>
        <tr v-for = "row in 13" v-bind:key = "'Pitching slot number ' + row" id = "row">
            <th>
                <span v-if = "selectedTeam">
                    <select>
                        <option disabled value = "" selected></option>
                        <option
                            v-for = "pitcher in getPitchers(selectedTeam)"
                            v-bind:key = "pitcher + Math.random()"
                        >
                            {{pitcher}}
                        </option>
                    </select>
                </span>
                <span v-else id = "pitching-slot-empty"> Pitcher number {{row}} </span>
            </th>
            <td v-for = "stat in stats" v-bind:key = "stat + ' row'">
                <input type = "number" />
            </td>
            <td>
                <input type = "text" maxlength = 6
                    pattern = "([1-9]?[0-9])((\+)|(⅓)|(⅔)|(\s[1-2]\/3))?"
                    title = "N, N+, N 1/3 or N 2/3, where N is the number of complete innings.
                    Unicode N⅓ and N⅔ are also allowed."
                />
            </td>
        </tr>
    </table>
</template>

<script>
    export default {
        name: "PitchingScoreCard",
        props: {
            selectedTeam: String
        },
        data() {
            return {
                stats: [
                    "Runs", "(Earned)", "Hits", "BB + HBP", "K", "Pitches"
                ]
            }
        },
        computed: {
            players() {
                return this.$store.state.players
            }
        },
        methods: {
            getPitchers(selectedTeam) {
                const pitchers = this.players.filter(player =>
                    player.positions.includes("P") && player.team.name === selectedTeam
                )
                const pitcherNames = pitchers.map(pitcher => pitcher.name)
                return pitcherNames
            }
        }
    }
</script>

<style scoped>
    #pitching-score-card {
        color: darkorchid;
        margin-left: auto;
        margin-right: auto;
        flex-wrap: wrap;
    }
    input {
        width: 8ch;
        height: 3ch;
        background-color: black;
        color: magenta;
        text-align: center;
        font-size: 2ch;
    }
    input:invalid {
        background-color: lightsalmon;
    }
    select {
        background-color: black;
        color: deeppink;
    }
    #scorecard-header {
        font-size: 2ch;
        background-color: black;
    }
    #row {
        height: 3ch;
        background-color: black;
    }
    #scorecard-title {
        color: orchid;
    }
    #pitching-slot-empty {
        color: lightslategray;
    }
</style>
