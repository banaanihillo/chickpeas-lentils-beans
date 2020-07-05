<template>
    <div id = "add-player">
        <form @submit.prevent = "addPlayer(input)">
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
            addPlayer() {
                this.$store.dispatch({
                    type: "signFreeAgent",
                    input: this.input
                })
            }
        },
        data() {
            return {
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
