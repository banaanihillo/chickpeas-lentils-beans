<template>
    <div id = "ballgame">
        <h1> Play ball! </h1>
        <label for = "away-team"> Away team: </label>
        <select v-model = "awayTeam">
            <option disabled value = ""> Away </option>
            <option v-for = "team in teams" v-bind:key = "team._id">
                {{team.name}}
            </option>
        </select>

        <label for = "home-team"> Home team: </label>
        <select v-model = "homeTeam">
            <option disabled value = ""> Home </option>
            <option v-for = "team in teams" v-bind:key = "team._id">
                {{team.name}}
            </option>
        </select> <br />

        <label for = "away-players"> Away batting order: </label>
        <form v-for = "batter in 9" v-bind:key = "'Away' + batter">
            <select v-if = "findPlayers(awayTeam).length > 0" v-model = "awayPlayers[batter]">
                <option disabled value = ""> Away batter {{batter}} </option>
                <option v-for = "player in findPlayers(awayTeam)" v-bind:key = "player._id">
                    {{player.name}}
                </option>
            </select>
        </form>

        <label for = "home-players"> Home batting order: </label>
        <form v-for = "batter in 9" v-bind:key = "'Home' + batter">
            <select v-if = "findPlayers(homeTeam).length > 0" v-model = "homePlayers[batter]">
                <option disabled value = ""> Home batter {{batter}} </option>
                <option v-for = "player in findPlayers(homeTeam)" v-bind:key = "player._id">
                    {{player.name}}
                </option>
            </select>
        </form>

        <h2> Score cards </h2>
        <h3> Away </h3>
        <h4> Position players </h4>
        <score-card
            v-bind:selectedPlayers = "awayPlayers"
            v-bind:innings = "innings"
            v-bind:selectedTeam = "awayTeam"
        />
        <h5> Batting statistics </h5>
        <batting-statistics v-bind:battingOrder = "awayPlayers" />

        <h4> Pitching </h4>
        <pitching-score-card v-bind:selectedTeam = "awayTeam" />

        <h3> Home </h3>
        <h4> Position players </h4>
        <score-card
            v-bind:selectedPlayers = "homePlayers"
            v-bind:innings = "innings"
            v-bind:selectedTeam = "homeTeam"
        />
        <h5> Batting statistics </h5>
        <batting-statistics v-bind:battingOrder = "homePlayers" />

        <h4> Pitching </h4>
        <pitching-score-card v-bind:selectedTeam = "homeTeam" />

        <h3> Box score </h3>
        <box-score v-bind:innings = "innings" />
        
        <button @click.prevent = "innings++">
            Extra innings
        </button>
    </div>
</template>

<script>
    import BoxScore from "./BoxScore"
    import ScoreCard from "./ScoreCard"
    import PitchingScoreCard from "./PitchingScoreCard"
    import BattingStatistics from "./BattingStatistics"

    export default {
        name: "BallGame",
        components: {
            BoxScore,
            ScoreCard,
            PitchingScoreCard,
            BattingStatistics
        },
        computed: {
            players() {
                return this.$store.state.players
            },
            teams() {
                return this.$store.state.teams
            }
        },
        data() {
            return {
                awayPlayers: {
                    1: "Away batting order number 1",
                    2: "Away batting order number 2",
                    3: "Away batting order number 3",
                    4: "Away batting order number 4",
                    5: "Away batting order number 5",
                    6: "Away batting order number 6",
                    7: "Away batting order number 7",
                    8: "Away batting order number 8",
                    9: "Away batting order number 9"
                },
                awayTeam: "",
                homeTeam: "",
                homePlayers: {
                    1: "Home batting order number 1",
                    2: "Home batting order number 2",
                    3: "Home batting order number 3",
                    4: "Home batting order number 4",
                    5: "Home batting order number 5",
                    6: "Home batting order number 6",
                    7: "Home batting order number 7",
                    8: "Home batting order number 8",
                    9: "Home batting order number 9"
                },
                innings: 9
            }
        },
        methods: {
            findPlayers(teamName) {
                return this.players.filter(player => player.team.name === teamName)
            }

        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    ul {
        padding: 0;
    }
    li {
        display: inline-block;
        margin: 0 10px;
    }
    a {
        color: #42b983;
    }
    select {
        margin-right: 10%;
    }
</style>
