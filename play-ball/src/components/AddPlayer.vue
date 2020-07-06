<template>
    <div id = "add-player">
        <form @submit.prevent = "addPlayer(input)">
            <p v-if = "errors.length">
                Make sure all the required fields are filled:
                <ul v-for = "error in errors" v-bind:key = "error">
                    <li> {{error}} </li>
                </ul>
            </p>

            <label for = "name"> Name: </label> <input v-model = "input.name" /> <br />
            <label for = "alternate"> Alternate spelling for non-roman script: </label>
            <input v-model = "input.alternate" placeholder = "Romanized name" /> <br />
            <label for = "number"> Number: </label>
            <input
                v-model.number = "input.number"
                type = "number"
                min = 0
                max = 99
            /> <br />
            <label for = "team"> Team: </label> <input v-model = "input.team" /> <br />
            
            <label for = "positions"> Positions: </label>
            <span v-for = "position in listOfPositions" v-bind:key = "position">
                <input type = "checkbox" :value = "position" v-model = "input.positions" />
                <label for = "position" style = "margin-right: 5px">
                    {{position}}
                </label>
            </span> <br />
            
            <label for = "preferred-position"> Preferred position: </label>
            <select v-model = "input.preferredPosition">
                <option disabled value = ""> Select primary position </option>
                <option v-for = "position in listOfPositions" v-bind:key = "position + ' '">
                    {{position}}
                </option>
            </select> <br />

            <label for = "bats"> Bats: </label>
                <input type = "radio" value = "L" v-model = "input.bats" />
                <label for = "Left"> Left </label>
                <input type = "radio" value = "R" v-model = "input.bats" />
                <label for = "Right"> Right </label>
                <input type = "radio" value = "S" v-model = "input.bats" />
                <label for = "Switch"> Switch </label>
            <br />

            <label for = "throws"> Throws: </label>
                <input type = "radio" value = "L" v-model = "input.throws" />
                <label for = "Left"> Left </label>
                <input type = "radio" value = "R" v-model = "input.throws" />
                <label for = "Right"> Right </label>
            
            <br /> <label for = "role"> Role: </label>
            <select v-model = "input.role">
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
            console: () => console
        },
        methods: {
            /*emptyFields() {
                let copyOfInput = this.input
                console.log(copyOfInput)
                let trimmedInput = Object.values(copyOfInput).filter(value => {
                    if (!value) {
                        return
                    } else {
                        return Object.keys(copyOfInput).map(key => {
                            return {
                                key: value
                            }
                        })
                    }
                })
                console.log(trimmedInput)
                return trimmedInput
            },*/
            addPlayer() {
                this.errors = []
                if (!this.input.name) {
                    this.errors.push("A name is required.")
                }
                if (!this.input.number || this.input.number < 0 || this.input.number > 99) {
                    this.errors.push("A number between 0 and 99 is required.")
                }
                if (!this.input.team) {
                    this.errors.push("The team of the player is required.")
                }
                if (!this.input.throws) {
                    this.errors.push("Handedness is required.")
                }
                if (!this.input.positions.includes("P") && !this.input.bats) {
                    this.errors.push("Position players require a batting side.")
                }
                if (this.errors.length === 0) {
                    this.$store.dispatch({
                        type: "signFreeAgent",
                        input: this.input
                    })
                }
            }
        },
        data() {
            return {
                errors: [],
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
