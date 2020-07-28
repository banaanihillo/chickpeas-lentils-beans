<template>
    <div id = "app">
        {{console.log("I am inside the application")}}
        {{console.log(window.performance.now())}}
        <hello-everyone-else :greetees = "properties.greetees" />
        <img alt = "Vue logo" src = "./assets/logo.png">
        <HelloWorld message = "Hello!" />
    </div>
</template>

<script>
    import HelloWorld from "./components/HelloWorld.vue"
    import HelloEveryoneElse from "./components/HelloEveryoneElse.vue"
    
    export default {
        name: "App",
        components: {
            HelloWorld,
            HelloEveryoneElse
        },
        data() {
            return {
                properties: {
                    greetees: [
                        {
                            name: "J Doe",
                            favoriteThing: "Just hangin around",
                            id: (Math.ceil(Math.random() * 1000000))
                        },
                        {
                            name: "Joe D",
                            favoriteThing: "Bananas",
                            id: (Math.floor(Math.random() * 222222))
                        }
                    ]
                }
            }
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
        margin-top: 60px;
    }
</style>
