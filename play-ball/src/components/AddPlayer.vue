<template>
    <div id = "add-player">
        <form v-on:submit.prevent = "addPlayer(input)">
            <p v-if = "errors.length">
                Make sure all the required fields are filled:
                <ul v-for = "error in errors" v-bind:key = "error">
                    <li> {{error}} </li>
                </ul>
            </p>
            <p v-else-if = "notification.length">
                {{notification}}
            </p>

            <label for = "name-input"> Name: </label>
            <input v-model = "input.name" id = "name-input" />
            <br />
            <label for = "alternate-spelling-input">
                Alternate spelling for non-roman script:
            </label>
            <input
                v-model = "input.alternate"
                placeholder = "Romanized name"
                id = "alternate-spelling-input"
            /> <br />
            <label for = "number-input"> Number: </label>
            <input
                v-model.number = "input.number"
                type = "number"
                min = 0
                max = 99
                title = "Number from 0 to 99"
                id = "number-input"
            /> <br />

            <label for = "team-input"> Team: </label>
            <select v-model = "input.team" id = "team-input">
                <option disabled value = ""> Select the team </option>
                <option
                    v-for = "team in teams"
                    v-bind:key = "team._id"
                >
                    {{team.name}}
                </option>
            </select> <br />
            
            <label> Positions: </label>
            <span
                v-for = "position in listOfPositions"
                v-bind:key = "position"

            >
                <label v-bind:for = "position">
                    {{position}}
                </label>
                <input
                    type = "checkbox"
                    v-bind:value = "position"
                    v-model = "input.positions"
                    v-bind:id = "position"
                />
            
            </span> <br />
            
            <label for = "preferred-position">
                Preferred position:
            </label>
            <select
                v-model = "input.preferredPosition"
                id = "preferred-position"
            >
                <option disabled value = "">
                    Select primary position
                </option>
                <option
                    v-for = "position in listOfPositions"
                    v-bind:key = "position + ' '"
                >
                    {{position}}
                </option>
            </select> <br />

            <label> Bats: </label>
                <label for = "bats-left"> Left </label>
                <input
                    type = "radio"
                    value = "L"
                    v-model = "input.bats"
                    id = "bats-left"
                />
                <label for = "bats-right"> Right </label>
                <input
                    type = "radio"
                    value = "R"
                    v-model = "input.bats"
                    id = "bats-right"
                />
                <label for = "switch-hitter"> Switch </label>
                <input
                    type = "radio"
                    value = "S"
                    v-model = "input.bats"
                    id = "switch-hitter"
                />
            <br />

            <label> Throws: </label>
                <label for = "throws-left"> Left </label>
                <input
                    type = "radio"
                    value = "L"
                    v-model = "input.throws"
                    id = "throws-left"
                />
                <label for = "throws-right"> Right </label>
                <input
                    type = "radio"
                    value = "R"
                    v-model = "input.throws"
                    id = "throws-right"
                />
            
            <br /> <label for = "role-input"> Role: </label>
            <select v-model = "input.role" id = "role-input">
                <option disabled value = ""> Select a role </option>
                <option v-for = "role in roles" v-bind:key = "role">
                    {{role}}
                </option>
            </select> <br />

            <button type = "submit"> Submit </button>
        </form>
    </div>
</template>

<script>
    export default {
        name: "AddPlayer",
        computed: {
            console: () => console,
            teams() {
                return this.$store.state.teams
            }
        },
        methods: {
            emptyFields() {
                Object.entries(this.input).map(([key, value]) => {
                    if (!value) {
                        this.$delete(this.input, key)
                    }
                })
            },
            addPlayer() {
                this.errors = []
                if (!this.input.name) {
                    this.errors.push("A name is required.")
                }
                if (
                    !this.input.number
                    || this.input.number < 0
                    || this.input.number > 99
                ) {
                    this.errors.push(
                        "A number between 0 and 99 is required."
                    )
                }
                if (!this.input.team) {
                    this.errors.push(
                        "The team of the player is required."
                    )
                }
                if (!this.input.throws) {
                    this.errors.push("Handedness is required.")
                }
                if (
                    !this.input.positions.includes("P")
                    && !this.input.bats
                ) {
                    this.errors.push(
                        "Position players require a batting side."
                    )
                }
                if (this.errors.length === 0) {
                    this.emptyFields()
                    this.$store.dispatch({
                        type: "signFreeAgent",
                        input: this.input
                    })
                    this.notification = (
                        `Successfully added ${this.input.name}.`
                    )
                    setTimeout(() => {
                        this.notification = ""
                    },
                    6000)
                }
            }
        },
        data() {
            return {
                errors: [],
                notification: "",
                input: {
                    name: "",
                    alternate: null,
                    number: "",
                    team: "",
                    positions: [],
                    preferredPosition: null,
                    bats: null,
                    throws: "",
                    role: null
                },
                listOfPositions: [
                    "P", "C", "1B", "2B", "3B", "SS", "LF", "CF", "RF", "DH"
                ],
                roles: [
                    "Starting pitcher",
                    "Relief pitcher",
                    "Closer",
                    "Everyday",
                    "Bench",
                    "Utility",
                    "Two-way player"
                ]
            }
        }
    }
</script>

<style scoped>
    #add-player {
        color: black;
    }
    input {
        background-color: pink;
    }
    select {
        background-color: violet;
    }
    input:invalid {
        background-color: crimson;
    }
    #number-input {
        width: 5ch;
    }
    label {
        margin-left: 1em;
    }
</style>
