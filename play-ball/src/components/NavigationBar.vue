<template>
    <ul>
        <li><a href = "#ballgame"> Play ball </a></li>
        <li><a href = "#boxscore"> Boxscore </a></li>
        <li><a href = "#away-scorecard"> Away scorecard </a></li>
        <li><a href = "#away-pitching-scorecard"> Away pitching </a></li>
        <li><a href = "#home-scorecard"> Home scorecard </a></li>
        <li><a href = "#home-pitching-scorecard"> Home pitching </a></li>
        <li><a href = "#app"> Back to top </a></li>
    </ul>
</template>

<script>
    export default {
        name: "NavigationBar"
    }
</script>

<style scoped>
    li {
        display: inline;
    }
    a {
        padding-top: 0;
        padding-bottom: 0;
        color: navy;
    }
    a:visited {
        color: black;
    }
    ul {
        list-style-type: none;
        margin-bottom: 0;
        position: fixed;
        bottom: 0;
        width: 100%;
        background-color: deeppink;
    }
</style>
