<template>
    <div>
        <span id = "boxscore">
            <span v-for = "inning in innings" v-bind:key = "inning">
                {{inning}} <br />
                <input type = "number" v-model.number = awayTeamRuns[inning] /> <br />
                <input type = "number" v-model.number = homeTeamRuns[inning] /> <br />
            </span>

            <span id = "slashline">
                <span>
                    R <br />

                    <span v-if = "awayTeamRuns.length === 0"> 0 </span>
                    <span v-else> {{calculateSum(awayTeamRuns)}} </span> <br />

                    <span v-if = "homeTeamRuns.length === 0"> 0 </span>
                    <span v-else> {{calculateSum(homeTeamRuns)}} </span> <br />
                </span>
                <span>
                    H <br />
                    {{awayHits}} <br />
                    {{homeHits}} <br />
                </span>
                <span>
                    E <br />
                    {{awayErrors}} <br />
                    {{homeErrors}} <br />
                </span>
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
                awayTeamRuns: [],
                homeTeamRuns: [],
                awayHits: 0,
                homeHits: 0,
                awayErrors: 0,
                homeErrors: 0
            }
        },
        methods: {
            calculateSum(thing) {
                return thing.reduce((sum, summand) => sum + summand, 0)
            }
        }
    }
</script>

<style scoped>
    #boxscore {
        font-size: 3ch;
        background-color: hotpink;
        margin-top: 10px;
        display: flex;
        grid-template-columns: repeat(9, auto);
        grid-auto-columns: auto;
        grid-auto-rows: auto;
        justify-content: center;
        grid-auto-flow: column;
        flex-wrap: wrap;
    }
    #slashline {
        background-color: black;
        color: hotpink;
        display: grid;
        flex: 0.1 0 auto;
        align-items: flex-start;
        grid-template-columns: repeat(3, auto);
    }
    input {
        width: 2ch;
        height: auto;
        font-size: 3ch;
        text-align: right;
    }
</style>
