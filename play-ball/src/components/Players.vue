<template>
    <div id = "players">
        <ul v-for = "player in players" v-bind:key = "player.id">
            <li>
                {{player.name}} #{{player.number}}
                <input
                    type = "number"
                    v-model.number = "player.number"
                    id = "number"
                    @input = "player.modified = true"
                    min = 0
                    max = 99
                />
                <span v-if = "player.positions.includes('P')">
                    <p>
                        <span v-if = "player.throws === 'L'">
                            Left handed
                        </span>
                        <span v-else>
                            Right handed
                        </span>
                        <span>
                            <span v-if = "!player.role || player.role === 'Two-way player'">
                                pitcher
                            </span>
                            <span v-else>
                                {{player.role}}
                            </span>
                            for the {{player.team.name}}.
                        </span>
                    </p>
                    <p>
                        <label for = "pitcherRole"> Assign a new role: </label>
                        <select v-model = "player.role" @input = "player.modified = true">
                            <option disabled value = ""></option>
                            <option
                                v-for = "pitcherRole in roles.pitchers"
                                v-bind:key = "pitcherRole"
                            >
                                {{pitcherRole}}
                            </option>
                        </select>
                    </p>
                </span>
                <span v-if = "
                    (!(player.positions.includes('P'))
                    || player.role === 'Two-way player')
                ">
                    <p>
                        <span v-if = "player.bats === 'L'">
                            Left handed
                        </span>
                        <span v-else-if = "player.bats === 'R'">
                            Right handed
                        </span>
                        <span v-else>
                            Switch
                        </span>
                            hitting
                        <span>
                            <span v-if = "player.role">
                                {{player.role}}
                            </span>
                            <span v-if = "player.preferredPosition">
                                {{player.preferredPosition}}
                            </span>
                            <span v-else-if = "player.role !== 'Two-way player'">
                                {{player.positions[0]}}
                            </span>

                        </span>
                        for the {{player.team.name}}.
                    </p>
                    <p>
                        <label for = "positionPlayerRole"> Assign a new role: </label>
                        <select v-model = "player.role" @input = "player.modified = true">
                            <option disabled value = ""></option>
                            <option
                                v-for = "positionPlayerRole in roles.positionPlayers"
                                v-bind:key = "positionPlayerRole"
                            >
                                {{positionPlayerRole}}
                            </option>
                        </select>
                    </p>
                    <p>
                        Throws
                        <span v-if = "player.throws === 'L'">
                            left
                        </span>
                        <span v-else>
                            right
                        </span>
                        handed.
                    </p>
                    <p v-if = "player.positions.length > 1">
                        Can play {{player.positions.join(", ")}}.
                    </p>
                </span>
                Change positions:
                <br />
                <span v-for = "position in listOfPositions" v-bind:key = "position + 'key'">
                    <label for = "position"> {{position}} </label>
                    <input
                        type = checkbox
                        v-model = "player.positions"
                        id = "positionInput"
                        v-bind:value = "position"
                        @input = "player.positionsModified = true"
                    />
                </span>
                <p v-if = "player.positionsModified">
                    Preferred position, if any:
                    <br />
                    <span v-for = "position in player.positions" v-bind:key = "position">
                        <label for = "preferredPosition"> {{position}} </label>
                        <input
                            type = radio
                            v-model = "player.preferredPosition"
                            v-bind:value = "position"
                            id = "positionInput"
                        />
                    </span>
                </p>
            </li>
            <span v-if = "player.modified || player.positionsModified">
                <button @click.prevent = "modifyPlayer(player)"> Save changes </button>
                <span v-if = "errors.length > 0">
                    <br />
                    Modification unsuccessful:
                    <li v-for = "error in errors" v-bind:key = "error">
                        {{error}}
                    </li>
                </span>
            </span>
            <br />
        </ul>
    </div>
</template>

<script>
    export default {
        name: "Players",
        computed: {
            players() {
                return this.$store.state.players

            },
            console: () => console
        },
        data() {
            return {
                listOfPositions: ["P", "C", "1B", "2B", "3B", "SS", "LF", "CF", "RF", "DH"],
                errors: [],
                roles: {
                    pitchers: [
                        "Starting pitcher",
                        "Closer",
                        "Relief pitcher",
                        "Opener",
                        "Two-way player"
                    ],
                    positionPlayers: [
                        "Everyday",
                        "Bench",
                        "Utility",
                        "Backup",
                        "Platoon",
                        "Two-way player"
                    ]
                }
            }
        },
        methods: {
            modifyPlayer(player) {
                this.errors = []
                if (player.number < 0 || player.number > 99) {
                    this.errors.push("The number should be between 0 and 99.")
                }
                if (player.positions.length === 0) {
                    this.errors.push("Make sure at least one position is checked.")
                }
                if (this.errors.length === 0) {
                    if (player.modified) {
                        delete player.modified
                    }
                    if (player.positionsModified) {
                        delete player.positionsModified
                    }
                    this.$store.dispatch({
                        type: "modifyPlayer",
                        input: player
                    })
                }
            }
        }
    }
</script>

<style scoped>
    #players {
        background-color: black;
        color: deeppink;
    }
    #number {
        margin-left: 1ch;
        margin-right: 1ch;
        width: 4ch;
        font-size: 2ch;
    }
    #positionInput {
        margin-right: 3ch;
    }
    input:valid {
        background: violet;
    }
    input:invalid {
        background-color: coral;
    }
    select {
        background-color: plum;
    }
</style>
