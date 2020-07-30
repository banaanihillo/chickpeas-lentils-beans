<template>
    <div>
        <span id = "boxscore">
            <span v-for = "inning in innings" v-bind:key = "inning" id = "inning">
                {{inning}} <br />
                <span id = "runs-per-inning">
                    {{getRuns(awayPlayers, inning)}} <br />
                    {{getRuns(homePlayers, inning)}} <br />
                
                </span>
            </span>

            <span id = "slashline">
                <span>
                    R <br />
                    <span id = "runs">
                        {{getRunTotal(awayPlayers)}} <br />
                        {{getRunTotal(homePlayers)}}
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
                        {{calculateSum(getOpposingErrors(homePlayers))}} <br />
                        {{calculateSum(getOpposingErrors(awayPlayers))}} <br />
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

        methods: {
            calculateSum(things) {
                return Object.values(things).reduce((sum, summand) => sum + (summand || 0), 0)
            },
            getHits(team) {
                let baseHits = {}
                let amountOfHitsPerBatter = {}
                for (const [battingOrderNumber, player] of Object.entries(team)) {
                    if (player.plateAppearances) {
                        baseHits[battingOrderNumber] = Object.values(
                            player.plateAppearances
                        ).filter(plateAppearance => plateAppearance.payoff === "H")
                    }
                }
                for (const [batter, hitsByBatter] of Object.entries(baseHits)) {
                    amountOfHitsPerBatter[batter] = hitsByBatter.length
                }
                return amountOfHitsPerBatter
            },
            getOpposingErrors(opposingTeam) {
                let opposingErrors = {}
                let amountOfTimesReachedOnErrors = {}
                for (const [battingOrderNumber, player] of Object.entries(opposingTeam)) {
                    if (player.plateAppearances) {
                        opposingErrors[battingOrderNumber] = Object.values(
                            player.plateAppearances
                        ).filter(plateAppearance => plateAppearance.payoff === "E")   
                    }
                }
                for (const [batter, timesReachedOnError] of Object.entries(opposingErrors)) {
                    amountOfTimesReachedOnErrors[batter] = timesReachedOnError.length
                }
                return amountOfTimesReachedOnErrors
            },
            getRuns(team, inning) {
                let rbiPerInning = {}
                for (const player of Object.values(team)) {
                    if (player.plateAppearances && player.plateAppearances[inning]
                        && player.plateAppearances[inning].runsBattedIn
                    ) {
                        rbiPerInning = Object.values(rbiPerInning)
                            .concat(player.plateAppearances[inning].runsBattedIn)
                    }
                }
                return this.calculateSum(rbiPerInning)
            },
            getRunTotal(team) {
                let totalRuns = {}
                for (const player of Object.values(team)) {
                    if (player.plateAppearances) {
                        totalRuns = Object.values(totalRuns)
                            .concat(Object.values(player.plateAppearances)
                                .map(plateAppearance => plateAppearance.runsBattedIn)
                        )
                    }
                }
                return this.calculateSum(totalRuns)
            }

        },
        props: {
            innings: Number,
            awayPlayers: Object,
            homePlayers: Object
        } //
    }
</script>

<style scoped>
    #boxscore {
        font-size: 3ch;
        background-color: black;
        color: hotpink;
        margin-top: 10px;
        display: flex;
        height: 9ch;
        justify-content: center;
        align-items: flex-start;
        grid-auto-flow: column;
        flex-wrap: wrap;
        
    }
    #slashline {
        display: flex;
        flex: 0 1 auto;
        justify-content: space-evenly;
        width: 9ch;
        outline: solid hotpink;
    }
    #runs {
        font-size: 3ch;
        color: yellow;
    }
    #runs-per-inning {
        font-size: 3ch;
        border-top: solid deeppink;
        border-bottom: solid hotpink;
    }
    #hits {
        font-size: 3ch;
    }
    #errors {
        font-size: 3ch;
        color: red;
    }
    #inning {
        width: 3ch;
        height: 2ch;
        text-align: center;
    }
</style>
