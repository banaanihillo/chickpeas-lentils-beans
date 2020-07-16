<template>
    <div id = "app">
        <BallGame message = "Welcome to Your Ballgame Application" />
        <p>
            <router-link to = "/players"> Players </router-link>
            <router-link to = "/teams"> Teams </router-link>
            <router-link to = "/add-player"> Add a player </router-link>
            <router-link to = "/add-team"> Add a team </router-link>
        </p>
        <router-view>
            <Players />
            <Teams />
            <AddPlayer />
            <AddTeam />
        </router-view>
        <img
            alt = "The Vue logo - a dark blue letter V within a larger green letter V"
            src = "./assets/logo.png"
        >
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
        margin-top: 40px;
    }
</style>
