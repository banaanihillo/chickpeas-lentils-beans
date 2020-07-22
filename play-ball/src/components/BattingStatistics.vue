<template>
    <table id = "batting-statistics" border = 3>
        <tr id = "batting-statistics-header">
            <td id = "batting-statistics-title"> Batter </td>
            <th id = "plate-appearances"> Plate appearances </th>
            <th id = "base-hits"> Hits </th>
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
                {{Object.values(batter.plateAppearances).length}}
            </td>
            <td id = "base-hits">
                {{getBaseHits(batter.plateAppearances)}}
            </td>
            <td v-for = "outcome in threeTrueOutcomes" v-bind:key = "outcome">
                {{Object.values(batter.plateAppearances).filter(plateAppearance =>
                    plateAppearance === outcome
                ).length
                }}
            </td>
            <td id = "extra-base-hits">
                {{Object.values(batter.plateAppearances).filter(plateAppearance => (
                    plateAppearance === "2B"
                    || plateAppearance === "3B"
                    || plateAppearance === "HR"
                )
                ).length
                }}
            </td>
            <!--
            <td>
                {{Object.values(batter.plateAppearances).length}}
            </td>
            <td>
                {{Object.values(batter.plateAppearances).filter(plateAppearance =>
                    plateAppearance === "H"
                ).length
                }}
            </td>
            <td v-for = "empty in 3" v-bind:key = "'Empty thing ' + empty" id = "empty">
                nothing here
            </td>
            <td>
                {{Object.values(batter.plateAppearances).filter(plateAppearance =>
                    plateAppearance === "K"
                ).length
                }}
            </td>
            <td>
                {{Object.values(batter.plateAppearances).filter(plateAppearance =>
                    plateAppearance === "BB" || plateAppearance === "HBP"
                ).length
                }}
            </td>
            -->
            <!--
            <td>
                {{Object.values(batter.plateAppearances).filter(plateAppearance =>
                    plateAppearance === "H" /* && bound amount of bases on a hit here*/
                ).length
                }}
            </td>
            -->
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
            getBaseHits(plateAppearances) {
                return Object.values(plateAppearances).filter(plateAppearance => (
                    plateAppearance === "1B" || plateAppearance === "2B"
                    || plateAppearance === "3B" || plateAppearance === "HR"
                )
                ).length
            }
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
        width: 15ch;
    }
    #base-hits {
        color: aquamarine;
    }
    #three-true-outcomes {
        color: magenta;
        width: 6ch;
    }
</style>
