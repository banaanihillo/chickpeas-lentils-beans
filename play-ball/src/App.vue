<template>
    <div id = "app">
        <img
            alt = "The Vue logo - a dark blue letter V within a larger green letter V"
            src = "./assets/logo.png"
        >
        <br />
        <span>
            <router-link to = "/players"> Players </router-link>
            <router-link to = "/teams"> Teams </router-link>
            <router-link to = "/add-player"> Add a player </router-link>
            <router-link to = "/add-team"> Add a team </router-link>
        </span>
        <router-view>
            <Players />
            <Teams />
            <AddPlayer />
            <AddTeam />
        </router-view>
        <HelloWorld msg = "Welcome to Your Vue.js App" />
    </div>
</template>

<script>
    import HelloWorld from "./components/HelloWorld.vue"
    import Players from "./components/Players"
    import Teams from "./components/Teams"
    import AddPlayer from "./components/AddPlayer"
    import AddTeam from "./components/AddTeam"

    export default {
        name: "App",
        components: {
            HelloWorld,
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
        margin-top: 60px;
    }
</style>
