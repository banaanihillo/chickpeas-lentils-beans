<template>
    <table id = "batting-statistics" border = 3>
        <tr id = "batting-statistics-header">
            <td id = "batting-statistics-title"> Batter </td>
            <th id = "plate-appearances"> Plate appearances </th>
            <th
                v-for = "statistic in statistics"
                v-bind:key = "statistic + ' header'"
                id = "batting-statistics-column-header"
            >
                <span id = "batting-statistics-column"> {{statistic}} </span>
            </th>
        </tr>

        <tr v-for = "batter in battingOrder" v-bind:key = "batter.name" id = "batter">
            <th id = "batting-statistics-row-header">
                {{batter.name}}
            </th>
            <td id = "plate-appearances">
                {{Object.values(batter.plateAppearances).length}}
            </td>
            <td v-for = "statistic in statistics" v-bind:key = "statistic + ' column'">
                {{Object.values(batter.plateAppearances).filter(plateAppearance =>
                    plateAppearance === statistic
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
                statistics: [
                    "H", "K", "BB", "HBP"/*, "HR", "XBH"*/
                ]
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
    #batting-statistics-column-header {
        width: 8ch;
    }
    #empty {
        font-size: 1ch;
    }
    #batting-statistics-row-header {
        height: 5ch;
    }
    #plate-appearances {
        background-color: indigo;
        width: 15ch;
    }
</style>
