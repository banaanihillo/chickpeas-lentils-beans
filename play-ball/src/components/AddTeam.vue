<template>
    <div>
        <form v-on:submit.prevent = "addTeam(input)" id = "add-team">
            <p v-if = "errors.length">
                Not all fields were correctly filled in:
                <ul v-for = "error in errors" v-bind:key = "error">
                    <li> {{error}} </li>
                </ul>
            </p>
            <p v-else-if = "notification.length">
                {{notification}}
            </p>

            <p>
                <label for = "team-name-input"> Name: </label>
                <input
                    v-model = "input.name"
                    id = "team-name-input"
                />
            </p>
            <p>
                <label for = "team-abbreviation-input">
                    Abbreviation:
                </label>
                <input
                    v-model = "input.abbreviation"
                    maxlength = "3"
                    id = "team-abbreviation-input"
                />
            </p>
            <p>
                <label for = "team-alternate-input">
                    Alternative spelling:
                </label>
                <input
                    v-model = "input.alternate"
                    id = "team-alternate-input"
                /> <br />
            </p>
            
            <p>
                <label> Organization: </label>
                <span
                    v-for = "organization in organizations"
                    v-bind:key = "organization.id"
                >
                    <label v-bind:for = "organization.id">
                        {{organization.id}}
                    </label>
                    <input
                        type = "radio"
                        v-bind:value = "organization.name"
                        v-model = "input.organization"
                        v-on:click = "input.league = ''; input.division = ''"
                        v-bind:id = "organization.id"
                    />

                </span>
            </p>

            <p v-if = "hasLeagues()">
                <label> League: </label>
                <span
                    v-for = "league in hasLeagues()"
                    v-bind:key = "league"
                >
                    <label v-bind:for = "league"> {{league}} </label>
                    <input
                        type = "radio"
                        v-bind:value = "league"
                        v-model = "input.league"
                        v-bind:id = "league"
                    />
                </span>
            </p>

            <p v-if = "!(!(input.league) || !(hasDivisions()))">
                <label> Division: </label>
                <span
                    v-for = "division in hasDivisions()"
                    v-bind:key = "division"
                >
                    <label v-bind:for = "division">
                        {{division}}
                    </label>
                    <input
                        type = "radio"
                        v-bind:value = "division"
                        v-model = "input.division"
                        v-bind:id = "division"
                    />

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
                        this.errors.push(
                            "League input is required."
                        )
                        return
                    }
                    if (this.hasDivisions() && !this.input.division) {
                        this.errors.push(
                            "This league requires a division input."
                        )
                        return
                    }
                }
                if (
                    this.input.name
                    && this.input.abbreviation
                    && this.input.organization
                ) {
                    this.errors = []
                    this.$store.dispatch({
                        type: "addExpansionTeam",
                        input: this.input
                    })
                    this.notification = (
                        `Successfully added ${this.input.name}.`
                    )
                    setTimeout(() => {
                        this.notification = ""
                    },
                    6000)
                } else {
                    console.log(
                        "Make sure all required fields are filled."
                    )
                    if (!this.input.name) {
                        this.errors.push("A name is required.")
                    }
                    if (
                        !this.input.abbreviation
                        || this.input.abbreviation.length > 3
                    ) {
                        this.errors.push(
                            "Add an abbreviation of 1-3 characters."
                        )
                    }
                    if (!this.input.organization) {
                        this.errors.push(
                            "Select an organization for the team."
                        )
                    }
                }
            },
            hasLeagues() {
                const organizationWithLeagues = this.organizations
                    .find(organization => (
                        organization.name === this.input.organization
                        && organization.leagues
                    ))
                if (organizationWithLeagues) {
                    return organizationWithLeagues.leagues
                }
            },
            hasDivisions() {
                const organizationWithDivisions = this.organizations
                    .find(organization => organization.divisions)
                if (
                    organizationWithDivisions.name
                    === this.input.organization
                ) {
                    return organizationWithDivisions.divisions
                }
            }
        },
        data() {
            return {
                errors: [],
                notification: "",
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
    label {
        margin-left: 1em;
    }
</style>
