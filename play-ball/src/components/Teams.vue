<template>
    <div id = "teams">
        <ul v-for = "team in teams" v-bind:key = "team.id">
            <li id = "team-list-item">
                <p id = "team-name"> {{team.name}} </p>
                <label for = "newName"> Change nickname: </label>
                <input
                    type = "text"
                    v-model = "team.name"
                    size = "30ch"
                    v-on:input = "team.nameModified = true"
                />
                <span v-if = "team.nameModified">
                    <br />
                    <label for = "newAbbreviation"> Change abbreviation: </label>
                    <input
                        type = "text"
                        v-model = "team.abbreviation"
                        maxlength = "3"
                        size = "3ch"
                    />
                </span>
                <p id = "organization"> {{team.organization}} </p>
                <p>
                    <span v-if = "team.league">
                        <p v-if = "team.organization === 'Major League Baseball'">
                            <label for = "newLeague"> Realign leagues: </label> <br />
                            <span
                                v-for = "league in majorLeagueBaseball"
                                v-bind:key = "league"
                            >
                                <label for = "newLeagueSelection"> {{league}} </label>
                                <input
                                    type = "radio"
                                    v-model = "team.league"
                                    v-bind:value = "league"
                                    id = "new-league"
                                    v-on:input = "team.modified = true"
                                />
                            </span>
                        </p>
                        <span id = "league"> {{team.league}} </span>
                        <span v-if = "team.division">
                            <span id = "division"> {{team.division}} </span>
                            <p>
                                <label for = "newDivision"> Realign divisions: </label> <br />
                                <span v-for = "division in divisions" v-bind:key = "division">
                                    <label for = "newDivisionSelection"> {{division}} </label>
                                    <input
                                        type = "radio"
                                        v-model = "team.division"
                                        v-bind:value = "division"
                                        id = "new-division"
                                        v-on:input = "team.modified = true"
                                    />
                                </span>
                            </p>
                        </span>
                    </span>
                </p>
                <span v-if = "team.modified || team.nameModified">
                    <button v-on:click = "modifyTeam(team)"> Save changes </button>
                    <li v-for = "error in errors" v-bind:key = "error">
                        {{error}}
                    </li>
                </span>
            </li>
        </ul>
        <p>
            <a href = "#teams"> Back to top </a>
        </p>
    </div>
</template>

<script>
    export default {
        name: "Teams",
        computed: {
            teams() {
                return this.$store.state.teams
            }
        },
        methods: {
            modifyTeam(team) {
                this.errors = []
                if (team.name.length < 1) {
                    this.errors.push("The name should not be empty.")
                }
                if (team.abbreviation.length < 1) {
                    this.errors.push("The abbreviation should not be empty.")
                }
                if (this.errors.length === 0) {
                    if (team.modified) {
                        delete team.modified
                    }
                    if (team.nameModified) {
                        delete team.nameModified
                    }
                    this.$store.dispatch({
                        type: "modifyTeam",
                        input: team
                    })
                }
            }
        },
        data() {
            return {
                divisions: ["East", "Central", "West"],
                majorLeagueBaseball: ["National League", "American League"],
                errors: []
            }
        }
    }
</script>

<style scoped>
    #teams {
        background-color: black;
        color: mediumvioletred;
    }
    #new-division {
        margin-right: 2ch;
    }
    input[type=text] {
        background-color: thistle;
    }
    #team-list-item {
        margin-bottom: 5ch;
    }
    #organization {
        color: blueviolet;
    }
    #league {
        color: magenta;
    }
    #division {
        color: deeppink;
    }
    #team-name {
        font-size: 2ch;
    }
    a {
        color: yellowgreen;
    }
    a:visited {
        color: teal;
    }
</style>
