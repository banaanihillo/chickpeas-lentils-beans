<template>
    <table id = "batting-statistics" border = 3>
        <tr id = "batting-statistics-header">
            <td id = "batting-statistics-title"> Batter </td>
            <th id = "plate-appearances"> Plate appearances </th>
            <th id = "base-hits"> Hits </th>
            <th id = "runs-batted-in"> RBI </th>
            <th
                v-for = "(outcome, index) in threeTrueOutcomes"
                v-bind:key = "index"
                id = "three-true-outcomes"
            >
                <span id = "batting-statistics-column"> {{outcome}} </span>
            </th>
            <th id = "extra-base-hits"> XBH </th>
        </tr>

        <tr v-for = "batter in battingOrder" v-bind:key = "batter.name" id = "batter">
            <th id = "batting-statistics-row-header">
                {{batter.name}}
            </th>
            <td id = "plate-appearances">
                <span v-if = "!batter.plateAppearances"> 0 </span>
                <span v-else> {{Object.values(batter.plateAppearances).length}} </span>
            </td>
            <td id = "base-hits">
                <span v-if = "!batter.plateAppearances"> 0 </span>
                <span v-else>
                    {{Object.values(batter.plateAppearances).filter(plateAppearance => (
                        plateAppearance.payoff === "H")
                    ).length
                    }}
                </span>
            </td>
            <td id = "runs-batted-in">
                <span v-if = "!batter.plateAppearances"> 0 </span>
                <span v-else> {{getRunsBattedIn(batter.plateAppearances)}} </span>
            </td>
            <td v-for = "outcome in threeTrueOutcomes" v-bind:key = "outcome">
                <span v-if = "!batter.plateAppearances"> 0 </span>
                <span v-else id = "three-true-outcomes">
                    {{Object.values(batter.plateAppearances).filter(plateAppearance =>
                        plateAppearance.payoff === outcome
                    ).length
                    }}
                </span>
            </td>
            <td id = "extra-base-hits">
                <span v-if = "!batter.plateAppearances"> 0 </span>
                <span v-else>
                    {{Object.values(batter.plateAppearances).filter(plateAppearance => (
                        plateAppearance.typeOfHit === "2B"
                        || plateAppearance.typeOfHit === "3B"
                        || plateAppearance.typeOfHit === "HR"
                    )
                    ).length
                    }}
                </span>
            </td>
            
        </tr>
    </table>
</template>

<script>
    export default {
        name: "BattingStatistics",
        props: {
            battingOrder: Object
        },
        data() {
            return {
                threeTrueOutcomes: [
                    "HR", "BB", "K"
                ]
            }
        },
        methods: {
            getRunsBattedIn(plateAppearances) {
                const rbiTotal = Object.values(plateAppearances).map(plateAppearance =>
                    plateAppearance.RBI
                )
                return this.calculateSum(rbiTotal)
            },
            calculateSum(things) {
                return things.reduce((sum, summand) => sum + (summand || 0), 0)
            },
        }
    }
</script>

<style scoped>
    #batting-statistics {
        background-color: black;
        color: deeppink;
        margin-right: auto;
        margin-left: auto;
        table-layout: fixed;

    }
    #batting-statistics-title {
        color: blueviolet;
        width: 20ch;
    }
    #batting-statistics-header {
        width: 8ch;
    }
    #empty {
        font-size: 1ch;
    }
    #batting-statistics-row-header {
        height: 5ch;
    }
    #plate-appearances {
        color: mediumpurple;
        width: 12ch;
    }
    #base-hits {
        color: aquamarine;
        width: 5ch;
    }
    #three-true-outcomes {
        color: magenta;
        width: 4ch;
    }
    #runs-batted-in {
        width: 4ch;
    }
    #extra-base-hits {
        width: 5ch;
        color: lightpink
    }
</style>
