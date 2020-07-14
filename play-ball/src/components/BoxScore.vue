<template>
    <div>
        <span id = "boxscore">
            <span v-for = "inning in innings" v-bind:key = "inning">
                {{inning}} <br />
                <input type = "number" v-bind:value = 0 /> <br />
                <input type = "number" v-bind:value = 0 /> <br />
            </span>
            <span>
                R <br />
                <input type = "number" v-bind:value = awayTeamRuns /> <br />
                <input type = "number" v-bind:value = homeTeamRuns /> <br />
            </span>
            <span>
                H <br />
                <input type = "number" v-bind:value = 0 /> <br />
                <input type = "number" v-bind:value = 0 /> <br />
            </span>
            <span>
                E <br />
                <input type = "number" v-bind:value = 0 /> <br />
                <input type = "number" v-bind:value = 0 /> <br />
            </span>
            <!--        
            <span v-for = "inning in innings" v-bind:key = "'Top' + inning">
                <input type = "number" v-bind:value = 0 />
            </span>
            <span v-for = "inning in innings" v-bind:key = "'Bottom' + inning">
                <input type = "number" v-bind:value = 0 />
            </span>
            -->
        </span>


        <button @click.prevent = "innings++">
            Extra innings
        </button>
        
    </div>
</template>

<script>
    export default {
        name: "BoxScore",
        data() {
            return {
                innings: 9,
                awayTeamRuns: 0,
                homeTeamRuns: 0
            }
        }
    }
</script>

<style scoped>
    #boxscore {
        font-size: 3ch;
        background-color: hotpink;
        margin-top: 10px;
        display: grid;
        grid-template-columns: repeat(9, 5ch);
        grid-auto-columns: 5ch;
        grid-auto-rows: 1fr;
        justify-content: center;
        grid-auto-flow: column;
    }
    input {
        width: 3ch;
        height: 1fr;
        font-size: 3ch;
        text-align: center;
    }
</style>
