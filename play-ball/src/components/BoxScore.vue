<template>
    <div>
        <span id = "boxscore">
            <span v-for = "inning in innings" v-bind:key = "inning">
                {{inning}} <br /> 
            </span>
                    
            <span v-for = "inning in innings" v-bind:key = "'Top' + inning">
                <input type = "number" v-bind:value = 0 />
            </span>
            <span v-for = "inning in innings" v-bind:key = "'Bottom' + inning">
                <input type = "number" v-bind:value = 0 />
            </span>
        </span>

        <!--
        <button @click.prevent = "innings++">
            Extra innings
        </button>
        -->
    </div>
</template>

<script>
    export default {
        name: "BoxScore",
        data() {
            return {
                innings: 9
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
        justify-content: center;
        text-align: center;
    }
    input {
        width: 3ch;
        height: 1fr;
        font-size: 3ch;
    }
</style>
