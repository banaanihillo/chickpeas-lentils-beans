<template>
    <div id = "app">
        
        <p>
            <router-link to = "/">Main page</router-link>
            <router-link to = "/players">Players</router-link>
            <router-link to = "/teams">Teams</router-link>
            <router-link to = "/add-player">Add a player</router-link>
            <router-link to = "/add-team">Add a team</router-link>
        </p>
        
        <router-view>
            
            <Players />
            <Teams />
            <AddPlayer />
            <AddTeam />
        </router-view>
        <BallGame />

    </div>
</template>

<script>
    import BallGame from "./components/BallGame"
    import Players from "./components/Players"
    import Teams from "./components/Teams"
    import AddPlayer from "./components/AddPlayer"
    import AddTeam from "./components/AddTeam"

    export default {
        name: "App",
        components: {
            BallGame,
            Players,
            Teams,
            AddPlayer,
            AddTeam
        },
        computed: {
            console: () => console,
            window: () => window
        }
    }
</script>

<style>
    #app {
        font-family: Avenir, Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
        background-color: lightslategray;
    }
    a {
        padding: 1ch;
    }
    a:visited {
        color: indigo;
    }
    body {
        background-color: silver;
    }
</style>
