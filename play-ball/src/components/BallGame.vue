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
        <form v-for = "batter in 9" v-bind:key = "'Away batter ' + batter">
            <select
                v-if = "findPlayers(awayTeam).length > 0"
                v-model = "awayPlayers[batter].name"
            >
                <option disabled value = ""> Away batter {{batter}} </option>
                <option v-for = "player in findPlayers(awayTeam)" v-bind:key = "player._id">
                    {{player.name}}
                </option>
            </select>
        </form>

        <label for = "home-players"> Home batting order: </label>
        <form v-for = "batter in 9" v-bind:key = "'Home batter ' + batter">
            <select
                v-if = "findPlayers(homeTeam).length > 0"
                v-model = "homePlayers[batter].name"
            >
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
        <!---->
        <h4> Pitching </h4>
        <pitching-score-card v-bind:selectedTeam = "awayTeam" />

        <h3> Home </h3>
        <h4> Position players </h4>
        <score-card
            v-bind:selectedPlayers = "homePlayers"
            v-bind:innings = "innings"
            v-bind:selectedTeam = "homeTeam"
        />
        <!---->
        <h4> Pitching </h4>
        <pitching-score-card v-bind:selectedTeam = "homeTeam" />

        <h3> Box score </h3>
        <box-score
            v-bind:innings = "innings"
            v-bind:awayPlayers = "awayPlayers"
            v-bind:homePlayers = "homePlayers"
        />
        
        <button @click.prevent = "innings++">
            Extra innings
        </button>
    </div>
</template>

<script>
    import BoxScore from "./BoxScore"
    import ScoreCard from "./ScoreCard"
    import PitchingScoreCard from "./PitchingScoreCard"
    //
    export default {
        name: "BallGame",
        components: {
            BoxScore,
            ScoreCard,
            PitchingScoreCard
        },
        computed: {
            players() {
                return this.$store.state.players
            },
            teams() {
                return this.$store.state.teams

            },
            console: () => console,
            window: () => window
        },
        data() {
            return {
                awayPlayers: {
                    1: {},
                    2: {},
                    3: {},
                    4: {},
                    5: {},
                    6: {},
                    7: {},
                    8: {},
                    9: {}
                },
                awayTeam: "",
                homeTeam: "",
                homePlayers: {
                    1: {},
                    2: {},
                    3: {},
                    4: {},
                    5: {},
                    6: {},
                    7: {},
                    8: {},
                    9: {}
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
        background-color: violet;
    }
</style>
