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
                        {{calculateSum(getHits(awayPlayers))}} <br />
                        {{calculateSum(getHits(homePlayers))}} <br />
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
            <!---->
        </span>
        <!---->
    </div>
</template>

<script>
    export default {
        name: "BoxScore",
        data() {
            return {
                awayTeamRuns: {},
                homeTeamRuns: {},
                awayErrors: 0,
                homeErrors: 0
            }
        },
        methods: {
            calculateSum(things) {
                return Object.values(things).reduce((sum, summand) => sum + summand, 0)
            },
            getHits(team) {
                let baseHits = {}
                let amountOfHitsPerBatter = {}
                for (const [battingOrderNumber, player] of Object.entries(team)) {
                    baseHits[battingOrderNumber] = Object.values(
                        player.plateAppearances
                    ).filter(plateAppearance =>
                        plateAppearance === "1B" || plateAppearance === "2B"
                        || plateAppearance === "3B" || plateAppearance === "HR"
                    )
                }
                for (const [batter, hitsByBatter] of Object.entries(baseHits)) {
                    amountOfHitsPerBatter[batter] = hitsByBatter.length
                }
                return amountOfHitsPerBatter
            }
            /*,
            calculateHits(totalPlateAppearances) {
                console.log(Object.values(totalPlateAppearances))
                const plateAppearances = Object.values(totalPlateAppearances).map(
                    player => player.plateAppearances
                )
                console.log(plateAppearances)
                const baseHits = Object.values(plateAppearances).filter(plateAppearance =>
                    plateAppearance === "1B" || plateAppearance === "2B"
                    || plateAppearance === "3B" || plateAppearance === "HR"
                )
                console.log(baseHits)
                return baseHits.length
            }*/
        },
        props: {
            innings: Number,
            awayPlayers: Object,
            homePlayers: Object
        }/*,
        computed: {
            awayHits() {
                
                const awayTeamPlateAppearances = Object.values(this.awayPlayers).map(
                    player => player.plateAppearances
                )
                let baseHits = {}
                let amountOfHitsPerBatter = {}
                for (const [battingOrderNumber, player] of Object.entries(this.awayPlayers)) {
                    console.log(battingOrderNumber)
                    console.log(player)
                    console.log(player.plateAppearances)
                    baseHits[battingOrderNumber] = Object.values(
                        player.plateAppearances
                    ).filter(plateAppearance =>
                        plateAppearance === "1B" || plateAppearance === "2B"
                        || plateAppearance === "3B" || plateAppearance === "HR"
                    )
                    console.log(baseHits)
                    console.log(baseHits[battingOrderNumber].length)
                }
                for (const [batter, hitsByBatter] of Object.entries(baseHits)) {
                    console.log(batter)
                    console.log(hitsByBatter)
                    console.log(hitsByBatter.length)
                    amountOfHitsPerBatter[batter] = hitsByBatter.length
                }
                console.log(amountOfHitsPerBatter)
                return amountOfHitsPerBatter
            },
            homeHits() {
                const homeTeamPlateAppearances = Object.values(this.homePlayers).map(player =>
                    player.plateAppearances
                )
                return this.calculateHits(homeTeamPlateAppearances)
            }
        }*/
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
        background-color: violet;
    }
</style>
