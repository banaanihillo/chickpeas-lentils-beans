<template>
    <div id = "teams">
        <ul v-for = "team in teams" v-bind:key = "team.id">
            <li>
                {{team.name}} - {{team.organization}}
                <span v-if = "team.division">
                    ({{team.division}})
                </span>
            </li>
        </ul>
    </div>
</template>

<script>
    export default {
        name: "Teams",
        computed: {
            teams() {
                return this.$store.state.teams
            }
        }
    }
</script>
