<template>
    <div>
        <form @submit.prevent = "addTeam(input)" id = "add-team">
            <p v-if = "errors.length">
                Not all fields were correctly filled in:
                <ul v-for = "error in errors" v-bind:key = "error">
                    <li> {{error}} </li>
                </ul>
            </p>
            <p>
                <label for = "name"> Name: </label> <input v-model = "input.name" />
            </p>
            <p>
                <label for = "abbreviation"> Abbreviation: </label>
                <input v-model = "input.abbreviation"  maxlength = "3" />
            </p>
            <p>
                <label for = "alternate"> Alternative spelling: </label>
                <input v-model = "input.alternate" /> <br />
            </p>
            
            <p>
                <label for = "organization"> Organization: </label>
                <span v-for = "organization in organizations" v-bind:key = "organization.id">
                    <input
                        type = "radio"
                        :value = "organization.name"
                        v-model = "input.organization"
                        @click = "input.league = ''; input.division = ''"
                    />
                    <label for = "organization" style = "margin-right: 10px">
                        {{organization.id}}
                    </label>
                </span>
            </p>

            <p v-if = "hasLeagues()">
                <label for = "league"> League: </label>
                <span v-for = "league in hasLeagues()" v-bind:key = "league">
                    <input type = "radio" :value = "league" v-model = "input.league" />
                    <label for = "league"> {{league}} </label>
                </span>
            </p>

            <p v-if = "!(!(input.league) || !(hasDivisions()))">
                <label for = "division"> Division: </label>
                <span v-for = "division in hasDivisions()" v-bind:key = "division">
                    <input type = "radio" :value = "division" v-model = "input.division" />
                    <label for = "division"> {{division}} </label>
                </span>
            </p>
            <button type = "submit"> Submit </button>
        </form>
    </div>
</template>

<script>
    export default {
        name: "AddTeam",
        methods: {
            addTeam() {
                if (this.hasLeagues()) {
                    if (!this.input.league) {
                        this.errors.push("Please specify the league this team belongs to.")
                        return
                    }
                    if (this.hasDivisions() && !this.input.division) {
                        this.errors.push("This league requires a division input.")
                        return
                    }
                }
                if (this.input.name && this.input.abbreviation && this.input.organization) {
                    this.errors = []
                    this.$store.dispatch({
                        type: "addExpansionTeam",
                        input: this.input
                    })
                } else {
                    console.log("Make sure all the required fields are filled.")
                    if (!this.input.name) {
                        this.errors.push("A name is required.")
                    }
                    if (!this.input.abbreviation || this.input.abbreviation.length > 3) {
                        this.errors.push("An abbreviation of 1-3 characters is required.")
                    }
                    if (!this.input.organization) {
                        this.errors.push("Please select an organization for the team.")
                    }
                }
            },
            hasLeagues() {
                const organizationWithLeagues = this.organizations.find(organization =>
                    organization.name === this.input.organization && organization.leagues
                )
                if (organizationWithLeagues) {
                    return organizationWithLeagues.leagues
                }
            },
            hasDivisions() {
                const organizationWithDivisions = this.organizations.find(organization =>
                    organization.divisions
                )
                if (organizationWithDivisions.name === this.input.organization) {
                    return organizationWithDivisions.divisions
                }
            }
        },
        data() {
            return {
                errors: [],
                input: {
                    name: "",
                    abbreviation: "",
                    organization: "",
                    league: null,
                    division: null,
                    alternate: null
                },
                organizations: [
                    {
                        name: "Korean Baseball Organization",
                        id: "KBO"
                    },
                    {
                        name: "Chinese Professional Baseball League",
                        id: "CPBL"
                    },
                    {
                        name: "Nippon Professional Baseball",
                        id: "NPB",
                        leagues: [
                            "Central League", "Pacific League"
                        ]
                    },
                    {
                        name: "Major League Baseball",
                        id: "MLB",
                        leagues: [
                            "National League", "American League"
                        ],
                        divisions: [
                            "East", "Central", "West"
                        ]
                    }
                ]
            }
        }
    }
</script>

<style scoped>
    input {
        background-color: plum;
    }
</style>
