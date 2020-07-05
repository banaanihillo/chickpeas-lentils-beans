<template>
    <div>
        <form @submit = "addTeam(input)">
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

            <p v-if = "hasDivisions()">
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
                this.$store.dispatch({
                    type: "addExpansionTeam",
                    input: this.input
                })
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
