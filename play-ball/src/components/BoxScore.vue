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
                    <span id = "runs">
                        <span v-if = "awayTeamRuns.length === 0"> 0 </span>
                        <span v-else> {{calculateSum(awayTeamRuns)}} </span> <br />

                        <span v-if = "homeTeamRuns.length === 0"> 0 </span>
                        <span v-else> {{calculateSum(homeTeamRuns)}} </span> <br />
                    </span>
                </span>
                <span>
                    H <br />
                    <span id = "hits">
                        {{awayHits}} <br />
                        {{homeHits}} <br />
                    </span>
                </span>
                <span>
                    E <br />
                    <span id = "errors">
                        {{awayErrors}} <br />
                        {{homeErrors}} <br />
                    </span>
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




    </div>
</template>

<script>
    export default {
        name: "BoxScore",
        data() {
            return {
                
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
        },
        props: {
            innings: Number
        }
    }
</script>

<style scoped>
    #boxscore {
        font-size: 3ch;
        background-color: black;
        color: hotpink;
        margin-top: 10px;
        display: flex;
        align-content: space-evenly;
        justify-content: center;
        grid-auto-flow: column;
        flex-wrap: wrap;
        
    }
    #slashline {
        display: flex;
        flex: 0 1 auto;
        justify-content: space-around;
        align-items: flex-start;
        width: 10ch;
    }
    #runs {
        font-size: 3.3ch;
        color: yellow;
    }
    #hits {
        font-size: 3.3ch;
    }
    #errors {
        font-size: 3.3ch;
        color: red;
    }
    input {
        width: 2ch;
        height: 2ch;
        font-size: 3ch;
        text-align: right;
    }
</style>
