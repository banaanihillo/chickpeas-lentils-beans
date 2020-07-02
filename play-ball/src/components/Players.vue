<template>
    <div id = "players">
        <ul v-for = "player in players" v-bind:key = "player.id">
            <li>
                {{player.name}} #{{player.number}}
                <span v-if = "player.positions.includes('P')">
                    <p>
                        <span v-if = "player.throws === 'L'">
                            Left handed
                        </span>
                        <span v-else>
                            Right handed
                        </span>
                        <span>
                            <span v-if = "player.role">
                                {{player.role}}
                            </span>
                            <span v-else>
                                pitcher
                            </span>
                            for the {{player.team.name}}.
                        </span>
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
                            <span v-else-if = "player.preferredPosition">
                                {{player.preferredPosition}}
                            </span>
                            <span v-else>
                                <span v-if = "player.positions.length === 1">
                                    {{player.positions[0]}}
                                </span>
                                <span v-else>
                                    utility player
                                </span>
                            </span>
                        
                        </span>
                        for the {{player.team.name}}.
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
            </li>
        </ul>
    </div>
</template>

<script>
    export default {
        name: "Players",
        computed: {
            players() {
                return this.$store.state.players
            }
        },
        data() {
            return {
                listOfPositionPlayers: ["C", "1B", "2B", "3B", "SS", "LF", "CF", "RF", "DH"]
            }
        }
    }
</script>
