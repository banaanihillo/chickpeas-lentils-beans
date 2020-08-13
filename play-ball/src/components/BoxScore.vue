<template>
    <div>
        <span id = "boxscore">
            <span id = "row-header">
                <span id = "away-team"> {{awayTeam}} </span> <br /> <br />
                <span id = "home-team"> {{homeTeam}} </span>
            </span>
            <span v-for = "inning in innings" v-bind:key = "inning" id = "inning">
                {{inning}} <br />
                <span id = "runs-per-inning">
                    <span id = "away-team-runs-per-inning">
                        {{getRuns(awayPlayers, inning)}} <br />
                    </span>
                    <span id = "home-team-runs-per-inning">
                        {{getRuns(homePlayers, inning)}} <br />
                    </span>
                </span>
            </span>

            <span id = "slashline">

                <span id = "runs">
                    R <br />
                    <span id = "away-total-runs">
                        {{getRunTotal(awayPlayers)}} <br />
                    </span>
                    <span id = "home-total-runs">
                        {{getRunTotal(homePlayers)}}
                    </span>
                </span>

                <span id = "hits">
                    H <br />
                    <span id = "away-hits">
                        {{calculateSum(getHits(awayPlayers))}} <br />
                    </span>
                    <span id = "home-hits">
                        {{calculateSum(getHits(homePlayers))}} <br />
                    </span>
                </span>

                <span id = "errors">
                    E <br />
                    <span id = "home-errors">
                        {{calculateSum(getOpposingErrors(homePlayers))}} <br />
                    </span>
                    <span id = "away-errors">
                        {{calculateSum(getOpposingErrors(awayPlayers))}} <br />
                    </span>
                </span>
            </span>

        </span>
        
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
            homePlayers: Object,
            awayTeam: String,
            homeTeam: String
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
        height: 10ch;
        justify-content: center;
        align-items: flex-end;
        grid-auto-flow: column;
        flex-wrap: wrap;
        align-content: center;
    }
    #row-header {
        height: 9ch;
        font-size: 1ch;
    }
    #team-header {
        display: flex;
        justify-content: center;
    }
    #away-team {
        color: deeppink;
        display: flex;
        justify-content: center;
    }
    #home-team {
        color: magenta;
        display: flex;
        justify-content: center;
    }
    #slashline {
        display: flex;
        flex: 0 1 auto;
        justify-content: space-around;
        width: 10ch;
    }
    #runs {
        color: yellow;
        width: 3ch;
        outline: solid goldenrod;
    }
    #hits {
        width: 3ch;
        outline: solid hotpink;
    }
    #away-total-runs {
        font-size: 3ch;

    }
    #home-total-runs {
        font-size: 3ch;

    }
    #away-team-runs-per-inning {
        font-size: 3ch;
        border: solid deeppink;
    }
    #home-team-runs-per-inning {
        font-size: 3ch;
        border: solid magenta;
    }
    
    #errors {
        color: red;
        width: 3ch;
        outline: solid red;
    }
    #away-errors {
        font-size: 3ch;
        
    }
    #home-errors {
        font-size: 3ch;
        
    }
    #inning {
        width: 3ch;
    }
    #away-hits {
        font-size: 3ch;

    }
    #home-hits {
        font-size: 3ch;
        
    }
</style>
