<template>
    <div id = "players">
        <ul v-for = "player in players" v-bind:key = "player.id">
            <li>
                {{player.name}} #{{player.id}} - {{player.position}}
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
