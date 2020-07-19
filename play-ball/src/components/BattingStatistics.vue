<template>
    <table id = "batting-statistics" border = 3>
        <tr id = "batting-statistics-header">
            <td id = "batting-statistics-title"> Batter </td>
            <th v-for = "statistic in statistics" v-bind:key = "statistic + ' header'">
                <span id = "batting-statistics-column"> {{statistic}} </span>
            </th>
        </tr>

        <tr v-for = "batter in battingOrder" v-bind:key = "batter" id = "batter">
            <th id = "batting-statistics-row-header">
                {{batter}}
            </th>
            <td v-for = "statistic in statistics" v-bind:key = "statistic + ' row'">
                <span id = "batting-statistics-content"> 0 </span>
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
                statistics: [
                    "At bats", "Hits", "RBI", "Runs", "HR", "K", "BB + HBP"
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
        width: 100%;
    }
    #batting-statistics-title {
        color: blueviolet;
        width: 25ch;
    }
    #batting-statistics-content {
        background-color: darkmagenta;
        font-size: 3ch;
    }
    #batting-statistics-column {
        background-color: hotpink;
        color: black;
    }
    #batting-statistics-row-header {
        width: 20ch;
    }
</style>
