<template>
    <div id = "players">
        <ul v-for = "player in players" v-bind:key = "player.id">
            <li>
                {{player.name}} #{{player.number}} -
                <span v-for = "position in player.positions" v-bind:key = "position">
                    {{position}}
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
        }
    }
</script>
