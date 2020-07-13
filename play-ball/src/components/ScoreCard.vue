<template>
    <div class = "score-card">
        <h1> {{message}} </h1>

        <h2> Defensive scorecard </h2>
        <form>
            <input />
        </form>

        <h2> Offensive scorecard </h2>
        <form>
            <input />
        </form>

        <h3> Boxscore </h3>
        <form>
            <label for = "away-team"> Away: </label>
            <select v-model = "boxScore.awayTeam">
                <option disabled value = ""> Away team </option>
                <option v-for = "team in teams" v-bind:key = "team._id">
                    {{team.name}}
                </option>
            </select>

            <label for = "home-team"> Home: </label>
            <select v-model = "boxScore.homeTeam">
                <option disabled value = ""> Home team </option>
                <option v-for = "team in teams" v-bind:key = "team._id">
                    {{team.name}}
                </option>
            </select>

            <BoxScore />
        </form>

    </div>
</template>

<script>
    import BoxScore from "./BoxScore"

    export default {
        name: "ScoreCard",
        components: {
            BoxScore
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
                boxScore: {
                    awayTeam: "",
                    homeTeam: ""
                }
            }
        },
        props: {
            message: String
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
